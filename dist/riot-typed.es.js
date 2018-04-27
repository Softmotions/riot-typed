import { util, tag } from 'riot';

var DEF_KEY = '_TAG_DEF';
function register(name, props, target) {
    var def = util.misc.extend({}, target[DEF_KEY], props);
    target[DEF_KEY] = def;
    tag(name, def.tmpl || '', def.css, def.attrs, function (opts) {
        var this$1 = this;

        var obj = Object.create(target.prototype);
        var init = obj.init;
        if (typeof init !== 'undefined') {
            // recovery original init property when mixin
            obj.init = function () { return this$1.init = typeof init === 'function' ? init.bind(this$1) : init; };
        }
        this.mixin(obj); //copy properties so the next line would not complain
        target.call(this, opts); //call constructor
    });
}
/**
 * decorator on class that extends Tag.
 * that defines a riot tag with template and the class.
 * see riot.tag()
 */
function tag$1(name, tmpl) {
    return function (target) {
        // target is the constructor function
        if (typeof tmpl === 'object') {
            register(name, tmpl, target);
        }
        else {
            register(name, { tmpl: tmpl }, target);
        }
    };
}

export { tag$1 as tag };
