import * as vscode from "vscode";
import { TreeItem } from '../TreeItem';
import { MessagesExplorer } from '../Messages/MessagesExplorer';
import { Kafka } from "../../client/Kafka";

export class TopicItem extends TreeItem {
    public contextValue = "topicItem";
    public collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
    public command?: vscode.Command | undefined;

    constructor(label: string, private client: Kafka){
        super();
        this.label = label;
    }

    getChildren(): TreeItem[] {
        return [
            new MessagesExplorer(this.label || "", this.client)
        ];
    }
}