import * as riot from 'riot';

const DEF_KEY = '_TAG_DEF';

function register(name: string, props: { tmpl?: string, css?: string, attrs?: string }, target: Function) {
    let def = riot.util.misc.extend({}, target[DEF_KEY], props);
    target[DEF_KEY] = def;
    riot.tag(name, def.tmpl || '', def.css, def.attrs, function (opts) {
        const obj = Object.create(target.prototype);
        const {init} = obj;
        if (typeof init !== 'undefined') {
            // recovery original init property when mixin
            obj.init = () => this.init = typeof init === 'function' ? init.bind(this) : init;
        }
        this.mixin(obj);//copy properties so the next line would not complain
        target.call(this, opts);//call constructor
    });
}

/**
 * decorator on class that extends Tag.
 * that defines a riot tag with template and the class.
 * see riot.tag()
 */
export function tag(name: string,
                    tmpl?: string | { tmpl?: string, css?: string, attrs?: string }): (target: Function) => void {
    return function (target: Function) {
        // target is the constructor function
        if (typeof tmpl === 'object') {
            register(name, tmpl, target)
        } else {
            register(name, {tmpl}, target)
        }
    }
}

