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
import FilterModal from './modals/FilterModal';
import RWModal from './modals/RWModal';
import TransformerModal from './modals/TransformerModal';
import GroupModal from './modals/GroupModal';
import RemoveDuplicatesModal from './modals/RemoveDuplicatesModal';
import JoinModal from './modals/JoinModal';
import CdcModal from './modals/cdcModal';
import UnionModal from './modals/UnionModal';
import {
    READ,
    WRITE,
    UNION,
    GROUP,
    REMOVE_DUPLICATES,
    JOIN,
    CDC,
    TRANSFORM,
    FILTER
} from '../mxgraph/constants';

const StageModal = ({ stageName, ...restProps }) => {
    const stageFilter = () => {
        switch (stageName) {
            case READ:
            case WRITE:
                return <RWModal stageName={stageName} {...restProps} />;
            case FILTER:
                return <FilterModal stageName={stageName} {...restProps} />;
            case GROUP:
                return <GroupModal stageName={stageName} {...restProps} />;
            case REMOVE_DUPLICATES:
                return <RemoveDuplicatesModal {...restProps} />;
            case JOIN:
                return <JoinModal {...restProps} />;
            case CDC:
                return <CdcModal {...restProps} />;
            case UNION:
                return <UnionModal {...restProps} />;
            case TRANSFORM:
                return <TransformerModal stageName={stageName} {...restProps} />;
            default:
                return null;
        }
    };

    return stageFilter();
};

export default StageModal;
