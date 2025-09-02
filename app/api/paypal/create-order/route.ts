import { NextRequest, NextResponse } from "next/server"
import { getPayPalClient, paypal } from "@/app/lib/paypal"
import crypto from "crypto"

export const runtime = "nodejs" // ensure Node runtime (NOT edge)

type LineItem = { name: string; unit_amount: number; quantity: number }
type Body = {
  currency?: string // default "USD"
  items?: LineItem[] // optional line items
  amount?: number // fallback single amount if not using items
  metadata?: Record<string, any>
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Body

    const currency = (body.currency || "USD").toUpperCase()

    // ⚠️ In production, compute totals from your DB/cart to avoid client-side tampering.
    let value = 0
    if (body.items?.length) {
      value = body.items.reduce(
        (sum, it) => sum + it.unit_amount * it.quantity,
        0
      )
    } else if (typeof body.amount === "number") {
      value = body.amount
    } else {
      return NextResponse.json(
        { error: "Missing amount or items." },
        { status: 400 }
      )
    }

    // PayPal expects strings for money values
    const amountValue = value.toFixed(2)

    const reqId = crypto.randomUUID() // idempotency
    const request = new paypal.orders.OrdersCreateRequest()
    request.headers["PayPal-Request-Id"] = reqId
    request.prefer("return=representation")
    request.requestBody({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amountValue,
            // Optional: provide breakdown if you want tax/shipping
            // breakdown: { item_total: { currency_code: currency, value: amountValue } }
          },
          // Optional: itemized details (helps with disputes)
          // items: (body.items || []).map(it => ({
          //   name: it.name,
          //   quantity: it.quantity.toString(),
          //   unit_amount: { currency_code: currency, value: it.unit_amount.toFixed(2) },
          // })),
          custom_id: body.metadata?.orderId,
        },
      ],
      application_context: {
        shipping_preference: "NO_SHIPPING", // or "SET_PROVIDED_ADDRESS"
        user_action: "PAY_NOW",
      },
    })

    const client = getPayPalClient()
    const response = await client.execute(request)

    return NextResponse.json(
      { id: response.result.id, status: response.result.status },
      { status: 201 }
    )
  } catch (err: any) {
    console.error("PayPal create order error:", err)
    return NextResponse.json(
      { error: "Failed to create order." },
      { status: 500 }
    )
  }
}
