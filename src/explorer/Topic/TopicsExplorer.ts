import * as vscode from "vscode";
import { TreeItem } from '../TreeItem';
import { Kafka, Admin } from "kafkajs";
import { TopicItem } from "./TopicItem";

export class TopicsExplorer extends TreeItem {
    public label = "Topics";
    public contextValue: string = "Topics";
    public collapsibleState: vscode.TreeItemCollapsibleState = vscode.TreeItemCollapsibleState.Collapsed;

    constructor(private client: Kafka, private admin: Admin){ super(); }

    async getChildren(element: TreeItem): Promise<TreeItem[]>{
        var topics = await Promise.resolve(this.admin.listTopics());

        return Promise.resolve(topics.map(topic => {
            return new TopicItem(topic);
        }));
    }
}