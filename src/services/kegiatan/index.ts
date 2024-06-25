import AxiosInstance from "@/lib/axios";
import { kegiatanData } from "@/feature/daftar-kegiatan/types";

const queries = {
    GET_KEGIATAN: 'GET_KEGIATAN'
}

const postKegiatan = async (
    payloads: { 
        start_date: string, 
        end_date: string, 
        start_time: string, 
        end_time: string, 
        activity: string, 
        project_id: string, 
        user_rate_id: string, 
    }
) => new Promise((resolve, reject) => {
    
    AxiosInstance
        .post('/cms/activity', { ...payloads })
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        });
});

const postEditKegiatan = async (
    payloads: { 
        id?: string, 
        start_date: string, 
        end_date: string, 
        start_time: string, 
        end_time: string, 
        activity: string, 
        project_id: string, 
        user_rate_id: string, 
    }
) => new Promise((resolve, reject) => {
    let payloadUpdate = {...payloads};

    if (payloads.id) delete payloadUpdate.id;

    AxiosInstance
        .put(`/cms/activity/${payloads.id}`, { ...payloadUpdate })
        .then((response) => {
            resolve(response.data);
        })
        .catch((error) => {
            reject(error);
        });
});

const getKegiatan = async (id: string) => new Promise<kegiatanData[]>((resolve, reject) => {
    AxiosInstance
        .get(`/cms/activity?user_rate_id=${id}`)
        .then((response) => {
            resolve(response.data.data);
        })
        .catch((error) => {
            reject(error);
        });
});

const deleteKegiatan = async (id: string) => new Promise((resolve, reject) => {
    AxiosInstance
        .delete(`/cms/activity/:${id}`)
        .then((response) => {
            resolve(response.data.data);
        })
        .catch((error) => {
            reject(error);
        });
});

export {
    postKegiatan,
    getKegiatan,
    postEditKegiatan,
    deleteKegiatan,
    queries
}