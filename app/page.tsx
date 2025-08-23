"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  Truck,
  Users,
  Award,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle,
  Hammer,
  Shield,
  Zap,
} from "lucide-react"
import Chatbot from "@/components/chatbot"
import { useState } from "react"

export default function PrealcaLanding() {
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    tipoProyecto: "",
    mensaje: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleWhatsAppClick = () => {
    const phoneNumber = "584122928747" // Número de WhatsApp sin espacios ni símbolos
    const message = "Hola, me interesa solicitar una cotización para concreto premezclado. ¿Podrían ayudarme?"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage("")

    if (!formData.nombre || !formData.telefono || !formData.email || !formData.tipoProyecto || !formData.mensaje) {
      setSubmitMessage("Error: Faltan campos requeridos")
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitMessage("¡Cotización enviada exitosamente! Te contactaremos pronto.")
        setFormData({
          nombre: "",
          telefono: "",
          email: "",
          tipoProyecto: "",
          mensaje: "",
        })
      } else {
        setSubmitMessage(`Error: ${result.error}`)
      }
    } catch (error) {
      setSubmitMessage("Error al procesar la solicitud. Por favor, intenta nuevamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src="/Logo Prealca Sin Fondo.png" alt="Proyecto residencial"  className="h-12 w-auto md:h-16"/>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#servicios" className="text-slate-700 hover:text-orange-600 transition-colors">
              Servicios
            </a>
            <a href="#proyectos" className="text-slate-700 hover:text-orange-600 transition-colors">
              Proyectos
            </a>
            <a href="#nosotros" className="text-slate-700 hover:text-orange-600 transition-colors">
              Nosotros
            </a>
            <a href="#contacto" className="text-slate-700 hover:text-orange-600 transition-colors">
              Contacto
            </a>
          </nav>
          <Button className="bg-orange-600 hover:bg-orange-700" onClick={handleWhatsAppClick}>
            <Phone className="h-4 w-4 mr-2" />
            Cotizar
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-slate-100 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-200">+25 años de experiencia</Badge>
              <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Concreto de <span className="text-orange-600">Alta Calidad</span> para tus Proyectos
              </h1>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                En Prealca.C.A somos especialistas en la producción y suministro de concreto premezclado. Garantizamos
                resistencia, durabilidad y entrega puntual para proyectos residenciales, comerciales e industriales.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-orange-600 hover:bg-orange-700"
                  onClick={() => scrollToSection("contacto")}
                >
                  <Truck className="h-5 w-5 mr-2" />
                  Solicitar Cotización
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-slate-300 bg-transparent"
                  onClick={() => scrollToSection("proyectos")}
                >
                  Ver Proyectos
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/concrete-mixer-delivery.png"
                alt="Camión mezclador de concreto Prealca"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="font-semibold text-slate-900">Entrega Garantizada</p>
                    <p className="text-sm text-slate-600">En tiempo y forma</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">500+</div>
              <p className="text-slate-300">Proyectos Completados</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">25+</div>
              <p className="text-slate-300">Años de Experiencia</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">50+</div>
              <p className="text-slate-300">Clientes Satisfechos</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-500 mb-2">24/7</div>
              <p className="text-slate-300">Servicio Disponible</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Nuestros Servicios</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Ofrecemos soluciones integrales en concreto premezclado para todo tipo de construcciones
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Truck className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle className="text-slate-900">Concreto Premezclado</CardTitle>
                <CardDescription>
                  Concreto de alta calidad mezclado en planta con control estricto de calidad
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Resistencias de 175 a 350 kg/cm²
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Entrega puntual garantizada
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Control de calidad certificado
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Hammer className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle className="text-slate-900">Concreto Especializado</CardTitle>
                <CardDescription>Mezclas especiales para proyectos con requerimientos específicos</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Concreto autocompactante
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Concreto impermeable
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Concreto de alta resistencia
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle className="text-slate-900">Asesoría Técnica</CardTitle>
                <CardDescription>Acompañamiento profesional en todas las etapas de tu proyecto</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Diseño de mezclas
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Supervisión técnica
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    Pruebas de laboratorio
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="proyectos" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Proyectos Destacados</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Algunos de los proyectos más importantes que hemos realizado con éxito
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="overflow-hidden border-slate-200 hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-slate-200">
                <img src="/placeholder-nwtrk.png" alt="Proyecto residencial" className="w-full h-full object-cover" />
              </div>
              <CardHeader>
                <CardTitle className="text-slate-900">Complejo Residencial Vista Verde</CardTitle>
                <CardDescription>200 apartamentos con concreto de alta resistencia</CardDescription>
              </CardHeader>
            </Card>

            <Card className="overflow-hidden border-slate-200 hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-slate-200">
                <img
                  src="/shopping-center-construction.png"
                  alt="Proyecto comercial"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-slate-900">Centro Comercial Plaza Norte</CardTitle>
                <CardDescription>Estructura comercial de 3 niveles con concreto especializado</CardDescription>
              </CardHeader>
            </Card>

            <Card className="overflow-hidden border-slate-200 hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-slate-200">
                <img
                  src="/industrial-warehouse-foundation.png"
                  alt="Proyecto industrial"
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-slate-900">Planta Industrial TechCorp</CardTitle>
                <CardDescription>Nave industrial con concreto de alta durabilidad</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="nosotros" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">Sobre Prealca.C.A</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Con más de 25 años de experiencia en el sector de la construcción, Prealca.C.A se ha consolidado como
                una empresa líder en la producción y suministro de concreto premezclado en Venezuela.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Nuestro compromiso con la calidad, la innovación y el servicio al cliente nos ha permitido participar en
                proyectos de gran envergadura, siempre cumpliendo con los más altos estándares de la industria.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Award className="h-8 w-8 text-orange-600" />
                  <div>
                    <p className="font-semibold text-slate-900">Certificación ISO</p>
                    <p className="text-sm text-slate-600">Calidad garantizada</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-orange-600" />
                  <div>
                    <p className="font-semibold text-slate-900">Equipo Experto</p>
                    <p className="text-sm text-slate-600">Profesionales calificados</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="/modern-concrete-plant.png"
                alt="Planta de producción Prealca"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Contáctanos</h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Estamos listos para atender tu proyecto. Solicita tu cotización sin compromiso
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Información de Contacto</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-orange-500" />
                  <div>
                    <p className="text-white font-semibold">Teléfono</p>
                    <p className="text-slate-300">+58 212 555-0123</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="h-6 w-6 text-orange-500" />
                  <div>
                    <p className="text-white font-semibold">Email</p>
                    <p className="text-slate-300">info@prealca.com.ve</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="h-6 w-6 text-orange-500" />
                  <div>
                    <p className="text-white font-semibold">Dirección</p>
                    <p className="text-slate-300">Zona Industrial La Trinidad, Caracas, Venezuela</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="h-6 w-6 text-orange-500" />
                  <div>
                    <p className="text-white font-semibold">Horario</p>
                    <p className="text-slate-300">Lunes a Viernes: 7:00 AM - 6:00 PM</p>
                    <p className="text-slate-300">Sábados: 7:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-slate-900">Solicitar Cotización</CardTitle>
                <CardDescription>Completa el formulario y te contactaremos en menos de 24 horas</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Nombre</label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Teléfono</label>
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        placeholder="Tu teléfono"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="tu@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Tipo de Proyecto</label>
                    <select
                      name="tipoProyecto"
                      value={formData.tipoProyecto}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="Residencial">Residencial</option>
                      <option value="Comercial">Comercial</option>
                      <option value="Industrial">Industrial</option>
                      <option value="Infraestructura">Infraestructura</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Mensaje</label>
                    <textarea
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Describe tu proyecto..."
                    ></textarea>
                  </div>

                  {submitMessage && (
                    <div
                      className={`p-3 rounded-md text-sm ${
                        submitMessage.includes("exitosamente")
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : "bg-red-100 text-red-800 border border-red-200"
                      }`}
                    >
                      {submitMessage}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-50"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-6 w-6 text-orange-500" />
                <span className="text-xl font-bold text-white">Prealca.C.A</span>
              </div>
              <p className="text-slate-400 mb-4">
                Líderes en concreto premezclado con más de 25 años de experiencia en Venezuela.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Servicios</h4>
              <ul className="space-y-2 text-slate-400">
                <li>Concreto Premezclado</li>
                <li>Concreto Especializado</li>
                <li>Asesoría Técnica</li>
                <li>Control de Calidad</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-slate-400">
                <li>Sobre Nosotros</li>
                <li>Proyectos</li>
                <li>Certificaciones</li>
                <li>Carreras</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Contacto</h4>
              <ul className="space-y-2 text-slate-400">
                <li>+58 212 555-0123</li>
                <li>info@prealca.com.ve</li>
                <li>Caracas, Venezuela</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center">
            <p className="text-slate-400">© 2024 Prealca.C.A. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      <Chatbot />
    </div>
  )
}
