"use client"

import React from "react"

const CheckoutPage = () => {
  return (
    <main className="max-w-xl mx-auto py-10 px-6">
      <h1 className="text-3xl text-center font-semibold mb-8 text-gray-800">
        Checkout Page
      </h1>

      <form
        method="POST"
        className="bg-white p-6 rounded-xl shadow-md space-y-5"
      >
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-2 font-medium text-gray-700">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="orderID" className="mb-2 font-medium text-gray-700">
            Order ID:
          </label>
          <input
            type="text"
            id="orderID"
            name="orderID"
            placeholder="Enter your order ID"
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="amount" className="mb-2 font-medium text-gray-700">
            Amount:
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter the amount"
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="currency" className="mb-2 font-medium text-gray-700">
            Currency:
          </label>
          <select
            id="currency"
            name="currency"
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:outline-none"
          >
            <option value="USD">USD</option>
            <option value="RWF">EUR</option>
            <option value="EUR">GBP</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition-colors shadow-md hover:shadow-lg"
        >
          Pay with PayPal
        </button>
      </form>
    </main>
  )
}

export default CheckoutPage
