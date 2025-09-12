import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { dump } from 'js-yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV === 'development') {
    // Swaggerの初期設定
    const config = new DocumentBuilder()
      .setTitle('Test API Project')
      .setDescription('Test API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    fs.writeFileSync('./swagger-spec.yaml', dump(document, {}));     // main.tsと同じ階層でswagger-spec.yamlファイルとして出力する
    SwaggerModule.setup('api/docs/', app, document);
  }
  await app.listen(8080);
}
bootstrap();

