import { DataSource } from 'typeorm';
import config from './config';

export const OrmSeedConfig = new DataSource({
	...config,
    migrations: ['{src,dist}/database/seeds/**/*{.ts,.js}']
});