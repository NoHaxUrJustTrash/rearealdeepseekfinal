import Groq from 'groq-sdk';
import katex from 'katex';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

const processLatex = (text: string): string => {
  // Ensure LaTeX backslashes are properly preserved
  text = text.replace(/\\\\/g, '\\'); // Prevent double escaping

  // Fix potential issues with misplaced commas inside LaTeX expressions
  text = text.replace(/(?<=\$\$|\$|\\\(|\\\[|\\begin\{.*?\})(.*?),(.*?)(?=\$\$|\$|\\\)|\\\]|\\end\{.*?\})/g, '$1\\,$2');

  // Convert inline and block LaTeX using KaTeX
  return text.replace(/\$\$([^$]+)\$\$|\$([^$]+)\$|\[([^\]]+)\]/g, (match, display, inline, legacy) => {
    try {
      const latex = (display || inline || legacy || '').trim();
      if (!latex) return match;

      const html = katex.renderToString(latex, {
        throwOnError: false,
        displayMode: !!display || !!legacy,
        strict: "ignore",
        trust: true,
        output: "html",
        macros: {
          "\\N": "\\mathbb{N}",
          "\\Z": "\\mathbb{Z}",
          "\\Q": "\\mathbb{Q}",
          "\\R": "\\mathbb{R}",
          "\\C": "\\mathbb{C}"
        }
      });

      return display || legacy
        ? `<div class="flex justify-center my-4 katex-display">${html}</div>`
        : html;
    } catch (error) {
      console.error('KaTeX Rendering Error:', error);
      return match;
    }
  });
};


export const getAIResponse = async (messages: { role: string; content: string; }[]) => {
  try {
    const startThinking = Date.now();
    const response = await groq.chat.completions.create({
      messages,
      model: "deepseek-r1-distill-llama-70b",
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content || '';
    const thinkingMatch = content.match(/<think>(.*?)<\/think>/s);
    
    return {
      content: processLatex(content.replace(/<think>.*?<\/think>/s, '').trim()),
      thinking: thinkingMatch ? thinkingMatch[1].trim() : '',
      thinkingTime: Date.now() - startThinking
    };
  } catch (error) {
    console.error('AI API Error:', error);
    throw new Error('Failed to get AI response');
  }
};