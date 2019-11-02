//Plugin Imports
import Router from "@/plugins/router";

export function route(): string {
  return Router.currentRoute.name ? Router.currentRoute.name : "";
}

export function safePush(route_name: string): void {
  if (route() != route_name) Router.push({ name: route_name });
}
