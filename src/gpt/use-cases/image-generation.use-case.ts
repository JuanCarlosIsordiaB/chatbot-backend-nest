import OpenAI from 'openai';
import { downloadImageAsPng } from 'src/helpers/download-image-as-png';


interface Options {
  prompt: string;
  originalImage?: string;
  maskImage?: string;
}

export const imageGenerationUseCase = async (
  openai: OpenAI,
  { prompt, originalImage, maskImage }: Options,
) => {
  //TODO: Verificar originalImage

  const response = await openai.images.generate({
    prompt: prompt,
    model: 'dall-e-3',
    n: 1,
    size: '1024x1024',
    quality: 'standard',
    response_format: 'url',
  });

  //TODO: Guardar la imagen en FS
  await downloadImageAsPng(response.data[0].url);

  return {
    url: response.data[0].url,
    localPath: '',
    revised_prompt: response.data[0].revised_prompt,
  };
};
