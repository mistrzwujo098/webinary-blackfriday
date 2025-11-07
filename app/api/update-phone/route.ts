import { NextRequest, NextResponse } from 'next/server'

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY

interface UpdatePhoneRequest {
  email: string
  phone: string
}

export async function POST(request: NextRequest) {
  try {
    const body: UpdatePhoneRequest = await request.json()
    const { email, phone } = body

    // Walidacja
    if (!email || !phone) {
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

    // Najpierw znajdź subskrybenta po emailu
    const searchResponse = await fetch(
      `https://connect.mailerlite.com/api/subscribers?filter[email]=${encodeURIComponent(email)}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
          'Accept': 'application/json'
        }
      }
    )

    if (!searchResponse.ok) {
      console.error('MailerLite search error:', await searchResponse.text())
      return NextResponse.json(
        { success: false, error: 'Nie znaleziono użytkownika z tym adresem email. Upewnij się, że podałeś ten sam email, którego użyłeś przy zapisie.' },
        { status: 404 }
      )
    }

    const searchData = await searchResponse.json()

    if (!searchData.data || searchData.data.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Nie znaleziono użytkownika z tym adresem email. Upewnij się, że podałeś ten sam email, którego użyłeś przy zapisie.' },
        { status: 404 }
      )
    }

    const subscriberId = searchData.data[0].id

    // Zaktualizuj numer telefonu
    const updateResponse = await fetch(
      `https://connect.mailerlite.com/api/subscribers/${subscriberId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          fields: {
            phone: phone
          }
        })
      }
    )

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json()
      console.error('MailerLite update error:', errorData)
      return NextResponse.json(
        { success: false, error: 'Nie udało się zaktualizować numeru telefonu.' },
        { status: 500 }
      )
    }

    console.log(`Phone updated for: ${email}`)

    return NextResponse.json({
      success: true,
      message: 'Numer telefonu został pomyślnie dodany!'
    })
  } catch (error) {
    console.error('Update phone error:', error)
    return NextResponse.json(
      { success: false, error: 'Coś poszło nie tak. Spróbuj ponownie.' },
      { status: 500 }
    )
  }
}
