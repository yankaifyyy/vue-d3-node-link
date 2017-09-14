import Vue from 'vue';

import NodeLinkDiagram from './diagram/index.vue';
import { NodeLinkDiagramType } from './diagram/script';

export {
    NodeLinkDiagram,
    NodeLinkDiagramType
};

export function install(vue: typeof Vue, options = { prefix: 'wish' }) {
    const { prefix } = options;
    vue.component(`${prefix}-node-link-diagram`, NodeLinkDiagram);
}