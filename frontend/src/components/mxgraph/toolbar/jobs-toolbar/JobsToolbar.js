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
import { Description, Save } from '@material-ui/icons';

import { has } from 'lodash';
import useStyles from './JobsToolbar.Styles';
import {
    createJob,
    runJobAndRefreshIt,
    stopJobAndRefreshIt,
    updateJob
} from '../../../../redux/actions/jobsActions';
import fetchJobStatus from '../../../../redux/actions/oneJobStatusAction';
import Status from '../../../status';
import history from '../../../../utils/history';
import RunStopButtons from '../run-stop-buttons';
import EditDesignerButtons from '../edit-designer-buttons';
import { fetchJob } from '../../../../redux/actions/mxGraphActions';
import { PENDING, RUNNING } from '../../constants';

const JobsToolbar = ({
    t,
    graph,
    reversible,
    data,
    run,
    stop,
    getStatus,
    getActualJob,
    storeStatus: { loading, status, id },
    create,
    update,
    setSidePanel,
    sidePanelIsOpen,
    setDirty,
    setShowModal
}) => {
    const classes = useStyles();

    const currentPath = history.location.pathname.split('/');
    const currentProject = currentPath.slice(-2, -1)[0];
    const currentJob = currentPath.slice(-1)[0];

    const stats = currentJob === id ? status : data.status;

    const createUpdateJob = () => {
        if (currentJob) {
            update(graph, currentProject, currentJob, data);
        } else {
            create(graph, currentProject, data);
        }
    };

    const runAndUpdate = () => {
        return run(currentProject, currentJob).then(() => {
            getActualJob(currentProject, currentJob);
        });
    };

    const enableViewMode = () =>
        data.status === PENDING || data.status === RUNNING ? false : data.editable;

    return (
        <>
            <div className={classes.status}>
                <Typography variant="body2" color="textSecondary">
                    {t('jobs:Status')}:
                </Typography>
                &nbsp;
                {loading ? (
                    <Skeleton variant="circle" width={90} height={25} />
                ) : (
                    <Status value={stats} />
                )}
            </div>
            <Divider orientation="vertical" flexItem />
            <div>
                {data.runnable && (
                    <RunStopButtons
                        isNotRunning={['Draft', 'Failed', 'Succeeded'].includes(
                            stats
                        )}
                        runnable={data.runnable}
                        run={() => {
                            runAndUpdate();
                        }}
                        stop={() => stop(currentProject, currentJob)}
                    />
                )}
                {enableViewMode() && (
                    <IconButton aria-label="saveIcon" onClick={createUpdateJob}>
                        <Save />
                    </IconButton>
                )}
                <IconButton
                    disabled={
                        status === PENDING || status === RUNNING || !data.startedAt
                    }
                    aria-label="descriptionIcon"
                    onClick={() => setShowModal(true)}
                >
                    <Description />
                </IconButton>
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
                refresh={() => getStatus(currentProject, currentJob)}
            />
        </>
    );
};

JobsToolbar.propTypes = {
    setShowModal: PropTypes.func,
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
    getStatus: PropTypes.func,
    storeStatus: PropTypes.object,
    reversible: PropTypes.object,
    getActualJob: PropTypes.func
};

const mapStateToProps = state => ({
    storeStatus: state.jobStatus
});

const mapDispatchToProps = {
    create: createJob,
    update: updateJob,
    run: runJobAndRefreshIt,
    stop: stopJobAndRefreshIt,
    getStatus: fetchJobStatus,
    getActualJob: fetchJob
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withTranslation()(JobsToolbar));
