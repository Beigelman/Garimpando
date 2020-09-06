import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Research from './Research';

@Entity('results')
class Result {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  research_id: string;

  @ManyToOne(() => Research)
  @JoinColumn({ name: 'research_id' })
  research: Research;

  @Column()
  title: string;

  @Column('float')
  price: number;

  @Column('')
  link: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Result;
