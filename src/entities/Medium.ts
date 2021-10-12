import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Formats } from './Formats';

@Entity('medium')
export class Medium {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  width: number;

  @Column()
  height: number;

  @Column()
  url: string;

  @OneToOne((type) => Formats, (format) => format.medium)
  formats: Formats;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
