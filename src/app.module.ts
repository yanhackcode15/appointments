import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CustomerModule } from './customer/customer.module';
import { ServiceModule } from './service/service.module';


@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule, CustomerModule, ServiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
