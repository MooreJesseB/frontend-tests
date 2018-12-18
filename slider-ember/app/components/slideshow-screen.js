import Component from '@ember/component';
import { get, computed } from '@ember/object';

export default Component.extend({
    indexStyle: computed('screen', function() {
        return 'background: linear-gradient(to top right,' + 
        get(this, 'screen.colorLeft') + ', ' +
        get(this, 'screen.colorRight') + ');'
    }),
    gradientStyle: computed('screen', function() {
        return 'background: linear-gradient(to right,' +
        get(this, 'screen.colorLeft') + ', ' +
        get(this, 'screen.colorRight') + ');'
    })
});
