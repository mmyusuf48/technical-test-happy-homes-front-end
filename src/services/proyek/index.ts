import AxiosInstance from "@/lib/axios";
import { dataProyek } from "@/feature/proyek/types";

const queries = {
    GET_PROYEK: 'GET_PROYEK'
}

const postProyek = async (payloads: { name: string }) => new Promise((resolve, reject) => {
    AxiosInstance
        .post('/cms/project', { ...payloads })
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        });
});

const getProyek = async () => new Promise<dataProyek[]>((resolve, reject) => {
    AxiosInstance
        .get('/cms/project')
        .then((response) => {
            resolve(response.data.data);
        })
        .catch((error) => {
            reject(error);
        });
});

export {
    postProyek,
    getProyek,
    queries
}