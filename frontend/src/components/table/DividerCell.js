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

import { Divider, TableCell, withStyles } from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './DividerCell.Styles';

const DividerCell = ({ classes }) => (
    <TableCell className={classes.cell}>
        <Divider orientation="vertical" className={classes.divider} light />
    </TableCell>
);

DividerCell.propTypes = {
    classes: PropTypes.object
};

export default withStyles(styles, { name: 'CellDivider' })(DividerCell);
