import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../lib/prisma';
import {  Comentario } from '@prisma/client';
import { z } from "zod";

const CreateComentarioDto = z.object({
  id: z.number().min(1, 'Id é obrigatório'),
  descricao: z.string().min(4, "É obrigatório a descrição"),
  dataEnvio: z.coerce.date(),
  idOrdemServico: z.number().min(1, "O Id deve ser do tipo número"),
});

export type CreateComentarioDto = z.infer<typeof CreateComentarioDto>;
@Injectable()
export class ComentariosService {
  constructor(private readonly prisma: PrismaService) {}

  //criar um comentario
  async criarComentario(createComentarioDto: CreateComentarioDto): Promise<Comentario> {
    try{
      const parsedDto = CreateComentarioDto.parse(createComentarioDto);
      const { descricao, dataEnvio, idOrdemServico } = parsedDto;

      return this.prisma.comentario.create({
        data: {
          descricao,
          dataEnvio: new Date(dataEnvio),
          idOrdemServico,
        
        },
      });

    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new BadRequestException(error.errors);
      } else {
        throw new Error('Erro ao criar o comentário');
      }
    }

  }


}
