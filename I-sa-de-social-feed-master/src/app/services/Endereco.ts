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

  async createEndereco(data: IEndereco) {
    const dataFilter = filterProps<IEndereco & { pharmacyCNPJ: string; unidadeSaudeCNPJ: string }>(data, [...ENDERECO_FIELDS] as (keyof IEndereco & { pharmacyCNPJ: string; unidadeSaudeCNPJ: string })[]);

    if (!dataFilter.cep || !dataFilter.logradouro || !dataFilter.bairro || !dataFilter.cidade || !dataFilter.estado || !dataFilter.pais) {
      throw new Error('Campos obrigatórios ausentes: cep, logradouro, bairro, cidade, estado, pais');
    }

    const endereco = await this.repository.save(!dataFilter.pharmacyCNPJ ? { ...dataFilter, unidadeSaude: { cnpj: dataFilter.pharmacyCNPJ } } : { ...dataFilter, farmacia: { cnpj: dataFilter.unidadeSaudeCNPJ } });
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
