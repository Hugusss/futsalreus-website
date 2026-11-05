// The shop demo is linked only on a developer machine and on branch previews
// (<branch>-fsmontsant.reus.workers.dev), never on the production domain or its own workers.dev address.
// This only decides whether the link is shown; the page itself is reachable by its URL everywhere.
export function isDemoHost(hostname: string = window.location.hostname): boolean {
  return (
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.endsWith("-fsmontsant.reus.workers.dev")
  );
}
