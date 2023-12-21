import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RenderService } from 'nest-next';
import { ParsedUrlQuery } from 'querystring';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // get the RenderService
  const service = app.get(RenderService);
  service.setErrorHandler(
    async (
      err: any,
      req: any,
      res: any,
      pathname: any,
      query: ParsedUrlQuery,
    ) => {
      // send JSON response
      res.json(err.response);
    },
  );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
