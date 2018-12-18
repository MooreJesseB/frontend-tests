import Component from '@ember/component';
import { A } from '@ember/array';

export default Component.extend({
    screens: A([
        {
            title: 'Gradients',
            description: 'Start, end, angle',
            colorLeft: '#833CF6',
            colorRight: '#78E6ED',
            index: '1',
            icon: ''
        },
        {
            title: 'Presets',
            description: 'Manage presets',
            colorLeft: '#78E6ED',
            colorRight: '#F5F56A',
            index: '2',
            icon: ''
        },
        {
            title: 'Colors',
            description: 'Pick any color',
            colorLeft: '#F5F56A',
            colorRight: '#E04487',
            index: '2',
            icon: ''
        },
    ]),
});
