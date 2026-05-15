import { NextResponse } from 'next/server'

const AI_API_URL = process.env.AI_API_URL
const AI_API_KEY = process.env.AI_API_KEY
const DB_API_URL = process.env.DB_API_URL
const DB_API_KEY = process.env.DB_API_KEY_SCOPECREEP

export async function POST(request) {
  try {
    const body = await request.json()
    const { original_scope, client_request, contract_value, project_type, userId } = body

    if (!original_scope || !client_request) {
      return NextResponse.json({ error: 'original_scope and client_request are required' }, { status: 400 })
    }

    // Call AI API
    const aiRes = await fetch(`${AI_API_URL}/api/process`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${AI_API_KEY}` },
      body: JSON.stringify({
        task: 'analyse_scope_change',
        inputs: { original_scope, client_request, contract_value: contract_value || 'not specified' }
      })
    })

    const aiData = await aiRes.json()
    if (!aiRes.ok) throw new Error(aiData.error || 'AI analysis failed')
    const result = aiData.data

    // Save to DB if logged in
    let itemId = null
    if (userId && DB_API_URL) {
      try {
        const dbRes = await fetch(`${DB_API_URL}/db/scopecreep/analyses`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${DB_API_KEY}` },
          body: JSON.stringify({
            user_id: userId,
            original_scope,
            client_request,
            contract_value,
            project_type,
            result_data: result,
            verdict: result.verdict || '',
            status: 'complete'
          })
        })
        const dbData = await dbRes.json()
        itemId = dbData.data?.id || null
      } catch(e) {
        console.error('DB save failed:', e.message)
      }
    }

    return NextResponse.json({ itemId, result })
  } catch(err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
