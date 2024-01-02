import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { RenderService } from 'nest-next';
import { ParsedUrlQuery } from 'querystring';

async function bootstrap() {
  //TO-DO: How can I configure routing for API requests separately from Next.js routes in a Nest.js application?
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
      if (req.url.startsWith('/email-api')) {
      // For all errors except email-api, we will render the error page
      res.json(err.response);
      }
    },
  );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
