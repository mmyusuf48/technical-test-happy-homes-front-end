import AxiosInstance from "@/lib/axios";
import { userRateData } from "@/feature/pengaturan/types";

const queries = {
    GET_USER_RATE: 'GET_USER_RATE'
}

const postUserRate = async (payloads: { name: string, rate: number }) => new Promise((resolve, reject) => {
    AxiosInstance
        .post('/cms/user-rate', { ...payloads })
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        });
});

const getUserRate = async () => new Promise<userRateData[]>((resolve, reject) => {
    AxiosInstance
        .get('/cms/user-rate')
        .then((response) => {
            resolve(response.data.data);
        })
        .catch((error) => {
            reject(error);
        });
});

export {
    postUserRate,
    getUserRate,
    queries
}