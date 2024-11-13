import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    
    @Column({ type: 'float', nullable: true })
    IdEstadoSocio: number;

    @Column({ default: 'usuario' }) // por defecto será 'usuario'
    Categorias: string;
}
