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
import { Grid, Typography, Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import RefreshIcon from '@material-ui/icons/Refresh';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import useStyles from './PageHeader.Styles';
import SearchInput from '../search-input/SearchInput';

const PageHeader = ({
    header,
    ableToEdit,
    buttonCaption,
    onRefreshClick,
    onAddClick,
    searchValue,
    onSearch
}) => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <Grid container justify="space-between" className={classes.root}>
            <Grid item>
                <Typography variant="h4">{t(`main:${header}`)}</Typography>
            </Grid>
            <Grid item>
                <Grid
                    container
                    justify="flex-end"
                    spacing={3}
                    className={classes.actions}
                >
                    <Grid item>
                        <SearchInput
                            value={searchValue}
                            onChange={onSearch}
                            placeholder={t('main:search')}
                        />
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
                    {ableToEdit && (
                        <Grid item>
                            <Button
                                className={classNames(
                                    classes.button,
                                    classes.addBtn
                                )}
                                variant="contained"
                                color="primary"
                                onClick={onAddClick}
                            >
                                {buttonCaption}
                            </Button>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Grid>
    );
};

PageHeader.propTypes = {
    header: PropTypes.string,
    ableToEdit: PropTypes.bool,
    buttonCaption: PropTypes.string,
    onRefreshClick: PropTypes.func,
    onAddClick: PropTypes.func,
    searchValue: PropTypes.string,
    onSearch: PropTypes.func
};

export default PageHeader;
