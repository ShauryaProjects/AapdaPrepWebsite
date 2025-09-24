import { NextRequest, NextResponse } from "next/server"

const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions"
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"

export async function POST(req: NextRequest) {
  try {
    const provider = process.env.AI_PROVIDER || "openai" // "openai" | "gemini"
    const openaiKey = process.env.OPENAI_API_KEY
    const geminiKey = process.env.GEMINI_API_KEY

    const body = await req.json()
    const { messages } = body as { messages: Array<{ role: string; content: string }> }

    const systemPrompt =
      "You are a helpful disaster preparedness assistant. Provide concise, practical, safety-first guidance for disasters (earthquakes, floods, fires, cyclones, landslides, heatwaves, thunderstorms, tsunamis, pandemics, chemical spills). Prefer bullet points. Advise contacting local emergency services for urgent situations and tailor advice to general best practices. Avoid medical or legal guarantees."
    
    if (provider === "gemini") {
      if (!geminiKey) {
        return NextResponse.json(
          { error: "GEMINI_API_KEY is not set on the server." },
          { status: 500 }
        )
      }
      const prompt = [
        { role: "user", parts: [{ text: systemPrompt }] },
        ...((messages || []).map((m) => ({ role: m.role === "assistant" ? "model" : "user", parts: [{ text: m.content }] }))),
      ]

      const gemResp = await fetch(`${GEMINI_API_URL}?key=${geminiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: prompt })
      })

      if (!gemResp.ok) {
        const errText = await gemResp.text()
        return NextResponse.json(
          { error: "Gemini request failed", detail: errText },
          { status: gemResp.status }
        )
      }
      const data = await gemResp.json()
      const reply: string = data?.candidates?.[0]?.content?.parts?.[0]?.text || ""
      return NextResponse.json({ reply })
    } else {
      if (!openaiKey) {
        return NextResponse.json(
          { error: "OPENAI_API_KEY is not set on the server." },
          { status: 500 }
        )
      }
      const payload = {
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          ...(messages || []),
        ],
        temperature: 0.4,
        max_tokens: 600,
      }

      const resp = await fetch(OPENAI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openaiKey}`,
        },
        body: JSON.stringify(payload),
      })

      if (!resp.ok) {
        const errText = await resp.text()
        return NextResponse.json(
          { error: "OpenAI request failed", detail: errText },
          { status: resp.status }
        )
      }

      const data = await resp.json()
      const reply: string = data?.choices?.[0]?.message?.content || ""
      return NextResponse.json({ reply })
    }
  } catch (e: any) {
    return NextResponse.json(
      { error: "Unexpected server error", detail: String(e?.message || e) },
      { status: 500 }
    )
  }
}


