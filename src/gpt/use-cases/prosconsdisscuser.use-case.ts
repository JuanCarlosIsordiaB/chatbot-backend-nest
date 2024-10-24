import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const prosConsDiscusserUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: 'system',
        content: `
            Te serán proveídos dos o mas opciones sobre algun tema en español,
           Debes responder cual de esas opciones es la mejor para escoger (diciendo pros y contras de cada una),
            Debes de responder en formato JSON, 
            
        
    
            Ejemplo de salida:
            {
              options: string,
              comparation: string, 
              messageWinner: string, // Usa emojis siempre
            }
            
            
            `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    model: 'gpt-3.5-turbo-1106',
    temperature: 0.3,
    max_tokens: 150,
    response_format: {
      type: 'json_object',
    },
  });

  // console.log(completion);
  return completion.choices[0].message;
};
