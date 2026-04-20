import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { buildSystemPrompt } from '@/lib/prompts'
import type { RoadmapResponse } from '@/lib/types'

export const runtime = 'nodejs'

// Demo response returned when ANTHROPIC_API_KEY is not configured
const DEMO_RESPONSE: Record<'en' | 'ar', RoadmapResponse> = {
  ar: {
    summary: 'أنت شخص يمتلك قدرة إبداعية حقيقية ومهارات متراكمة عبر سنوات من العمل الجاد. ما شاركته يكشف عن شخص يفكر بعمق ويسعى للنمو المستمر. الذكاء الاصطناعي ليس منافسًا لك، بل هو أداة تُضاعف قدراتك وتُحرر طاقتك للتركيز على ما يميزك حقًا.',
    steps: [
      'حدّد نقاط قوتك الفريدة التي يصعب أتمتتها — الحكم البشري والتعاطف والإبداع الأصيل',
      'تعلّم أساسيات التعامل مع أدوات الذكاء الاصطناعي كـ ChatGPT وClaude لتسريع عملك اليومي',
      'ابنِ حضورًا رقميًا يعكس خبرتك — مقالات أو منشورات على LinkedIn تُظهر تفكيرك',
      'طوّر مشروعًا جانبيًا يجمع بين مهاراتك البشرية وأدوات الذكاء الاصطناعي',
      'توسّع في شبكة علاقاتك المهنية في مجال يتقاطع فيه تخصصك مع تقنية الذكاء الاصطناعي',
      'ضع لنفسك هدفًا مهنيًا محددًا خلال 6 أشهر واعمل عليه خطوة بخطوة',
    ],
    resources: {
      youtube: [
        'كيف تستخدم الذكاء الاصطناعي في عملك اليومي',
        'مهارات المستقبل في عصر الذكاء الاصطناعي',
        'كيف تبني علامتك الشخصية على الإنترنت',
        'نصائح للتحول المهني الناجح',
      ],
      websites: [
        { name: 'Coursera', url: 'https://www.coursera.org', description: 'دورات احترافية في الذكاء الاصطناعي وتطوير المهارات' },
        { name: 'LinkedIn Learning', url: 'https://www.linkedin.com/learning', description: 'تطوير المهارات المهنية وبناء شبكة علاقات قوية' },
        { name: 'Notion AI', url: 'https://www.notion.so', description: 'أداة إنتاجية متكاملة مع الذكاء الاصطناعي لتنظيم أفكارك ومشاريعك' },
      ],
    },
    closing: 'مستقبلك لا يُبنى رغم الذكاء الاصطناعي، بل يُبنى معه. أنت تمتلك ما لا يمكن لأي آلة أن تمتلكه — قصتك وإنسانيتك وحكمتك المكتسبة.',
  },
  en: {
    summary: 'You bring a rare combination of creative instinct and hard-won professional experience. What you\'ve shared reveals someone with deep self-awareness and a genuine desire to grow. AI isn\'t a threat to people like you — it\'s the multiplier that lets your human strengths operate at a higher level.',
    steps: [
      'Identify your irreplaceable strengths — judgment, empathy, and original creative thinking that AI cannot replicate',
      'Learn the basics of AI tools like Claude and ChatGPT to accelerate your daily work immediately',
      'Build a visible professional presence — write short articles or LinkedIn posts that showcase your thinking',
      'Start a side project that combines your expertise with AI tooling to demonstrate your value',
      'Expand your network in the intersection of your field and AI applications',
      'Set one concrete 6-month professional goal and work toward it incrementally',
    ],
    resources: {
      youtube: [
        'How to use AI tools to boost productivity at work',
        'Future-proof skills in the age of artificial intelligence',
        'Building a personal brand online for professionals',
        'Career pivoting strategies that actually work',
      ],
      websites: [
        { name: 'Coursera', url: 'https://www.coursera.org', description: 'Professional courses in AI, creativity, and career development' },
        { name: 'LinkedIn Learning', url: 'https://www.linkedin.com/learning', description: 'Skill-building and professional networking platform' },
        { name: 'Notion AI', url: 'https://www.notion.so', description: 'All-in-one productivity tool with built-in AI for organizing your ideas and projects' },
      ],
    },
    closing: 'Your future isn\'t built in spite of AI — it\'s built with it. You have what no machine ever will: your story, your humanity, and your hard-earned wisdom.',
  },
}

const client = process.env.ANTHROPIC_API_KEY ? new Anthropic() : null

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

  // Return demo data when no API key is configured
  if (!client) {
    await new Promise((r) => setTimeout(r, 1800)) // simulate network delay
    return NextResponse.json(DEMO_RESPONSE[locale])
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
