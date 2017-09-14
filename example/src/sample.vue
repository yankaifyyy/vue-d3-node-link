<template>
    <wish-node-link-diagram width="800" height="800" :nodes="nodes" :links="links" :showLabel="showLabel" :nodeSize="nodeSize" :fontSize="fontSize" :linkWidth="linkWidth" :labelOffsetX="labelOffsetX" :labelOffsetY="labelOffsetY" :defaultNodeColor="defaultNodeColor" :defaultLinkColor="defaultLinkColor">
    </wish-node-link-diagram>
</template>

<script lang="ts">

const nodes = [
    { index: 0, name: 'A', x: 0, y: 10, size: 15, color: 'green' },
    { index: 1, name: 'B', x: 15, y: 50, size: 5, color: 'yellow' },
    { index: 2, name: 'C', x: 10, y: 75 },
    { index: 3, x: 5, y: 100 }
];

const links: any[] = [
    { source: 0, target: 1 },
    { source: 1, target: 2 },
    { source: 2, target: 3 },
    { source: 0, target: 2 },
    { source: 1, target: 3 }
];

links.forEach(e => {
    e.source = nodes[e.source];
    e.target = nodes[e.target];
});

export default <any>{
    data() {
        return {
            nodes,
            links,
            nodeSize: 10,
            defaultNodeColor: 'steelblue',
            linkWidth: 2,
            defaultLinkColor: 'grey',
            showLabel: true,
            labelOffsetX: 10,
            labelOffsetY: 10,
            fontSize: 12
        };
    }
}
</script>

