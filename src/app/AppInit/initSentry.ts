import * as ReactSentry from "@sentry/react"
import { BrowserTracing } from "@sentry/tracing"

export function initSentry() {
  ReactSentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [new BrowserTracing()],
    maxBreadcrumbs: 50,
    allowUrls: [location.host],
    beforeBreadcrumb(breadcrumb /*, hint?*/) {
      if (["log", "warning"].includes(breadcrumb.level || "")) {
        return null
      }

      return breadcrumb
    },
    beforeSend(event) {
      if (event.breadcrumbs != null) {
        const lastBreadcrumb = event.breadcrumbs[event.breadcrumbs.length - 1]
        if (lastBreadcrumb.category === "fetch") {
          return null
        }
      }

      return event
    },
    sendClientReports: true,

    environment: process.env.NODE_ENV,

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.01 : 1.0,
  })
}
