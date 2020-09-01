import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('results')
class Result {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  research_id: string;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column()
  link: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Result;
