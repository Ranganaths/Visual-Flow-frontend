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

import React, { useState } from 'react';
import {
    AppBar,
    Divider,
    Drawer,
    IconButton,
    Toolbar,
    Typography,
    useTheme
} from '@material-ui/core';
import { ChevronLeft, ChevronRight, Menu, Person } from '@material-ui/icons';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import { useTranslation } from 'react-i18next';
import useStyles from './Header.Styles';
import MenuBar from '../menu/MenuBar';
import getMenu from '../menu/menu';
import history from '../../utils/history';
import SelectProject from '../select-project/SelectProject';

const Header = () => {
    const { t } = useTranslation();
    const classes = useStyles();
    const theme = useTheme();

    const menu = getMenu(useSelector(state => state.projects.currentProject));
    const [menuOpen, setMenuOpen] = useState(true);
    const opened = menuOpen && menu;

    const handleDrawerOpen = () => {
        setMenuOpen(true);
    };

    const handleDrawerClose = () => {
        setMenuOpen(false);
    };

    const handleItemClick = item => {
        if (item.link) {
            history.push(item.link);
        } else if (!menuOpen) {
            setMenuOpen(true);
        }
    };

    const chevron = str =>
        theme.direction === str ? <ChevronRight /> : <ChevronLeft />;

    const goToProjectsPage = () => history.push('/');

    return (
        <>
            <AppBar
                position="fixed"
                className={classNames(classes.appBar, {
                    [classes.appBarShift]: opened
                })}
            >
                <Toolbar>
                    {menu && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={classNames(classes.menuButton, {
                                [classes.hide]: opened
                            })}
                        >
                            <Menu />
                        </IconButton>
                    )}
                    <Typography variant="h5" noWrap className={classes.title}>
                        <span onClick={goToProjectsPage} className={classes.link}>
                            {t('main:title')}
                        </span>
                    </Typography>
                    {menu && <SelectProject />}
                    <Avatar className={classes.user}>
                        <IconButton>
                            <Person color="primary" />
                        </IconButton>
                    </Avatar>
                </Toolbar>
            </AppBar>

            {menu && (
                <Drawer
                    variant="permanent"
                    className={classNames(classes.drawer, {
                        [classes.drawerOpen]: opened,
                        [classes.drawerClose]: !opened
                    })}
                    classes={{
                        paper: classNames({
                            [classes.drawerOpen]: opened,
                            [classes.drawerClose]: !opened
                        })
                    }}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={handleDrawerClose}>
                            {chevron('rtl')}
                        </IconButton>
                    </div>
                    <Divider />
                    <MenuBar
                        items={menu}
                        open={menuOpen}
                        onItemClick={handleItemClick}
                    />
                </Drawer>
            )}
        </>
    );
};

export default Header;
