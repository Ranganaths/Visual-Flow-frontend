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
import PropTypes from 'prop-types';
import mxgraph from 'mxgraph';
import classNames from 'classnames';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/styles';
import { Box, Drawer, Toolbar, Typography, IconButton } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CloseIcon from '@material-ui/icons/Close';

import {
    setCurrentCell,
    setGraphDirty,
    setSidePanel,
    setSidePanelDirty
} from '../../../redux/actions/mxGraphActions';
import toggleConfirmationWindow from '../../../redux/actions/modalsActions';
import stageLabels from '../stageLabels';
import styles from './SidePanel.Styles';
import StageModal from '../../stage-modals/StageModal';
import addPropsToChildren from '../../../utils/addPropsToChildren';
import { EDGE, PIPELINE } from '../constants';
import { selectFillColor } from '../resetFillColor/selectFillColor';

const { mxRectangle, mxConstants } = mxgraph();

export const CELL_WIDTH = 224;

export const CELL_HEIGHT = 144;

class SidePanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            configuration: {},
            showModal: false
        };
    }

    componentDidMount() {
        const { setCurrentCell: setCell } = this.props;
        setCell('');
    }

    componentDidUpdate(prevProps) {
        const { graph, currentCell, type } = this.props;
        if (prevProps.currentCell !== currentCell) {
            const selectedCell = graph.getSelectionCell();
            const results = {};
            Object.keys(selectedCell.value.attributes).forEach(attrKey => {
                const attribute = selectedCell.value.attributes[attrKey];
                results[attribute.nodeName] = attribute.nodeValue;
            });
            this.setState({ configuration: { ...results } });
        }
        if (graph.getSelectionCell() && type === PIPELINE) {
            this.changeFillColor(graph.getSelectionCell());
        }
    }

    componentWillUnmount() {
        const {
            setSidePanel: toggleSidePanel,
            setCurrentCell: setCell
        } = this.props;
        toggleSidePanel(false);
        setCell('');
    }

    saveCell = configuration => {
        const { graph, currentCell, setDirty, setPanelDirty } = this.props;

        const cell = graph.model.getCell(currentCell);
        // update the cell
        const obj = stageLabels(configuration);
        graph.model.setValue(cell, obj);

        if (configuration.operation === EDGE) {
            graph.setCellStyles(
                mxConstants.STYLE_STROKECOLOR,
                configuration.successPath === 'False' ? '#F44336' : '#4CAF50',
                [cell]
            );
        } else {
            const newCellSize = new mxRectangle(
                cell.geometry.x,
                cell.geometry.y,
                CELL_WIDTH,
                CELL_HEIGHT
            );
            graph.resizeCell(cell, newCellSize);
        }
        this.setState({ configuration });
        setPanelDirty(false);
        setDirty(true);
        this.props.setSidePanel(false);
    };

    selectStrokeColor = style =>
        style
            .match(/strokeColor=#[0-9a-fA-F]{6}/)[0]
            .split('=')
            .pop();

    changeFillColor = cell => {
        const { graph, data } = this.props;
        const cellStyle = graph.getModel().getStyle(cell);
        // eslint-disable-next-line no-restricted-syntax
        for (const [key, val] of Object.entries(graph.model.cells)) {
            if (val.vertex && data.definition.graph) {
                const currentStage = data?.definition.graph.find(
                    item => item.id === key
                );
                if (currentStage) {
                    graph.setCellStyles(
                        'fillColor',
                        selectFillColor(currentStage.style),
                        [val]
                    );
                    this.props.sidePanelIsOpen &&
                    data?.definition.graph.find(item => item.id === cell.id) !==
                        undefined
                        ? graph.setCellStyles(
                              'fillColor',
                              this.selectStrokeColor(cellStyle),
                              [cell]
                          )
                        : graph.setCellStyles(
                              'fillColor',
                              selectFillColor(currentStage.style),
                              [val]
                          );
                }
            }
        }
    };

    renderChildren = () => {
        const { setPanelDirty, graph, children } = this.props;
        const { configuration } = this.state;

        return addPropsToChildren(children, {
            graph,
            configuration,
            setPanelDirty,
            saveCell: this.saveCell
        });
    };

    render() {
        const {
            t,
            sidePanelIsOpen,
            classes,
            sidePanelIsDirty,
            confirmationWindow,
            setSidePanel: toggleSidePanel
        } = this.props;
        const { configuration, showModal } = this.state;

        return (
            <div className={classes.root}>
                <Drawer
                    className={classNames({
                        [classes.drawerOpen]: sidePanelIsOpen,
                        [classes.drawerClose]: !sidePanelIsOpen
                    })}
                    variant="permanent"
                    anchor="right"
                    classes={{
                        paper: classNames({
                            [classes.drawerOpen]: sidePanelIsOpen,
                            [classes.drawerClose]: !sidePanelIsOpen
                        })
                    }}
                >
                    <StageModal
                        display={showModal}
                        stageName={configuration.operation}
                        title={t(`jobDesigner:palette.${configuration.operation}`)}
                        onClose={() => this.setState({ showModal: false })}
                    />
                    <Toolbar />
                    <div
                        className={classNames(classes.content, {
                            [classes.hidden]: !sidePanelIsOpen
                        })}
                    >
                        <Box className={classes.form}>
                            <Box className={classes.separated}>
                                <Typography variant="h6">
                                    {t('jobDesigner:Configuration')}
                                </Typography>
                                <ErrorOutlineIcon
                                    className={classes.infoIcon}
                                    onClick={() =>
                                        this.setState({ showModal: true })
                                    }
                                />
                                <IconButton
                                    className={classes.leftAuto}
                                    onClick={() => {
                                        if (sidePanelIsDirty) {
                                            confirmationWindow({
                                                body: `${t(
                                                    'main:unsavedChanges.leaveWithUnsavedChanges'
                                                )}`,
                                                callback: () =>
                                                    toggleSidePanel(false)
                                            });
                                        } else {
                                            toggleSidePanel(false);
                                        }
                                    }}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                            {this.renderChildren()}
                        </Box>
                    </div>
                </Drawer>
            </div>
        );
    }
}

SidePanel.propTypes = {
    sidePanelIsOpen: PropTypes.bool,
    setSidePanel: PropTypes.func,
    t: PropTypes.func,
    classes: PropTypes.object,
    currentCell: PropTypes.string,
    data: PropTypes.object,
    graph: PropTypes.object,
    setCurrentCell: PropTypes.func,
    setDirty: PropTypes.func,
    setPanelDirty: PropTypes.func,
    children: PropTypes.array,
    type: PropTypes.string,
    sidePanelIsDirty: PropTypes.bool,
    confirmationWindow: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    data: state.mxGraph.data,
    sidePanelIsOpen: state.mxGraph.sidePanelIsOpen,
    currentCell: state.mxGraph.currentCell,
    sidePanelIsDirty: state.mxGraph.sidePanelIsDirty
});

const mapDispatchToProps = {
    setDirty: setGraphDirty,
    setPanelDirty: setSidePanelDirty,
    confirmationWindow: toggleConfirmationWindow,
    setSidePanel,
    setCurrentCell
};

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(withTranslation()(SidePanel));
