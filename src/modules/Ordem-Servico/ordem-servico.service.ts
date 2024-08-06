import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../lib/prisma';
import {  OrdemServico, StatusOrdemServico } from '@prisma/client';
import { z } from "zod";



const StatusOrdemServicoEnum = z.enum([StatusOrdemServico.ABERTA, StatusOrdemServico.FINALIZADA, StatusOrdemServico.CANCELADA]);
const UpdateStatusSchema = z.object({
  id: z.number(),
  status: z.nativeEnum(StatusOrdemServico),
});

export type UpdateStatusDto = z.infer<typeof UpdateStatusSchema>;

const CreateOrdemSchema = z.object({
  id: z.number(),
  descricao: z.string().min(4, "A descrição tem que conter no minímo 4 digitos"),
  preco: z.number(),
  dataAbertura: z.string(),
  dataFinalizacao: z.string(),
  status: StatusOrdemServicoEnum,
  clientId: z.string()
});

export type CreateOrdemDto = z.infer<typeof CreateOrdemSchema>;
@Injectable()
export class OrdemService {
  constructor(private readonly prisma: PrismaService) {}

  async criarServico(createOrdemServicoDto: OrdemServico): Promise<OrdemServico> {

    try{
      const parseDto = CreateOrdemSchema.parse(createOrdemServicoDto)
      const { descricao, preco, dataAbertura, dataFinalizacao,  status, clientId } = parseDto;

      return this.prisma.ordemServico.create({
        data: {
          descricao,
          preco,
          dataAbertura: new Date(dataAbertura),
          dataFinalizacao: new Date(dataFinalizacao),
          status,
          clientId
        },
      });
    } catch(error) {
      if (error instanceof z.ZodError) {
        throw new BadRequestException(error.errors);
      } else {
        throw new Error('Erro ao criar o serviço');
      }
    }

  }

  async buscarTodosService(): Promise<{message?: string; todosServicos?: OrdemServico[]}> {
    const servicos = await this.prisma.ordemServico.findMany()

    if(servicos.length === 0) {
      return { message: "Nenhum serviço encontrado"} ;
    }

    return { todosServicos: servicos}
  }

  async atualizarStatus(id: number, status: StatusOrdemServico): Promise<{ message?: string; todosServicos?: OrdemServico[] }> {
    try {
      const parseDto = UpdateStatusSchema.parse({ id, status });
      const update = await this.prisma.ordemServico.update({
        where: { id: parseDto.id },
        data: { status: parseDto.status },
      });

      return { message: "Status atualizado com sucesso.", todosServicos: [update] };
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new BadRequestException(error.errors);
      } else {
        throw new Error('Erro ao atualizar o status');
      }
    }
  }


  async deleteService(id: number): Promise<{ message: string; ordemServico?: OrdemServico }> {
    try {
      const deletedService = await this.prisma.ordemServico.delete({
        where: {
          id: id,
        },
      });
      
      return {
        message: `Serviço com ID ${id} excluído com sucesso.`,
        ordemServico: deletedService,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(`Serviço com ID ${id} não encontrado ou já excluido.`);
      } else {
        throw new InternalServerErrorException('Erro interno ao tentar excluir o serviço.');
      }
    }
  }
  }
