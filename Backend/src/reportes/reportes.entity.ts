import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('mensajes') // Nombre de la tabla en la base de datos
export class Mensajes {

    @PrimaryGeneratedColumn('increment')
    IdMensaje: number;

    @Column({ type: 'varchar', nullable: false })
    Mensaje: string;
    
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    Fecha: Date;
}