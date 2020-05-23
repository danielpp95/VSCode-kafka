import * as vscode from 'vscode';

import { Kafka } from '../client/Kafka';
import { Admin } from '../client/Admin';
import { TreeItem } from './TreeItem';
import {
  Kafka as kafkaJs,
  Admin as AdminJs
} from 'kafkajs';
import { TopicsExplorer } from './Topic/TopicsExplorer';

export class KafkaExplorer implements vscode.TreeDataProvider<TreeItem> {
  private kafka:kafkaJs;
  private admin:AdminJs;

  constructor() {
    var client= new Kafka();
    client.Initialize(['localhost:9092']);
    this.kafka = client.Instance;
    
    var clientAdmin = new Admin();
    clientAdmin.Initialize();
    this.admin = clientAdmin.Instance;
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