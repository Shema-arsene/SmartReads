"use client"

import { PayPalScriptProvider } from "@paypal/react-paypal-js"

export default function Providers({ children }: { children: React.ReactNode }) {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!
  return (
    <PayPalScriptProvider
      options={{
        "client-id": clientId,
        currency: "USD", // or dynamic per user
        intent: "capture",
      }}
    >
      {children}
    </PayPalScriptProvider>
  )
}
