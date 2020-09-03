import {Entity, PrimaryGeneratedColumn, ObjectIdColumn, Column} from 'typeorm';

@Entity('users')
export class User {

    @ObjectIdColumn()
    id: string;

    @Column()
    username: string;

    @Column()
    email: string;
	
	@Column()
    phone: string;
	
	@Column()
    skillsets: string[];
	
	@Column()
    hobby: string[];

	constructor(user?: Partial<User>) {
    Object.assign(this, user);
  }
}
