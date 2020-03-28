import getConnection from '~/lib/db'

export const clear = async () => {
  const db = await getConnection
  const entities = db.entityMetadatas

  for (const entity of entities) {
    const repository = await db.getRepository(entity.name)
    await repository.query(`DELETE FROM "${entity.tableName}";`)
  }
}

export const closeConnection = async () => {
  const db = await getConnection
  await db.close()
}
