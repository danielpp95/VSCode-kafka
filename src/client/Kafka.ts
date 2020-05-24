import { Disposable } from 'vscode';
import { KafkaClient } from 'kafka-node';

export class Kafka implements Disposable {
    private static instance: KafkaClient;
    private static brokers:string;

    get Instance() {
        return Kafka.instance;
    }


    public Initialize(brokers: string) {
        if (Kafka.instance === undefined) {
            Kafka.instance = new KafkaClient({
                clientId: 'KafkaDragon',
                kafkaHost: brokers
            });
        }
    }
    
    public dispose() {}
}