import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '.';

export interface AgendamentoAttributes {
	id: number;
  idUsuario: number;
  idAluno?: number;
  dataHoraInicio: Date;
  duracao: number;
  titulo: string;
  descricao: string;
  situacao: string; // CRIADO, CANCELADO, CONCLUIDO
  createdAt?: Date;
  updatedAt?: Date;  
}

/*
  We have to declare the AuthorCreationAttributes to tell Sequelize and TypeScript that 
  the property id, in this case, is optional to be passed at creation time
*/
interface AgendamentoCreationAttributes extends Optional<AgendamentoAttributes, 'id'> {}

interface AgendamentoInstance
  extends Model<AgendamentoAttributes, AgendamentoCreationAttributes>, AgendamentoAttributes { }

	export const Agendamento = sequelize.define<AgendamentoInstance>(
	'Agendamento',
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
      allowNull: true,
      type: DataTypes.INTEGER,               
    },    
    dataHoraInicio: {
      allowNull: false,
      type: DataTypes.DATE
    },
    duracao: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    titulo: {
      type: DataTypes.STRING
    },            
    descricao: {
      type: DataTypes.TEXT
    },
    situacao: {
      type: DataTypes.ENUM,
      values: ['CRIADO', 'CANCELADO', 'CONCLUIDO']
    }, 
    createdAt: {
      type: DataTypes.DATE,
    },          
    updatedAt: {
      type: DataTypes.DATE
    },          
	},
  {
    tableName: 'Agendamento'
  }
);
