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

import { get, isNil } from 'lodash';
import { jobStages, jobStagesByType } from './jobStages';

/*
    Validations:
        maxCount
        minConnections
        maxConnections
        minIncomingConnections
        maxIncomingConnections
        minOutgoingConnections
        maxOutgoingConnections
 */
// const options = { interpolate: /{{(.+?)}}/g };
// const validationMessages = {
//     minCount: template(
//         'You need to have at least {{count}} stage(s) "{{type}}"',
//         options
//     ),
//     maxCount: template(
//         'You might have only {{count}} stage(s) "{{type}}" max',
//         options
//     ),
//     minConnections: template(
//         'Stage "{{type}}" needs to have at least {{count}} connection(s)',
//         options
//     ),
//     maxConnections: template(
//         'Stage "{{type}}" might not have more than {{count}} connection(s)',
//         options
//     ),
//     minIncomingConnections: template(
//         'Stage "{{type}}" needs to have at least {{count}} incoming connection(s)',
//         options
//     ),
//     maxIncomingConnections: template(
//         'Stage "{{type}}" might not have more than {{count}} incoming connection(s)',
//         options
//     ),
//     minOutgoingConnections: template(
//         'Stage "{{type}}" needs to have at least {{count}} outgoing connection(s)',
//         options
//     ),
//     maxOutgoingConnections: template(
//         'Stage "{{type}}" might not have more than {{count}} outgoing connection(s)',
//         options
//     )
// };

const validate = graph => {
    const model = graph.getModel();
    model.beginUpdate();
    try {
        const invalidCells = [];
        const cells = Object.keys(model.cells)
            .map(key => model.getCell(key))
            .filter(cell => !isNil(cell.getValue()) && cell.vertex && cell.parent);
        // console.log('validating cells:', cells);

        const cellsByType = cells.reduce((acc, cell) => {
            const type = cell.getValue().getAttribute('type');
            return {
                ...acc,
                [type]: !isNil(acc[type]) ? [...acc[type], cell] : [cell]
            };
        }, {});
        // console.log('validating cells by type:', cellsByType);

        const isLess = (value, limit) => value <= limit;
        const isGreater = (value, limit) => value >= limit;
        const isValidCount = (stage, validationParam, validationValue, isValid) => {
            if (
                !isNil(stage.validation[validationParam]) &&
                !isValid(validationValue, stage.validation[validationParam])
            ) {
                // console.error(
                //     'Validation error:',
                //     validationMessages[validationParam]({
                //         count: stage.validation[validationParam],
                //         type: stage.type
                //     })
                // );
                return false;
            }
            return true;
        };

        jobStages.forEach(stage => {
            const count = get(cellsByType, [stage.type, 'length']);

            let isValid = true;

            isValid = isValid && isValidCount(stage, 'minCount', count, isGreater);
            isValid = isValid && isValidCount(stage, 'maxCount', count, isLess);

            if (!isValid) {
                // invalidCells.push.apply(invalidCells, cellsByType[stage.type]);
            }
        });

        cells.forEach(cell => {
            const type = cell.getValue().getAttribute('type');
            const stage = jobStagesByType[type];
            const incomingEdges = model.getIncomingEdges(cell).length;
            const outgoingEdges = model.getOutgoingEdges(cell).length;
            const edges = incomingEdges + outgoingEdges;

            let isValid = true;

            isValid =
                isValid && isValidCount(stage, 'minConnections', edges, isGreater);
            isValid =
                isValid && isValidCount(stage, 'maxConnections', edges, isLess);

            isValid =
                isValid &&
                isValidCount(
                    stage,
                    'minIncomingConnections',
                    incomingEdges,
                    isGreater
                );
            isValid =
                isValid &&
                isValidCount(stage, 'maxIncomingConnections', incomingEdges, isLess);

            isValid =
                isValid &&
                isValidCount(
                    stage,
                    'minOutgoingConnections',
                    outgoingEdges,
                    isGreater
                );
            isValid =
                isValid &&
                isValidCount(stage, 'maxOutgoingConnections', outgoingEdges, isLess);

            if (!isValid) {
                invalidCells.push(cell);
            }
        });

        graph.setCellStyle(
            'strokeColor=#000000;strokeWidth=1;fillColor=white',
            cells
        );
        // style when invalid cells
        graph.setCellStyle(
            'strokeColor=#ff0000;strokeWidth=3;fillColor=#fff5f5',
            invalidCells
        );
    } finally {
        model.endUpdate();
    }
};

export default validate;
