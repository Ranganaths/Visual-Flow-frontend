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

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import {
    Divider,
    TextField,
    Typography,
    Box,
    IconButton,
    MenuItem
} from '@material-ui/core';
import TransformOutlinedIcon from '@material-ui/icons/TransformOutlined';
import { get, isEqual } from 'lodash';

import useStyles from './JobConfiguration.Styles';
import JobsModal from './jobs-modal';
import { TextSkeleton } from '../../../skeleton';
import SaveCancelButtons from '../SaveCancelButtons';
import stageLabels from '../../stageLabels';

const jobStatuses = [
    {
        value: 'true',
        label: 'Success'
    },
    {
        value: 'false',
        label: 'Failure'
    }
];

const getOutputPaths = graph => {
    const currentCell = graph.getSelectionCell();
    const outputEdges = graph.getOutgoingEdges(currentCell);

    return outputEdges
        ? outputEdges.map(edge => ({
              id: edge.id,
              successPath: get(edge, 'value.attributes.successPath.value', ''),
              job: get(edge, 'target.value.attributes.name.value', '')
          }))
        : [];
};

const JobConfiguration = ({
    isDisabled,
    ableToEdit,
    configuration,
    t,
    saveCell,
    setPanelDirty,
    jobs: { loading, data },
    graph
}) => {
    const classes = useStyles();

    const [inputValues, setInputValues] = React.useState(configuration);
    const [projectJobs, setProjectJobs] = React.useState([]);
    const [showModal, setShowModal] = React.useState(false);
    const [outputPaths, setOutputPaths] = React.useState([]);

    useEffect(() => {
        setInputValues(configuration);
        setOutputPaths(getOutputPaths(graph));
    }, [configuration]);

    useEffect(() => {
        setPanelDirty(!isEqual(configuration, inputValues));
    }, [inputValues]);

    useEffect(() => {
        data.jobs && setProjectJobs(data.jobs);
    }, [data.jobs]);

    const handleInputChange = (key, value) =>
        setInputValues(prevState => ({
            ...prevState,
            [key]: value
        }));

    const saveConfiguration = () => {
        const current = graph.getSelectionCell();
        const outEdges = graph.getOutgoingEdges(current);

        outEdges.forEach(edge => {
            graph.model.setValue(
                edge,
                stageLabels({
                    operation: 'EDGE',
                    successPath: outputPaths.find(item => item.id === edge.id)
                        .successPath,
                    text: get(edge, 'value.attributes.text.value', '')
                })
            );
            const edgeColor =
                get(edge, 'value.attributes.successPath.value', '') === 'false'
                    ? '#F44336'
                    : '#4CAF50';
            graph.setCellStyles('strokeColor', edgeColor, [edge]);
        });
        return saveCell(inputValues);
    };

    const cancelChanges = () => {
        setInputValues(configuration);
        setPanelDirty(false);
    };

    const jobNameById = id => {
        const jobById = projectJobs.find(job => job.id === id);
        return jobById ? jobById.name : '';
    };

    const handleChangePathStatus = (id, value) => {
        setOutputPaths(
            outputPaths.map(edge => ({
                ...edge,
                successPath: edge.id === id ? value : edge.successPath
            }))
        );
        setPanelDirty(outputPaths.find(e => e.id === id).successPath !== value);
    };

    return (
        <Box className={classes.root}>
            <JobsModal
                display={showModal}
                ableToEdit={ableToEdit}
                onClose={() => setShowModal(false)}
                jobs={projectJobs}
                loading={loading}
                currentValue={inputValues.jobId || ''}
                onSetValue={newValue => {
                    setShowModal(false);
                    setInputValues({
                        ...inputValues,
                        jobId: newValue
                    });
                    handleInputChange('jobId', newValue);
                    handleInputChange('jobName', jobNameById(newValue));
                }}
            />
            <Box>
                <TextField
                    disabled={!ableToEdit}
                    label={t('pipelineDesigner:jobConfiguration.Name')}
                    placeholder={t('pipelineDesigner:jobConfiguration.Name')}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="name"
                    value={inputValues.name || ''}
                    onChange={event =>
                        handleInputChange(event.target.name, event.target.value)
                    }
                />
                <Divider />
                {loading ? (
                    <TextSkeleton />
                ) : (
                    <>
                        <TextField
                            disabled={!ableToEdit}
                            label={t('pipelineDesigner:jobConfiguration.JobName')}
                            placeholder={t(
                                'pipelineDesigner:jobConfiguration.JobName'
                            )}
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="jobId"
                            value={jobNameById(inputValues.jobId)}
                            InputProps={{
                                readOnly: true,
                                endAdornment: (
                                    <IconButton
                                        className={classes.iconBtn}
                                        onClick={() => setShowModal(true)}
                                    >
                                        <TransformOutlinedIcon />
                                    </IconButton>
                                )
                            }}
                        />
                        <Divider />
                    </>
                )}
                {outputPaths.length ? (
                    <>
                        <Box className={classes.outputPaths}>
                            <Typography variant="body2" color="textSecondary">
                                {t('pipelineDesigner:jobConfiguration.OutputPaths')}
                            </Typography>
                        </Box>
                        {outputPaths.map(({ id, successPath, job }) => (
                            <Box key={id} className={classes.pathRow}>
                                <TextField
                                    disabled={
                                        !ableToEdit ||
                                        (outputPaths.some(
                                            p => p.successPath === 'false'
                                        ) &&
                                            successPath === 'true')
                                    }
                                    className={classes.pathStatus}
                                    select
                                    name="successPath"
                                    value={successPath}
                                    onChange={event =>
                                        handleChangePathStatus(
                                            id,
                                            event.target.value
                                        )
                                    }
                                >
                                    {jobStatuses.map(option => (
                                        <MenuItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    value={job}
                                    className={classes.targetName}
                                    fullWidth
                                    InputProps={{
                                        readOnly: true
                                    }}
                                />
                            </Box>
                        ))}
                    </>
                ) : null}
            </Box>
            <SaveCancelButtons
                ableToEdit={ableToEdit}
                saveCell={() => saveConfiguration()}
                cancelChanges={cancelChanges}
                isDisabled={isDisabled(inputValues)}
            />
        </Box>
    );
};

JobConfiguration.propTypes = {
    isDisabled: PropTypes.func,
    ableToEdit: PropTypes.bool,
    configuration: PropTypes.object,
    t: PropTypes.func,
    saveCell: PropTypes.func,
    setPanelDirty: PropTypes.func,
    jobs: PropTypes.object,
    graph: PropTypes.object
};

const mapStateToProps = state => ({
    jobs: state.pages.jobs
});

export default connect(mapStateToProps)(withTranslation()(JobConfiguration));
