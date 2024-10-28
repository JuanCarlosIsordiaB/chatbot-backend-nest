import * as path from 'path';
import * as fs from 'fs';
import OpenAI from 'openai';

interface Options {
  prompt: string;
  voice?: string;
}

export const textToAudioUseCase = async (openai: OpenAI, options: Options) => {
  const voices = {
    nova: 'nova',
    alloy: 'alloy',
    echo: 'echo',
    onyx: 'onyx',
    fable: 'fable',
    shimmer: 'shimmer',
  };

  const selectedVoice = voices[options.voice] || 'nova';

  const folderPath = path.resolve(__dirname, '../../../generated/audios/');
  const speechFile = path.resolve(`${folderPath}/${new Date().getTime()}.mp3`);

  fs.mkdirSync(folderPath, { recursive: true });

  const mp3 = await openai.audio.speech.create({
    model: 'tts-1',
    voice: selectedVoice,
    input: options.prompt,
    response_format: 'mp3',
  });

  const buffer = Buffer.from(await mp3.arrayBuffer());
  fs.writeFileSync(speechFile, buffer);

  return speechFile;
};
