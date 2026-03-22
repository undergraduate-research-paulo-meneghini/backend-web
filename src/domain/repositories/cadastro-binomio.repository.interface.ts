import { CadastroBinomio } from '../entities/cadastro-binomio.entity';

export interface ICadastroBinomioRepository {
    create(cadastro: CadastroBinomio): Promise<CadastroBinomio>;
    findById(id: number): Promise<CadastroBinomio | null>;
    findAll(): Promise<CadastroBinomio[]>;
}
