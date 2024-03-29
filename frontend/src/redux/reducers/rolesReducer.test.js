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

import rolesReducer from './rolesReducer';
import {
    FETCH_ROLES_START,
    FETCH_ROLES_FAIL,
    FETCH_ROLES_SUCCESS
} from '../actions/types';

describe('users Reducer', () => {
    const payload = [];

    it('should return the initial state', () => {
        expect(rolesReducer(undefined, {})).toEqual({
            loading: true,
            data: []
        });
    });

    it('should handle FETCH_ROLES_SUCCESS', () => {
        const action = {
            type: FETCH_ROLES_SUCCESS,
            payload
        };
        expect(rolesReducer(undefined, action)).toEqual({
            loading: false,
            data: payload
        });
    });

    it('should handle FETCH_ROLES_FAIL', () => {
        const action = {
            type: FETCH_ROLES_FAIL,
            payload: { error: {} }
        };
        expect(rolesReducer(undefined, action)).toEqual({
            loading: false,
            error: {},
            data: []
        });
    });

    it('should handle FETCH_ROLES_START', () => {
        const action = {
            type: FETCH_ROLES_START
        };
        expect(rolesReducer(undefined, action)).toEqual({
            loading: true,
            data: []
        });
    });
});
