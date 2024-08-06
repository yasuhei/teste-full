import { Module } from '@nestjs/common'
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteController } from './modules/Cliente/cliente.controller';
import { ClienteService } from './modules/Cliente/cliente.service';
import { PrismaService } from './lib/prisma';
import { OrdemServicoController } from './modules/Ordem-Servico/ordem-servico.controller';
import { ComentariosController } from './modules/Comentarios/comentarios.controller';
import { OrdemService } from './modules/Ordem-Servico/ordem-servico.service';
import { ComentariosService } from './modules/Comentarios/comentarios.service';

@Module({
  imports: [],
  controllers: [AppController, ClienteController, OrdemServicoController, ComentariosController],
  providers: [AppService, ClienteService, PrismaService, OrdemService, ComentariosService],
})
export class AppModule {}
