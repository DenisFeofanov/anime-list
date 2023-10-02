import { RouteReuseStrategy } from "@angular/router/";
import { ActivatedRouteSnapshot, DetachedRouteHandle } from "@angular/router";
export class CacheRouteReuseStrategy implements RouteReuseStrategy {
  storedRouteHandles = new Map<string, DetachedRouteHandle>();
  allowRetriveCache = {
    cards: true,
  };

  // called everytime we navigate between routes
  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    if (
      this.getPath(future) === "cards" &&
      this.getPath(curr) === "cards/:id"
    ) {
      this.allowRetriveCache["cards"] = true;
    } else {
      this.allowRetriveCache["cards"] = false;
    }
    return future.routeConfig === curr.routeConfig;
  }
  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return this.storedRouteHandles.get(
      this.getPath(route)
    ) as DetachedRouteHandle;
  }

  // called after route has been opened
  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const path = this.getPath(route) as keyof typeof this.allowRetriveCache;

    if (this.allowRetriveCache[path]) {
      return this.storedRouteHandles.has(this.getPath(route));
    }

    //   creating component from scratch
    return false;
  }
  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    const path = this.getPath(route);
    if (this.allowRetriveCache.hasOwnProperty(path)) {
      return true;
    }
    return false;
  }
  store(
    route: ActivatedRouteSnapshot,
    detachedTree: DetachedRouteHandle
  ): void {
    this.storedRouteHandles.set(this.getPath(route), detachedTree);
  }

  private getPath(route: ActivatedRouteSnapshot): string {
    if (
      route.routeConfig !== null &&
      route.routeConfig.path !== null &&
      route.routeConfig.path !== undefined
    ) {
      return route.routeConfig.path;
    }
    return "";
  }
}
