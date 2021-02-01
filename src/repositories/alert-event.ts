import { AlertEventEntity } from "../entities/alert-event";
import { GraphNode } from "../entities/node";
import { graphClient } from "../infra/connections/redisgraph";
import { AlertEvent } from "../models/alert-event";

export class AlertEventRepository {
    public async getAllEvents(): Promise<AlertEventEntity[]> {
        const list = [];
        const result = await graphClient.query('MATCH (x) RETURN x');

        while (result.hasNext()) {
            const record = result.next();
            const node = record.get('x');

            list.push(node);
        }

        return list;
    }

    public async findIssueById(id: number): Promise<GraphNode[]> {
        const list = [];
        const result = await graphClient.query(`
            match (p:AlertEvent)-[:RELATED*0..]-(p2:AlertEvent)
            where id(p)=${id}
            optional match (p2)-[:RELATED]-(p3)
            return p2, collect(id(p3))
        `);

        while (result.hasNext()) {
            const record = result.next();
            const event = record.get('p2');
            const related = record.get('collect(id(p3))');

            list.push({
                event,
                related
            });
        }

        return list;
    }

    public async insert(event: AlertEvent): Promise<number> {
        const result = await graphClient.query(`CREATE (a:AlertEvent {application: $application, timestamp: $timestamp, message: $message, severity: $severity}) RETURN ID(a) AS id`, event);
        while(result.hasNext()) {
            return result.next().get('id');
        }
    }

    public async insertRelationship(id: number, event: AlertEvent): Promise<number> {
        const result = await graphClient.query(`MATCH (e:AlertEvent) WHERE ID(e) = ${id} CREATE (e)-[:RELATED]->(a:AlertEvent {application: $application, timestamp: $timestamp, message: $message, severity: $severity}) RETURN ID(a) AS id`, event);
        while(result.hasNext()) {
            return result.next().get('id');
        }
    }

    public async findThreeByRoot(id: number) {
        const list = [];
        const result = await graphClient.query(`
            match (p:AlertEvent)-[:RELATED*0..]->(p2:AlertEvent)
            where id(p)=${id}
            optional match (p2)-[:RELATED]->(p3)
            return p2, collect(id(p3))
        `);

        while (result.hasNext()) {
            const record = result.next();
            const event = record.get('p2');
            const related = record.get('collect(id(p3))');

            list.push({
                event,
                related
            });
        }

        return list;
    }

    public async findRoots(): Promise<AlertEventEntity[]> {
        const list = [];
        const result = await graphClient.query(`
            match (p:AlertEvent) where indegree(p) = 0 return p
        `);

        while (result.hasNext()) {
            const record = result.next();
            const event = record.get('p');

            list.push(event);
        }

        return list;
    }
}

const alertEventRepository = new AlertEventRepository();
export default alertEventRepository;
