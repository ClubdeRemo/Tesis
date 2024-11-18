import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity()
export class Pagos {
  @PrimaryGeneratedColumn()
  IdPago: number;

  @Column()
  UserId: number; // Este es el campo que almacena el ID del usuario

  @ManyToOne(() => User, (user) => user.pagos) // Relación ManyToOne con User
  @JoinColumn({ name: 'UserId' }) // Este es el campo que se usa para la relación
  user: User; // Relación de tipo 'User'

  @Column()
  FechaPago: Date;

  @Column()
  FechaVto: Date;

  @Column()
  Tipo: 'Efectivo' | 'Transferencia';
}
