import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, projectType, description, budget } = body

    // Validar datos requeridos
    if (!name || !email || !phone || !projectType) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    const emailData = {
      to: "fuscoriccardo11@gmail.com",
      subject: `Nueva Cotización - ${name} - ${projectType}`,
      html: `
        <h2>Nueva Solicitud de Cotización - Prealca.C.A</h2>
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h3>Datos del Cliente:</h3>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone}</p>
          
          <h3>Detalles del Proyecto:</h3>
          <p><strong>Tipo de Proyecto:</strong> ${projectType}</p>
          <p><strong>Presupuesto Estimado:</strong> ${budget || "No especificado"}</p>
          
          <h3>Descripción:</h3>
          <p>${description || "No se proporcionó descripción adicional"}</p>
          
          <hr>
          <p><small>Solicitud enviada desde la página web de Prealca.C.A</small></p>
          <p><small>Fecha: ${new Date().toLocaleString("es-VE")}</small></p>
        </div>
      `,
    }

    // Por ahora simular el envío exitoso
    // En producción aquí iría la integración con un servicio de email como Resend
    console.log("Email que se enviaría:", emailData)

    return NextResponse.json({
      success: true,
      message: "Cotización enviada exitosamente. Te contactaremos pronto.",
    })
  } catch (error) {
    console.error("Error al procesar cotización:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
