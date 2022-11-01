import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flights } from './entities/flights.entity';
import { Airlines } from './entities/airlines.entity';
import { FlightsModule } from './flights/flights.module';
import { AppController } from './app.controller';
//import { AppService } from './app.service';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1225',
      database: 'transportation',
      entities: [Flights, Airlines],
      synchronize: false, //be carefull
    }),
    FlightsModule
  ],
  controllers: [AppController],
})
export class AppModule {}
