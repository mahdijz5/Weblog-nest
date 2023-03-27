import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";


@Entity({name : "user"})
export class User {
    @PrimaryGeneratedColumn({
        type : "bigint"
    })
    id : number

    @Column({
        type: "varchar",
        length: 150,
        unique : true
    })
    email : string

    @Column({
        type: "varchar",
        length: 150,
    })
    username : string

    @OneToMany(() => Post, (post) => post.user)
    @JoinColumn()
    posts : Post[]

    @Column({
        type: "varchar",
    })
    password: string

}