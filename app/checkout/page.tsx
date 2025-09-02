"use client"

import CheckoutButton from "@/components/CheckoutButton"
import Providers from "@/components/Providers"
import React from "react"

const page = () => {
  return (
    <Providers>
      <main className="max-w-xl mx-auto py-10">
        <h1 className="text-2xl font-semibold mb-6">Checkout Page</h1>
        <section>
          <form
            action="/api/paypal/create-order"
            method="POST"
            className="hidden"
          >
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label htmlFor="orderID">Order ID:</label>
              <input
                type="text"
                id="orderID"
                name="orderID"
                placeholder="Enter your order ID"
                required
              />
            </div>
            <div>
              <label htmlFor="amount">Amount:</label>
              <input
                type="number"
                id="amount"
                name="amount"
                placeholder="Enter the amount"
                required
              />
            </div>
            <div>
              <label htmlFor="currency">Currency:</label>
              <select id="currency" name="currency" required>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>

            <button type="submit">Pay with PayPal</button>
          </form>
          {/* Typically compute these on the server; this is a demo */}
          <CheckoutButton
            amount={49.99}
            currency="USD"
            items={[{ name: "Pro Plan", unit_amount: 49.99, quantity: 1 }]}
            metadata={{ orderId: "ORDER-123" }}
            onSuccess={(data) => {
              // grant access, redirect, toast, etc.
              console.log("Payment success:", data)
            }}
            onError={(e) => {
              console.error("Payment error:", e)
              alert("Payment failed. Please try again.")
            }}
          />
        </section>
      </main>
    </Providers>
  )
}

export default page
