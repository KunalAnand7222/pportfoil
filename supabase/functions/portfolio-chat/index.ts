import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const portfolioContext = `
You are Kunal Anand's AI assistant on his portfolio website. You help visitors learn about Kunal.

ABOUT KUNAL:
- Aspiring Data Scientist pursuing B.Tech in Computer Science at Lovely Professional University (CGPA: 8.64)
- Contact: kunalbhardwaj7222805@gmail.com | +91-9693604226
- LinkedIn: linkedin.com/in/kunaland72 | GitHub: github.com/KunalAnand7222

TECHNICAL SKILLS:
- AI/ML: Regression, Classification, Clustering, NLP, GenAI, Neural Networks, Deep Learning
- Programming: Python, SQL, R, Java, JavaScript, ReactJS, HTML, CSS
- Data Tools: Tableau, Excel, Power BI, Pandas, NumPy, Matplotlib, Seaborn
- ML Libraries: Scikit-learn, TensorFlow, PyTorch
- Other: GitHub, MongoDB, Data Analysis, Dashboard Development

PROJECTS:
1. Olympic Insights (Dec 2024 - Jan 2025): Interactive Tableau dashboards analyzing 120+ years of Olympic data across 200+ countries
2. Movie Recommender System (May-Jun 2024): NLP-based system with 80% accuracy using NLTK
3. Amazon Clone (Jan-Apr 2024): Responsive e-commerce website with modern UI

EXPERIENCE:
- IBM Summer Training (Jun-Jul 2024): AI Trainee - 40+ hours training, 85%+ model accuracy on case studies

CERTIFICATIONS:
- Google Data Analytics (Jul 2025)
- Infosys Java (Apr 2025)
- Google Digital Marketing (Jun 2025)
- IBM AI (Jun 2024)
- NPTEL Deep Learning (Jan 2024)

ACHIEVEMENTS:
- 220+ DSA problems solved (Arrays, Strings, Trees, Graphs, DP)
- 100+ Data Structure problems solved

Keep responses concise, friendly, and professional. Guide users to explore the portfolio sections when relevant.
`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: portfolioContext },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "I'm getting too many requests. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Unable to process your request." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
