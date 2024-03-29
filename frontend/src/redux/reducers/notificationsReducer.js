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

import { ENQUEUE_SNACKBAR, CLOSE_SNACKBAR, REMOVE_SNACKBAR } from '../actions/types';

const initialState = [];

const notificationsReducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case ENQUEUE_SNACKBAR:
            return [
                ...state,
                {
                    key: action.key,
                    ...action.notification
                }
            ];

        case CLOSE_SNACKBAR:
            return state.map(notification =>
                action.dismissAll || notification.key === action.key
                    ? { ...notification, dismissed: true }
                    : { ...notification }
            );

        case REMOVE_SNACKBAR:
            return state.filter(notification => notification.key !== action.key);
        default:
            return state;
    }
};

export default notificationsReducer;
