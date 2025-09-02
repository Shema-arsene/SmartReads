import paypal from "@paypal/checkout-server-sdk"

const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!
const clientSecret = process.env.PAYPAL_CLIENT_SECRET!
const envName = (process.env.PAYPAL_ENV || "sandbox").toLowerCase()

function environment() {
  return envName === "live"
    ? new paypal.core.LiveEnvironment(clientId, clientSecret)
    : new paypal.core.SandboxEnvironment(clientId, clientSecret)
}

let _client: paypal.core.PayPalHttpClient | null = null

export function getPayPalClient() {
  if (!_client) _client = new paypal.core.PayPalHttpClient(environment())
  return _client
}

export { paypal }
