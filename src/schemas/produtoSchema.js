
import { z } from 'zod';

export const produtoSchema = z.object({
  nome: z
    .string()
    .min(3, 'O nome deve ter pelo menos 3 caracteres')
    .max(100, 'O nome deve ter no máximo 100 caracteres'),

  categoria: z
    .string()
    .min(1, 'A categoria é obrigatória'),

  preco: z
    .coerce
    .number()
    .positive('O preço deve ser maior que zero'),

  quantidade: z
    .coerce
    .number()
    .int('A quantidade deve ser um número inteiro')
    .min(0, 'A quantidade não pode ser negativa'),

  disponivel: z
    .boolean()
});
