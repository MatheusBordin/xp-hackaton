declare module "redisgraph.js" {
    export class Graph {
        constructor(database: string, host: string, port: string);

        public query(query: string, param?: any): Promise<any>;
        public close(): void;
        public deleteGraph(): void;
    }
}
