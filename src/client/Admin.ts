var KafkaNode = require('kafka-node');
import { KafkaClient } from 'kafka-node';
import { Kafka } from './Kafka';

export class Admin {
    private static instance: any;
    private kafka: KafkaClient;

    constructor() {
        this.kafka = new Kafka().Instance;
        Admin.instance = new KafkaNode.Admin(this.kafka);
    }

    public Initialize(brokers: string) {
        if (Admin.instance === undefined) {
            Admin.instance = new KafkaNode.Admin(this.kafka);
        }
    }

    get Instance() {
        return Admin.instance;
    }

    public  GetTopics(): Promise<any[]> {
        var promise = new Promise<any[]>(function(resolve, reject) {
            Admin.instance.listTopics(async (err:any, res:any) => {
                if (err) {
                    reject(err);
                }

                var metadata: any[] = Object.values(res[1].metadata);
                
                resolve(metadata);
            });
        });

        return promise;
    }
}