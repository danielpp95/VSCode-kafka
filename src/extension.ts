import * as vscode from 'vscode';

import { KafkaExplorer } from './explorer/KafkaExplorer';
import { MessagesExplorer } from './explorer/Messages/MessagesExplorer';
import { Message } from 'kafka-node';
import { MessageItem } from './explorer/Messages/MessageItem';
import { Kafka } from './client/Kafka';

export function activate(context: vscode.ExtensionContext) {
	var client = new Kafka('localhost:9092');
  	var kafkaExplorer = vscode.window.registerTreeDataProvider('KafkaView', new KafkaExplorer());

  	vscode.commands.registerCommand('kafka_dragon.FetchMessages', async (sender: MessagesExplorer) => {
		var { topicMetadata } = sender;
		
		client.GetMessages([topicMetadata], (message: Message) => {
			console.log(message);
			sender.AddMessage(message);
		});

		vscode.window.showInformationMessage(`Fetching messages`);
	});
	
	vscode.commands.registerCommand('kafka_dragon.StopFetchMessages', () =>{
		client.dispose();
		vscode.window.showInformationMessage(`Stop fetching messages`);
	});
}