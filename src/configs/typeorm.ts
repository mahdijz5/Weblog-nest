import entities from "src/entities"
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions"



const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: "postgres",
    password: "root",
    database: 'authproject',
    entities: entities,
    synchronize: true,
    migrations: [
        'dist/src/db/*.js'
    ],
}

export default config