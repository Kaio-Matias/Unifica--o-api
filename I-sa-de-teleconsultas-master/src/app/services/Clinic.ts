import { IClinic } from '../interfaces/clinic';
import { CLINIC_FIELDS } from '../utils/listOfFields';
import { filterProps } from '../utils/filterProps';
import { ClinicRepository } from "../repositories/Clinic";

export class ClinicService {
  private repository: ClinicRepository;

  constructor() {
    this.repository = new ClinicRepository();
  }

  async createClinic(data: IClinic) {
    const dataFilter = filterProps(data, [...CLINIC_FIELDS] as (keyof IClinic)[]);

    // Validação de campos obrigatórios
    if (
      !dataFilter.cidade ||
      !dataFilter.cnpj ||
      !dataFilter.email ||
      !dataFilter.especialidades ||
      !dataFilter.estado ||
      !dataFilter.infraestrutura ||
      !dataFilter.nome_fantasia ||
      !dataFilter.telefone
    ) {
      throw new Error('Campos obrigatórios ausentes');
    }

    try {
        const clinic = await this.repository.save(dataFilter);
        return clinic;
    } catch (error) {
        throw new Error('Erro ao salvar dados da clínica no banco.');
    }
  }

  async getClinics({ queries, id }: { queries?: any; id?: number }) {
    let resultItems: any = null;

    if (queries && id) {
      resultItems = await this.repository.findByQueryOne({ ...queries, id_clinica: id });
      return resultItems; // Retorna objeto único
    }

    if (queries) {
      resultItems = await this.repository.findByQuery({ ...queries });
    } else if (id) {
      resultItems = await this.repository.findById(id);
    } else {
      resultItems = await this.repository.findAll();
    }

    return resultItems;
  }

  async updateClinic(id: number, data: Partial<IClinic>) {
    const clinic = await this.repository.findById(id);
    if (!clinic) {
        throw new Error('Clínica não encontrada');
    }

    const dataFilter = filterProps(data, [...CLINIC_FIELDS] as (keyof IClinic)[]);

    // Em atualizações (PATCH), nem sempre todos os campos são obrigatórios.
    // Se for PUT, descomente a validação abaixo. Se for PATCH, deixe permissivo.
    /*
    if (
      !dataFilter.nome_fantasia && 
      !dataFilter.cnpj // ... adicione lógica conforme regra de negócio
    ) {
       // throw new Error('Nenhum dado válido para atualização');
    }
    */

    return await this.repository.update(id, dataFilter);
  }

  // CORREÇÃO: Nome do método alterado de deleteExam para deleteClinic
  async deleteClinic(id: number) {
    const clinic = await this.repository.findById(id);
    if (!clinic) {
        throw new Error('Clínica não encontrada');
    }
    await this.repository.delete(id);
    return { message: "Clínica removida com sucesso" };
  }
}