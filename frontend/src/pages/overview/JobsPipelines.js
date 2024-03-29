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
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import IconCard from '../../components/icon-card/IconCard';
import JobsPipelinesItem from './JobsPipelinesItem';
import useStyles from './JobsPipelines.Styles';
import OverviewContainer from './OverviewContainer';
import { TextSkeleton } from '../../components/skeleton';

const JobsPipelines = ({ items, loading, title }) => {
    const classes = useStyles();
    return (
        <OverviewContainer title={title}>
            {items.map(item => (
                <Grid
                    key={item.title}
                    item
                    xs={12}
                    md={6}
                    lg
                    className={classes.item}
                >
                    <IconCard {...item}>
                        {loading ? (
                            <TextSkeleton />
                        ) : (
                            <JobsPipelinesItem value={item.data} />
                        )}
                    </IconCard>
                </Grid>
            ))}
        </OverviewContainer>
    );
};

JobsPipelines.propTypes = {
    items: PropTypes.array,
    loading: PropTypes.bool,
    title: PropTypes.string
};

export default JobsPipelines;
