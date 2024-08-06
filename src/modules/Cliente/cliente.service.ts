import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../lib/prisma';
import { Client } from '@prisma/client';
import { z } from "zod";

const CreateClientSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  telefone: z.string().min(10, 'Telefone deve ter pelo menos 10 caracteres'),
  endereco: z.string().min(5, 'O endereço informado esta incompleto'),
});

export type CreateClientDto = z.infer<typeof CreateClientSchema>;

@Injectable()
export class ClienteService {
  constructor(private readonly prisma: PrismaService) {}

  //criar um cliente
  async criarUsuario(createClientDto: CreateClientDto): Promise<Client> {
    try {
      const parsedDto = CreateClientSchema.parse(createClientDto);
      const { nome, email, telefone, endereco } = parsedDto;
      return this.prisma.client.create({
        data: {
          nome,
          email,
          telefone,
          endereco,
        },
      });

    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new BadRequestException(error.errors);
      } else {
        throw new Error('Erro ao criar o usuário');
      }
    }
  }
  
//buscar todos os clientes
async buscarTodosClientes(): Promise<{ message?: string; clients?: Client[] }> {
  const clientes = await this.prisma.client.findMany();

  if (clientes.length === 0) {
    return { message: 'Nenhum cliente encontrado' }; 
  }

  return {clients: clientes }; 
}

  //buscar somente um cliente
  async buscarUmUnicoCliente(id: any): Promise<Client> {
    const client = await this.prisma.client.findUnique({
      where: { id },
    });
    if (!client) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
    }
    return client;
  }

}
