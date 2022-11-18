import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { FlightsService } from './flights.service';
import { Flights } from '../entities/flights.entity';
import { Flight } from './flight.model';
import { identity } from 'rxjs';

@Controller('flights')
export class FlightsController {
    constructor(private readonly flightsService: FlightsService){}

    // READ ALL
    @Get()
    findAll(): Promise<Flights[]>{
        return this.flightsService.findAll();
    }

    // READ ONE
    @Get("/:id/query")
    findOne(@Param() param): Promise<Flights>{
        return this.flightsService.findOne(param.id);
    }

    // QUERY
    //@Get("/query/:orig/:dest")
    /* Following works also */
    // async query(@Param('orig') orig, @Param('dest') dest): Promise<any> {
    //     return this.flightsService.query(orig,dest);
    // }

    @Get("/query/:orig/:dest") 
    async query(@Param() params): Promise<any> { 
        return this.flightsService.query(params.orig, params.dest); 
    }

    // CREATE
    @Post()
    async create(@Body() flight: Flight): Promise<Flights[]> {
        return this.flightsService.create(flight);
    }

    // UPDATE
    @Patch("/:id/update")
    async update(@Param('id') id, @Body() flight: Flight): Promise<any> {
        flight.id = Number(id);
        return this.flightsService.update(flight);
    }

    // DELETE
    //@Post("/:id/delete")
    @Delete("/:id")
    async delete(@Param('id') id): Promise<any> {
        return this.flightsService.delete(id);
    }

    @Get("/cities/origins") 
    async getOrigins(): Promise<any> { 
        return this.flightsService.getFlightOrigins(); 
    }

    @Get("/cities/destinations") 
    async getDestinations(): Promise<any> { 
        return this.flightsService.getFlightDestinations(); 
    }

    @Get("/airlines") 
    async getAirlines(): Promise<any> { 
        return this.flightsService.getFlightAirlines(); 
    }
}
