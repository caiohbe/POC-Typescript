import pkg from 'pg';

const { Pool } = pkg;

const connectionDB = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'root',
  database: 'poc_typescript'
});

export default connectionDB