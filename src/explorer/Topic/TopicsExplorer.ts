import * as vscode from "vscode";
import { TreeItem } from '../TreeItem';
import { TopicItem } from "./TopicItem";
import { Kafka } from "../../client/Kafka";
import { Admin } from "../../client/Admin";


export class TopicsExplorer extends TreeItem {
    public command?: vscode.Command | undefined;
    public label = "Topics";
    public contextValue: string = "Topics";
    public collapsibleState: vscode.TreeItemCollapsibleState = vscode.TreeItemCollapsibleState.Collapsed;

    constructor(private client: Kafka, private admin: Admin){ super(); }

    async getChildren(element: TreeItem): Promise<TreeItem[]> {
        var topics = await Promise.resolve(this.admin.GetTopics());

        return topics.map((topic: string) => {
            return new TopicItem(topic, this.client);
        });
    }
}