"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, Sparkles } from "lucide-react"

export default function Chatbot() {
  const handleWhatsAppClick = () => {
    const phoneNumber = "584122928747" // Número de WhatsApp sin espacios ni símbolos
    const message = "Hola, me interesa solicitar una cotización para concreto premezclado. ¿Podrían ayudarme?"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 transition-all duration-300 scale-100">
        <Button
          onClick={handleWhatsAppClick}
          className="relative h-16 w-16 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <MessageCircle className="h-7 w-7 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
          <Sparkles className="absolute top-1 right-1 h-4 w-4 text-yellow-300 animate-pulse" />
        </Button>
        <div className="absolute -top-2 -right-2 h-4 w-4 bg-green-500 rounded-full animate-pulse border-2 border-white" />
      </div>
    </>
  )
}
