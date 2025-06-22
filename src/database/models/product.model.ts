import {CategoryModel} from "./category.model";
import db from "../database";

export class ProductModel {
    public static readonly create_table = `
        CREATE TABLE products (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            name        TEXT    NOT NULL,
            category_id INTEGER REFERENCES categories (id),
            price       REAL    NOT NULL,
            amount      INTEGER NOT NULL,
            validity    DATE);
    `;
    public static readonly insert_default = `
        INSERT INTO products (name, category_id, price, amount, validity)
        VALUES ('Arroz',        1, 10.0, 50,  '2025-12-31'),
               ('Coca-cola',    2, 5.0,  25,  '2026-12-31'),
               ('Sabonete',     3, 2.0,  100, null        ),
               ('Desinfetante', 4, 7.5,  10,  '2027-12-31');
    `;

    public id: number = 0;
    public readonly name: string
    public readonly price: number
    public amount: number
    private category?: CategoryModel
    private validity?: string

    constructor(name: string, price: number, amount: number) {
        this.name = name
        this.price = price
        this.amount = amount
    }

    insert(category?: CategoryModel, validity?: string): void {
        this.category = category
        this.validity = validity

        db.withTransactionSync(() => {
            const result = db.runSync(`INSERT INTO products (name, category_id, price, amount, validity)
                                       VALUES (?, ?, ?, ?, ?);`, [
                this.name,
                this.category?.id || null,
                this.price, this.amount,
                this.validity || null]);
            this.id = result.lastInsertRowId;
        })
    }
}