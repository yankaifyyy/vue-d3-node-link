<template>
    <svg ref="main-view" class="node-link-diagram" :width="width" :height="height" @mousemove.capture="drag($event)" @mouseup="dragEnd($event)">
        <rect ref="zoom-listener" :width="width" :height="height" opacity="0"></rect>
        <g ref="content-listener" class="content" :transform="zoomTransform">
            <g class="links">
                <line v-for="link,index in links" :key="index" :x1="link.source.x" :y1="link.source.y" :x2="link.target.x" :y2="link.target.y" @click="linkClick({$event, link})" :stroke-width="link.size || linkWidth" :class="linkClass(link.id)" :style="linkStyle(link)"></line>
            </g>
            <g class="nodes">
                <circle v-for="node,key in nodes" :key="key" :data-nodeid="key" :r="node.size || nodeSize" @click="nodeClick({$event, node})" @mousedown.prevent="dragStart({$event, key})" :cx="node.x" :cy="node.y" :title="node.name" :class="nodeClass(node)" :style="nodeStyle(node)"></circle>
            </g>
            <g v-if="showLabel" class="labels" :transform="labelTransform">
                <text v-for="node,key in nodes" :key="key" :x="node.x" :y="node.y" @click="nodeClick({$event, node})" :font-size="fontSize" :stroke-width="fontSize / 8" :class='(node._labelClass) ? node._labelClass : ""'>{{node.name}}</text>
            </g>
        </g>
    </svg>
</template>

<script lang="ts">
import { NodeLinkDiagramType } from './script';
export default NodeLinkDiagramType;
</script>
