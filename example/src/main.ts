import Vue from 'vue';
import Sample from './sample.vue';

import * as diagram from '../../src';

Vue.use(diagram);

window.addEventListener('load', e => {
    new Vue({
        el: emptyElement(),
        render: h => h(Sample)
    });
});

function emptyElement() {
    const div = document.createElement('div');
    document.body.appendChild(div);
    return div;
}