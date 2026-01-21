import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity('tb_profissional_saude')
export class ProfissionalSchema {
    @PrimaryGeneratedColumn()
    id_profissional: number;

    @Column()
    nome_completo: string;

    @Column()
    cpf: string;

    @Column()
    registro_profissional: string;

    @Column()
    tipo_registro: string;

    @Column()
    cargo: string;

    @Column()
    unidade_saude: string;

    @Column()
    email: string;

    @Column()
    senha_hash: string;

    @Column()
    perfil_acesso: string;

    @Column()
    ativo: boolean;

    @CreateDateColumn()
    data_cadastro: Date;
}
