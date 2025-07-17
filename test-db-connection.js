const { Pool } = require('pg');
require('dotenv').config();

// Create a new pool using the environment variables
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false // For development only, use proper SSL in production
  }
});

async function testConnection() {
  const client = await pool.connect();
  try {
    console.log('Successfully connected to the database!');
    
    // Test query to check if we can read from the database
    const result = await client.query('SELECT NOW() as current_time');
    console.log('Current database time:', result.rows[0].current_time);
    
    // Check if tables exist
    const tables = await client.query(
      "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
    );
    console.log('\nAvailable tables:');
    tables.rows.forEach(row => console.log(`- ${row.table_name}`));
    
  } catch (err) {
    console.error('Error connecting to the database:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

testConnection();
