import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeRole1733052452819 implements MigrationInterface {
    name = 'ChangeRole1733052452819'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_auth\` CHANGE \`role\` \`role\` varchar(10) NOT NULL DEFAULT 'manager'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_auth\` CHANGE \`role\` \`role\` varchar(10) NOT NULL DEFAULT 'user'`);
    }

}
