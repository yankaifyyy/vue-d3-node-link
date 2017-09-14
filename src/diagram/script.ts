import Vue from 'vue';
import { Component, Prop, Provide, Inject } from 'vue-property-decorator';

import { select, event as D3Event } from 'd3-selection';
import { zoom } from 'd3-zoom';
import { drag as D3Drag } from 'd3-drag';

@Component({
})
export class NodeLinkDiagramType extends Vue {
    @Prop({ default: [] }) private links: any[];
    @Prop({ default: [] }) private nodes: any[];

    @Prop({ default: 300 }) private width: number;
    @Prop({ default: 300 }) private height: number;

    @Prop({ default: 1 }) private nodeSize: number;
    @Prop({ default: '#000' }) private defaultNodeColor: string;

    @Prop({ default: 1 }) private linkWidth: number;
    @Prop({ default: '#000' }) private defaultLinkColor: string;

    @Prop({ default: false }) private showLabel: false;
    @Prop({ default: 8 }) private fontSize: number;
    @Prop({ default: 5 }) private labelOffsetX: number;
    @Prop({ default: 5 }) private labelOffsetY: number;

    private isDragging: number | boolean = false;

    private zoomTransform = '';

    private mounted() {
        select(this.$refs['main-view'] as HTMLElement)
            .call(zoom()
                .on('zoom', () => {
                    this.zoomTransform = D3Event.transform;
                }));
        let drag = D3Drag();
        select(this.$refs['content-listener'] as HTMLElement)
            .call(drag
                .on('start', () => {
                    const index = D3Event.sourceEvent.target.dataset['nodeid'];
                    this.isDragging = index;
                })
                .on('drag', (d) => {
                    if (this.isDragging !== false) {
                        const index = this.isDragging as number;
                        if (this.nodes[index]) {
                            const { x: px, y: py } = this.nodes[index];
                            const { dx, dy } = D3Event;

                            this.nodes[index].x = D3Event.x;
                            this.nodes[index].y = D3Event.y;

                            this.$emit('Dragging', {
                                offset: [dx, dy],
                                position: [px + dx, py + dy],
                                node: this.nodes[index]
                            });
                        }
                        console.log(D3Event);
                    }
                })
                .on('end', () => {
                    this.isDragging = false;
                }));
    }

    private drag($event: MouseEvent) {
        // const x = ($event.offsetX);
        // const y = ($event.offsetY);
        // if (this.isDragging !== false) {
        //     const index = this.isDragging as number;
        //     if (this.nodes[index]) {
        //         const { x: px, y: py } = this.nodes[index];

        //         this.nodes[index].x = x;
        //         this.nodes[index].y = y;

        //         this.$emit('Dragging', {
        //             offset: [x - px, y - py],
        //             position: [x, y],
        //             node: this.nodes[index]
        //         });
        //     }
        // }
    }

    private dragStart(param: { $event: MouseEvent, key: any }) {
        // this.isDragging = param.key;

        // if (param.key) {
        //     this.$emit('DragStart', {
        //         position: [param.$event.offsetX, param.$event.offsetY],
        //         node: this.nodes[param.key]
        //     });
        // }
    }

    private dragEnd($event: MouseEvent) {
        // let prevNode = null;
        // if (this.isDragging !== false) {
        //     prevNode = this.nodes[this.isDragging as number];
        // }

        // this.dragStart({
        //     $event,
        //     key: false
        // });

        // if (prevNode) {
        //     this.$emit('DragEnd', {
        //         position: [$event.offsetX, $event.offsetY],
        //         node: prevNode
        //     });
        // }
    }

    private nodeClick(param: { $event: MouseEvent, node: any }) {
        this.$emit('ClickNode', param.node);
    }

    private linkClick(param: { $event: MouseEvent, link: any }) {
        this.$emit('ClickLink', param.link);
    }

    private nodeClass(node: any) {
        return node._cssClass || ''
            + ' node';
    }

    private linkClass(linkId: any) {
        return 'link';
    }

    private nodeStyle(node: any) {
        const color = node.color || this.defaultNodeColor;
        const stroke = node.stroke || '';
        const strokeWidth = node.strokeWidth + 'px' || 0;
        return `fill: ${color}; stroke: ${stroke}; stroke-width: ${strokeWidth}`;
    }

    private linkStyle(link: any) {
        const color = link.color || this.defaultLinkColor;
        return `stroke: ${color}`;
    }

    private get labelTransform() {
        return `translate(${this.labelOffsetX}, ${this.labelOffsetY})`;
    }
}
