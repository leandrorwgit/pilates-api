'use strict';
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';

export interface ContasPagarPagamentoAttributes {
	id: number;
  idUsuario: number;
  idContasPagar: number;
  dataPagamento: Date;
  valorPago: number;
  formaPagamento: string;
}

/*
  We have to declare the AuthorCreationAttributes to tell Sequelize and TypeScript that 
  the property id, in this case, is optional to be passed at creation time
*/
interface ContasPagarPagamentoCreationAttributes extends Optional<ContasPagarPagamentoAttributes, 'id'> {}

interface ContasPagarPagamentoInstance
  extends Model<ContasPagarPagamentoAttributes, ContasPagarPagamentoCreationAttributes>, ContasPagarPagamentoAttributes {
    createdAt?: Date;
    updatedAt?: Date;    
  }

	export const ContasPagarPagamento = sequelize.define<ContasPagarPagamentoInstance>(
	'ContasPagarPagamento',
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
    idContasPagar: {
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
    tableName: 'ContasPagarPagamento'
  }
);
