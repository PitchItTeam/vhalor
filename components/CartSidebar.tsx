"use client"

import { useEffect, useState } from "react"
import { getCart } from "@/lib/shopify"
import Image from "next/image"

export default function CartSidebar({ onClose }: { onClose: () => void }) {
  const [cart, setCart] = useState<any>(null)

  useEffect(() => {
    const cartId = localStorage.getItem("cartId")
    if (!cartId) return

    const fetchCart = async () => {
      try {
        const result = await getCart(cartId)
        setCart(result)
      } catch (err) {
        console.error("Failed to load cart:", err)
      }
    }

    fetchCart()
  }, [])

  const total = cart?.cost?.totalAmount?.amount
  const currency = cart?.cost?.totalAmount?.currencyCode

  return (
    <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-xl z-50 p-6 overflow-y-auto border-l border-gray-200">
      <button onClick={onClose} className="absolute top-4 right-4 text-lg font-bold">×</button>
      <h2 className="text-xl font-semibold mb-4">Cart</h2>

      {!cart?.lines?.length && <p>Your cart is empty.</p>}

      {cart?.lines?.map((line: any) => (
        <div key={line.id} className="mb-4 border-b pb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{line.merchandise.product.title}</p>
              <p className="text-sm text-gray-600">{line.merchandise.title}</p>
              <p className="text-sm text-gray-600">${line.merchandise.price.amount}</p>
              <p className="text-sm text-gray-600">Qty: {line.quantity}</p>
            </div>
            {line.merchandise.image?.url && (
              <Image
                src={line.merchandise.image.url}
                alt=""
                width={60}
                height={60}
                className="rounded"
              />
            )}
          </div>
        </div>
      ))}

      {cart && (
        <div className="mt-4">
          <p className="text-lg font-semibold">
            Total: {currency} {total}
          </p>
          <a
            href={cart.checkoutUrl}
            className="mt-4 block text-center bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
          >
            Checkout
          </a>
        </div>
      )}
    </div>
  )
}
