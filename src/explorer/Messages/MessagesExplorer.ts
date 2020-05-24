import * as vscode from "vscode";
import { Message, OffsetFetchRequest } from 'kafka-node';
import { TreeItem } from '../TreeItem';
import { MessageItem } from "./MessageItem";
import { Kafka } from "../../client/Kafka";

export class MessagesExplorer extends TreeItem {
    public contextValue = "MessageExplorer";
    public collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
    public command?: vscode.Command | undefined;
    public label = "Messages";
    public messages : Message[] = [];

    constructor(public topicMetadata: OffsetFetchRequest, public client: Kafka){
        super();
    };

    getChildren(element?: TreeItem|undefined): TreeItem[] | Promise<TreeItem[]> {
        if (element === undefined) {
            return this.getGroupMessages();
        }

        if (this.messages.length > 0) {
            return element.getChildren(element);
        }

        return [];
    }

    public AddMessage(message: Message): void {
        this.messages.push(message);
        this.getChildren();
    }

    private getGroupMessages(): TreeItem[] {
        if (this.messages.length === 0) {
            return [];
        }
        
        return this.messages.map(message => {
            return new MessageItem(message, message.value.toString());
        });
    }
}