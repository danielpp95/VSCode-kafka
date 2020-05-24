import * as vscode from 'vscode';

import { KafkaExplorer } from './explorer/KafkaExplorer';
import { MessagesExplorer } from './explorer/Messages/MessagesExplorer';
import { Message } from 'kafka-node';

export function activate(context: vscode.ExtensionContext) {
  var kafkaExplorer = vscode.window.registerTreeDataProvider('KafkaView', new KafkaExplorer());

  vscode.commands.registerCommand('kafka_dragon.FetchMessages', async (sender: MessagesExplorer) => {
		// The code you place here will be executed every time your command is executed
		var {
			topicMetadata,
			client,
			AddMessage
		} = sender;
		
		client.GetMessages([topicMetadata], (message: Message) => {
			console.log(message);
			AddMessage(message);
		});

		vscode.window.showInformationMessage(`Fetching messages`);
	});
	
	vscode.commands.registerCommand('kafka_dragon.StopFetchMessages', () =>{
		vscode.window.showInformationMessage(`Stop fetching messages`);
	});
}