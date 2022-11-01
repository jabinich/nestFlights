import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, createQueryBuilder } from 'typeorm';
import { Flights } from '../entities/flights.entity';
import { Airlines } from 'src/entities/airlines.entity';
import { Flight } from './flight.model';

@Injectable()
export class FlightsService {
    constructor(
        @InjectRepository(Flights)
        private readonly flightsRepository: Repository<Flights>,
        @InjectRepository(Airlines)
        private readonly airlinesRepository: Repository<Airlines>
    ){}

    async findAll(): Promise<any> {
        //return this.flightsRepository.find();
        return this.flightsRepository
            .createQueryBuilder("flights")
            .innerJoinAndSelect("flights.airlines", "airlines")
            .orderBy("flights.id")
            .getMany();
    }

    async findOne(id: number): Promise<Flights> {
        //return this.flightsRepository.findOne({id: id});
        return this.flightsRepository.findOne({id: id}, {relations: ["airlines"]});
      }

    async query(orig: string, dest: string): Promise<any> {
        //return await this.flightsRepository.find({origin: orig, destination: dest});
        return this.flightsRepository
            .createQueryBuilder("flights")
            .innerJoinAndSelect("flights.airlines", "airlines")
            .where("flights.origin = :origin", { origin: orig })
            .andWhere("flights.destination = :destination", { destination: dest })
            .getMany();
    }

    async create(flight: Flight): Promise<any> {
        return await this.flightsRepository.save(flight, {reload: true});
    }

    async update(flight: Flight): Promise<UpdateResult> {
        return await this.flightsRepository.update(flight.id, flight);
    }

    async delete(id: number): Promise<any> {
        return this.flightsRepository.delete(id);
    }

    async getFlightOrigins(): Promise<any>{
        return await this.flightsRepository.query("SELECT DISTINCT origin FROM flights ORDER BY origin");
    }

    async getFlightDestinations(): Promise<any>{
        return await this.flightsRepository.query("SELECT DISTINCT destination FROM flights ORDER BY destination");
    }

    async getFlightAirlines(): Promise<any>{
        //return await this.airlinesRepository.query("SELECT DISTINCT name FROM airlines ORDER BY name");   
        return await this.airlinesRepository.find();    
    }
}
