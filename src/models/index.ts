import dotenv from "dotenv";
import { Sequelize } from 'sequelize';

dotenv.config();

const  sequelize = new Sequelize(process.env.DATABASE_URL, {
	dialect: 'postgres',
	protocol: 'postgres',
});

export { Sequelize, sequelize };