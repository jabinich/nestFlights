import { Module } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { FlightsController } from './flights.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flights } from '../entities/flights.entity';
import { Airlines } from 'src/entities/airlines.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Flights]), TypeOrmModule.forFeature([Airlines])],
    providers: [FlightsService],
    controllers: [FlightsController]
})
export class FlightsModule {}
