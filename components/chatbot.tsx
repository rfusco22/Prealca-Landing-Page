"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react"

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "¡Hola! Soy el asistente virtual de Prealca.C.A con inteligencia artificial. ¿En qué puedo ayudarte hoy?",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue("")
    setIsTyping(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: currentInput }),
      })

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor")
      }

      const data = await response.json()

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        isBot: true,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botResponse])
    } catch (error) {
      console.error("Error al obtener respuesta del chatbot:", error)
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Disculpa, tengo problemas técnicos en este momento. Por favor, intenta contactarnos directamente al +58 212-XXX-XXXX o completa el formulario de contacto.",
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorResponse])
    } finally {
      setIsTyping(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <>
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isOpen ? "scale-0" : "scale-100"}`}>
        <Button
          onClick={() => setIsOpen(true)}
          className="relative h-16 w-16 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <MessageCircle className="h-7 w-7 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" />
          <Sparkles className="absolute top-1 right-1 h-4 w-4 text-yellow-300 animate-pulse" />
        </Button>
        <div className="absolute -top-2 -right-2 h-4 w-4 bg-green-500 rounded-full animate-pulse border-2 border-white" />
      </div>

      <div
        className={`fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border-0 transition-all duration-300 z-50 overflow-hidden ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        <div className="relative p-6 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 text-white">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-10 w-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-400 rounded-full border-2 border-white animate-pulse" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Asistente IA Prealca</h3>
                <p className="text-sm opacity-90 flex items-center gap-1">
                  <span className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></span>
                  Inteligencia Artificial
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 h-10 w-10 p-0 rounded-full transition-all duration-200 hover:scale-110"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex-1 p-6 h-80 overflow-y-auto space-y-4 bg-gradient-to-b from-gray-50 to-white">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? "justify-start" : "justify-end"} animate-in slide-in-from-bottom-2 duration-300`}
            >
              <div
                className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
                  message.isBot
                    ? "bg-white text-gray-800 border border-gray-100"
                    : "bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                }`}
              >
                <div className="flex items-start gap-3">
                  {message.isBot && (
                    <div className="h-6 w-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="h-4 w-4 text-orange-600" />
                    </div>
                  )}
                  {!message.isBot && (
                    <div className="h-6 w-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-in slide-in-from-bottom-2 duration-300">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 bg-orange-100 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-orange-600" />
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-orange-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-6 border-t border-gray-100 bg-white">
          <div className="flex gap-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe tu mensaje..."
              className="flex-1 rounded-xl border-gray-200 focus:border-orange-500 focus:ring-orange-500 px-4 py-3"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl px-4 py-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
