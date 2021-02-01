import * as _ from "lodash";
import { GraphNode } from "../entities/node";
import { AlertEvent } from "../models/alert-event";
import alertEventRepository from "../repositories/alert-event";
import serviceMeshService from "./service-mesh";

export class EventAggregationService {
    public async aggregate(event: AlertEvent) {
        let list: GraphNode[];
        const relatedEvent = await this.findRelatedEvent(event.application, event.timestamp);

        if (!relatedEvent) {
            const id = await alertEventRepository.insert(event);
            list = await this.findRelationshipsById(id);
        } else {
            await alertEventRepository.insertRelationship(relatedEvent.id, event);
            list = await this.findRelationshipsById(relatedEvent.id);
        }

        return list;
    }

    public async findRelationshipsById(id: number) {
        const list = await alertEventRepository.findIssueById(id);

        return _.orderBy(list, 'node.properties.timestamp');
    }

    public async findThreeByRootId(id: number) {
        const list = await alertEventRepository.findThreeByRoot(id);

        return _.orderBy(list, 'node.properties.timestamp');
    }

    public async findRelatedEvent(appName: string, timestamp: number) {
        const result = await alertEventRepository.getAllEvents();

        // TODO: Change relationship order of Governance.
        for (const item of result) {
            const relatedApps = await serviceMeshService.getRelatedApplications(item.properties.application);

            if  (relatedApps.includes(appName) && Math.abs(item.properties.timestamp - timestamp) <= 900000) {
                return item;
            }
        }

        return null;
    }

    public async listThrees() {
        const listOfRoots = await alertEventRepository.findRoots();

        return listOfRoots;
    }
}

const eventAggregationService = new EventAggregationService();
export default eventAggregationService;
