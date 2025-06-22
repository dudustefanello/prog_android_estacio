import db from "../database";

export class SellModel {
    public static readonly create_table = `
        CREATE TABLE sell (
            id    INTEGER PRIMARY KEY AUTOINCREMENT,
            date  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            total REAL      NOT NULL);
    `;

    public id: number = 0;
    public total?: number;
    public date?: Date;

    insert(total: number) {
        this.total = total
        const result = db.runSync(`INSERT INTO sell (total)
                                   VALUES (?)`, [this.total]);
        this.id = result.lastInsertRowId;
    }

    static selectForHistory() {
        return db.getAllSync<SellModel>(`SELECT id, date, total
                                         FROM sell`)
    }
}

export class SellItemModel {
    public static readonly create_table = `
        CREATE TABLE sell_item (
            id         INTEGER PRIMARY KEY AUTOINCREMENT,
            sell_id    INTEGER NOT NULL REFERENCES sell (id),
            product_id INTEGER NOT NULL REFERENCES products (id),
            quantity   INTEGER NOT NULL,
            price      REAL    NOT NULL,
            total      REAL    NOT NULL);
    `;
    public id: number = 0;
    public sell_id: number;
    public product_id?: number;
    public quantity?: number;
    public price?: number;
    public total?: number;

    constructor(sell_id: number) {
        this.sell_id = sell_id;
    }

    insert(product_id: number, quantity: number, price: number) {
        this.product_id = product_id;
        this.quantity = quantity;
        this.price = price;
        this.total = this.quantity * this.price;

        db.runSync(`INSERT INTO sell_item (sell_id, product_id, quantity, price, total)
                    VALUES (?, ?, ?, ?, ?)`, [
            this.sell_id,
            this.product_id,
            this.quantity,
            this.price,
            this.total]);
    }
}