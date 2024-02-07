import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class TvShow {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: false})
    name: string;

    @Column({nullable: true})
    genre: string;

    @Column()
    rating: number;

    @CreateDateColumn()
    releaseDate: Date;
}