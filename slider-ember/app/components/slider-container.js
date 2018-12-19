import Component from '@ember/component';
import { htmlSafe } from '@ember/string';
import { A } from '@ember/array';

export default Component.extend({
    currentIndex: 1,
    currentOffset: 0,
    transitionStyle: '',
    screens: A([
        {
            title: 'Gradients',
            description: 'Start, end, angle',
            colorLeft: '#833CF6',
            colorRight: '#78E6ED',
            index: 1,
            icon: '/assets/images/water_drop.png',
            isCurrent: true
        },
        {
            title: 'Presets',
            description: 'Manage presets',
            colorLeft: '#78E6ED',
            colorRight: '#F5F56A',
            index: 2,
            icon: '/assets/images/paint-palette.svg'
        },
        {
            title: 'Colors',
            description: 'Pick any color',
            colorLeft: '#F5F56A',
            colorRight: '#E04487',
            index: 3,
            icon: '/assets/images/eyedropper.png'
        },
    ]),
    actions: {
        transition(right) {
            const screensLength = this.get('screens.length');
            const currentIndex = this.get('currentIndex');
            const currentOffset = this.get('currentOffset')
            if (right && currentIndex < screensLength) {
                this.set('transitionStyle', htmlSafe(`transform: translateX(${currentOffset -300}px)`));
                this.set('currentOffset', currentOffset - 300);
                this.set('currentIndex', currentIndex + 1);
            } else if (!right && currentIndex > 1) {
                this.set('transitionStyle', htmlSafe(`transform: translateX(${currentOffset + 300}px)`));
                this.set('currentOffset', currentOffset + 300);
                this.set('currentIndex', currentIndex - 1);
            }

            
        }
    }
});
