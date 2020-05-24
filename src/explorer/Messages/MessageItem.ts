import * as vscode from "vscode";
import { TreeItem } from '../TreeItem';

export class MessageItem extends TreeItem {
    public contextValue = "topicItem";
    public collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
    public command?: vscode.Command | undefined;

    constructor(public message:any, label: string){
        super();
        this.label = label;
    }
}