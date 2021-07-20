import { CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Covers } from './Covers';
import { Large } from './Large';
import { Medium } from './Medium';
import { Small } from './Small';
import { Thumbnail } from './Thumbnail';

@Entity('formats')
export class Formats {
  @PrimaryColumn()
  readonly id: string;

  @OneToOne((type) => Covers, (formats) => Formats)
  cover: Covers;

  @OneToOne((type) => Large, (formats) => Formats)
  @JoinColumn()
  large: Large;

  @OneToOne((type) => Medium, (formats) => Formats)
  @JoinColumn()
  medium: Medium;

  @OneToOne((type) => Small, (formats) => Formats)
  @JoinColumn()
  small: Small;

  @OneToOne((type) => Thumbnail, (formats) => Formats)
  @JoinColumn()
  thumbnail: Thumbnail;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
