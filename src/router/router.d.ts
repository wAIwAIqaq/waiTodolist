/** 路由对象的拓展类型 */
import 'vue-router'
declare module 'vue-router' {
	interface RouteMeta {
		title?: string
		icon?: string
		noCache?: boolean
		affix?: boolean
	}
	interface _RouteRecordBase {
		hidden?: boolean
		noShowingChildren?: boolean
		alwaysShow?: boolean
		fullPath?: string
	}
}
