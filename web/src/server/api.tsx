interface InterfaceFetch {
    header: RequestInit;
    route: string;
    baseUrl?: string;
}

export const api = ({ header, route, baseUrl }: InterfaceFetch) => {
    return fetch(baseUrl ?? `http://localhost:3333${route}`, header);
};
