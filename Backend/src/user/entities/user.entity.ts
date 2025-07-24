import { Pagos } from "src/pagos/entities/pago.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user') // Nombre de la tabla en la base de datos
export class User {

    @PrimaryGeneratedColumn('increment')
    Id: number;

    @Column({ type: 'varchar', nullable: false })
    Nombre: string; 

    @Column({ type: 'varchar', nullable: false })
    Apellido: string; 

    @Column({ type: 'varchar', nullable: false, unique: true })
    Email: string;

    @Column({ type: 'varchar', nullable: false, name: 'Contraseña' })
    Contraseña: string;

    @Column({type: 'timestamp', nullable: false})
    FechaDeNacimiento: Date;

    @Column({ type: 'float', nullable: false, unique: true })
    Dni: number;

    @Column({ default: 'usuario' }) // por defecto será 'usuario'
    Categorias: string;

    @Column({ default: 'Al dia' })
    EstadoSocio: string;
  /*   el estado socio por default en la base de datos es 'Al dia':
  `EstadoSocio` enum('Al dia','Mora','Inactivo') NOT NULL DEFAULT 'Al dia',
Puede estar siendo este el problema? Es necesario que cuando creo un socio se cree con este estado, pero si esto esta interfiriendo entonces puedo hacer la logica de otra forma

NO SE ESTA ACTUALIZANDO CON LAS FUNCIONES DE CALCULAR FECHA CUANDO MODIFIQUE EL ESTADO DEl SOCIO EN LA BASE DE DATOS. ENTONCES ESTAS TAMBEIN ESTAN MAL

*/
      // Relación uno a muchos con la entidad Pago
    @OneToMany(() => Pagos, pagos => pagos.user)
    pagos: Pagos[];
}
