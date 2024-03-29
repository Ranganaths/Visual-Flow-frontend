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

import {
    FETCH_JOB_START,
    FETCH_JOB_SUCCESS,
    FETCH_JOB_FAIL,
    FETCH_PIPELINE_START,
    FETCH_PIPELINE_FAIL,
    FETCH_PIPELINE_SUCCESS,
    SET_CURRENT_CELL,
    SET_GRAPH_DIRTY,
    SET_GRAPH_FIELDS,
    SET_GRAPH_PARAMS,
    SET_PARAMS_DIRTY,
    SET_SIDE_PANEL,
    SET_SIDE_PANEL_DIRTY,
    SET_ZOOM_VALUE,
    SET_PANNING,
    SET_LOGS_MODAL
} from './types';
import jobsApi from '../../api/jobs';
import pipelinesApi from '../../api/pipelines';
import { updateJobStatus } from './oneJobStatusAction';
import { updatePipelineStatus } from './onePipelineStatusActions';

export const setSidePanel = isOpen => ({
    type: SET_SIDE_PANEL,
    payload: isOpen
});

export const setCurrentCell = cell => ({
    type: SET_CURRENT_CELL,
    payload: cell
});

export const setFields = fields => ({
    type: SET_GRAPH_FIELDS,
    payload: fields
});

export const setGraphDirty = dirty => ({
    type: SET_GRAPH_DIRTY,
    payload: dirty
});

export const setSidePanelDirty = dirty => ({
    type: SET_SIDE_PANEL_DIRTY,
    payload: dirty
});

export const setParamsDirty = dirty => ({
    type: SET_PARAMS_DIRTY,
    payload: dirty
});

export const setParams = params => ({
    type: SET_GRAPH_PARAMS,
    payload: params
});

export const fetchJob = (projectId, jobId) => dispatch => {
    dispatch({
        type: FETCH_JOB_START
    });
    const promise = jobId
        ? jobsApi.getJobById(projectId, jobId)
        : Promise.resolve({ data: { definition: {}, status: 'Draft', params: {} } });
    return promise.then(
        response => {
            dispatch({
                type: FETCH_JOB_SUCCESS,
                payload: response.data
            });
            dispatch(updateJobStatus(jobId, response.data.status));
        },
        error =>
            dispatch({
                type: FETCH_JOB_FAIL,
                payload: { error }
            })
    );
};

export const fetchPipelineById = (projectId, pipelineId) => dispatch => {
    dispatch({
        type: FETCH_PIPELINE_START
    });
    const promise = pipelineId
        ? pipelinesApi.getPipelineById(projectId, pipelineId)
        : Promise.resolve({ data: { definition: {}, status: 'Draft', params: {} } });
    return promise.then(
        response => {
            dispatch({
                type: FETCH_PIPELINE_SUCCESS,
                payload: response.data
            });
            dispatch(
                updatePipelineStatus(
                    pipelineId,
                    response.data.status,
                    response.data.progress
                )
            );
        },
        error =>
            dispatch({
                type: FETCH_PIPELINE_FAIL,
                payload: { error }
            })
    );
};

export const setZoomValue = val => ({
    type: SET_ZOOM_VALUE,
    payload: val
});

export const setPanning = val => ({
    type: SET_PANNING,
    payload: val
});

export const setLogsModal = val => ({
    type: SET_LOGS_MODAL,
    payload: val
});
