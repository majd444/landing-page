import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

// Configure dotenv
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const { Pool } = pg;

// Create a new pool using the connection URL from .env
const connectionString = process.env.DATABASE_URL || process.env.url;

if (!connectionString) {
  console.error('❌ No database connection string found in .env file');
  console.log('Please set either DATABASE_URL or url in your .env file');
  process.exit(1);
}

const pool = new Pool({
  connectionString: connectionString,
  ssl: {
    rejectUnauthorized: false // For development only, use proper SSL in production
  }
});

async function testConnection() {
  const client = await pool.connect();
  try {
    console.log('Attempting to connect to the database...');
    
    // Test query to check if we can read from the database
    const result = await client.query('SELECT NOW() as current_time');
    console.log('✅ Successfully connected to the database!');
    console.log('Current database time:', result.rows[0].current_time);
    
    // Check if tables exist
    try {
      const tables = await client.query(
        "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'"
      );
      console.log('\nAvailable tables:');
      if (tables.rows.length > 0) {
        tables.rows.forEach(row => console.log(`- ${row.table_name}`));
      } else {
        console.log('No tables found in the database.');
      }
    } catch (tableError) {
      console.log('\nNote: Could not fetch table list, but connection was successful.');
    }
    
  } catch (err) {
    console.error('❌ Error connecting to the database:');
    console.error(err.message);
    console.log('\nTroubleshooting tips:');
    console.log('1. Verify the database host is accessible from your network');
    console.log('2. Check if the database credentials are correct');
    console.log('3. Ensure the database is running and accepting connections');
    console.log('4. Verify the database name and user have the correct permissions');
  } finally {
    client.release();
    await pool.end();
  }
}

testConnection();
