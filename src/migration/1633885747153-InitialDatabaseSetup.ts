import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialDatabaseSetup1633885747153 implements MigrationInterface {
    name = 'InitialDatabaseSetup1633885747153'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "developers" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "name" character varying NOT NULL, "gender" character NOT NULL, "age" integer NOT NULL, "hobby" character varying NOT NULL, "birthdate" date NOT NULL, CONSTRAINT "PK_247719240b950bd26dec14bdd21" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "developers"`);
    }

}
