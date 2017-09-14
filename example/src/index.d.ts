declare function rquire(moduleName: string): any;

declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}