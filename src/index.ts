import * as riot from "riot";

const DEF_KEY = '_TAG_DEF';

function register(name: string, props: {tmpl?: string, css?: string, attrs?: string}, target: Function) {
  let def = (<any>riot).util.misc.extend({}, target[DEF_KEY], props);
  target[DEF_KEY] = def;

  riot.tag(name, def.tmpl || '', def.css, def.attrs, function (opts) {
    const obj = Object.create(target.prototype);
    const { init } = obj;
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
export function tag(name: string, tmpl?: string | { tmpl?: string, css?: string, attrs?: string }): (target: Function) => void {
  return function (target: Function) {
    // target is the constructor function
    if (typeof tmpl === 'object') {
      register(name, tmpl, target)
    } else {
      register(name, {tmpl}, target)
    }
  }
}

/**
   riot tag
  */
export class Tag<TOpts> implements RiotTag {
  isMounted: boolean;

  /**
  * options passed in for Tag
  */
  opts: TOpts;

  /**
  * the root element that the Tag is mounted on
  */
  root: RiotHtmlElement;

  /**
  * parent Tag
  */
  parent: RiotTag;

  /**
  * child Tags
  */
  tags: { [tagNameOrNameOnTheTag: string]: (RiotTag | Array<RiotTag>) };


  /**
   * refs to HTML Element or riot tags
   */
  refs: {
    [refNameOnTheElementOrTag: string]: (HTMLElement | RiotTag | Array<HTMLElement | RiotTag>)
  };

  /**
  * apply update on elements
  */
  update: (data?: any) => RiotTag[];


  shouldUpdate: (data: any, nextOpts: any) => boolean;

  /**
  * unmount Tag
  */
  unmount: {
    (): void;
    (keepTheParent: boolean): void;
  };

  mixin: (...mixins: Array<string | Object>) => void;

  /**
  * hook Tag life events:
  *   before-mount, mount, before-unmount, unmount, update, updated
  */
  on: (events: string, handler: Function) => this;

  /**
  * hook Tag life events but only will be triggered only once
  */
  one: (events: string, handler: Function) => this;

  /**
  * unhook Tag life events
  */
  off: (events: string, handler?: Function) => this;

  /**
  * trigger some events
  */
  trigger: (events: string, ...data: any[]) => this;
}
