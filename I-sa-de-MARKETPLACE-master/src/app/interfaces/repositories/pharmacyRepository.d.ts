import { FindOptionsWhere } from 'typeorm';
import { IPharmacy,IPharmacyProduct } from '../pharmacy';
import { Pharmacy,PharmacyProduct } from '../../entities';

export interface IPharmacyRepository {
  save(data: IPharmacy): Promise<Pharmacy>;
  update(id: number, data: IPharmacy): Promise<Pharmacy | null>;
  findById(id: number): Promise<Pharmacy | null>;
  findByQuery(query: FindOptionsWhere<Pharmacy> | FindOptionsWhere<Pharmacy>[]): Promise<Pharmacy[] | null>;
  findByQueryOne(query: FindOptionsWhere<Pharmacy> | FindOptionsWhere<Pharmacy>[]): Promise<Pharmacy | null>;
  findAll(): Promise<Pharmacy[]>;
  delete(id: number): Promise<null>;
}

export interface IPharmacyProductRepository {
  save(data: IPharmacyProduct): Promise<PharmacyProduct>;
  update(id: number, data: IPharmacyProduct): Promise<PharmacyProduct | null>;
  findById(id: number): Promise<PharmacyProduct | null>;
  findByQuery(query: FindOptionsWhere<PharmacyProduct> | FindOptionsWhere<PharmacyProduct>[]): Promise<PharmacyProduct[] | null>;
  findByQueryOne(query: FindOptionsWhere<PharmacyProduct> | FindOptionsWhere<PharmacyProduct>[]): Promise<PharmacyProduct | null>;
  findAll(): Promise<PharmacyProduct[]>;
  delete(id: number): Promise<null>;
}
