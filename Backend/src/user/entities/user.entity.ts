import { Pagos } from "src/pagos/entities/pago.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('User') // Nombre de la tabla en la base de datos
export class User {

    @PrimaryGeneratedColumn('increment')
    Id: number;

    @Column({ type: 'varchar', nullable: false })
    Nombre: string; 

    @Column({ type: 'varchar', nullable: false })
    Apellido: string; 

    @Column({ type: 'varchar', nullable: false, unique: true })
    Email: string;

    @Column({ type: 'varchar', nullable: false })
    Contraseña: string;

    @Column({type: 'datetime', nullable: false})
    FechaDeNacimiento: Date;

    @Column({ type: 'float', nullable: false, unique: true })
    Dni: number;

    @Column({ default: 'usuario' }) // por defecto será 'usuario'
    Categorias: string;

    @Column({ default: 'Al dia' })
    EstadoSocio: string;

      // Relación uno a muchos con la entidad Pago
    @OneToMany(() => Pagos, pagos => pagos.user)
    pagos: Pagos[];
}
