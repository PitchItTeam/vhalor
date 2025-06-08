"use client"

import { useState } from "react"
import CartSidebar from "./CartSidebar"

export default function CartButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 right-4 z-40 bg-black text-white px-4 py-2 rounded-md shadow-lg"
      >
        🛒 Cart
      </button>
      {open && <CartSidebar onClose={() => setOpen(false)} />}
    </>
  )
}
