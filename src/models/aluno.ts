import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
import { Usuario } from '../models/usuario';

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
	ativo: boolean;
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
		ativo: {
			allowNull: false,
			type: DataTypes.BOOLEAN,
		},            
	}
);
