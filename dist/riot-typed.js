(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('riot')) :
    typeof define === 'function' && define.amd ? define(['exports', 'riot'], factory) :
    (factory((global['riot-typed'] = {}),global.riot));
}(this, (function (exports,riot) { 'use strict';

    var DEF_KEY = '_TAG_DEF';
    function register(name, props, target) {
        var def = riot.util.misc.extend({}, target[DEF_KEY], props);
        target[DEF_KEY] = def;
        riot.tag(name, def.tmpl || '', def.css, def.attrs, function (opts) {
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
    function tag(name, tmpl) {
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

    exports.tag = tag;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
