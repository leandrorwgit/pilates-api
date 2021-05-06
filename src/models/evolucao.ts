import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';

export interface EvolucaoAttributes {
	id: number;
  idUsuario: number;
  idAluno: number;
  data: Date;
  comoChegou: string;
  condutasUtilizadas: string;
  aparelhosUtilizados: string;
  comoSaiu: string;
  orientacoesDomiciliares: string;
}

/*
  We have to declare the AuthorCreationAttributes to tell Sequelize and TypeScript that 
  the property id, in this case, is optional to be passed at creation time
*/
interface EvolucaoCreationAttributes extends Optional<EvolucaoAttributes, 'id'> {}

interface EvolucaoInstance
  extends Model<EvolucaoAttributes, EvolucaoCreationAttributes>, EvolucaoAttributes {
      createdAt?: Date;
      updatedAt?: Date;
	}

	export const Evolucao = sequelize.define<EvolucaoInstance>(
	'Evolucao',
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
    data: {
      allowNull: false,
      type: DataTypes.DATE
    },
    comoChegou: {
      type: DataTypes.TEXT
    },
    condutasUtilizadas: {
      type: DataTypes.TEXT
    },
    aparelhosUtilizados: {
      type: DataTypes.TEXT
    },
    comoSaiu: {
      type: DataTypes.TEXT
    },
    orientacoesDomiciliares: {
      type: DataTypes.TEXT
    },            
	}
);
