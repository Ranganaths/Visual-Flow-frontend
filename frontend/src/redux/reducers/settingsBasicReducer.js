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
    GET_PROJECT_START,
    GET_PROJECT_SUCCESS,
    GET_PROJECT_FAIL,
    UPDATE_PROJECT_FAIL,
    UPDATE_PROJECT_SUCCESS
} from '../actions/types';

const initialState = {};

const settingsBasicReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case GET_PROJECT_START:
            return {
                ...state,
                loading: true
            };
        case GET_PROJECT_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                project: action.payload
            };
        case GET_PROJECT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload.error
            };
        case UPDATE_PROJECT_SUCCESS:
            return {
                ...state,
                project: action.payload,
                error: false
            };
        case UPDATE_PROJECT_FAIL:
            return {
                ...state,
                error: action.payload.error
            };
        default:
            return state;
    }
};

export default settingsBasicReducer;
