import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';

export interface ConfiguracaoAttributes {
	id: number;
  idUsuario: number;
	duracaoPadraoAula: number;
}

/*
  We have to declare the AuthorCreationAttributes to tell Sequelize and TypeScript that 
  the property id, in this case, is optional to be passed at creation time
*/
interface ConfiguracaoCreationAttributes extends Optional<ConfiguracaoAttributes, 'id'> {}

interface ConfiguracaoInstance
  extends Model<ConfiguracaoAttributes, ConfiguracaoCreationAttributes>, ConfiguracaoAttributes {
      createdAt?: Date;
      updatedAt?: Date;
	}

	export const Configuracao = sequelize.define<ConfiguracaoInstance>(
	'Configuracao',
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
		duracaoPadraoAula: {
			allowNull: false,
			type: DataTypes.INTEGER
		},    
	},
  {
    tableName: 'Configuracao'
  }
);
