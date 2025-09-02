import { NextRequest, NextResponse } from "next/server"
import { getPayPalClient, paypal } from "@/app/lib/paypal"
import crypto from "crypto"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  try {
    const { orderID } = await req.json()
    if (!orderID) {
      return NextResponse.json({ error: "Missing orderID." }, { status: 400 })
    }

    const request = new paypal.orders.OrdersCaptureRequest(orderID)
    request.requestBody({})
    request.headers["PayPal-Request-Id"] = crypto.randomUUID()

    const client = getPayPalClient()
    const response = await client.execute(request)

    // Basic validation
    const result = response.result
    const completed =
      result.status === "COMPLETED" ||
      result.purchase_units?.[0]?.payments?.captures?.[0]?.status ===
        "COMPLETED"

    // 🔐 TODO (recommended): verify amounts/items match your server-side cart.
    // 💾 TODO: persist order/capture details in your DB here.

    return NextResponse.json(
      {
        ok: completed,
        id: result.id,
        status: result.status,
        payer: result.payer,
        purchase_units: result.purchase_units,
      },
      { status: completed ? 200 : 202 }
    )
  } catch (err: any) {
    console.error("PayPal capture error:", err)
    return NextResponse.json(
      { error: "Failed to capture order." },
      { status: 500 }
    )
  }
}
