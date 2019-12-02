import { Role } from './role';
import { UserStatus } from './status';

export class User {

    public status: UserStatus = UserStatus.ACTIVE;
    constructor(
        public id: number,
        public username: string,
        public firstName: string,
        public lastName: string,
        public gender: string,
        public password: string,
        public email: string,
        public country: string,
        public role: Role,
        status?: UserStatus
    ) {
        if (status) {
            this.status = status;
        }
    }

}
