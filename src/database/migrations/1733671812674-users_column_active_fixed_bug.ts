import { MigrationInterface, QueryRunner } from "typeorm";

export class UsersColumnActiveFixedBug1733671812674 implements MigrationInterface {
    name = 'UsersColumnActiveFixedBug1733671812674'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_auth\` CHANGE \`is_active\` \`is_active\` tinyint(1) NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_auth\` CHANGE \`is_active\` \`is_active\` tinyint NOT NULL DEFAULT '0'`);
    }

}
