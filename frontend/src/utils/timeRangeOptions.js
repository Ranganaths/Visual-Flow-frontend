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

import moment from 'moment';

export default {
    'last hour': date =>
        moment()
            .subtract(1, 'hours')
            .isBefore(date),
    'last 3 hours': date =>
        moment()
            .subtract(3, 'hours')
            .isBefore(date),
    'last 8 hours': date =>
        moment()
            .subtract(8, 'hours')
            .isBefore(date),
    '1 day ago': date =>
        moment()
            .subtract(1, 'days')
            .isBefore(date),
    '3 days ago': date =>
        moment()
            .subtract(3, 'days')
            .isBefore(date),
    '7 days ago': date =>
        moment()
            .subtract(7, 'days')
            .isBefore(date)
};
