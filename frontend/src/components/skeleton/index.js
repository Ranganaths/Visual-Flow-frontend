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
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

export const PageSkeleton = () => {
    const variants = ['h1', 'h3'];

    return (
        <Box p={3}>
            {variants.map(variant => (
                <Typography component="div" key={variant} variant={variant}>
                    <Skeleton />
                </Typography>
            ))}
            <TextSkeleton />
        </Box>
    );
};

export const TextSkeleton = ({ size = 3 }) => (
    <>
        {Array.from(new Array(size)).map((value, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Skeleton key={index} />
        ))}
    </>
);

TextSkeleton.propTypes = {
    size: PropTypes.number
};
