import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AlterResultsNullable1616968667019
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE results ALTER COLUMN title DROP NOT NULL;'
    );
    await queryRunner.query(
      'ALTER TABLE results ALTER COLUMN price DROP NOT NULL;'
    );
    await queryRunner.query(
      'ALTER TABLE results ALTER COLUMN link DROP NOT NULL;'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE results ALTER COLUMN title SET NOT NULL;'
    );
    await queryRunner.query(
      'ALTER TABLE results ALTER COLUMN price SET NOT NULL;'
    );
    await queryRunner.query(
      'ALTER TABLE results ALTER COLUMN link SET NOT NULL;'
    );
  }
}
