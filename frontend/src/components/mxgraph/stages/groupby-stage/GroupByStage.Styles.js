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
import { CELL_HEIGHT, CELL_WIDTH } from '../../side-panel/SidePanel';

export default makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        width: CELL_WIDTH,
        height: CELL_HEIGHT,
        overflow: 'hidden',
        padding: theme.spacing(1)
    },
    name: {
        display: 'flex',
        whiteSpace: 'normal',
        flexShrink: 0
    },
    icon: {
        marginRight: theme.spacing(0.5)
    },
    groupBy: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap'
    },
    key: {
        color: theme.palette.getContrastText(theme.palette.success.dark),
        backgroundColor: theme.palette.success.dark,
        borderRadius: theme.spacing(0.5),
        padding: theme.spacing(0, 0.5),
        margin: theme.spacing(0.25),
        minWidth: theme.spacing(3)
    }
}));
