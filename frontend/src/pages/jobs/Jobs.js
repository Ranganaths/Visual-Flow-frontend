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
import { Box, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import { fetchJobs, setJobSearchField } from '../../redux/actions/jobsActions';
import JobsTable from './JobsTable';
import PageHeader from '../../components/page-header/PageHeader';
import history from '../../utils/history';
import { PageSkeleton } from '../../components/skeleton';
import { fetchPipelines } from '../../redux/actions/pipelinesActions';

const Jobs = ({
    projectId,
    jobs,
    pipelines,
    getJobs,
    getPipelines,
    setSearchField,
    searchField,
    loadingExport
}) => {
    const { t } = useTranslation();
    const [list, setList] = React.useState([]);

    React.useEffect(() => {
        if (projectId) {
            getJobs(projectId);
            getPipelines(projectId);
        }
        setList(jobs.data.jobs);
    }, [projectId]);

    React.useEffect(() => {
        setList(jobs.data.jobs?.filter(item => item?.name?.includes(searchField)));
    }, [jobs.data.jobs, searchField]);

    return jobs.loading || loadingExport ? (
        <PageSkeleton />
    ) : (
        <Box p={4}>
            <Grid container>
                <Grid item xs={12}>
                    <PageHeader
                        header="Jobs"
                        ableToEdit={jobs.data.editable}
                        buttonCaption={t('main:button.addJob')}
                        searchValue={searchField}
                        onSearch={event => setSearchField(event.target.value)}
                        onRefreshClick={() => getJobs(projectId)}
                        onAddClick={() => history.push(`/jobs/${projectId}`)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <JobsTable
                        data={list}
                        pipelines={pipelines.data.pipelines}
                        projectId={projectId}
                        ableToEdit={jobs.data.editable}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

Jobs.propTypes = {
    projectId: PropTypes.string,
    searchField: PropTypes.string,
    jobs: PropTypes.object,
    pipelines: PropTypes.object,
    getJobs: PropTypes.func,
    getPipelines: PropTypes.func,
    setSearchField: PropTypes.func,
    loadingExport: PropTypes.bool
};

const mapStateToProps = state => ({
    jobs: state.pages.jobs,
    pipelines: state.pages.pipelines,
    searchField: state.pages.jobs.searchField,
    loadingExport: state.importExport.loading
});

const mapDispatchToProps = {
    getJobs: fetchJobs,
    getPipelines: fetchPipelines,
    setSearchField: setJobSearchField
};

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);
