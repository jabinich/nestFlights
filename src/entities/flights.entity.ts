import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Airlines } from './airlines.entity';

@Entity()
export class Flights{
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column("varchar", { length: 20 })
    origin: string;
  
    @Column("varchar", { length: 20 })
    destination: string;
  
    @Column('int')
    flightnumber: number;
  
    @Column('timestamp with time zone')
    depart: Date;
  
    @Column('timestamp with time zone')
    arrive: Date;
  
    @Column('boolean')
    nonstop: boolean;

    @Column('int')
    airlinesId: number;

    @OneToOne((type) => Airlines, (airlines) => airlines.flights)
    @JoinColumn({ name: 'airlinesId', referencedColumnName: 'id' })
    airlines: Airlines;
}