import Groq from 'groq-sdk';
import katex from 'katex';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

const processLatex = (text: string): string => {
  // Skip if the content is already KaTeX HTML
  if (text.includes('class="katex"')) {
    return text;
  }

  // Rest of your existing processLatex code...
  const katexOptions: katex.KatexOptions = {
    throwOnError: false,
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
  };

  // Process display math
  text = text.replace(/\$\$([\s\S]+?)\$\$/g, (match, latex) => {
    try {
      const html = katex.renderToString(latex.trim(), katexOptions);
      return `<div class="flex justify-center my-4">${html}</div>`;
    } catch (error) {
      console.error('KaTeX Display Math Error:', error);
      return match;
    }
  });

  // Process inline math
  text = text.replace(/\$([^$]+?)\$/g, (match, latex) => {
    try {
      const html = katex.renderToString(latex.trim(), {
        ...katexOptions,
        displayMode: false
      });
      return `<span class="katex-inline">${html}</span>`;
    } catch (error) {
      console.error('KaTeX Inline Math Error:', error);
      return match;
    }
  });

  return text;
};

export const getAIResponse = async (messages: { role: string; content: string; }[]) => {
  try {
    const startThinking = Date.now();
    
    messages.unshift({
      role: "system",
      content: "Do not use LaTeX or any other mathematical typesetting in responses. Use plain text or HTML for mathematical expressions, such as square roots (√), fractions (a/b), powers (x^n), and integrals (∫). Ensure all mathematical expressions are clear and readable without LaTeX syntax."
    });

    const response = await groq.chat.completions.create({
      messages,
      model: "deepseek-r1-distill-llama-70b",
      temperature: 0.7,
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
