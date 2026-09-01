import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { applySeoToDocument } from "./applyToDocument";
import { getRouteSeo } from "./routes";

/**
 * Keeps <head> in sync with the current route during client-side navigation.
 *
 * The same metadata is already baked into each prerendered HTML file by
 * scripts/seo-build.mjs, so this only matters once React Router takes over.
 */
const RouteSeoSync = () => {
  const { pathname } = useLocation();
  const seo = useMemo(() => getRouteSeo(pathname), [pathname]);

  useEffect(() => {
    applySeoToDocument(seo);
  }, [seo]);

  return null;
};

export default RouteSeoSync;
