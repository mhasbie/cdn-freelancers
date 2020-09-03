import {Entity, PrimaryGeneratedColumn, ObjectIdColumn, Column} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity('users')
export class User {

	@Field(type => ID)
    @ObjectIdColumn()
    id: string;

	@Field()
    @Column()
    username: string;

	@Field()
    @Column()
    email: string;
	
	@Field()
	@Column()
    phone: string;
	
	@Field(type => [String])
	@Column()
    skillsets: string[];
	
	@Field(type => [String])
	@Column()
    hobby: string[];

	constructor(user?: Partial<User>) {
		Object.assign(this, user);
	}
}