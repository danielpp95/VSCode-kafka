import * as vscode from 'vscode';

import { Kafka } from '../client/Kafka';
import { Admin } from '../client/Admin';
import { TreeItem } from './TreeItem';

import { TopicsExplorer } from './Topic/TopicsExplorer';

export class KafkaExplorer implements vscode.TreeDataProvider<TreeItem> {
    private kafka:Kafka;
    private admin:Admin;

    constructor() {
        this.kafka = new Kafka();
        this.kafka.Initialize('localhost:9092');
        
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
            new TopicsExplorer(this.kafka, this.admin),
        ];
    }
}