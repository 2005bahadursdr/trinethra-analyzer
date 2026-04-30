export const buildPrompt = (transcript) => {
  return `
You are an expert evaluator analyzing a Fellow's performance based on a supervisor transcript.

Return STRICT JSON ONLY. No explanation outside JSON.

JSON format:
{
  "evidence": [
    {
      "quote": "",
      "tag": "positive | negative | neutral"
    }
  ],
  "score": {
    "value": 1-10,
    "justification": ""
  },
  "kpis": [],
  "gaps": [],
  "questions": []
}

Instructions:
- Extract 5–8 key quotes
- Tag each quote correctly
- Give realistic score (not always high)
- Justify using evidence
- Map to business KPIs (like productivity, ownership, team coordination, execution)
- Identify missing areas (gaps)
- Suggest 3–5 follow-up questions

Transcript:
${transcript}
`;
};


