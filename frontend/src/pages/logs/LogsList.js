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

import React from 'react';
import { List, Grid, ListItem, ListItemText } from '@material-ui/core';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useStyles from './LogsList.Styles';
import LogsHeader from '../../components/logs-header/LogsHeader';

const lvls = ['INFO', 'WARN', 'ERROR', 'DEBUG'];

const LogsList = ({ data, modal }) => {
    const classes = useStyles();
    const errorMes = useSelector(state => state.pages.logs.error);

    const [search, setSearch] = React.useState('');
    const [lvl, setLevel] = React.useState('');

    const highlight = (string, value) => {
        if (!value) {
            return string;
        }
        return string
            .split(new RegExp(`(${value})`, 'gi'))
            .map(item =>
                item === value ? (
                    <span className={classes.highlight}>{item}</span>
                ) : (
                    <span>{item}</span>
                )
            );
    };

    const logs = list =>
        list.map(
            ({ message, timestamp, level }) => `${timestamp} - ${level} - ${message}`
        );

    return (
        <Grid
            container
            justify="space-between"
            classes={{ root: modal ? classes.rootModal : classes.root }}
        >
            <Grid item xs={12}>
                <LogsHeader
                    onSearch={event => setSearch(event.target.value)}
                    searchValue={search}
                    dropList={lvls}
                    onSelect={event => setLevel(event.target.value)}
                    lvl={lvl}
                />
            </Grid>
            <Grid item xs={12}>
                <List
                    className={classNames(classes.list, {
                        [classes.listModal]: modal
                    })}
                >
                    {errorMes ? (
                        <ul className={classes.textItem}>
                            <ListItem className={classes.text}>
                                <ListItemText className={classes.text}>
                                    {errorMes?.message}
                                </ListItemText>
                            </ListItem>
                        </ul>
                    ) : (
                        logs(data)
                            .filter(item =>
                                lvl ? item?.includes(` - ${lvl} - `) : item
                            )
                            .filter(item => (search ? item?.includes(search) : item))
                            .map((str, i) => (
                                <ul
                                    key={`${i + str.slice(17, 24)}_${str.slice(-5)}`}
                                    className={classes.textItem}
                                >
                                    <ListItem className={classes.text}>
                                        <ListItemText className={classes.text}>
                                            {highlight(str, search)}
                                        </ListItemText>
                                    </ListItem>
                                </ul>
                            ))
                    )}
                </List>
            </Grid>
        </Grid>
    );
};

LogsList.propTypes = {
    modal: PropTypes.bool,
    data: PropTypes.array
};

export default LogsList;
