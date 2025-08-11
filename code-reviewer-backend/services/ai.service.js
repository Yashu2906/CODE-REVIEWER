import axios from "axios";


export async function reviewCode(codeSnippet) {
  try {
    const prompt = `
You are a code review assistant. Analyze the following code and provide:

after each below point, please add a blank line for better readability.

1. A short **code quality score (0-10)**.
2. A **summary review** of the code.
3. **Security issues** (if any).
4. **Optimized version of the code**.
5. **Suggestions for improvement in bullet points**.

after each above point, please add a blank line for better readability.

Code:
${codeSnippet}
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error in reviewCode:", error.response?.data || error.message);
    throw new Error("Failed to review code");
  }
}
