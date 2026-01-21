import { Profissional } from '../entities/profissional.entity';

export interface IProfissionalRepository {
    findById(id: number): Promise<Profissional | null>;
    findAll(): Promise<Profissional[]>;
    create(profissional: Profissional): Promise<Profissional>;
    update(id: number, profissional: Partial<Profissional>): Promise<Profissional>;
    delete(id: number): Promise<void>;
}