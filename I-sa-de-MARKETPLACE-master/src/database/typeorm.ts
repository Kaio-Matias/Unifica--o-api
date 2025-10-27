import { DataSource } from 'typeorm';
import {
  Carrinho,
  CarrinhoItem,
  Medicamento,
  Pagamento,
  Pedido,
  Pharmacy,
  PharmacyProduct,
  Promocao,
  ReceitaDigital,
  PedidoItem
} from '../app/entities';

import { CreateMedicamentosTable1699999999999 } from './migrations/2025-04-28_10-39-01_create_medicamentos';
import { CreatePharmaciesTable1699999999999 } from './migrations/2025-04-28_10-39-01_create_pharmacies';
import { CreatePharmacyProductsTable1699999999999 } from './migrations/2025-04-28_10-39-01_create_pharmacy_products';
import { CreateCarrinhosTable1699999999999 } from './migrations/2025-04-28_10-39-02_create_carrinho';
import { CreateCarrinhoItensTable1699999999999 } from './migrations/2025-04-28_10-39-03_create_carrinho_itens';
import { CreatePedidosTable1699999999999 } from './migrations/2025-04-28_10-39-04_create_pedidos';
import { CreatePagamentosTable1699999999999 } from './migrations/2025-04-28_10-39-05_create_pagamentos';
import { CreatePromocoesTable1699999999999 } from './migrations/2025-04-28_10-39-06_create_promocoes';
import { CreateReceitasDigitaisTable1699999999999 } from './migrations/2025-04-28_10-39-07_create_receitas_digitais';
import { CreatePedidoItensTable1699999999999 } from './migrations/2025-04-28_10-39-05_create_pedido_items';


require('dotenv').config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.BD_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [
    Carrinho,
    CarrinhoItem,
    Medicamento,
    Pagamento,
    Pedido,
    Pharmacy,
    PharmacyProduct,
    Promocao,
    ReceitaDigital,
    PedidoItem
  ],
  migrations: [
    CreateMedicamentosTable1699999999999,
    CreatePharmaciesTable1699999999999,
    CreatePharmacyProductsTable1699999999999,
    CreateCarrinhosTable1699999999999,
    CreateCarrinhoItensTable1699999999999,
    CreatePedidosTable1699999999999,
    CreatePagamentosTable1699999999999,
    CreatePromocoesTable1699999999999,
    CreateReceitasDigitaisTable1699999999999,
    CreatePedidoItensTable1699999999999
  ],
});

export default dataSource;
