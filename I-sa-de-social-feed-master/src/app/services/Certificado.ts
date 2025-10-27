import { CertificadoRepository } from '../repositories/Certificado';
import { Certificado } from '../entities/Certificado';
import { ICertificado } from '../interfaces/certificado';
import { filterProps } from '../utils/filterProps';
import { CERTIFICADO_FIELDS } from '../utils/listFields'; // Você precisará criar este arquivo e os campos correspondentes

export class CertificadoService {
  private repository: CertificadoRepository;

  constructor() {
    this.repository = new CertificadoRepository();
  }

  async createCertificado(data: ICertificado) {
    const dataFilter = filterProps<ICertificado>(data, [...CERTIFICADO_FIELDS] as (keyof ICertificado)[]);

    if (!dataFilter.hash_certificado || !dataFilter.url_certificado || !dataFilter.emitido_em || !dataFilter.id_inscricao) {
      throw new Error('Campos obrigatórios ausentes: hash_certificado, url_certificado, emitido_em, id_inscricao');
    }

    const certificado = await this.repository.save({ ...dataFilter, inscricao: { id_inscricao: dataFilter.id_inscricao } });
    return certificado;
  }

  async getCertificados({ queries, id }: any): Promise<Certificado[]> {
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

  async updateCertificado(id: number, data: Partial<ICertificado>): Promise<Certificado | null> {
    const dataFilter = filterProps<ICertificado>(data, [...CERTIFICADO_FIELDS] as (keyof ICertificado)[]);

    return await this.repository.update(id, dataFilter);
  }

  async deleteCertificado(id: number): Promise<null> {
    if (!id) throw new Error('ID do certificado ausente');
    await this.repository.delete(id);
    return null;
  }
}
