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
    Checkbox,
    Grid,
    TablePagination,
    Toolbar,
    withStyles
} from '@material-ui/core';
import React from 'react';
import PropTypes from 'prop-types';
import styles from './TableToolbar.Styles';
import Action from './Action';
import TableSort from './TableSort';

const TableToolbar = ({
    selected = [],
    rowCount = 0,
    onSelectAllClick,
    actions,
    page,
    onChangePage,
    rowsPerPage,
    onChangeRowsPerPage,
    orderColumns,
    order,
    orderBy,
    onRequestSort,
    children,
    classes
}) => {
    const numSelected = selected?.length || 0;

    return (
        <Toolbar className={classes.root} disableGutters>
            <Grid container>
                <Grid item className={classes.main}>
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={numSelected > 0}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all rows' }}
                    />
                    {numSelected > 0 ? (
                        actions?.map(({ onClick, title, ...rest }) => (
                            <Action
                                key={title}
                                title={title}
                                {...rest}
                                onClick={() => onClick(selected)}
                            />
                        ))
                    ) : (
                        <TableSort
                            orderColumns={orderColumns}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={onRequestSort}
                            classes={{ root: classes.sort }}
                        />
                    )}
                </Grid>
                {children}
                <Grid item xs="auto">
                    <TablePagination
                        rowsPerPageOptions={[5]}
                        component="div"
                        count={rowCount}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={onChangePage}
                        onChangeRowsPerPage={onChangeRowsPerPage}
                    />
                </Grid>
            </Grid>
        </Toolbar>
    );
};

TableToolbar.propTypes = {
    selected: PropTypes.array,
    actions: PropTypes.arrayOf(PropTypes.object),
    rowCount: PropTypes.number,
    onSelectAllClick: PropTypes.func,
    page: PropTypes.number,
    rowsPerPage: PropTypes.number,
    onChangePage: PropTypes.func,
    onChangeRowsPerPage: PropTypes.func,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    orderColumns: PropTypes.array,
    children: PropTypes.object,
    classes: PropTypes.object
};

export default withStyles(styles)(TableToolbar);
