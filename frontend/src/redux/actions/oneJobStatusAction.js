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
    FETCH_JOB_STATUS_FAIL,
    FETCH_JOB_STATUS_START,
    FETCH_JOB_STATUS_SUCCESS,
    UPDATE_JOB_STATUS_FAIL,
    UPDATE_JOB_STATUS_START,
    UPDATE_JOB_STATUS_SUCCESS
} from './types';
import api from '../../api/jobs';

const fetchJobStatus = (projectId, jobId) => dispatch => {
    dispatch({
        type: FETCH_JOB_STATUS_START
    });
    const promise = jobId
        ? api.getJobById(projectId, jobId)
        : Promise.resolve({ status: 'Draft' });
    return promise.then(
        response =>
            dispatch({
                type: FETCH_JOB_STATUS_SUCCESS,
                payload: { ...response.data, id: jobId }
            }),
        error =>
            dispatch({
                type: FETCH_JOB_STATUS_FAIL,
                payload: { error }
            })
    );
};

export const updateJobStatus = (pipelineId, status) => dispatch => {
    dispatch({
        type: UPDATE_JOB_STATUS_START
    });
    return pipelineId
        ? dispatch({
              type: UPDATE_JOB_STATUS_SUCCESS,
              payload: { status, id: pipelineId }
          })
        : dispatch({
              type: UPDATE_JOB_STATUS_FAIL,
              payload: 'Job status has not been updated'
          });
};

export default fetchJobStatus;
