import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Forward the message to your backend
    const response = await fetch('http://localhost:3000/api/prompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: body.message,
        id: Date.now().toString()
      })
    })

    const data = await response.json()
    
    return NextResponse.json({ 
      success: true, 
      message: 'Message sent successfully',
      data 
    })
  } catch (error) {
    console.error('Error sending message:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send message' },
      { status: 500 }
    )
  }
} 