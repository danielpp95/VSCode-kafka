import * as vscode from "vscode";
import { TreeItem } from '../TreeItem';
import { MessagesExplorer } from '../Messages/MessagesExplorer';
import { Kafka } from "../../client/Kafka";
import { OffsetFetchRequest } from "kafka-node";

export class TopicItem extends TreeItem {
    public contextValue = "topicItem";
    public collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
    public command?: vscode.Command | undefined;

    constructor(private topicMetadata: OffsetFetchRequest, private client: Kafka){
        super();
        this.label = topicMetadata.topic || 'internalError';
    }

    getChildren(): TreeItem[] {
        return [
            new MessagesExplorer(this.topicMetadata, this.client)
        ];
    }
}