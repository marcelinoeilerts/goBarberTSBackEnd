import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('appointments') // determina que a classe abaixo sera passsada para uma tabela
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('timestamp with time zone')
  date: Date;
}

export default Appointment;
