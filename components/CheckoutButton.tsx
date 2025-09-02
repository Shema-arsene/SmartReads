"use client"

import { PayPalButtons } from "@paypal/react-paypal-js"
import { useState } from "react"

type Props = {
  amount: number
  currency?: string // default "USD"
  items?: { name: string; unit_amount: number; quantity: number }[]
  metadata?: Record<string, any>
  onSuccess?: (data: any) => void
  onError?: (err: any) => void
}

export default function CheckoutButton({
  amount,
  currency = "USD",
  items,
  metadata,
  onSuccess,
  onError,
}: Props) {
  const [loading, setLoading] = useState(false)

  return (
    <>
      <PayPalButtons
        style={{ layout: "vertical" }}
        disabled={loading}
        createOrder={async () => {
          try {
            setLoading(true)
            const res = await fetch("/api/paypal/create-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ amount, currency, items, metadata }),
            })
            const data = await res.json()
            if (!res.ok) throw new Error(data?.error || "Create order failed")
            return data.id // PayPal expects the order ID string here
          } catch (e) {
            setLoading(false)
            onError?.(e)
            throw e
          }
        }}
        onApprove={async (data) => {
          try {
            const res = await fetch("/api/paypal/capture-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderID: data.orderID }),
            })
            const capture = await res.json()
            setLoading(false)
            if (!res.ok || !capture.ok) {
              throw new Error(capture?.error || "Capture failed")
            }
            onSuccess?.(capture)
          } catch (e) {
            setLoading(false)
            onError?.(e)
          }
        }}
        onError={(err) => {
          setLoading(false)
          onError?.(err)
          console.error(err)
        }}
      />
      {loading && <p className="text-sm opacity-70 mt-2">Processing…</p>}
    </>
  )
}
