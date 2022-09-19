interface InterfaceFetch {
    header: RequestInit;
    route: string;
    baseUrl?: string;
}

 export const api = ({ header, route, baseUrl }: InterfaceFetch) => {
    return fetch(baseUrl ?? `http://192.168.1.16:3333${route}`, header);
};
