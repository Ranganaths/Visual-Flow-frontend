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
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import WarningOutlinedIcon from '@material-ui/icons/WarningOutlined';
import DoneIcon from '@material-ui/icons/Done';
import { useTheme } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import JobsPipelines from './JobsPipelines';

const PipelinesStats = ({ data, loading }) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const items = [
        {
            title: t('main:status.Draft'),
            Icon: InfoOutlinedIcon,
            color: theme.palette.grey[600],
            data: data?.pipelinesStat?.Draft
        },
        {
            title: t('main:status.Running'),
            Icon: PlayArrowIcon,
            color: theme.palette.primary.main,
            data: data?.pipelinesStat?.Running
        },
        {
            title: t('main:status.Succeeded'),
            Icon: DoneIcon,
            color: theme.palette.success.main,
            data: data?.pipelinesStat?.Succeeded
        },
        {
            title: t('main:status.Error'),
            Icon: WarningOutlinedIcon,
            color: theme.palette.error.main,
            data: data?.pipelinesStat?.Error
        }
    ];
    return (
        <JobsPipelines
            items={items}
            loading={loading}
            title={t('main:overview.Pipelines')}
        />
    );
};

PipelinesStats.propTypes = {
    data: PropTypes.object,
    loading: PropTypes.bool
};

export default PipelinesStats;
