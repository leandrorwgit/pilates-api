import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
import { Aluno } from '../models/aluno';
import { Agendamento } from './agendamento';
import { Configuracao } from './configuracao';
import { ContasPagar } from './contaspagar';
import { ContasPagarPagamento } from './contaspagarpagamento';
import { Evolucao } from './evolucao';

export interface UsuarioAttributes {
	id: number;
	nome: string;
	email: string;
	senha: string;
	empresa: string;
	cpf: string;
	ativo: boolean;
}

/*
  We have to declare the AuthorCreationAttributes to tell Sequelize and TypeScript that 
  the property id, in this case, is optional to be passed at creation time
*/
interface UsuarioCreationAttributes extends Optional<UsuarioAttributes, 'id'> {}

interface UsuarioInstance
  extends Model<UsuarioAttributes, UsuarioCreationAttributes>, UsuarioAttributes {
      createdAt?: Date;
      updatedAt?: Date;
	}

	export const Usuario = sequelize.define<UsuarioInstance>(
	'Usuario',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
			unique: true,
		},
		nome: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		email: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: true,
		},
		senha: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		empresa: {
			allowNull: false,
			type: DataTypes.STRING,
		},
		cpf: {
			allowNull: true,
			type: DataTypes.STRING,
		},		
		ativo: {
			allowNull: false,
			type: DataTypes.BOOLEAN,
		},            
	}, 
	{
		tableName: 'Usuario'
	}
);

// MAPEAMENTO PARA ALUNO
Usuario.hasMany(Aluno, {
  /*
    You can omit the sourceKey property
    since by default sequelize will use the primary key defined
    in the model - But I like to be explicit 
  */
  sourceKey: 'id',
  foreignKey: 'idUsuario',
  as: 'alunos'
});
Aluno.belongsTo(Usuario, {
  foreignKey: 'idUsuario',
  as: 'usuario'
});

// MAPEAMENTO PARA EVOLUCAO
Usuario.hasMany(Evolucao, {
  /*
    You can omit the sourceKey property
    since by default sequelize will use the primary key defined
    in the model - But I like to be explicit 
  */
  sourceKey: 'id',
  foreignKey: 'idUsuario',
  as: 'evolucoes'
});

Evolucao.belongsTo(Usuario, {
  foreignKey: 'idUsuario',
  as: 'usuario'
});

// MAPEAMENTO PARA AGENDAMENTO
Usuario.hasMany(Agendamento, {
  /*
    You can omit the sourceKey property
    since by default sequelize will use the primary key defined
    in the model - But I like to be explicit 
  */
  sourceKey: 'id',
  foreignKey: 'idUsuario',
  as: 'agendamentos'
});

Agendamento.belongsTo(Usuario, {
  foreignKey: 'idUsuario',
  as: 'usuario'
});

// MAPEAMENTO PARA CONTASPAGAR
Usuario.hasMany(ContasPagar, {
  /*
    You can omit the sourceKey property
    since by default sequelize will use the primary key defined
    in the model - But I like to be explicit 
  */
  sourceKey: 'id',
  foreignKey: 'idUsuario',
  as: 'contasPagar'
});

ContasPagar.belongsTo(Usuario, {
  foreignKey: 'idUsuario',
  as: 'usuario'
});

// MAPEAMENTO PARA CONTASPAGARPAGAMENTO
Usuario.hasMany(ContasPagarPagamento, {
  /*
    You can omit the sourceKey property
    since by default sequelize will use the primary key defined
    in the model - But I like to be explicit 
  */
  sourceKey: 'id',
  foreignKey: 'idUsuario',
  as: 'contasPagarPagamentos'
});

ContasPagarPagamento.belongsTo(Usuario, {
  foreignKey: 'idUsuario',
  as: 'usuario'
});

// MAPEAMENTO PARA CONFIGURACAO
Usuario.hasMany(Configuracao, {
  /*
    You can omit the sourceKey property
    since by default sequelize will use the primary key defined
    in the model - But I like to be explicit 
  */
  sourceKey: 'id',
  foreignKey: 'idUsuario',
  as: 'configuracoes'
});

Configuracao.belongsTo(Usuario, {
  foreignKey: 'idUsuario',
  as: 'configuracao'
});