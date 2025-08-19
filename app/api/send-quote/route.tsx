import { Resend } from "resend"
import { type NextRequest, NextResponse } from "next/server"
import { formatInTimeZone } from 'date-fns-tz'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("[v0] Cotización recibida para envío automático:", JSON.stringify(body))

    const { nombre, telefono, email, tipoProyecto, mensaje } = body

    // Validar campos requeridos
    if (!nombre || !telefono || !email || !tipoProyecto || !mensaje) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    const { data, error } = await resend.emails.send({
      from: "Prealca.C.A <onboarding@resend.dev>",
      to: ["fuscoriccardo11@gmail.com"],
      subject: `Nueva Cotización - ${tipoProyecto} de ${nombre}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #ff6b35, #f7931e); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Nueva Cotización - Prealca.C.A</h1>
          </div>
          
          <div style="padding: 30px; background: #f8f9fa;">
            <h2 style="color: #333; margin-bottom: 20px;">Datos del Cliente</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <p><strong>Nombre:</strong> ${nombre}</p>
              <p><strong>Teléfono:</strong> ${telefono}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Tipo de Proyecto:</strong> ${tipoProyecto}</p>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px;">
              <h3 style="color: #333; margin-top: 0;">Mensaje:</h3>
              <p style="line-height: 1.6;">${mensaje}</p>
            </div>
            
            <div style="margin-top: 30px; padding: 20px; background: #e8f4f8; border-radius: 8px; text-align: center;">
              <p style="margin: 0; color: #666;">
                <strong>Fecha de solicitud:</strong> ${new Date().toLocaleString("es-VE", { timeZone: "America/Caracas" })}
              </p>  
            </div>
          </div>
          
          <div style="background: #333; padding: 20px; text-align: center;">
            <p style="color: white; margin: 0;">© 2025 Prealca.C.A - Empresa de Concreto</p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error("[v0] Error enviando email:", error)
      return NextResponse.json({ error: "Error enviando email" }, { status: 500 })
    }

    console.log("[v0] Email enviado exitosamente:", data)
    return NextResponse.json({
      success: true,
      message: "Cotización enviada exitosamente",
    })
  } catch (error) {
    console.error("[v0] Error en API:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
