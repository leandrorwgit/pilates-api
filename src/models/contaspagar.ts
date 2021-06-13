import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';
import { ContasPagarPagamento } from './contaspagarpagamento';

export interface ContasPagarAttributes {
	id: number;
  idUsuario: number;
	descricao: string;
  diaVencimento: number;
  valor: number;
  formaPagamento: string;
	ativo: boolean;
}

/*
  We have to declare the AuthorCreationAttributes to tell Sequelize and TypeScript that 
  the property id, in this case, is optional to be passed at creation time
*/
interface ContasPagarCreationAttributes extends Optional<ContasPagarAttributes, 'id'> {}

interface ContasPagarInstance
  extends Model<ContasPagarAttributes, ContasPagarCreationAttributes>, ContasPagarAttributes {
      createdAt?: Date;
      updatedAt?: Date;
	}

	export const ContasPagar = sequelize.define<ContasPagarInstance>(
	'ContasPagar',
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
		descricao: {
			allowNull: false,
			type: DataTypes.STRING,
		},    
    diaVencimento: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    valor: {
      allowNull: false,
      type: DataTypes.DECIMAL(10,2)
    },
    formaPagamento: {
      type: DataTypes.ENUM,
      values: ['Pix', 'Dinheiro', 'Deposito', 'DOC']
    },
		ativo: {
			allowNull: false,
			type: DataTypes.BOOLEAN,
		},            
	},
  {
    tableName: 'ContasPagar'
  }
);

// MAPEAMENTO PARA CONTASPAGARPAGAMENTO
ContasPagar.hasMany(ContasPagarPagamento, {
  /*
    You can omit the sourceKey property
    since by default sequelize will use the primary key defined
    in the model - But I like to be explicit 
  */
  sourceKey: 'id',
  foreignKey: 'idContasPagar',
  as: 'contasPagarPagamentos'
});
ContasPagarPagamento.belongsTo(ContasPagar, {
  foreignKey: 'idContasPagar',
  as: 'contasPagar'
});
