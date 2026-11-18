
import { z } from 'zod';

export const cadastroSchema = z.object({
  nome: z
    .string()
    .min(1, 'O nome completo é obrigatório'),

  email: z
    .string()
    .min(1, 'O e-mail é obrigatório')
    .email('Digite um e-mail válido'),

  senha: z
    .string()
    .min(8, 'A senha deve ter pelo menos 8 caracteres'),

  confirmarSenha: z
    .string()
    .min(1, 'Confirme sua senha')
}).refine((dados) => dados.senha === dados.confirmarSenha, {
  message: 'As senhas não são iguais',
  path: ['confirmarSenha']
});
