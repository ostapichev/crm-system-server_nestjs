import { MigrationInterface, QueryRunner } from "typeorm";

export class OrdersUpdateCreatedAt1733676375210 implements MigrationInterface {
    name = 'OrdersUpdateCreatedAt1733676375210'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`group_id\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`manager_id\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`created_at\``);
        await queryRunner.query(
          `ALTER TABLE \`orders\` ADD \`created_at\` timestamp(6) NULL`
        );
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`age\` \`age\` int NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`sum\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`sum\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`alreadyPaid\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`alreadyPaid\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_77b9403790bf253dd71cfcdb6a4\` FOREIGN KEY (\`group_id\`) REFERENCES \`groups\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_c23c7d2f3f13590a845802393d5\` FOREIGN KEY (\`manager_id\`) REFERENCES \`users_auth\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_c23c7d2f3f13590a845802393d5\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_77b9403790bf253dd71cfcdb6a4\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`alreadyPaid\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`alreadyPaid\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`sum\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`sum\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`age\` \`age\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`created_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`manager_id\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`group_id\``);
    }

}
