import dotenv from "dotenv";
import { Sequelize } from 'sequelize';

dotenv.config();

const  sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialect: 'postgres',
	protocol: 'postgres',
	dialectOptions: {
		ssl: {
			require: true,
			rejectUnauthorized: false
		}
	}	
});

export { Sequelize, sequelize };