declare global {
  interface Number {
    /**
     * Converts a number to price formatted string
     * @returns error message for error
     */
    toPrice(this: number, locale?: string, currency?: string): string
  }
}

Number.prototype.toPrice = function (this: number, locale = "EN", currency = "USD"): string {
  try {
    return this.toLocaleString(locale, { style: "currency", currency, minimumFractionDigits: 0 })
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("tag") || error.message.includes("locale")) {
        return "Invalid language tag"
      }

      return "Invalid currency code"
    }

    throw error
  }
}


export default {}
