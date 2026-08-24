// Small helper so internal links work correctly under the GitHub Pages
// project-site base path (/amazon-fba-training-lab/) in both dev and build.
export function url(path: string): string {
  const base = import.meta.env.BASE_URL; // e.g. "/amazon-fba-training-lab/"
  const trimmedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const trimmedPath = path.startsWith("/") ? path : `/${path}`;
  return `${trimmedBase}${trimmedPath}`;
}
