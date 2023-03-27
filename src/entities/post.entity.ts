import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";


@Entity({ name: "post" })
export class Post {
    @PrimaryGeneratedColumn({
        type: "bigint"
    })
    id: number

    @Column({
        type: "varchar",
        length: 150,
        unique: true
    })
    title: string

    @Column({
        type: "varchar",
        length: 2000,
    })
    body: string

    @ManyToOne(() => User, (user) => user.posts)
    user: User
}