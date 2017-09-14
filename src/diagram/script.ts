import Vue from 'vue';
import { Component, Prop, Provide, Inject } from 'vue-property-decorator';

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

    private drag($event: MouseEvent) {
        const x = ($event.clientX);
        const y = ($event.clientY);
        if (this.isDragging !== false) {
            const index = this.isDragging as number;
            if (this.nodes[index]) {
                const { x: px, y: py } = this.nodes[index];

                this.nodes[index].x = x;
                this.nodes[index].y = y;

                this.$emit('Dragging', {
                    offset: [x - px, y - py],
                    position: [x, y],
                    node: this.nodes[index]
                });
            }
        }
    }

    private dragStart(param: { $event: MouseEvent, key: any }) {
        this.isDragging = param.key;

        if (param.key) {
            this.$emit('DragStart', {
                position: [param.$event.clientX, param.$event.clientY],
                node: this.nodes[param.key]
            });
        }
    }

    private dragEnd($event: MouseEvent) {
        let prevNode = null;
        if (this.isDragging !== false) {
            prevNode = this.nodes[this.isDragging as number];
        }

        this.dragStart({
            $event,
            key: false
        });

        if (prevNode) {
            this.$emit('DragEnd', {
                position: [$event.clientX, $event.clientY],
                node: prevNode
            });
        }
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
