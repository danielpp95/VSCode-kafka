import * as vscode from "vscode";
import { Message, OffsetFetchRequest } from 'kafka-node';
import { TreeItem } from '../TreeItem';
import { MessageItem } from "./MessageItem";

export class MessagesExplorer implements vscode.TreeDataProvider<TreeItem> {
    public contextValue = "MessageExplorer";
    public collapsibleState = vscode.TreeItemCollapsibleState.Collapsed;
    public command?: vscode.Command | undefined;
    public label = "Messages";
    public messages : Message[];
    
    constructor(public topicMetadata: OffsetFetchRequest){
        this.messages = [];
    }
    
    private _onDidChangeTreeData: vscode.EventEmitter<TreeItem | undefined> = new vscode.EventEmitter<TreeItem | undefined>();
    readonly onDidChangeTreeData: vscode.Event<TreeItem | undefined> = this._onDidChangeTreeData.event;

    public refresh(): void {
        this._onDidChangeTreeData.fire(undefined);
    }
    
    getTreeItem(element: TreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }

    async getChildren(element?: TreeItem|undefined): Promise<TreeItem[]> {
        return this.getGroupMessages();
    }

    public AddMessage(message: Message): void {
        this.messages = this.messages.concat(message);
        this.refresh();
    }

    private getGroupMessages(): TreeItem[] {
        if (this.messages.length === 0) {
            return [];
        }
        
        return this.messages.map(message => {
            return new MessageItem(message);
        });
    }
}