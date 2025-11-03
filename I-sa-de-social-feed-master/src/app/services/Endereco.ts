import { EnderecoRepository } from '../repositories/Endereco';
import { Endereco } from '../entities/Endereco';
import { IEndereco } from '../interfaces/endereco';
import { filterProps } from '../utils/filterProps';
import { ENDERECO_FIELDS } from '../utils/listFields'; // Você precisará criar este arquivo e os campos correspondentes

export class EnderecoService {
  private repository: EnderecoRepository;

  constructor() {
    this.repository = new EnderecoRepository();
  }

  async createEndereco(data: IEndereco & { pharmacyCNPJ?: string; unidadeSaudeCNPJ?: string }) {
    // <<< CORREÇÃO AQUI
    // 1. Filtramos apenas os campos que realmente existem na tabela 'enderecos'
    const dataFilter = filterProps<IEndereco>(data, [...ENDERECO_FIELDS] as (keyof IEndereco)[]);

    if (!dataFilter.cep || !dataFilter.logradouro || !dataFilter.bairro || !dataFilter.cidade || !dataFilter.estado || !dataFilter.pais) {
      throw new Error('Campos obrigatórios ausentes: cep, logradouro, bairro, cidade, estado, pais');
    }

    // 2. Criamos o objeto de salvamento com os dados filtrados
    const saveOptions: any = { ...dataFilter };

    // 3. Verificamos os CNPJs no objeto 'data' original (não filtrado)
    // e adicionamos a relação correta (farmacia ou unidadeSaude).
    if (data.pharmacyCNPJ) {
      saveOptions.farmacia = { cnpj: data.pharmacyCNPJ };
    } else if (data.unidadeSaudeCNPJ) {
      saveOptions.unidadeSaude = { cnpj: data.unidadeSaudeCNPJ };
    }
    // Fim da Correção

    const endereco = await this.repository.save(saveOptions);
    return endereco;
  }

  async getEnderecos({ queries, id }: any): Promise<Endereco[]> {
    let resultItems: any = null;

    if (queries && id) {
      resultItems = await this.repository.findByQueryOne({ ...queries, id });
    }

    if (queries) {
      resultItems = await this.repository.findByQuery({ ...queries });
    }

    if (id) {
      resultItems = await this.repository.findById(id);
    }

    if (queries || id) {
      return resultItems;
    }

    resultItems = await this.repository.findAll();
    return resultItems;
  }

  async updateEndereco(id: number, data: Partial<IEndereco>): Promise<Endereco | null> {
    const dataFilter = filterProps<IEndereco>(data, [...ENDERECO_FIELDS] as (keyof IEndereco)[]);

    return await this.repository.update(id, dataFilter);
  }

  async deleteEndereco(id: number): Promise<null> {
    if (!id) throw new Error('ID do endereço ausente');
    await this.repository.delete(id);
    return null;
  }
}