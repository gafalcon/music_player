
export class Comment {

    constructor(
        public id: number,
        public comment: string,
        public username: string,
        public createdAt: string,
        public createdBy: number,
        public userPhoto: string
    ) {}

}
