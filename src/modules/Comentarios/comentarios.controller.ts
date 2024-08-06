import {  Body, Controller, Post } from '@nestjs/common';
import { Comentario } from '@prisma/client';
import { ComentariosService } from './comentarios.service';


@Controller('ordemServicos/comentarios')
export class ComentariosController {
  constructor(private readonly comentarioService: ComentariosService) {}

  @Post()
  async criarComentario(@Body() createComentarioDto: Comentario): Promise<Comentario> {
    return this.comentarioService.criarComentario(createComentarioDto);
  }

  

}
