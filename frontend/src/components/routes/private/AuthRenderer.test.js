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

import { shallow } from 'enzyme';
import React from 'react';
import AuthRenderer from './AuthRenderer';
import { PageSkeleton } from '../../skeleton';

describe('AuthRenderer', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<AuthRenderer>Test</AuthRenderer>);
    });

    it('should render skeleton when not authenticated', () => {
        expect(wrapper.find(PageSkeleton).exists()).toBe(true);
    });

    it('should render children when authenticated', () => {
        wrapper.setProps({ authenticated: true });
        expect(wrapper.text()).toEqual('Test');
        expect(wrapper.find(PageSkeleton).exists()).toBeFalsy();
    });

    it('should not render when props not changed', () => {
        const instance = wrapper.instance();
        spyOn(instance, 'render');
        wrapper.setProps({ authenticated: true });
        wrapper.setProps({ authenticated: true });
        expect(instance.render).toHaveBeenCalledTimes(1);
    });
});
