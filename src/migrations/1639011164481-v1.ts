import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

export class v11639011164481 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: "categoria",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true
                },
                {
                    name: "nome",
                    type: "varchar",
                }
            ]
        }), true);

        await queryRunner.createTable(new Table({
            name: "produto",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true
                },
                {
                    name: "nome",
                    type: "varchar",
                }
            ]
        }), true);

        await queryRunner.addColumn("produto", new TableColumn({
            name: "idCategoria",
            type: "int"
        }));

        await queryRunner.createForeignKey("produto", new TableForeignKey({
            columnNames: ["idCategoria"],
            referencedColumnNames: ["id"],
            referencedTableName: "categoria",
            onDelete: "CASCADE"
        }));
        
        await queryRunner.query("insert into categoria values (1,'Categoria 1')");
        await queryRunner.query("insert into categoria values (2,'Categoria 2')");
        await queryRunner.query("insert into categoria values (3,'Categoria 3')");
        await queryRunner.query("insert into categoria values (4,'Categoria 4')");

    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        const table = await queryRunner.getTable("produto");
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("idCategoria") !== -1);
        await queryRunner.dropForeignKey("produto", foreignKey);

        await queryRunner.dropTable("produto");
        await queryRunner.dropTable("categoria");

    }
}
