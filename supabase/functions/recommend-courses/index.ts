import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { answers, courses } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are an intelligent course recommendation engine. You will receive:
1. A user's preferences (12 factors)
2. A catalog of available courses with metadata

Your job: Analyze the user's intent deeply and select the top 5 most suitable courses from the catalog. Return ONLY valid JSON.

Rules:
- If user is beginner, avoid expert-level courses
- If user has low time, prefer shorter courses
- If user prefers practical learning, prioritize project-based courses
- If budget is "Free only", only recommend free courses (price=0)
- Match subject, purpose, and level as closely as possible
- Prioritize high subscriber count and review count (popularity)
- Consider the sub-interest to pick the most relevant courses within the subject`;

    const userPrompt = `## User Preferences
- Subjects of interest: ${answers.subjects.join(", ")}
- Goal/Purpose: ${answers.purpose}
- Skill level: ${answers.skillLevel}
- Learning style: ${answers.learningStyle}
- Time availability: ${answers.timeAvailability}
- Budget: ${answers.budget}
- Specific sub-interest: ${answers.subInterest}
- Career objective: ${answers.careerObjective}
- Preferred course duration: ${answers.durationPreference}
- Language preference: ${answers.languagePreference}
- Certification needed: ${answers.certificationRequirement}
- Project preference: ${answers.projectPreference}

## Available Course Catalog (JSON)
${JSON.stringify(courses.map((c: any) => ({
  id: c.id,
  title: c.course_title,
  price: c.price,
  subscribers: c.num_subscribers,
  reviews: c.num_reviews,
  lectures: c.num_lectures,
  level: c.level,
  duration_hours: c.content_duration,
  subject: c.subject,
  purpose: c.purpose,
})))}

Return a JSON array of exactly 5 recommended courses. Each object must have:
- "id": the course id from catalog
- "reason": 1-2 sentence explanation of why this course matches
- "key_benefits": array of 3 short benefit strings
- "match_score": a number 1-100 representing how well it matches`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "recommend_courses",
              description: "Return the top 5 recommended courses",
              parameters: {
                type: "object",
                properties: {
                  recommendations: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "string" },
                        reason: { type: "string" },
                        key_benefits: { type: "array", items: { type: "string" } },
                        match_score: { type: "number" },
                      },
                      required: ["id", "reason", "key_benefits", "match_score"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["recommendations"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "recommend_courses" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      return new Response(JSON.stringify({ error: "No recommendations generated" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const result = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("recommend error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
