import fetch from "node-fetch";

export class ServiceMeshService {
    public async getRelatedApplications(appName: string): Promise<string[]> {
        const res = await fetch(`http://sak-front-hml.xpi.com.br:9100/api/v1/applications/${appName}/relatedapplications`);
        const data = await res.json();

        return data;
    }
}

const serviceMeshService = new ServiceMeshService();
export default serviceMeshService;
