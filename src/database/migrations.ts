import db from "./database";
import {UserModel} from "./models/user.model";

const migrations: string[] = [
    'CREATE TABLE migrations (id INTEGER PRIMARY KEY, date TIMESTAMP DEFAULT current_timestamp);',
    UserModel.create_table,
    UserModel.insert_default,
]

function getMaxMigration(): number {
    try {
        return db.getFirstSync<{
            max: number
        }>('SELECT max(id) + 1 AS max, max(date) AS date FROM migrations;')?.max || 0;
    } catch (e: any) {
        console.error(e);
        return 0;
    }
}

function mercadoMigrate(): void {
    console.log('Starting migrations...');
    db.withTransactionSync(async () => {
        const maxMigration = getMaxMigration()
        console.warn('maxMigration:', maxMigration)
        for (let i = maxMigration; i < migrations.length; i++) {
            console.log(migrations[i])
            try {
                await db.execAsync(migrations[i])
                await db.execAsync(`INSERT INTO migrations (id) VALUES (${i});`);
            } catch (e: any) {
                console.error(e);
            }
        }
    })
}

export default mercadoMigrate;