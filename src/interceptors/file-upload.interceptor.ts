import {
  applyDecorators,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

export function FileUpload(fieldName = 'imagem') {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor(fieldName, {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const ext = extname(file.originalname);
            const fileName = `${Date.now()}-${file.originalname}`;
            cb(null, fileName);
          },
        }),
      }),
    ),
  );
}