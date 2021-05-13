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

export default makeStyles(theme => ({
    root: {
        position: 'relative'
    },
    title: {
        position: 'absolute',
        left: -100,
        top: -60,
        display: 'flex',
        'white-space': 'normal',
        width: 204,
        'text-align': 'left',
        'align-items': 'center'
    },
    name: {
        paddingLeft: theme.spacing(1),
        overflow: 'hidden'
    },
    jobName: {
        position: 'absolute',
        left: -97,
        top: -22,
        backgroundColor: 'rgba(77, 208, 225, 0.85)',
        color: 'white',
        'border-radius': 4,
        maxWidth: 190,
        overflow: 'hidden',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    },
    logIcon: {
        cursor: 'pointer',
        fill: theme.palette.text.secondary,
        marginLeft: 'auto'
    }
}));
