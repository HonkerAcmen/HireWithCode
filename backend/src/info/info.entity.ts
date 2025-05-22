import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('info')
export class InfoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  github_id: string;

  @Column()
  github_pj_add: string;

  @Column()
  project_online_add: string;

  @Column()
  create_time: Date;
}
