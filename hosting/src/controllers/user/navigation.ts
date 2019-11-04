//Plugin Imports
import Router from "@/plugins/router";

//route: outputs the route name as string.
export function route(): string {
  return Router.currentRoute.name ? Router.currentRoute.name : "";
}

//safePush: pushes a route the browser is not currently into.
export function safePush(route_name: string): void {
  if (route() != route_name) Router.push({ name: route_name });
}
