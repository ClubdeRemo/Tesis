import { TypeOrmModule } from "@nestjs/typeorm";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('product') 
export class Procuct {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type : 'varchar', unique : true, nullable : false})
    name: string; 

    @Column({type : 'varchar', unique : true, nullable : false})
    description: string;

    @Column({type : 'float'})
    price: number;
    
}
