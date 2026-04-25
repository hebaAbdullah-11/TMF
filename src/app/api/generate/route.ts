import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { buildSystemPrompt } from '@/lib/prompts'
import type { RoadmapResponse } from '@/lib/types'

export const runtime = 'nodejs'

const DEMO_RESPONSE: Record<'en' | 'ar', RoadmapResponse> = {
  ar: {
    summary: 'ما شاركته يكشف عن شخص يمتلك مزيجًا نادرًا من الإبداع الحقيقي والخبرة المتراكمة. أنت لا تحتاج أن تنافس الذكاء الاصطناعي — أنت تحتاج أن تجعله يعمل لصالحك.',
    steps: [
      {
        title: 'اكتشف ميزتك التنافسية الحقيقية',
        description: 'ما الذي تفعله بشكل طبيعي وتجد فيه متعة يصعب على غيرك فعله؟ هذه هي نقطة انطلاقك الحقيقية.',
        duration: 'يوم واحد',
        micro_actions: [
          'اكتب 5 أشياء أنجزتها في العمل وأشعرت فيها بالفخر',
          'اسأل 3 أشخاص قريبين منك: "ما الذي تعتقد أنني أتميز فيه؟"',
          'دوّن الأنماط المتكررة في إجاباتهم',
        ],
      },
      {
        title: 'تعلّم استخدام الذكاء الاصطناعي في عملك اليومي',
        description: 'لا تحتاج أن تصبح خبيرًا تقنيًا — تحتاج فقط أن تعرف كيف تستخدم الأدوات المناسبة لتوفير وقتك.',
        duration: 'أسبوع واحد',
        micro_actions: [
          'افتح Claude.ai أو ChatGPT وجرّب تفويض مهمة متكررة في عملك',
          'ابحث على يوتيوب: "كيف يستخدم [مجالك] الذكاء الاصطناعي"',
          'دوّن 3 مهام تأخذ وقتًا يمكن أتمتتها',
        ],
      },
      {
        title: 'ابنِ حضورًا رقميًا يعكس خبرتك',
        description: 'الناس يبحثون عن خبراء يثقون بهم — وأنت تمتلك ما يبحثون عنه، فقط يحتاج أن يجدوك.',
        duration: 'أسبوعان',
        micro_actions: [
          'اكتب منشورًا واحدًا على LinkedIn عن درس تعلمته في العمل',
          'أضف مشاريعك البارزة إلى ملفك الشخصي',
          'تواصل مع 5 أشخاص في مجالك لم تتحدث إليهم منذ فترة',
        ],
      },
      {
        title: 'طوّر مشروعًا يجمع مهاراتك مع الذكاء الاصطناعي',
        description: 'المشروع الجانبي الصغير هو أقوى طريقة لإثبات قيمتك وتطوير مهاراتك في نفس الوقت.',
        duration: 'شهر واحد',
        micro_actions: [
          'اختر مشكلة صغيرة تزعجك في مجالك وفكّر في حل لها',
          'ابدأ بنسخة بسيطة جدًا من الحل خلال نهاية الأسبوع',
          'شاركها مع 3 أشخاص واطلب رأيهم الصريح',
        ],
      },
      {
        title: 'ضع هدفًا مهنيًا واحدًا خلال 6 أشهر',
        description: 'الوضوح هو أقوى أداة إنتاجية — عندما تعرف إلى أين تتجه، تبدأ الفرص بالظهور.',
        duration: 'مستمر',
        micro_actions: [
          'اكتب جملة واحدة تصف ما تريد أن تكون عليه بعد 6 أشهر',
          'حدّد الخطوة الأولى الوحيدة نحو هذا الهدف',
          'ضع تذكيرًا أسبوعيًا لمراجعة تقدمك',
        ],
      },
    ],
    resources: {
      youtube: [
        'كيف تستخدم الذكاء الاصطناعي في عملك اليومي للمبتدئين',
        'كيف تبني علامتك الشخصية على LinkedIn',
        'مهارات المستقبل التي لا يستطيع الذكاء الاصطناعي استبدالها',
      ],
      websites: [
        { name: 'Coursera', url: 'https://www.coursera.org', description: 'دورات احترافية معتمدة في الذكاء الاصطناعي وتطوير المهارات' },
        { name: 'LinkedIn Learning', url: 'https://www.linkedin.com/learning', description: 'تعلّم وطوّر شبكة علاقاتك في نفس الوقت' },
        { name: 'Notion', url: 'https://www.notion.so', description: 'نظّم أهدافك وخططك ومشاريعك في مكان واحد' },
      ],
    },
    closing: 'الذكاء الاصطناعي يمكنه محاكاة الكثير، لكنه لا يستطيع محاكاة تجربتك وحكمتك وإنسانيتك. ابدأ الآن بخطوة واحدة صغيرة.',
  },
  en: {
    summary: 'What you\'ve shared reveals someone with a rare combination of genuine creativity and hard-earned experience. You don\'t need to compete with AI — you need to make it work for you.',
    steps: [
      {
        title: 'Discover your real competitive advantage',
        description: 'What do you do naturally and enjoy that others find difficult? That\'s your true starting point and the foundation of your roadmap.',
        duration: '1 day',
        micro_actions: [
          'Write down 5 work accomplishments that made you feel genuinely proud',
          'Ask 3 people close to you: "What do you think I\'m uniquely good at?"',
          'Note the patterns that appear in their answers',
        ],
      },
      {
        title: 'Learn to use AI in your daily work',
        description: 'You don\'t need to become a technical expert — you just need to know which tools save you the most time in your specific work.',
        duration: '1 week',
        micro_actions: [
          'Open Claude.ai or ChatGPT and delegate one repetitive task you do at work',
          'Search YouTube: "How [your field] professionals use AI"',
          'List 3 tasks that take you the most time and could be automated',
        ],
      },
      {
        title: 'Build a visible professional presence',
        description: 'People are searching for trusted experts — you have what they\'re looking for, they just need to find you and know you exist.',
        duration: '2 weeks',
        micro_actions: [
          'Write one LinkedIn post about a real lesson you learned at work',
          'Add your most impactful projects to your profile with clear descriptions',
          'Send a short message to 5 people in your field you haven\'t spoken to recently',
        ],
      },
      {
        title: 'Build a small project combining your skills with AI',
        description: 'A small side project is the most powerful way to prove your value and develop new skills simultaneously, with zero risk.',
        duration: '1 month',
        micro_actions: [
          'Identify one small problem in your field that genuinely frustrates you',
          'Sketch the simplest possible solution you could build this weekend',
          'Share it with 3 people and ask for their honest feedback',
        ],
      },
      {
        title: 'Set one professional goal for the next 6 months',
        description: 'Clarity is your most powerful productivity tool — when you know where you\'re going, opportunities start becoming visible.',
        duration: 'Ongoing',
        micro_actions: [
          'Write one sentence describing exactly what you want to be doing in 6 months',
          'Identify the single next step toward that goal',
          'Set a weekly reminder to review your progress for 5 minutes',
        ],
      },
    ],
    resources: {
      youtube: [
        'How to use AI tools for productivity beginners',
        'Building a personal brand on LinkedIn that actually works',
        'Skills AI cannot replace future of work',
      ],
      websites: [
        { name: 'Coursera', url: 'https://www.coursera.org', description: 'Certified professional courses in AI and skill development' },
        { name: 'LinkedIn Learning', url: 'https://www.linkedin.com/learning', description: 'Learn new skills while building your professional network' },
        { name: 'Notion', url: 'https://www.notion.so', description: 'Organize your goals, plans, and projects in one clear place' },
      ],
    },
    closing: 'AI can simulate many things, but it cannot simulate your experience, judgment, and humanity. Start with one small step — right now.',
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

  if (!client) {
    await new Promise((r) => setTimeout(r, 2000))
    return NextResponse.json(DEMO_RESPONSE[locale])
  }

  const systemPrompt = buildSystemPrompt(locale)
  const userMessage = locale === 'ar'
    ? `الإبداع الطبيعي: ${q1}\n\nمكتسبات العمل: ${q2}\n\nالنتيجة المرجوة: ${q3}`
    : `Natural creativity: ${q1}\n\nWork experience gains: ${q2}\n\nDesired outcome: ${q3}`

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2000,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    })

    const raw = message.content[0].type === 'text' ? message.content[0].text : ''
    const fencedMatch = raw.match(/```json\s*([\s\S]*?)\s*```/)
    const bareMatch = raw.match(/(\{[\s\S]*\})/)
    const jsonStr = fencedMatch?.[1] ?? bareMatch?.[1]

    if (!jsonStr) return NextResponse.json({ error: 'Malformed response' }, { status: 502 })

    let parsed: RoadmapResponse
    try {
      parsed = JSON.parse(jsonStr)
    } catch {
      return NextResponse.json({ error: 'Malformed response' }, { status: 502 })
    }

    if (
      typeof parsed.summary !== 'string' ||
      !Array.isArray(parsed.steps) ||
      parsed.steps.length === 0 ||
      !parsed.steps.every(
        (s) =>
          typeof s.title === 'string' &&
          typeof s.description === 'string' &&
          typeof s.duration === 'string' &&
          Array.isArray(s.micro_actions)
      ) ||
      !parsed.resources?.youtube ||
      !parsed.resources?.websites ||
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
