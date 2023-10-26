import { Module } from '@nestjs/common';
import Next from 'next';
import { RenderModule } from 'nest-next';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { resolve } from 'path';

@Module({
  imports: [
    RenderModule.forRootAsync(Next({
          dev: process.env.NODE_ENV !== 'production',
          dir: resolve(__dirname, '..'),
        }),
        { passthrough404: true, viewsDir: null },),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
