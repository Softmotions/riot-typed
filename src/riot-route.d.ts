//Type definitions for riot-route
//Project: riot-route
//Definitions by: joylei <https://github.com/Joylei>

/**
 * riot route base interface
 */
declare interface RiotRouterBase {
	/**
	 * stop the router
	 */
	stop(): any;

	/**
	 * >= v2.3
	 * Execute the given callback when the URL changes and it match the filter
	 * @see https://github.com/riot/route/tree/master/doc#routefilter-callback
	 */
	(filter: string, callback: Function): void;
}

/**
 * riot route rule set
 */
declare interface RiotRouter extends RiotRouterBase {
	/**
	 * Execute the given callback when the URL change
	 * @see https://github.com/riot/route/tree/master/doc#routecallback
	 */
	(callback: Function): void;

	/**
	 * Changes the browser URL and notifies all the listeners assigned with route(callback)
	 * @see https://github.com/riot/route/tree/master/doc#routeto-title-shouldreplace
	 */
	(url: string, title?: string, shouldReplace?: boolean): void;

	/**
	 * start routing
	 * @see https://github.com/riot/route/tree/master/doc#routestart
	 */
	start(): void;

	/**
	 * start routing
	 * @see https://github.com/riot/route/tree/master/doc#routestartautoexec
	 */
	start(autoExec: boolean): void;

	/**
	 * >= v2.3
	 * Returns a new routing context
	 * @see https://github.com/riot/route/tree/master/doc#routecreate
	 */
	create(): RiotRouterBase;

	/**
	 * Study the current browser path "in place" and emit routing without waiting for it to change.
	 * @see https://github.com/riot/route/tree/master/doc#routeexec
	 *
	 * @memberof RiotRouter
	 */
	exec(): void;

	/**
	 * >= v2.3
	 * This is an utility function to extract the query from the url
	 * @see https://github.com/riot/route/tree/master/doc#routequery
	 */
	query(): any;

	/**
	 * Change the base path
	 * @see https://github.com/riot/route/tree/master/doc#routebasebase
	 */
	base(baseUrl: string): void;

	/**
	 * Changes the default parser to a custom one.
	 *
	 * >= v2.3.If you specify secondParser, you can change the second parser, too. The second parser is used with url filter
	 * @see https://github.com/riot/route/tree/master/doc#routeparserparser-secondparser
	 */
	parser(first: (path: string) => any[], second?: (path: string, filter: string) => any): any;
}


declare module "riot-route" {
	const route: RiotRouter
	export = route;
}