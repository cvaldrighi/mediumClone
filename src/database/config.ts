import { DataSourceOptions } from "typeorm";

const config: DataSourceOptions = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "mediumclone",
    entities:  ['{src,dist}/**/*.entity{.ts,.js}'],
    synchronize: false,
    migrations: ['{src,dist}/database/migrations/**/*{.ts,.js}'],
    
};


export default config;