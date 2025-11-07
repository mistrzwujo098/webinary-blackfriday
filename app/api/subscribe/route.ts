import { NextRequest, NextResponse } from 'next/server'

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY
const GROUP_IDS = {
  e8: process.env.MAILERLITE_GROUP_ID_E8,
  matura: process.env.MAILERLITE_GROUP_ID_MATURA
}

interface SubscribeRequest {
  email: string
  name: string
  phone?: string
  type: 'egzamin' | 'matura'
  level?: string
}

export async function POST(request: NextRequest) {
  try {
    const body: SubscribeRequest = await request.json()
    const { email, name, phone, type, level } = body

    // Walidacja
    if (!email || !name || !type) {
      return NextResponse.json(
        { success: false, error: 'Brak wymaganych pól' },
        { status: 400 }
      )
    }

    if (!MAILERLITE_API_KEY) {
      console.error('MAILERLITE_API_KEY not configured')
      return NextResponse.json(
        { success: false, error: 'Błąd konfiguracji serwera' },
        { status: 500 }
      )
    }

    // Wybierz grupę na podstawie typu webinaru
    const groupId = type === 'egzamin' ? GROUP_IDS.e8 : GROUP_IDS.matura

    if (!groupId) {
      console.error(`Group ID not found for type: ${type}`)
      return NextResponse.json(
        { success: false, error: 'Błąd konfiguracji grupy' },
        { status: 500 }
      )
    }

    // Przygotuj dane dla MailerLite
    const subscriberData: any = {
      email,
      fields: {
        name,
      },
      groups: [groupId]
    }

    // Dodaj opcjonalne pola
    if (phone) {
      subscriberData.fields.phone = phone
    }

    if (level && type === 'matura') {
      subscriberData.fields.level = level
    }

    // Wyślij do MailerLite API
    const response = await fetch(
      'https://connect.mailerlite.com/api/subscribers',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify(subscriberData)
      }
    )

    const responseData = await response.json()

    if (!response.ok) {
      console.error('MailerLite API error:', responseData)

      // Sprawdź czy subscriber już istnieje
      if (response.status === 422 && responseData.message?.includes('already exists')) {
        // Subscriber już istnieje - możemy uznać to za sukces
        return NextResponse.json({
          success: true,
          message: 'Jesteś już zapisany/a na ten webinar!'
        })
      }

      throw new Error('MailerLite API error')
    }

    // Tracking events (opcjonalnie - możesz dodać server-side tracking)
    console.log(`New subscriber: ${email} for ${type} webinar`)

    return NextResponse.json({
      success: true,
      message: 'Zostałeś/aś pomyślnie zapisany/a na webinar!'
    })
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json(
      { success: false, error: 'Coś poszło nie tak. Spróbuj ponownie.' },
      { status: 500 }
    )
  }
}
