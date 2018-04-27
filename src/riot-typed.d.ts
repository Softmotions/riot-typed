declare module 'riot-typed' {
    /**
     * decorator on class that extends Tag.
     * that defines a riot tag with template and the class.
     * see riot.tag()
     */
    export function tag(name: string, tmpl?: string | {
        tmpl?: string;
        css?: string;
        attrs?: string;
    }): (target: Function) => void;
    
}
