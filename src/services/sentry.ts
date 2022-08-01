import * as Sentry from "@sentry/react"
import { BrowserTracing } from "@sentry/tracing"

interface HTTPData {
  method: "POST" | "GET"
  url: string
}

function initSentry() {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
    integrations: [new BrowserTracing()],
    maxBreadcrumbs: 50,
    allowUrls: [location.host],
    beforeBreadcrumb(breadcrumb, hint?) {
      if (["log", "warning"].includes(breadcrumb.level || "")) {
        return null
      }

      return breadcrumb
    },
    beforeSend(event, hint?) {
      if (event.breadcrumbs != null) {
        const lastBreadcrumb = event.breadcrumbs[event.breadcrumbs.length - 1]
        if (lastBreadcrumb.category === "fetch") {
          return null

          const lastBreadcrumbData = lastBreadcrumb.data as HTTPData
          const lastBreadcrumbURL = new URL(lastBreadcrumbData.url)

          return {
            ...event,
            exception: {
              values: [{
                type: "API error",
                value: lastBreadcrumbURL.pathname
              }],
            }
          }
        }
      }

      return event
    },
    sendClientReports: true,

    // initialScope(scope) {

    // },

    environment: process.env.NODE_ENV,

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.01 : 1.00,
  })
}

export default initSentry
