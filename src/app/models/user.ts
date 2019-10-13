import { Role } from './role';

export class User {
    constructor(
        public id: number,
        public username: string,
        public firstName: string,
        public lastName: string,
        public gender: string,
        public password: string,
        public email: string,
        public role: Role
    ) {}

}
