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
import { Grid, Button, Select, FormControl, InputLabel } from '@material-ui/core';
import PropTypes from 'prop-types';
import RefreshIcon from '@material-ui/icons/Refresh';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import SearchInput from '../search-input/SearchInput';
import useStyles from './LogsHeader.Styles';

const LogsHeader = ({
    dropList,
    onRefreshClick,
    onSearch,
    searchValue,
    onSelect,
    lvl
}) => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <Grid container justify="space-between" className={classes.root}>
            <Grid item>
                <SearchInput
                    value={searchValue}
                    placeholder={t('main:search')}
                    onChange={onSearch}
                />
            </Grid>
            <Grid item>
                <Grid
                    container
                    justify="space-between"
                    spacing={3}
                    className={classes.right}
                >
                    <>
                        <Grid item>
                            <FormControl variant="outlined">
                                <InputLabel
                                    htmlFor="outlined-age-native-simple"
                                    className={classes.InputLabel}
                                >
                                    {t('jobs:Level')}
                                </InputLabel>
                                <Select
                                    native
                                    onChange={onSelect}
                                    label="Lavel"
                                    className={classNames(classes.selectButton)}
                                    value={lvl}
                                >
                                    <option aria-label="None" value="" />
                                    {dropList?.map(value => (
                                        <option key={value} value={value}>
                                            {t(`jobs:level.${value}`) || value}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item>
                            <Button
                                className={classNames(
                                    classes.button,
                                    classes.refreshBtn
                                )}
                                variant="contained"
                                color="primary"
                                startIcon={<RefreshIcon />}
                                onClick={onRefreshClick}
                            />
                        </Grid>
                    </>
                </Grid>
            </Grid>
        </Grid>
    );
};

LogsHeader.propTypes = {
    dropList: PropTypes.array,
    onRefreshClick: PropTypes.func,
    onSearch: PropTypes.func,
    onSelect: PropTypes.func,
    searchValue: PropTypes.string,
    lvl: PropTypes.string
};

export default LogsHeader;
