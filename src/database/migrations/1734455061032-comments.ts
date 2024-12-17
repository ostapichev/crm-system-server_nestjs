import { MigrationInterface, QueryRunner } from "typeorm";

export class Comments1734455061032 implements MigrationInterface {
    name = 'Comments1734455061032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_eb0d76f2ca45d66a7de04c7c72b\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP COLUMN \`comment_id\``);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_9bb41adf4431f6de42c79c4d305\` FOREIGN KEY (\`order_id\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_9bb41adf4431f6de42c79c4d305\``);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD \`comment_id\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_eb0d76f2ca45d66a7de04c7c72b\` FOREIGN KEY (\`comment_id\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
