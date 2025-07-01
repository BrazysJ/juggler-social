import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  const { profession, audience, goal, platform, tone, postCount } = req.body;

  const prompt = `
I am a ${profession} targeting ${audience}. 
My goal is ${goal}. 
Generate ${postCount} social media content ideas for ${platform} in a ${tone} tone. 
Include captions, hashtags, and content formats. Respond in a markdown table.
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "You are a helpful and playful AI social media strategist." },
      { role: "user", content: prompt },
    ],
    temperature: 0.8,
  });

  res.status(200).json({ result: completion.choices[0].message.content });
}
