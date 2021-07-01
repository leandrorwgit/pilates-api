'use strict';
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';

export interface ContasReceberPagamentoAttributes {
	id: number;
  idUsuario: number;
  idAluno: number;
  dataPagamento: Date;
  valorPago: number;
  formaPagamento: string;
}

/*
  We have to declare the AuthorCreationAttributes to tell Sequelize and TypeScript that 
  the property id, in this case, is optional to be passed at creation time
*/
interface ContasReceberPagamentoCreationAttributes extends Optional<ContasReceberPagamentoAttributes, 'id'> {}

interface ContasReceberPagamentoInstance
  extends Model<ContasReceberPagamentoAttributes, ContasReceberPagamentoCreationAttributes>, ContasReceberPagamentoAttributes {
    createdAt?: Date;
    updatedAt?: Date;    
  }

	export const ContasReceberPagamento = sequelize.define<ContasReceberPagamentoInstance>(
	'ContasReceberPagamento',
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
    idAluno: {
      allowNull: false,
      type: DataTypes.INTEGER,               
    },    
    dataPagamento: {
      allowNull: false,
      type: DataTypes.DATE
    },
    valorPago: {
      allowNull: false,
      type: DataTypes.DECIMAL(10,2)
    },
    formaPagamento: {
      type: DataTypes.ENUM,
      values: ['Pix', 'Dinheiro', 'Deposito', 'DOC']
    },         
	},
  {
    tableName: 'ContasReceberPagamento'
  }
);
