import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  try {
    const port = process.env.PORT ?? 3000;
    console.log(`Starting server on port ${port}...`);
    console.log(`DATABASE_URL: ${process.env.DATABASE_URL ? 'Set' : 'NOT SET'}`);
    
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    
    await app.listen(port, '0.0.0.0');
    console.log(`✅ Server is running on port ${port}`);
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    if (error instanceof Error) {
      console.error('Error stack:', error.stack);
    }
    process.exit(1);
  }
}
bootstrap();
