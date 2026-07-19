# Standalone home-screen web app on iOS 18+ Safari and Android Chrome (2026)

Researched 2026-07-19 against primary sources only (Apple/WebKit, MDN, web.dev / Chrome for Developers).

## TL;DR

- **One web app manifest fixes both platforms.** Link a `manifest.webmanifest` with `"display": "standalone"`, `name`, `start_url`, and `icons` (192px + 512px PNG). iOS 18 honors `display: standalone` from the manifest alone — no `apple-mobile-web-app-capable` meta tag needed. Chrome requires exactly those manifest members and HTTPS; **no service worker is required for install on either platform.**
- **Still add for iOS:** a 180x180 `<link rel="apple-touch-icon">` with an **opaque** background (transparent pixels get composited on black). Optional: `apple-mobile-web-app-status-bar-style` (only way to control the status bar in standalone) and `apple-mobile-web-app-title` (overrides the home-screen label).
- **The existing home-screen icon on the iPhone will NOT pick up the new manifest.** iOS captures manifest settings at add-time; the user must delete the icon and re-add via Share → Add to Home Screen after the manifest is deployed. (Android Chrome, by contrast, auto-updates installed PWAs from the manifest.)
- Bonus: on iOS/iPadOS 26 (current since fall 2025), *every* site added to the Home Screen opens as a web app by default, manifest or not — but iOS 18 still requires the manifest `display` member.

## 1. Web app manifest: what iOS Safari uses; is `display: standalone` enough?

**Yes — a linked manifest with `display: standalone` (or `fullscreen`) is sufficient on iOS, no apple-* meta tags required.** WebKit's Safari 17 announcement states it directly: "if the website has a manifest file with a `display` mode of `standalone` or `fullscreen`, it will open as a Home Screen web app." The same post lists the manifest members Safari uses to "customize the presentation of your web app, including the **display mode, name, theme color, and start URL**."
Source: [News from WWDC23: WebKit Features in Safari 17 beta](https://webkit.org/blog/14205/news-from-wwdc23-webkit-features-in-safari-17-beta/)

The Web Push post confirms the behavior from the user side: a site whose manifest sets `display` to `standalone` or `fullscreen` "opens like any other app on iOS or iPadOS instead of opening in a browser."
Source: [Web Push for Web Apps on iOS and iPadOS](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/)

Member-by-member for iOS:

| Member | iOS Safari |
|---|---|
| `display` | Used. `standalone`/`fullscreen` → opens as Home Screen web app. This is the switch the site is currently missing. |
| `name` | Used as the default label offered in the Add to Home Screen sheet (overridable by `apple-mobile-web-app-title`). |
| `icons` | Used **only as fallback** when no `apple-touch-icon` is in the HTML head (Safari 15.4+, see §2). |
| `start_url` | Used (listed by WebKit among the members Safari reads). |
| `scope` | Not documented by WebKit as used on iOS; navigation containment on iOS is driven by the app's origin/start URL. Include it anyway for Chrome. |
| `theme_color` | Used ("theme color" listed in the Safari 17 post). |
| `background_color` | No documented iOS use. Chrome uses it for the install splash screen. |

Since fall 2025, iOS/iPadOS 26 made this moot for new adds: "By default, every website added to the Home Screen opens as a web app," with a user toggle to opt out — and "If the site you built has a Web Application Manifest, then all of the benefits it provides will be part of the user's experience." iOS 18 devices still need the manifest `display` member.
Source: [News from WWDC25: WebKit in Safari 26 beta](https://webkit.org/blog/16993/news-from-wwdc25-web-technology-coming-this-fall-in-safari-26-beta/)

## 2. apple-touch-icon and the apple-* meta tags on iOS 18

- **`apple-touch-icon`: no longer strictly required, still recommended.** Since Safari/iOS 15.4, "Safari and iOS use manifest-declared icons when there is no `apple-touch-icon` defined in the HTML head, and when the manifest file... either omits the `purpose` key or includes `"purpose": "any"`. Defining icons by using `apple-touch-icon` takes precedence over manifest-declared icons."
  Source: [New WebKit Features in Safari 15.4](https://webkit.org/blog/12445/new-webkit-features-in-safari-15-4/)
- **Icon size: 180x180** is Apple's documented size for Retina iPhone (`sizes="180x180"`); 152/167 are iPad sizes; "The icon that is the most appropriate size for the device is used." One 180x180 PNG is enough in practice — iOS scales down.
  Source: [Configuring Web Applications (Apple, archive)](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)
- **Transparency: use an opaque background.** Apple's icon guidance requires opaque, full-bleed square icons with no alpha ("avoid transparency"). iOS fills transparent regions of home-screen icons with **black** — long-standing observed behavior; the black-fill itself is not stated in current Apple docs, but the "must be opaque" rule is.
  Source: [Apple HIG — App icons](https://developer.apple.com/design/human-interface-guidelines/app-icons)
- **`apple-mobile-web-app-capable`: superseded by manifest `display`** (§1). Harmless to keep for very old iOS; not needed on iOS 18.
- **`apple-mobile-web-app-status-bar-style`: still the only status-bar control** in standalone mode (`default` / `black` / `black-translucent`). The manifest has no equivalent member.
- **`apple-mobile-web-app-title`: optional**; overrides the label prefilled in the Add to Home Screen sheet ("To set a different title, add a meta tag... `apple-mobile-web-app-title`").
  Source for both: [Configuring Web Applications (Apple, archive)](https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)

## 3. Service worker: required?

- **iOS: not required for the standalone experience.** Nothing in WebKit's web-app documentation conditions Home Screen standalone mode on a service worker; the manifest `display` member alone triggers it (§1). A service worker IS required if you later want Web Push ("Push API, Notifications API, and Service Workers all working together").
  Source: [Web Push for Web Apps on iOS and iPadOS](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/)
- **Android Chrome: not required since Chrome 108 (mobile) / 112 (desktop).** Chrome "removed the requirement to have a service worker that implements the `fetch()` method" and instead "launched a default custom page" (a generic Chrome offline page) for installed apps without one.
  Source: [Update to installability criteria (Chrome for Developers)](https://developer.chrome.com/blog/update-install-criteria)
- **Current Chrome install criteria (2026):** HTTPS; manifest with `name` or `short_name`, `icons` incl. 192px and 512px, `start_url`, `display` one of `fullscreen`/`standalone`/`minimal-ui`/`window-controls-overlay`; `prefer_related_applications` absent or `false`; plus an engagement heuristic (a click + ~30s) for the automatic prompt.
  Sources: [Installation criteria (web.dev)](https://web.dev/articles/install-criteria), [Making PWAs installable (MDN)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable)
- **What you lose without one:** offline/poor-network behavior (Chrome shows its generic offline page; iOS shows an error), Web Push on both platforms, background sync, and caching control. Install itself is unaffected.

## 4. iOS limitations worth knowing

- **EU / DMA:** Apple announced removal of Home Screen web apps in the EU for iOS 17.4, then reversed before release: "we will continue to offer the existing Home Screen web apps capability in the EU," built exclusively on WebKit. Still the status quo — EU users get home-screen web apps, WebKit-engine only.
  Source: [Update on apps distributed in the European Union (Apple Developer Support)](https://developer.apple.com/support/dma-and-apps-in-the-eu/)
- **7-day storage eviction (ITP): home-screen web apps are effectively exempt.** Safari's 7-days-of-Safari-use cap on script-writable storage does not share a clock with home-screen apps: "Web applications added to the home screen are not part of Safari and thus have their own counter of days of use... We do not expect the first-party in such a web application to have its website data deleted" (WebKit asks that deletions be reported as bugs). Regular Safari tabs of the same site remain subject to the cap.
  Source: [Full Third-Party Cookie Blocking and More (WebKit)](https://webkit.org/blog/10218/full-third-party-cookie-blocking-and-more/)
- **Web Push: supported since iOS/iPadOS 16.4 and current.** Only for web apps **added to the Home Screen**; requires a service worker and a user gesture to request permission; delivered via the same Apple Push Notification service as native apps; badging supported.
  Source: [Web Push for Web Apps on iOS and iPadOS (WebKit)](https://webkit.org/blog/13878/web-push-for-web-apps-on-ios-and-ipados/)

## 5. Will the existing bookmark pick up the new manifest?

- **iOS: no — delete and re-add.** Safari reads the manifest (display mode, name, icon) at the moment the user taps Add to Home Screen and bakes it into the icon; Apple/WebKit document no mechanism that re-fetches the manifest for an already-added icon, and in practice a pre-manifest icon keeps opening as a Safari bookmark forever. The user must remove the icon and re-add the site after the manifest is live. (Documented-absence + universally observed behavior; Apple publishes no explicit statement either way.)
- **Android Chrome: yes, automatically.** For installed PWAs, "If the manifest hasn't been checked in the last 24 hours, Chrome will schedule a network request for the manifest, then compare it against the local copy"; changes to `name`, `icons`, `display`, `start_url`, `theme_color`, etc. trigger a WebAPK regeneration — no reinstall needed, updates land "within a day or two."
  Source: [How Chrome handles updates to the web app manifest (web.dev)](https://web.dev/articles/manifest-updates)

## Deployment note (Cloudflare Workers SPA)

Nothing platform-specific is required, but the manifest URL and `start_url` must both return 200 from the Worker (the manifest is a real static asset, not an SPA route rewrite target returning HTML), and everything must be same-origin HTTPS — already true on workers.dev / custom domains.
