import * as vscode from 'vscode';

import { Admin } from '../client/Admin';
import { TreeItem } from './TreeItem';
import { TopicsExplorer } from './Topic/TopicsExplorer';

export class KafkaExplorer implements vscode.TreeDataProvider<TreeItem> {
    private admin:Admin;

    constructor() {
        this.admin = new Admin();
    }

    getTreeItem(element: TreeItem): vscode.TreeItem|Thenable<vscode.TreeItem> {
        return element;
    }

    getChildren(element?: TreeItem|undefined): vscode.ProviderResult<TreeItem[]> {
        if (element === undefined) {
            return Promise.resolve(this.getGroupChildren());
        }
        return element.getChildren(element);
    }

    private getGroupChildren(): TreeItem[] {
        return [
            new TopicsExplorer(this.admin),
        ];
    }
}