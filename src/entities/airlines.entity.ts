import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Flights } from './flights.entity';

@Entity()
export class Airlines{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column("text")
    name: string;

    @OneToOne((type) => Flights, (flights) => flights.airlines)
    flights: Flights;
}