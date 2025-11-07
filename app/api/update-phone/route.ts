import { NextRequest, NextResponse } from 'next/server'

const MAILERLITE_WORKER_URL = process.env.MAILERLITE_WORKER_URL

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

    if (!MAILERLITE_WORKER_URL) {
      console.error('MAILERLITE_WORKER_URL not configured')
      return NextResponse.json(
        { success: false, error: 'Błąd konfiguracji serwera' },
        { status: 500 }
      )
    }

    // Przygotuj dane dla Workera
    // MailerLite automatycznie zaktualizuje subskrybenta jeśli email już istnieje
    const workerData = {
      email,
      fields: {
        phone: phone
      }
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

      // Jeśli użytkownik już istnieje, to jest OK - właśnie chcieliśmy go zaktualizować
      if (responseData.code === 'ALREADY_SUBSCRIBED') {
        console.log(`Phone updated for existing subscriber: ${email}`)
        return NextResponse.json({
          success: true,
          message: 'Numer telefonu został pomyślnie dodany!'
        })
      }

      // Jeśli użytkownik nie istnieje
      if (response.status === 404 || responseData.error?.includes('nie znaleziono')) {
        return NextResponse.json(
          { success: false, error: 'Nie znaleziono użytkownika z tym adresem email. Upewnij się, że podałeś ten sam email, którego użyłeś przy zapisie.' },
          { status: 404 }
        )
      }

      return NextResponse.json(
        { success: false, error: responseData.error || 'Nie udało się zaktualizować numeru telefonu.' },
        { status: response.status }
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
