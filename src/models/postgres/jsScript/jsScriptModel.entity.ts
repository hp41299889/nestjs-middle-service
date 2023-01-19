//packages
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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

    @Column()
    scriptName: string;

    @Column()
    scriptVersion: number;

    @Column()
    scriptContent: string;

    @Column({ type: 'json', nullable: true })
    scriptPackage: object;
};