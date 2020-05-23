import { Disposable } from 'vscode';

import {
    Kafka as kafkajs,
    Producer as ProducerJs,
    Consumer as ConsumerJs,
    Message
} from 'kafkajs';

export class Kafka implements Disposable {
    private static instance: kafkajs;
    private static producer: ProducerJs;
    private static consumer: ConsumerJs;
    private static brokers:string[];

    get Instance() {
        return Kafka.instance;
    }

    public Produce(_topic:string, messages: Message[]) {
        Kafka.producer.send({
            topic: _topic,
            messages: messages
        });
        Kafka.producer.disconnect();
    }

    public Initialize(brokers: string[]) {
        if (Kafka.instance === undefined) {
            Kafka.instance = new kafkajs({
                clientId: 'my-app',
                brokers: brokers
            });
        }
    }
    
    public dispose() {
        Kafka.producer.disconnect();
        Kafka.consumer.disconnect();
    }
}