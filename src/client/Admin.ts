var KafkaNode = require('kafka-node');
import { Message, KafkaClient } from 'kafka-node';
import { Kafka } from './Kafka';

export class Admin {
    private kafka: KafkaClient;

    constructor() {
        this.kafka = new Kafka().Instance;
    }

    get Instance() {
        return KafkaNode.Admin(this.kafka);
    }

    public  GetTopics(): Promise<string[]> {
        var topics: string[] = [];

        var instance = new KafkaNode.Admin(this.kafka);

        var promise = new Promise<string[]>(function(resolve, reject) {
            instance.listTopics(async (err:any, res:any) => {
                if (err) {
                    reject(err);
                }

                var metadata = await res[1].metadata;
                topics = Object.keys(metadata);
                resolve(topics);
            });
        });

        return promise;
    }
}