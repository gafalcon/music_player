export class Message {
    constructor(
        public id: number,
        public sender: string,
        public receiver: string,
        public sender_id: number,
        public receiver_id: number,
        public message: string,
        public createdAt: string,
        public status: string,
        public senderPhoto: string,
        public receiverPhoto: string
    ) {}
}
