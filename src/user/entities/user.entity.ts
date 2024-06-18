import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user') // Nombre de la tabla en la base de datos
export class User {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'varchar', unique: true, length: 25, nullable: false })
    username: string; 

    @Column({ type: 'varchar', nullable: false })
    password: string;
    
}
