import { NextRequest, NextResponse } from 'next/server'

// Configure Edge Runtime for Cloudflare Pages
export const runtime = 'edge'

const MAILERLITE_WORKER_URL = process.env.MAILERLITE_WORKER_URL
const GROUP_IDS = {
  e8: process.env.MAILERLITE_GROUP_ID_E8,
  matura: process.env.MAILERLITE_GROUP_ID_MATURA,
  rozszerzenie: process.env.MAILERLITE_GROUP_ID_ROZSZERZENIE
}

interface SubscribeRequest {
  email: string
  name?: string
  phone?: string
  type: 'egzamin' | 'matura' | 'rozszerzenie'
  level?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: SubscribeRequest = await request.json()
    const { email, name, phone, type, level } = body

    // Walidacja
    if (!email || !type) {
      return NextResponse.json(
        { success: false, error: 'Brak wymaganych pól' },
        { status: 400 }
      )
    }

    if (!MAILERLITE_WORKER_URL) {
      console.error('MAILERLITE_WORKER_URL not configured')
      return NextResponse.json(
        { success: false, error: 'Błąd konfiguracji serwera' },
        { status: 500 }
      )
    }

    // Wybierz grupę na podstawie typu
    let groupId: string | undefined
    if (type === 'egzamin') {
      groupId = GROUP_IDS.e8
    } else if (type === 'matura') {
      groupId = GROUP_IDS.matura
    } else if (type === 'rozszerzenie') {
      groupId = GROUP_IDS.rozszerzenie
    }

    if (!groupId) {
      console.error(`Group ID not found for type: ${type}`)
      return NextResponse.json(
        { success: false, error: 'Błąd konfiguracji grupy' },
        { status: 500 }
      )
    }

    // Przygotuj dane dla Workera
    const workerData: any = {
      email,
      name: name || email.split('@')[0], // Jeśli brak imienia, użyj części emaila przed @
      groupId,
      fields: {}
    }

    // Dodaj opcjonalne pola
    if (phone) {
      workerData.fields.phone = phone
    }

    if (level && type === 'matura') {
      workerData.fields.level = level
    }

    // Wyślij do Cloudflare Worker
    const response = await fetch(MAILERLITE_WORKER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workerData)
    })

    const responseData = await response.json()

    if (!response.ok) {
      console.error('Worker API error:', responseData)

      // Sprawdź czy subscriber już istnieje
      if (responseData.code === 'ALREADY_SUBSCRIBED') {
        return NextResponse.json({
          success: true,
          message: 'Jesteś już zapisany/a na ten webinar!'
        })
      }

      return NextResponse.json(
        { success: false, error: responseData.error || 'Coś poszło nie tak. Spróbuj ponownie.' },
        { status: response.status }
      )
    }

    // Tracking events (opcjonalnie - możesz dodać server-side tracking)
    console.log(`New subscriber: ${email} for ${type} webinar`)

    return NextResponse.json({
      success: true,
      message: responseData.message || 'Zostałeś/aś pomyślnie zapisany/a na webinar!'
    })
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json(
      { success: false, error: 'Coś poszło nie tak. Spróbuj ponownie.' },
      { status: 500 }
    )
  }
}
