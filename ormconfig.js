const fileExt = process.env.ROOT_DIR === 'src' ? '.ts' : '.js'

module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  entities: [
    `./${process.env.ROOT_DIR}/modules/**/infra/typeorm/entities/*${fileExt}`
  ],
  migrations: [
    `./${process.env.ROOT_DIR}/shared/infra/typeorm/migrations/*${fileExt}`
  ],
  cli: {
    migrationsDir: "./src/shared/infra/typeorm/migrations"
  },
  extra: {
    ssl: true
  }
}
