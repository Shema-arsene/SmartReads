// components/DonationForm.tsx
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

export default function DonationForm() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    amount: "",
    method: "card",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.amount) {
      toast.error("Please fill in all required fields.")
      return
    }
    if (Number(form.amount) <= 0) {
      toast.error("Donation amount must be greater than zero.")
      return
    }

    setLoading(true)

    // Placeholder - integrate Stripe/PayPal API here
    setTimeout(() => {
      toast.success(
        `Thank you ${form.name}! Your donation of $${form.amount} was received.`
      )
      setLoading(false)
      setForm({ name: "", email: "", amount: "", method: "card" })
    }, 2000)
  }

  return (
    <Card className="max-w-md mx-auto mt-10 shadow-lg rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-center">
          Support SmartReads 📚
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="johndoe@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Amount */}
          <div>
            <Label htmlFor="amount">Donation Amount ($)</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              min="1"
              placeholder="10"
              value={form.amount}
              onChange={handleChange}
              required
            />
          </div>

          {/* Payment Method */}
          <div>
            <Label htmlFor="method">Payment Method</Label>
            <select
              id="method"
              name="method"
              value={form.method}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="card">Credit/Debit Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Processing..." : "Donate"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
