const { HOSTNAME, DB_PORT, DB_NAME } = process.env;
const dbConnectionString = `mongodb://${HOSTNAME}:${DB_PORT}/${DB_NAME}`;   // Db Connection String
export default { dbConnectionString };
