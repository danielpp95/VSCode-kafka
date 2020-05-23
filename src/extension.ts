import * as vscode from 'vscode';

import { KafkaExplorer } from './explorer/KafkaExplorer'

export function activate(context: vscode.ExtensionContext) {
  vscode.window.registerTreeDataProvider('KafkaView', new KafkaExplorer());
}