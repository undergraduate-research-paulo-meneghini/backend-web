import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { CadastroBinomioSchema } from "./cadastro-binomio.schema";

@Entity('tb_user_mae')
export class UserMaeSchema {
    @PrimaryGeneratedColumn()
    id_user_mae: number;

    @Column()
    id_binomio: number;

    @Column({ unique: true, length: 100 })
    email: string;

    @Column({ length: 255 })
    password_hash: string;

    @Column({ default: true })
    ativo: boolean;

    @CreateDateColumn()
    data_cadastro: Date;

    @Column({ type: 'datetime', nullable: true })
    ultimo_login: Date;

    @ManyToOne(() => CadastroBinomioSchema, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_binomio' })
    cadastroBinomio: CadastroBinomioSchema;
}
