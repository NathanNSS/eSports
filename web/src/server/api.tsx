import axios from "axios";

interface InterfaceFetch {
    header: RequestInit;
    route: string;
    baseUrl?: string;
}

export const apiFetch = ({ header, route, baseUrl }: InterfaceFetch) => {
    return fetch(baseUrl ?? `http://localhost:3333${route}`, header);
};

export const api = axios.create({
    baseURL: "http://localhost:3333",
    headers: { "Content-type": "application/json; charset=UTF-8" },
});
