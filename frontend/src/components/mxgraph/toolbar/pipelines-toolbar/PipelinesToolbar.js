/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Skeleton from '@material-ui/lab/Skeleton';
import { IconButton, Divider, Typography } from '@material-ui/core';
import { withTranslation } from 'react-i18next';
import { Save } from '@material-ui/icons';

import { has } from 'lodash';
import useStyles from './PipelinesToolbar.Styles';
import Status from '../../../status';
import history from '../../../../utils/history';
import {
    createPipeline,
    updatePipeline,
    runPipelineAndRefreshIt,
    stopPipelineAndRefreshIt
} from '../../../../redux/actions/pipelinesActions';
import RunStopButtons from '../run-stop-buttons';
import EditDesignerButtons from '../edit-designer-buttons';
import LinearProgressChart from '../../../chart/LinearProgressChart';
import { fetchPipelineById } from '../../../../redux/actions/mxGraphActions';
import { resetFillColor } from '../../resetFillColor/resetFillColor';

const PipelinesToolbar = ({
    t,
    graph,
    reversible,
    data,
    run,
    stop,
    getActualPipeline,
    pipelineStatus: { loading, status, progress, id },
    create,
    update,
    setSidePanel,
    sidePanelIsOpen,
    setDirty
}) => {
    const classes = useStyles({ name: 'PipelineUtilizationCell' });

    const currentPath = history.location.pathname.split('/');
    const currentProject = currentPath.slice(-2, -1)[0];
    const currentPipeline = currentPath.slice(-1)[0];

    const statusValue = currentPipeline === id ? status : data.status;
    const progressValue = currentPipeline === id ? progress : data.progress;

    const createUpdatePipeline = () => {
        resetFillColor(graph, data);
        if (currentPipeline) {
            update(graph, currentProject, currentPipeline, data);
        } else {
            create(graph, currentProject, data);
        }
    };

    const runAndUpdate = () => {
        return run(currentProject, currentPipeline).then(() => {
            getActualPipeline(currentProject, currentPipeline);
        });
    };

    const enableViewMode = () =>
        data.status === 'Pending' || data.status === 'Running'
            ? false
            : data.editable;

    return (
        <>
            <div className={classes.status}>
                <Typography variant="body2" color="textSecondary">
                    {t('pipelines:Status')}:
                </Typography>
                &nbsp;
                {loading ? (
                    <Skeleton variant="circle" width={90} height={25} />
                ) : (
                    <Status value={statusValue} />
                )}
            </div>
            <Divider orientation="vertical" flexItem />
            <div className={classes.progress}>
                <Typography
                    align="left"
                    variant="body2"
                    color="inherit"
                    className={classes.hint}
                >
                    {t('pipelines:Progress')}
                </Typography>
                <LinearProgressChart
                    value={progressValue * 100 || 0}
                    status={statusValue}
                    classes={{ caption: classes.caption, margins: classes.margins }}
                />
            </div>
            <Divider orientation="vertical" flexItem />
            <div>
                {data.runnable && (
                    <RunStopButtons
                        isNotRunning={[
                            'Draft',
                            'Failed',
                            'Error',
                            'Succeeded'
                        ].includes(statusValue)}
                        runnable={data.runnable}
                        run={() => {
                            runAndUpdate();
                        }}
                        stop={() => stop(currentProject, currentPipeline)}
                    />
                )}
                {enableViewMode() && (
                    <IconButton aria-label="saveIcon" onClick={createUpdatePipeline}>
                        <Save />
                    </IconButton>
                )}
            </div>
            <Divider orientation="vertical" flexItem />
            <EditDesignerButtons
                editable={!has(data, 'editable') || enableViewMode()}
                data={data}
                graph={graph}
                reversible={reversible}
                setSidePanel={setSidePanel}
                sidePanelIsOpen={sidePanelIsOpen}
                setDirty={setDirty}
                refresh={() => getActualPipeline(currentProject, currentPipeline)}
            />
        </>
    );
};

PipelinesToolbar.propTypes = {
    setSidePanel: PropTypes.func,
    sidePanelIsOpen: PropTypes.bool,
    setDirty: PropTypes.func,
    t: PropTypes.func,
    graph: PropTypes.object,
    create: PropTypes.func,
    data: PropTypes.object,
    update: PropTypes.func,
    run: PropTypes.func,
    stop: PropTypes.func,
    pipelineStatus: PropTypes.object,
    reversible: PropTypes.object,
    getActualPipeline: PropTypes.func
};

const mapStateToProps = state => ({
    pipelineStatus: state.pipelineStatus
});

const mapDispatchToProps = {
    create: createPipeline,
    update: updatePipeline,
    run: runPipelineAndRefreshIt,
    stop: stopPipelineAndRefreshIt,
    getActualPipeline: fetchPipelineById
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation()(PipelinesToolbar));
