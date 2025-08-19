import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nombre, telefono, email, tipoProyecto, mensaje } = body

    if (!nombre || !telefono || !email || !tipoProyecto || !mensaje) {
      return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 })
    }

    console.log("[v0] Nueva cotización procesada:", {
      nombre,
      telefono,
      email,
      tipoProyecto,
      mensaje,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      {
        message: "Cotización procesada - Email preparado para envío manual",
        data: { nombre, email, tipoProyecto },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Error procesando cotización:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
