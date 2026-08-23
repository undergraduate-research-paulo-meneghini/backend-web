import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('conteudos')
export class Conteudo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  titulo: string;

  @Column({ type: 'varchar', length: 100 })
  categoria: string;

  @Column({ type: 'varchar', length: 50 })
  status: string; // ex: Rascunho, Publicado

  @Column({ type: 'json' })
  blocos: any; // Armazena o JSON gerado pelo BlockNote

  @Column({ type: 'int', name: 'semana_apresentacao', nullable: true })
  semanaApresentacao: number;

  @Column({ type: 'varchar', length: 100, nullable: true })
  fase: string;

  @Column({ type: 'varchar', length: 50, name: 'nivel_risco', nullable: true })
  nivelRisco: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  link: string;

  @Column({ type: 'varchar', length: 255, name: 'referencia_material', nullable: true })
  referenciaMaterial: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  tipo: string;

  @Column({ type: 'varchar', length: 100, name: 'condicao_envio', nullable: true })
  condicaoEnvio: string;

  @Column({ type: 'varchar', length: 255, name: 'imagem_capa', nullable: true })
  imagemCapa: string;

  @Column({ type: 'varchar', length: 255, name: 'autor_id', nullable: true })
  autorId: string;

  @Column({ type: 'varchar', length: 255, name: 'autor_email', nullable: true })
  autorEmail: string;

  @CreateDateColumn({ name: 'criado_em' })
  criadoEm: Date;

  @UpdateDateColumn({ name: 'atualizado_em' })
  atualizadoEm: Date;
}
