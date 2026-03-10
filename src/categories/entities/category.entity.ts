import {
    Entity,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn
} from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';

@Entity('categories')
export class Category extends BaseEntity {

    @Column()
    name: string;

    @Column({ unique: true })
    slug: string;

    @ManyToOne(() => Category, category => category.children)
    @JoinColumn({ name: 'parent_id' })
    parent: Category;

    @OneToMany(() => Category, category => category.parent)
    children: Category[];
};