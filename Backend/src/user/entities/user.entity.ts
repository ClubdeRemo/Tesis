import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user') // Nombre de la tabla en la base de datos
export class User {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', nullable: false })
    username: string; 

    @Column({ type: 'varchar', nullable: false })
    lastName: string; 

    @Column({ type: 'varchar', nullable: false, unique: true })
    email: string;

    @Column({ type: 'varchar', nullable: false })
    password: string;

    @Column({type: 'datetime', nullable: false})
    birthdate: Date;

    @Column({ type: 'float', nullable: false, unique: true })
    dni: number;

    // Domicilio
    // Numero de contacto
    
}
