import { InternalServerErrorException } from '@nestjs/common';
import * as fs from 'fs';
import path from 'path';

export const downloadImageAsPng = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new InternalServerErrorException('Error to download image');
  }

  console.log('paso');
  const folderPath = path.resolve('./', '././generated/images/');

  fs.mkdirSync(folderPath, { recursive: true });

  const imageNamePng = `${Date.now()}.png`;
  const buffer = Buffer.from(await response.arrayBuffer());

  fs.writeFileSync(`${folderPath}/${imageNamePng}`, buffer);
};
