import { Disposable } from 'vscode';
import { KafkaClient, Consumer, OffsetFetchRequest, Message } from 'kafka-node';

export class Kafka implements Disposable {
    private static instance: KafkaClient;
    private static brokers:string;
    private consumer: Consumer | undefined;

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

    public GetMessages(
        topics: OffsetFetchRequest[],
        callBack: (message: Message) => any,
        autoCommit: boolean = false) {
        
        this.consumer = new Consumer(
            Kafka.instance,
            topics,
            {
                autoCommit: autoCommit
            });
        
        this.consumer.on('message', callBack);
    }
    
    public dispose() {
        if (this.consumer !== undefined) {
            this.consumer.pause();
        }
    }
}