import Component from '@ember/component';
import { get, computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Component.extend({
    gradientStyle: computed('screen', function() {
        return htmlSafe('background: linear-gradient(to right,' +
        get(this, 'screen.colorLeft') + ', ' +
        get(this, 'screen.colorRight') + ');');
    })
});
