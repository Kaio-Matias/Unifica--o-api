// 1. Importação da Classe (Named Export)
import { CreateUserController } from './CreateUser';

// 2. Importação das Funções (Default Exports)
import deleteUser from './DeleteUser';
import getUser from './GetUser';
import loginUser from './LoginUser';
import resetPassword from './ResetPassword';
import sendResetPasswordCodeInEmail from './SendResetPasswordCodeInEmail';
import updateUser from './UpdateUser';
import verifyLoginUser from './VerifyLoginUser';
import verifyPasswordCodeInEmail from './VerifyPasswordCodeInEmail';

// 3. Exportação unificada para as Rotas
// Para a classe, instanciamos e pegamos o método handle.
// Para as funções, exportamos diretamente.

export const CreateUser = new CreateUserController().handle;
export const DeleteUser = deleteUser;
export const GetUser = getUser;
export const LoginUser = loginUser;
export const ResetPassword = resetPassword;
export const SendResetPasswordCodeInEmail = sendResetPasswordCodeInEmail;
export const UpdateUser = updateUser;
export const VerifyLoginUser = verifyLoginUser;
export const VerifyPasswordCodeInEmail = verifyPasswordCodeInEmail;