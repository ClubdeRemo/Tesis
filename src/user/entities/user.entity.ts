import { TypeOrmModule } from "@nestjs/typeorm";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user') // 'user' es para indicar lo que va en la petición http, que en este caso se eligió user
export class User {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type : 'varchar', unique : true, length : 25, nullable : false}) // nullable es para permitir que el valor de la columna sea nulo o no
    username: string; 

    @Column({type : 'varchar', unique : true, nullable : false})
    password: string;

    @Column({type : "datetime", default: () => 'CURRENT_TIMESTAMP'} )
    calendar: Date
    
}
