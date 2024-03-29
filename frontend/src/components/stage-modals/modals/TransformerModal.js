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
import { useTranslation } from 'react-i18next';
import InfoModal from '../InfoModal';

const TransformerModal = props => {
    const { t } = useTranslation();
    const content = [
        {
            title: t('transformer:name.name'),
            paragraph: t('transformer:name.value')
        },
        {
            title: t('transformer:output.name'),
            paragraph1: t('transformer:output.value1'),
            paragraph2: t('transformer:output.value2'),
            paragraph3: t('transformer:output.value3'),
            paragraph4: t('transformer:output.value4'),
            link: t('transformer:output.value5')
        }
    ];
    return <InfoModal content={content} {...props} />;
};

export default TransformerModal;
