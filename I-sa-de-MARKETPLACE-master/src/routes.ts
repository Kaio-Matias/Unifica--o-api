import express from 'express';

import { authentication } from './app/middlewares';

import DefaultControllersUsers from './app/controllers/DefaultControllers';
import CarrinhoRoutes from './app/routes/CarrinhoRoutes';
import MedicamentoRoutes from './app/routes/MedicamentoRoutes';
import PagamentoRoutes from './app/routes/PagamentoRoutes';
import PedidoRoutes from './app/routes/PedidoRoutes';
import PedidoItemsRoutes from './app/routes/PedidoItemsRoutes';
import Pharmacy from './app/routes/Pharmacy';
import PharmacyProduct from './app/routes/PharmacyProduct';
import Promocao from './app/routes/Promocao';
import ReceitaDigital from './app/routes/ReceitaDigital';

const router = express.Router()
//default
router.get('/', authentication, DefaultControllersUsers);
router.get('/api', authentication, DefaultControllersUsers);

router.use('/api/carrinho', authentication, CarrinhoRoutes);
router.use('/api/medicamento', authentication, MedicamentoRoutes);
router.use('/api/pagamento', authentication, PagamentoRoutes);
router.use('/api/pedido', authentication, PedidoRoutes);
router.use('/api/pedido-item', authentication, PedidoItemsRoutes);
router.use('/api/pharmacy', authentication, Pharmacy);
router.use('/api/product', authentication, PharmacyProduct);
router.use('/api/promocao', authentication, Promocao);
router.use('/api/receita-digital', authentication, ReceitaDigital);

export default router;
