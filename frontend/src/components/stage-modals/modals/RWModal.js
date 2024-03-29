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

const RWModel = props => {
    const { t } = useTranslation();
    const content = [
        {
            title: t('ReadWrite:name.name'),
            paragraph: t('ReadWrite:name.value')
        },
        {
            title: t('ReadWrite:storage.name'),
            paragraph1: t('ReadWrite:storage.value1')
        }
    ];
    const db2 = [
        {
            title: t('ReadWrite:DB2.JDBCURL.name'),
            paragraph: t('ReadWrite:DB2.JDBCURL.value'),
            paragraph1: t('ReadWrite:DB2.JDBCURL.value1'),
            paragraph2: t('ReadWrite:DB2.JDBCURL.value2')
        },
        {
            title: t('ReadWrite:DB2.user.name'),
            paragraph: t('ReadWrite:DB2.user.value')
        },
        {
            title: t('ReadWrite:DB2.password.name'),
            paragraph: t('ReadWrite:DB2.password.value')
        },
        {
            title: t('ReadWrite:DB2.schema.name'),
            paragraph: t('ReadWrite:DB2.schema.value')
        }
    ];
    const cos = [
        {
            title: t('ReadWrite:COS.endpoint.name'),
            paragraph: t('ReadWrite:COS.endpoint.value')
        },
        {
            title: t('ReadWrite:COS.accessKey.name'),
            paragraph: t('ReadWrite:COS.accessKey.value')
        },
        {
            title: t('ReadWrite:COS.secretKey.name'),
            paragraph: t('ReadWrite:COS.secretKey.value')
        },
        {
            title: t('ReadWrite:COS.bucket.name'),
            paragraph: t('ReadWrite:COS.bucket.value')
        }
    ];
    const elastic = [
        {
            title: t('ReadWrite:ELASTIC.nodes.name'),
            paragraph: t('ReadWrite:ELASTIC.nodes.value')
        },
        {
            title: t('ReadWrite:ELASTIC.port.name'),
            paragraph: t('ReadWrite:ELASTIC.port.value')
        },
        {
            title: t('ReadWrite:ELASTIC.user.name'),
            paragraph: t('ReadWrite:ELASTIC.user.value')
        },
        {
            title: t('ReadWrite:ELASTIC.password.name'),
            paragraph: t('ReadWrite:ELASTIC.password.value')
        },
        {
            title: t('ReadWrite:ELASTIC.index.name'),
            paragraph: t('ReadWrite:ELASTIC.index.value')
        },
        {
            title: t('ReadWrite:ELASTIC.writeMode.name'),
            paragraph: t('ReadWrite:ELASTIC.writeMode.value'),
            paragraph1: t('ReadWrite:ELASTIC.writeMode.value1'),
            paragraph2: t('ReadWrite:ELASTIC.writeMode.value2'),
            paragraph3: t('ReadWrite:ELASTIC.writeMode.value3'),
            paragraph4: t('ReadWrite:ELASTIC.writeMode.value4'),
            paragraph5: t('ReadWrite:ELASTIC.writeMode.value5')
        },
        {
            title: t('ReadWrite:ELASTIC.ssl.name'),
            paragraph: t('ReadWrite:ELASTIC.ssl.value'),
            paragraph1: t('ReadWrite:ELASTIC.ssl.value1'),
            paragraph2: t('ReadWrite:ELASTIC.ssl.value2')
        },
        {
            title: t('ReadWrite:ELASTIC.certData.name'),
            paragraph: t('ReadWrite:ELASTIC.certData.value'),
            paragraph1: t('ReadWrite:ELASTIC.certData.value1')
        }
    ];
    const storages = [
        t('ReadWrite:db2'),
        t('ReadWrite:cos'),
        t('ReadWrite:elastic')
    ];
    return (
        <InfoModal
            content={content}
            storages={storages}
            db2={db2}
            cos={cos}
            elastic={elastic}
            {...props}
        />
    );
};

export default RWModel;
