import * as vscode from "vscode";
import { TreeItem } from '../TreeItem';
import { Message } from "kafka-node";

export class MessageItem extends TreeItem {
    public contextValue = "topicItem";
    public collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
    public command?: vscode.Command | undefined;
    
    constructor(public message:Message){
        super();
        this.label = message.topic;
    }
}