import * as vscode from "vscode";
import { TreeItem } from '../TreeItem';
import { TopicItem } from "./TopicItem";
import { Admin } from "../../client/Admin";


export class TopicsExplorer extends TreeItem {
    public command?: vscode.Command | undefined;
    public label = "Topics";
    public contextValue: string = "Topics";
    public collapsibleState: vscode.TreeItemCollapsibleState = vscode.TreeItemCollapsibleState.Collapsed;

    constructor(private admin: Admin){ super(); }

    async getChildren(element: TreeItem): Promise<TreeItem[]> {
        const topicsMetadata = await Promise.resolve(this.admin.GetTopics());
        const metadata = Object.values(Object.values(topicsMetadata));

         return metadata.map((metadata) => {
            return new TopicItem( metadata[0]);
        });
    }
}