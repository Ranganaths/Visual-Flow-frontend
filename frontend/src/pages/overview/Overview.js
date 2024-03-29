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
import { Box, Grid, Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Skeleton from '@material-ui/lab/Skeleton';
import JobsStats from './JobsStats';
import PipelinesStats from './PipelinesStats';
import Utilization from './Utilization';
import { fetchResourceUtilization } from '../../redux/actions/overviewActions';

const Overview = ({
    projectId,
    overview: { data, loading },
    getResourceUtilization
}) => {
    const { name, description } = data;
    React.useEffect(() => {
        projectId && getResourceUtilization(projectId);
    }, [projectId]);

    return (
        <Box p={4}>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Typography variant="h4" paragraph>
                        {loading ? <Skeleton /> : name}
                    </Typography>
                    <Box mb={-2}>
                        <Typography variant="body1" color="textSecondary">
                            {loading ? <Skeleton /> : description}
                        </Typography>
                    </Box>
                </Grid>
                <JobsStats loading={loading} data={data} />
                <PipelinesStats loading={loading} data={data} />
                <Utilization loading={loading} data={data} />
            </Grid>
        </Box>
    );
};

const mapStateToProps = state => ({
    overview: state.pages.overview
});

const mapDispatchToProps = {
    getResourceUtilization: fetchResourceUtilization
};

Overview.propTypes = {
    projectId: PropTypes.string,
    overview: PropTypes.object,
    getResourceUtilization: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Overview);
