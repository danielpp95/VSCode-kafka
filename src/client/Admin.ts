import {
    Kafka as kafkaJs,
    Admin as AdminJs
} from 'kafkajs';

import { Kafka } from './Kafka';

export class Admin {
    private static instance: AdminJs;
    private kafka: kafkaJs;

    constructor() {
        this.kafka = new Kafka().Instance;
        Admin.instance = this.kafka.admin();
    }

    get Instance() {
        return Admin.instance;
    }

    public async GetTopics(): Promise<string[]> {
        return await Admin.instance.listTopics();
    }

    public Initialize() {
        if (Admin.instance === undefined) {
            Admin.instance = this.kafka.admin();
        }
    }
}