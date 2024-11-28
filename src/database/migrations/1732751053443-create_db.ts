import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDb1732751053443 implements MigrationInterface {
    name = 'CreateDb1732751053443'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`orders\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`name\` varchar(25) NULL, \`surname\` varchar(25) NULL, \`email\` varchar(100) NULL, \`phone\` varchar(12) NULL, \`age\` int NOT NULL DEFAULT '0', \`course\` varchar(10) NULL, \`course_format\` varchar(15) NULL, \`course_type\` varchar(100) NULL, \`status\` varchar(15) NULL, \`sum\` bigint NULL, \`alreadyPaid\` bigint NULL, \`utm\` varchar(100) NULL, \`msg\` varchar(100) NULL, \`group_id\` bigint NULL, \`manager_id\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`comments\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`text\` text NOT NULL, \`order_id\` bigint NOT NULL, \`manager_id\` bigint NOT NULL, \`comment_id\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`refresh_tokens\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`refreshToken\` varchar(500) NOT NULL, \`user_id\` bigint NOT NULL, INDEX \`IDX_84519890ff1135ab93aba6546f\` (\`refreshToken\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_auth\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`name\` varchar(25) NOT NULL, \`surname\` varchar(25) NOT NULL, \`email\` varchar(100) NOT NULL, \`password\` text NOT NULL, \`role\` varchar(10) NOT NULL DEFAULT 'user', \`is_active\` tinyint NOT NULL DEFAULT 0, \`last_login\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_06288dfa12f07342f17cc76728\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_77b9403790bf253dd71cfcdb6a4\` FOREIGN KEY (\`group_id\`) REFERENCES \`groups\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_c23c7d2f3f13590a845802393d5\` FOREIGN KEY (\`manager_id\`) REFERENCES \`users_auth\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_eb0d76f2ca45d66a7de04c7c72b\` FOREIGN KEY (\`comment_id\`) REFERENCES \`orders\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_0c9dbcb8d2df7170caa1d32aad3\` FOREIGN KEY (\`manager_id\`) REFERENCES \`users_auth\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`refresh_tokens\` ADD CONSTRAINT \`FK_3ddc983c5f7bcf132fd8732c3f4\` FOREIGN KEY (\`user_id\`) REFERENCES \`users_auth\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`refresh_tokens\` DROP FOREIGN KEY \`FK_3ddc983c5f7bcf132fd8732c3f4\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_0c9dbcb8d2df7170caa1d32aad3\``);
        await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_eb0d76f2ca45d66a7de04c7c72b\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_c23c7d2f3f13590a845802393d5\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_77b9403790bf253dd71cfcdb6a4\``);
        await queryRunner.query(`DROP INDEX \`IDX_06288dfa12f07342f17cc76728\` ON \`users_auth\``);
        await queryRunner.query(`DROP TABLE \`users_auth\``);
        await queryRunner.query(`DROP INDEX \`IDX_84519890ff1135ab93aba6546f\` ON \`refresh_tokens\``);
        await queryRunner.query(`DROP TABLE \`refresh_tokens\``);
        await queryRunner.query(`DROP TABLE \`comments\``);
        await queryRunner.query(`DROP TABLE \`orders\``);
    }

}
