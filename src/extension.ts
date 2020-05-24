import * as vscode from 'vscode';

import { KafkaExplorer } from './explorer/KafkaExplorer';
import { MessagesExplorer } from './explorer/Messages/MessagesExplorer';

export function activate(context: vscode.ExtensionContext) {
  var kafkaExplorer = vscode.window.registerTreeDataProvider('KafkaView', new KafkaExplorer());
	// var kafka = vscode.window.registerTreeDataProvider('', new MessagesExplorer("", undefined));

  vscode.commands.registerCommand('kafka_dragon.FetchMessages', async (sender: MessagesExplorer) => {
		// The code you place here will be executed every time your command is executed
		var {
			contextValue,
			label,
			topic,
			client,
			AddMessage
		} = sender;
		
		var _client:any = client;

		var admin = _client.admin();

		vscode.window.showInformationMessage(`Fetching messages`);
	});
	
	vscode.commands.registerCommand('kafka_dragon.StopFetchMessages', () =>{
		vscode.window.showInformationMessage(`Stop fetching messages`);
	});
}