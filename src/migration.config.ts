import {DataSource} from "typeorm";
import {config} from "./config/orm.config";

// @ts-ignore
const AppDataSource = new DataSource({
  ...config,
  migrations: ['src/migrations/*.ts'],
  //migrations: ["src/migrations/*.ts"]
  // type: 'postgres',
  // host: 'localhost',
  // port: 5432,
  // password: '123456',
  // username: 'postgres',
  // database: 'service',
  // entities: [ArtistEntity, UserEntity, TrackEntity, AlbumEntity, FavsEntity],
  // migrations: ["src/migrations/*.ts"]
})

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialization")
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })

export default AppDataSource