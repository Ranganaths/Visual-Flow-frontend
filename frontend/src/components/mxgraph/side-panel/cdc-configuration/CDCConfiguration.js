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
    Divider,
    TextField,
    MenuItem,
    Box,
    Typography,
    IconButton,
    Chip
} from '@material-ui/core';

import { SwapVert } from '@material-ui/icons';
import { Autocomplete } from '@material-ui/lab';
import useStyles from './CDCConfiguration.Styles';

const modes = [
    {
        value: 'all',
        label: 'Return All'
    },
    {
        value: 'delta',
        label: 'Return Delta'
    }
];

const CDCConfiguration = ({
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
            <Divider className={classes.divider} />
            {state.name && (
                <>
                    <Typography variant="body2" color="textSecondary">
                        {t('jobDesigner:CDCConfiguration.LinkOrdering')}
                    </Typography>
                    <Box className={classes.fieldWrapper}>
                        <div>
                            <div className={classes.fieldRow}>
                                <Typography
                                    variant="caption"
                                    color="textSecondary"
                                    className={classes.caption}
                                >
                                    {`${t('jobDesigner:CDCConfiguration.After')}: `}
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
                                    {`${t('jobDesigner:CDCConfiguration.Before')}: `}
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
                        id="keyColumns"
                        multiple
                        freeSolo
                        autoSelect
                        options={[]}
                        value={state.keyColumns?.split(',') || []}
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip
                                    variant="outlined"
                                    label={option}
                                    {...getTagProps({ index })}
                                />
                            ))
                        }
                        onChange={(event, value) =>
                            onChange('keyColumns', value?.join(','))
                        }
                        renderInput={params => (
                            <TextField
                                {...params}
                                fullWidth
                                variant="outlined"
                                label={t('jobDesigner:CDCConfiguration.Key')}
                            />
                        )}
                    />
                    <TextField
                        disabled={!ableToEdit}
                        label={t('jobDesigner:CDCConfiguration.Mode')}
                        placeholder={t('jobDesigner:CDCConfiguration.Mode')}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        select
                        name="mode"
                        value={state.mode || ''}
                        onChange={event =>
                            onChange(event.target.name, event.target.value)
                        }
                    >
                        {modes.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </>
            )}
        </>
    );
};

CDCConfiguration.propTypes = {
    ableToEdit: PropTypes.bool,
    t: PropTypes.func,
    state: PropTypes.object,
    onChange: PropTypes.func,
    edgeLabels: PropTypes.array,
    handleSwap: PropTypes.func
};

export default withTranslation()(CDCConfiguration);
