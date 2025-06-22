import * as md5 from 'js-md5';
import db from "../database";

export class UserModel {
    public static readonly create_table = `
        CREATE TABLE users (
            id       INTEGER PRIMARY KEY AUTOINCREMENT,
            email    VARCHAR NOT NULL UNIQUE,
            passHash VARCHAR NOT NULL);
    `;
    public static readonly insert_default = `
        INSERT INTO users (email, passHash)
        VALUES ('admin', '${md5.md5('admin' + 'admin')}');
    `;

    public id: number = 0;
    private readonly email: string;
    private readonly passHash: string;

    constructor(email: string, password: string) {
        this.email = email;
        this.passHash = md5.md5(email + password);
    }

    register(): void {
        this.insert();
    }

    login(): boolean {
        const user = db.getFirstSync<{ id: number }>(`
            SELECT id
            FROM users
            WHERE email = ?
              AND passHash = ?;`, [this.email, this.passHash]);

        if (user && user.id > 0) {
            this.id = user.id;
            return true;
        }
        return false;
    }

    private insert(): void {
        db.withTransactionSync(() => {
            db.runSync(`INSERT INTO users (email, passHash)
                        VALUES (?, ?)`, [this.email, this.passHash]);
        })
    }
}