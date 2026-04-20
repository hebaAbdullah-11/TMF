import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { buildSystemPrompt } from '@/lib/prompts'
import type { RoadmapResponse } from '@/lib/types'

export const runtime = 'nodejs'

const client = new Anthropic()

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { q1, q2, q3, locale } = body as Record<string, unknown>

  if (
    typeof q1 !== 'string' || q1.trim().length < 10 ||
    typeof q2 !== 'string' || q2.trim().length < 10 ||
    typeof q3 !== 'string' || q3.trim().length < 10
  ) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 })
  }

  if (locale !== 'en' && locale !== 'ar') {
    return NextResponse.json({ error: 'Invalid locale' }, { status: 400 })
  }

  const systemPrompt = buildSystemPrompt(locale)

  const userMessage = locale === 'ar'
    ? `الإبداع الطبيعي: ${q1}\n\nمكتسبات العمل: ${q2}\n\nالنتيجة المرجوة: ${q3}`
    : `Natural creativity: ${q1}\n\nWork experience gains: ${q2}\n\nDesired outcome: ${q3}`

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1500,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    })

    const raw = message.content[0].type === 'text' ? message.content[0].text : ''

    const fencedMatch = raw.match(/```json\s*([\s\S]*?)\s*```/)
    const bareMatch = raw.match(/(\{[\s\S]*\})/)
    const jsonStr = fencedMatch?.[1] ?? bareMatch?.[1]

    if (!jsonStr) {
      return NextResponse.json({ error: 'Malformed response' }, { status: 502 })
    }

    let parsed: RoadmapResponse
    try {
      parsed = JSON.parse(jsonStr)
    } catch {
      return NextResponse.json({ error: 'Malformed response' }, { status: 502 })
    }

    if (
      typeof parsed.summary !== 'string' ||
      !Array.isArray(parsed.steps) ||
      !parsed.resources ||
      !Array.isArray(parsed.resources.youtube) ||
      !Array.isArray(parsed.resources.websites) ||
      typeof parsed.closing !== 'string'
    ) {
      return NextResponse.json({ error: 'Incomplete response' }, { status: 502 })
    }

    return NextResponse.json(parsed)
  } catch (err) {
    if (err instanceof Anthropic.RateLimitError) {
      return NextResponse.json({ error: 'rate_limit' }, { status: 429 })
    }
    console.error('Claude API error:', err)
    return NextResponse.json({ error: 'api_error' }, { status: 500 })
  }
}
