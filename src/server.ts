import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from "helmet";

import { UsuarioRoutes } from "./routes/usuario.routes";
import { AlunoRoutes } from './routes/aluno.routes';
import { EvolucaoRoutes } from './routes/evolucao.routes';
import { AgendaRoutes } from './routes/agenda.routes';
import { AgendamentoRoutes } from './routes/agendamento.routes';
import { ContasPagarRoutes } from './routes/contaspagar.routes';
import { ContasPagarPagamentoRoutes } from './routes/contaspagarpagamento.routes';
import { ContasReceberPagamentoRoutes } from './routes/contasreceberpagamento.routes';
import { ConfiguracaoRoutes } from './routes/configuracao.routes';

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public routes(): void {
    this.app.use('/api/usuario', new UsuarioRoutes().router);
    this.app.use('/api/aluno', new AlunoRoutes().router);
    this.app.use('/api/evolucao', new EvolucaoRoutes().router);
    this.app.use('/api/agenda', new AgendaRoutes().router);
    this.app.use('/api/agendamento', new AgendamentoRoutes().router);
    this.app.use('/api/contaspagar', new ContasPagarRoutes().router);
    this.app.use('/api/contaspagarpagamento', new ContasPagarPagamentoRoutes().router);
    this.app.use('/api/contasreceberpagamento', new ContasReceberPagamentoRoutes().router);
    this.app.use('/api/configuracao', new ConfiguracaoRoutes().router);
  }

  public config(): void {
    this.app.set('port', process.env.PORT || 3000);
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(compression());
    this.app.use(cors());
    this.app.use(helmet());
  }

  public start(): void {
    this.app.listen(this.app.get('port'), () => {
      console.log('  API is running at http://localhost:%d', this.app.get('port'));
    })
  }
}

const server = new Server();

server.start();