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

import enhancedTableReducer from './enhancedTableReducer';
import { SET_CURRENT_PAGE, SET_ROWS_PER_PAGE, SET_DEFAULT } from '../actions/types';

describe('EnhancedTable Reducer', () => {

    it('should return the initial state', () => {
        expect(enhancedTableReducer(undefined)).toEqual({
            page: 0,
            rowsPerPage: 5
        });
    });

    it('should handle SET_CURRENT_PAGE', () => {
        const action = {
            type: SET_CURRENT_PAGE,
            payload: 1
        };
        expect(enhancedTableReducer(undefined, action)).toEqual({
            page: 1,
            rowsPerPage: 5
        });
    });

    it('should handle SET_ROWS_PER_PAGE', () => {
        const action = {
            type: SET_ROWS_PER_PAGE,
            payload: 10
        };
        expect(enhancedTableReducer(undefined, action)).toEqual({
            page: 0,
            rowsPerPage: 10
        });
    });

    it('should handle SET_DEFAULT', () => {
        const action = {
            type: SET_DEFAULT
        };
        expect(enhancedTableReducer(undefined, action)).toEqual({
            page: 0,
            rowsPerPage: 5
        });
    });
});
