import db from "../database";

export class CategoryModel {
    public static readonly create_table: string = `
        CREATE TABLE categories (
            id   INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE);
    `;
    public static readonly insert_default: string = `
        INSERT INTO categories (name)
        VALUES ('Mercearia'),
               ('Bebidas'),
               ('Higiene e Beleza'),
               ('Limpeza'),
               ('Outros');
    `;

    public id: number = 0;
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    static selectAll(): CategoryModel[] {
        return db.getAllSync<CategoryModel>(`SELECT id, name
                                             FROM categories;`);
    }
}