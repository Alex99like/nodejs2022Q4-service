import {DataSource} from "typeorm";
import {entities} from "./config/orm.config";
import { config } from 'dotenv'
config()

const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: +process.env.PG_PORT,
  password: process.env.PG_PASSWORD,
  username: process.env.PG_USERNAME,
  database: process.env.PG_DATABASE,
  entities: entities,
  synchronize: false,
  migrations: ['src/migrations/*.ts']
})

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialization")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })

export default AppDataSource