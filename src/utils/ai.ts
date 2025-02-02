import Groq from 'groq-sdk';
import katex from 'katex';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

const processLatex = (text: string): string => {
  // First, escape any backslashes that aren't part of LaTeX expressions
  text = text.replace(/\\\\/g, '\\'); // Ensure backslashes are not over-escaped
  
  // Convert plain text math expressions to LaTeX
  text = text.replace(/∫(?:_([^_\s]+))?(?:\^([^\s]+))?/g, (_, lower, upper) => {
    let latex = '\\int';
    if (lower) latex += `_{${lower}}`;
    if (upper) latex += `^{${upper}}`;
    return `$${latex}$`;
  });
  
  // Convert subscripts and superscripts
  text = text.replace(/([^_])<sub>([^<]+)<\/sub>/g, '$1_$2');
  text = text.replace(/([^_])<sup>([^<]+)<\/sup>/g, '$1^$2');
  
  // Match both inline and display LaTeX with proper handling of nested delimiters
  return text.replace(/\$\$((?:[^$]|\$(?!\$))*)\$\$|\$((?:[^$]|\$(?!\$))*)\$|\[((?:[^\]])*)\]/g, (match, display, inline, legacy) => {
    try {
      const latex = (display || inline || legacy || '').trim();
      
      // Skip empty expressions
      if (!latex) return match;
      
      const html = katex.renderToString(latex, {
        throwOnError: false,
        displayMode: !!display || !!legacy,
        strict: "ignore",  // Ensures KaTeX ignores unknown commands
        trust: true,
        output: "html", // Ensures better HTML rendering
        macros: {
          "\\N": "\\mathbb{N}",
          "\\Z": "\\mathbb{Z}",
          "\\Q": "\\mathbb{Q}",
          "\\R": "\\mathbb{R}",
          "\\C": "\\mathbb{C}"
        }
      });
      
      
      if (display || legacy) {
        return `<div class="flex justify-center my-4 katex-display">${html}</div>`;
      }
      return html;
    } catch (error) {
      console.error('LaTeX rendering error:', error);
      // Return the original expression if rendering fails
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