"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, X, Phone, Calculator, Truck, Info } from "lucide-react"

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)

  const handleWhatsAppClick = () => {
    const phoneNumber = "584122928747" // Número de WhatsApp sin espacios ni símbolos
    const message = "Hola, me interesa solicitar información sobre concreto premezclado. ¿Podrían ayudarme?"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const handleQuickOption = (option: string) => {
    let message = ""
    switch (option) {
      case "info":
        message = "Hola, me gustaría obtener información sobre sus tipos de concreto y especificaciones técnicas."
        break
      case "cotizacion":
        message = "Hola, necesito una cotización para concreto premezclado. ¿Podrían ayudarme con los precios?"
        break
      case "entrega":
        message = "Hola, me interesa conocer sobre sus servicios de entrega y tiempos de distribución."
        break
    }
    
    const phoneNumber = "584122928747"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <>
      {/* Chat Widget */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 text-white">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Prealca C.A</h3>
                <p className="text-sm text-orange-100">Soporte al Cliente</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {/* Welcome Message */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                ¡Hola! 👋 Bienvenido a Prealca C.A. ¿En qué podemos ayudarte?
              </p>
            </div>

            {/* Quick Options */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-900 mb-3">Opciones rápidas:</p>
              
              <button
                onClick={() => handleQuickOption("info")}
                className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200 mb-2"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Info className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-sm text-gray-700">Información sobre tipos de concreto</span>
              </button>

              <button
                onClick={() => handleQuickOption("cotizacion")}
                className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200 mb-2"
              >
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Calculator className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-sm text-gray-700">Solicitar cotización</span>
              </button>

              <button
                onClick={() => handleQuickOption("entrega")}
                className="w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <Truck className="h-4 w-4 text-orange-600" />
                </div>
                <span className="text-sm text-gray-700">Información de entrega</span>
              </button>
            </div>

            {/* WhatsApp Button */}
            <Button
              onClick={handleWhatsAppClick}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors duration-200"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Abrir WhatsApp
            </Button>
          </div>
        </div>
      )}

      {/* Close Button (when chat is open) */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setIsOpen(false)}
            className="h-12 w-12 rounded-full bg-gray-600 hover:bg-gray-700 shadow-lg transition-all duration-300"
          >
            <X className="h-5 w-5 text-white" />
          </Button>
        </div>
      )}

      {/* Chat Button (when chat is closed) */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 transition-all duration-300">
          <Button
            onClick={() => setIsOpen(true)}
            className="relative h-16 w-16 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <MessageCircle className="h-7 w-7 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
            
            {/* Online indicator */}
            <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full animate-pulse border-2 border-white" />
          </Button>

          {/* Tooltip */}
          <div className="absolute bottom-20 right-0 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            ¿Necesitas ayuda?
          </div>
        </div>
      )}
    </>
  )
}

