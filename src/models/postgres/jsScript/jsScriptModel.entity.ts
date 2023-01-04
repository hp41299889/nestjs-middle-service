//packages
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Generated } from 'typeorm';

@Entity()
export class JSScript {
    @PrimaryGeneratedColumn()
    scriptID: number;

    @CreateDateColumn({ type: 'timestamp' })
    createDatetime: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    lastEditDatetime: Date;

    @Column()
    scriptSource: string;

    @Column({ unique: true })
    scriptName: string;

    @Column()
    scriptVersion: number;

    @Column()
    scriptContent: string;
};