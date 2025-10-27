import { Router } from 'express';
import multer from 'multer';

// Controllers
import {
  CarrinhoController,
  MedicamentoController,
  PagamentoController,
  PedidoController,
  PharmacyController,
  PharmacyProductController,
  PromocaoController,
  ReceitaDigitalController,
  UploadController
} from '../controllers/MarketplaceAPI';

const upload = multer(); // Usado para upload de arquivos
const marketplaceRoutes = Router();

// Helper para rotas REST padrão
const registerCrudRoutes = (basePath: string, controller: any) => {
  marketplaceRoutes.get(`/${basePath}/:id?`, controller.getAll);
  marketplaceRoutes.post(`/${basePath}/create`, controller.create);
  marketplaceRoutes.put(`/${basePath}/:id`, controller.update);
  marketplaceRoutes.delete(`/${basePath}/:id`, controller.remove);
};

// Rotas CRUD para cada serviço
registerCrudRoutes('carrinho', CarrinhoController);
registerCrudRoutes('medicamento', MedicamentoController);
registerCrudRoutes('pagamento', PagamentoController);
registerCrudRoutes('pedido', PedidoController);
registerCrudRoutes('pharmacy', PharmacyController);
registerCrudRoutes('product', PharmacyProductController);
registerCrudRoutes('promocao', PromocaoController);
registerCrudRoutes('receita-digital', ReceitaDigitalController);

// Rota de upload de arquivos
marketplaceRoutes.post('/upload-files', upload.single('file'), UploadController.upload);

export default marketplaceRoutes;
