import { useEffect, useState } from "react";

const SCROLL_KEY = "portfolio_home_scroll";
const ANCHOR_KEY = "portfolio_home_anchor";

export const projectSlug = (id: string) => id.replace(/^project-/, "");
export const projectPath = (id: string) => `/projects/${projectSlug(id)}`;

export function matchProjectRoute(pathname: string): string | null {
  const m = pathname.match(/^\/projects\/([^/]+)\/?$/);
  return m ? decodeURIComponent(m[1]) : null;
}

export function navigate(path: string) {
  if (window.location.pathname === path) return;
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function usePathname() {
  const [pathname, setPathname] = useState(window.location.pathname);
  useEffect(() => {
    const onPop = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  return pathname;
}

/** Open a case study from the home page (remembers scroll position). */
export function openProject(id: string) {
  sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
  navigate(projectPath(id));
}

/** Return to the home page where the user left off. */
export function backToProjects() {
  if (sessionStorage.getItem(SCROLL_KEY) === null) {
    sessionStorage.setItem(ANCHOR_KEY, "projects");
  }
  navigate("/");
}

/** Go to the home page and jump to a section id. */
export function goHome(anchor: string) {
  sessionStorage.setItem(ANCHOR_KEY, anchor);
  navigate("/");
}

export function restoreHomeScroll() {
  const anchor = sessionStorage.getItem(ANCHOR_KEY);
  const y = sessionStorage.getItem(SCROLL_KEY);
  sessionStorage.removeItem(ANCHOR_KEY);
  sessionStorage.removeItem(SCROLL_KEY);

  if (anchor) {
    document.getElementById(anchor)?.scrollIntoView({ behavior: "instant" as ScrollBehavior });
  } else if (y !== null) {
    window.scrollTo({ top: Number(y), behavior: "instant" as ScrollBehavior });
  }
}