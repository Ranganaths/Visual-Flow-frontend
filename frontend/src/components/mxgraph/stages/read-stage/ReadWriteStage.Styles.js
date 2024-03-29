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

import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    root: {
        position: 'relative'
    },
    name: {
        position: 'absolute',
        left: -100,
        top: -64,
        display: 'flex',
        'white-space': 'normal',
        width: 215,
        'text-align': 'left'
    },
    schema: {
        position: 'absolute',
        left: -100,
        top: -23,
        width: 200,
        'white-space': 'normal',
        'line-break': 'anywhere',
        'line-height': 'normal',
        'text-align': 'left'
    },
    table: {
        position: 'absolute',
        left: -100,
        top: 5,
        width: 200,
        'white-space': 'normal',
        'line-break': 'anywhere',
        'line-height': 'normal',
        'text-align': 'left'
    },
    bucket: {
        position: 'absolute',
        left: -100,
        top: -16,
        width: 200,
        'white-space': 'normal',
        'line-break': 'anywhere',
        'line-height': 'normal',
        'text-align': 'left'
    },
    pathInBucket: {
        position: 'absolute',
        left: -100,
        top: 5,
        width: 200,
        'white-space': 'normal',
        'line-break': 'anywhere',
        'line-height': 'normal',
        'text-align': 'left'
    },
    storage: {
        position: 'absolute',
        left: 19,
        top: 44,
        backgroundColor: '#64B5F6',
        color: 'white',
        'border-radius': 4,
        width: 84
    }
}));
