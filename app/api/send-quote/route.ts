import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nombre, telefono, email, tipoProyecto, mensaje } = body

    // Validar campos requeridos
    if (!nombre || !telefono || !email || !tipoProyecto || !mensaje) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    // Preparar el contenido del email
    const emailContent = `
      <h2>Nueva Cotización - Prealca.C.A</h2>
      <div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h3>Datos del Cliente:</h3>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Tipo de Proyecto:</strong> ${tipoProyecto}</p>
        
        <h3>Mensaje:</h3>
        <p>${mensaje}</p>
        
        <hr>
        <p><small>Enviado desde la página web de Prealca.C.A</small></p>
      </div>
    `

    // Enviar email usando la API REST de Resend
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Prealca.C.A <onboarding@resend.dev>',
        to: ['fuscoriccardo11@gmail.com'],
        subject: `Nueva Cotización de ${nombre} - ${tipoProyecto}`,
        html: emailContent,
      }),
    })

    if (!resendResponse.ok) {
      const errorData = await resendResponse.text()
      console.error('[v0] Error de Resend:', errorData)
      return NextResponse.json(
        { error: 'Error al enviar el email' },
        { status: 500 }
      )
    }

    const result = await resendResponse.json()
    console.log('[v0] Email enviado exitosamente:', result)

    return NextResponse.json({ 
      success: true, 
      message: 'Cotización enviada exitosamente' 
    })

  } catch (error) {
    console.error('[v0] Error en API send-quote:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}