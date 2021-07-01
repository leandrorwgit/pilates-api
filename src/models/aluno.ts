import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
import { Agendamento } from './agendamento';
import { ContasReceberPagamento } from './contasreceberpagamento';
import { Evolucao } from './evolucao';

export interface AlunoAttributes {
	id: number;
  idUsuario: number;
	nome: string;
  idade: number;
  dataNascimento: Date;
  profissao: string;
  celular: string;
  email: string;
  objetivosPilates: string;
  queixas: string;
  formaPagamento: string;
  diaPagamento: number;
  aulaSeg: boolean;
  aulaTer: boolean;
  aulaQua: boolean;
  aulaQui: boolean;
  aulaSex: boolean;
  aulaSab: boolean;
  aulaHorarioInicio: string;
  aulaDuracao: number;
	ativo: boolean;
  aulaHorarioInicioSeg: string;
  aulaHorarioInicioTer: string;
  aulaHorarioInicioQua: string;
  aulaHorarioInicioQui: string;
  aulaHorarioInicioSex: string;
  aulaHorarioInicioSab: string;
  valorPagamento: number;
}

/*
  We have to declare the AuthorCreationAttributes to tell Sequelize and TypeScript that 
  the property id, in this case, is optional to be passed at creation time
*/
interface AlunoCreationAttributes extends Optional<AlunoAttributes, 'id'> {}

interface AlunoInstance
  extends Model<AlunoAttributes, AlunoCreationAttributes>, AlunoAttributes {
      createdAt?: Date;
      updatedAt?: Date;
	}

	export const Aluno = sequelize.define<AlunoInstance>(
	'Aluno',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
			unique: true,
		},
    idUsuario: {
      allowNull: false,
      type: DataTypes.INTEGER        
    }, 
		nome: {
			allowNull: false,
			type: DataTypes.STRING,
		},    
    idade: {
      type: DataTypes.INTEGER
    },
    dataNascimento: {
      type: DataTypes.DATE
    },
    profissao: {
      type: DataTypes.STRING
    },
    celular: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING
    },
    objetivosPilates: {
      type: DataTypes.TEXT
    },
    queixas: {
      type: DataTypes.TEXT
    },
    formaPagamento: {
      type: DataTypes.ENUM,
      values: ['Pix', 'Dinheiro', 'Deposito', 'DOC']
    },
    diaPagamento: {
      type: DataTypes.INTEGER
    },
    aulaSeg: {
      type: DataTypes.BOOLEAN
    },
    aulaTer: {
      type: DataTypes.BOOLEAN
    },
    aulaQua: {
      type: DataTypes.BOOLEAN
    },
    aulaQui: {
      type: DataTypes.BOOLEAN
    },
    aulaSex: {
      type: DataTypes.BOOLEAN
    },
    aulaSab: {
      type: DataTypes.BOOLEAN
    },
    aulaHorarioInicio: {
      type: DataTypes.STRING
    },
    aulaDuracao: {
      type: DataTypes.INTEGER
    },     
		ativo: {
			allowNull: false,
			type: DataTypes.BOOLEAN,
		},  
    aulaHorarioInicioSeg: {
      type: DataTypes.STRING
    },
    aulaHorarioInicioTer: {
      type: DataTypes.STRING
    },
    aulaHorarioInicioQua: {
      type: DataTypes.STRING
    },
    aulaHorarioInicioQui: {
      type: DataTypes.STRING
    },
    aulaHorarioInicioSex: {
      type: DataTypes.STRING
    },
    aulaHorarioInicioSab: {
      type: DataTypes.STRING
    }, 
    valorPagamento: {
      type: DataTypes.DECIMAL(10,2),
    }
	},
  {
    tableName: 'Aluno'
  }
);

// MAPEAMENTO PARA EVOLUCAO
Aluno.hasMany(Evolucao, {
  /*
    You can omit the sourceKey property
    since by default sequelize will use the primary key defined
    in the model - But I like to be explicit 
  */
  sourceKey: 'id',
  foreignKey: 'idAluno',
  as: 'evolucoes'
});
Evolucao.belongsTo(Aluno, {
  foreignKey: 'idAluno',
  as: 'aluno'
});

// MAPEAMENTO PARA AGENDAMENTO
Aluno.hasMany(Agendamento, {
  /*
    You can omit the sourceKey property
    since by default sequelize will use the primary key defined
    in the model - But I like to be explicit 
  */
  sourceKey: 'id',
  foreignKey: 'idAluno',
  as: 'agendamentos'
});
Agendamento.belongsTo(Aluno, {
  foreignKey: 'idAluno',
  as: 'aluno'
});

// MAPEAMENTO PARA CONTASRECEBERPAGAMENTO
Aluno.hasMany(ContasReceberPagamento, {
  /*
    You can omit the sourceKey property
    since by default sequelize will use the primary key defined
    in the model - But I like to be explicit 
  */
  sourceKey: 'id',
  foreignKey: 'idAluno',
  as: 'contasReceberPagamentos'
});
ContasReceberPagamento.belongsTo(Aluno, {
  foreignKey: 'idAluno',
  as: 'aluno'
});
