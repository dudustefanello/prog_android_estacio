import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('mercado1.db');
export default db;