import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Users } from '@entities/Users';
import { clientRedis } from '@app/Redis/clientRedis';
import { verificationCodeEmail } from '@utils/verificationCodeEmail';
import { sendEmail } from '@utils/sendEmail';

class SendResetPasswordCodeInEmailController {
  async execute(req: Request, res: Response): Promise<Response> {
    // --- CORREÇÃO: Adicionado try/catch para impedir o crash ---
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ detail: 'E-mail é obrigatório.' });
      }

      const userRepository = getRepository(Users);
      // Vamos assumir que o usuário existe para fins de teste
      // const user = await userRepository.findOne({ where: { email } });
      // if (!user) {
      //   return res.status(404).json({ detail: 'Usuário não encontrado.' });
      // }

      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      const redisKey = `reset-password:${email}`;

      await clientRedis.set(redisKey, otpCode, {
        EX: 300, // 5 minutos de expiração
      });

      // const emailHtml = verificationCodeEmail({
      //   userName: user.nome_completo,
      //   code: otpCode,
      // });

      // --- CORREÇÃO: Envio de e-mail desativado (comentado) ---
      // await sendEmail({
      //   to: email,
      //   subject: 'Código de Recuperação de Senha - iSaúde',
      //   html: emailHtml,
      // });
      
      // --- CORREÇÃO: Mostrar o código no terminal do Docker para teste ---
      console.log('------------------------------------------------');
      console.log(`[VERIFICAÇÃO DE E-MAIL SIMULADA]`);
      console.log(`E-mail: ${email}`);
      console.log(`O código de verificação é: ${otpCode}`);
      console.log('------------------------------------------------');

      return res
        .status(200)
        .json({ message: 'Código de verificação gerado (ver terminal).' });

    } catch (error) {
      // O try/catch ainda está aqui para apanhar outros erros (ex: Redis)
      console.error('--- ERRO NO CONTROLADOR SendResetCode ---');
      console.error(error);
      console.error('-----------------------------------------');
      return res.status(500).json({ 
        detail: 'Erro interno do servidor.',
        error: error.message 
      });
    }
  }
}

export { SendResetPasswordCodeInEmailController };