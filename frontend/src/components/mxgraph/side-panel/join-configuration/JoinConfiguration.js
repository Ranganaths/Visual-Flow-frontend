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
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import {
    Box,
    Chip,
    Divider,
    IconButton,
    MenuItem,
    TextField,
    Typography
} from '@material-ui/core';

import { SwapVert } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import useStyles from './JoinConfiguration.Styles';

const joinTypes = [
    {
        value: 'inner',
        label: 'inner'
    },
    {
        value: 'full',
        label: 'full'
    },
    {
        value: 'left',
        label: 'left'
    },
    {
        value: 'right',
        label: 'right'
    },
    {
        value: 'cross',
        label: 'cross'
    },
    {
        value: 'leftanti',
        label: 'leftanti'
    },
    {
        value: 'leftsemi',
        label: 'leftsemi'
    }
];

const JoinConfiguration = ({
    state,
    ableToEdit,
    onChange,
    t,
    edgeLabels,
    handleSwap
}) => {
    const classes = useStyles();

    return (
        <>
            <TextField
                disabled={!ableToEdit}
                label={t('jobDesigner:joinConfiguration.JoinType')}
                placeholder={t('jobDesigner:joinConfiguration.JoinType')}
                variant="outlined"
                margin="normal"
                fullWidth
                select
                name="joinType"
                value={state.joinType || ''}
                onChange={event => onChange(event.target.name, event.target.value)}
            >
                {joinTypes.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <Divider className={classes.divider} />
            {state.joinType && (
                <>
                    <Typography variant="body2" color="textSecondary">
                        {t('jobDesigner:joinConfiguration.LinkOrdering')}
                    </Typography>
                    <Box className={classes.fieldWrapper}>
                        <div>
                            <div className={classes.fieldRow}>
                                <Typography
                                    variant="caption"
                                    color="textSecondary"
                                    className={classes.caption}
                                >
                                    {`${t('jobDesigner:joinConfiguration.Left')}: `}
                                </Typography>
                                <Typography variant="body2" color="textPrimary">
                                    {edgeLabels[0]}
                                </Typography>
                            </div>
                            <div className={classes.fieldRow}>
                                <Typography
                                    variant="caption"
                                    color="textSecondary"
                                    className={classes.caption}
                                >
                                    {`${t('jobDesigner:joinConfiguration.Right')}: `}
                                </Typography>
                                <Typography variant="body2" color="textPrimary">
                                    {edgeLabels[1]}
                                </Typography>
                            </div>
                        </div>
                        <IconButton disabled={!ableToEdit} onClick={handleSwap}>
                            <SwapVert />
                        </IconButton>
                    </Box>
                    <Divider className={classes.divider} />
                    <Autocomplete
                        disabled={!ableToEdit}
                        id="columns"
                        multiple
                        freeSolo
                        autoSelect
                        options={[]}
                        value={state.columns?.split(',') || []}
                        onChange={(event, value) =>
                            onChange('columns', value?.join(','))
                        }
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip
                                    variant="outlined"
                                    label={option}
                                    {...getTagProps({ index })}
                                />
                            ))
                        }
                        renderInput={params => (
                            <TextField
                                {...params}
                                fullWidth
                                variant="outlined"
                                label={t('jobDesigner:joinConfiguration.Key')}
                            />
                        )}
                    />
                </>
            )}
        </>
    );
};

JoinConfiguration.propTypes = {
    ableToEdit: PropTypes.bool,
    t: PropTypes.func,
    state: PropTypes.object,
    onChange: PropTypes.func,
    edgeLabels: PropTypes.array,
    handleSwap: PropTypes.func
};

export default withTranslation()(JoinConfiguration);
