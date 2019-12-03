import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-messages-view',
  templateUrl: './messages-view.component.html',
  styleUrls: ['./messages-view.component.css']
})
export class MessagesViewComponent implements OnInit {

    conversations = [];
    currentUser: User;
    selectedConversation: number;
    newMessage: string;
    constructor(
        private api: ApiService,
        private auth: AuthService,
        private notifier: NotificationsService
    ) { }

    ngOnInit() {
        this.auth.currentUser.subscribe((user) => {this.currentUser = user; console.log(this.currentUser)});
        this.api.getAllMessages().subscribe((res) => {
            console.log(res);
            const allMsgs = res[0].concat(res[1]);
            console.log(allMsgs);
            if (allMsgs.length) {
                this.getConversations(allMsgs);
            }
        });
    }

    getConversations(msgs: Array<Message>) {
        const conversations = msgs.map((msg: Message) => {
            const conversation = {userPhoto: msg.senderPhoto, user: msg.receiver, userId: msg.receiver_id, messages: [] };
            if (msg.sender_id !== this.currentUser.id) {
                conversation.user = msg.sender;
                conversation.userId = msg.sender_id;
            }
            return conversation;
        });
        const seen = new Set();
        const filteredArr = conversations.filter(el => {
            const duplicate = seen.has(el.userId);
            seen.add(el.userId);
            return !duplicate;
        });
        console.log(filteredArr);
        this.conversations = filteredArr;
        this.conversations.forEach((conversation) => {
            conversation.messages = msgs.filter((msg) => {
                return msg.sender_id === conversation.userId || msg.receiver_id === conversation.userId;
            });
        });

        this.selectedConversation = 0;

    }

    selectConversation(i: number) {
        this.selectedConversation = i;
    }

    postMessage() {
        console.log('post message');
        if (this.newMessage) {
            const conversation = this.conversations[this.selectedConversation];
            this.api.newMessage(this.currentUser.id,
                                conversation.userId,
                                this.newMessage)
                .subscribe((res: Message) => {
                    console.log(res);
                    this.notifier.success('Message sent');
                    res.senderPhoto = this.currentUser.profilePhoto;
                    conversation.messages.unshift(res);
                    this.newMessage = '';
                });
            console.log(this.newMessage);
        }
    }

}
