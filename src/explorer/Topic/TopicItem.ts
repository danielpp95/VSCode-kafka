import * as vscode from "vscode";
import { TreeItem } from '../TreeItem';

export class TopicItem extends TreeItem {
    public contextValue = "topicItem";
    public collapsibleState = vscode.TreeItemCollapsibleState.None;

    constructor(label: string){
        super();
        this.label = label;
    }
}