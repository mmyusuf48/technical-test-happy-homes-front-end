import { postKegiatan, postEditKegiatan, queries } from "@/services/kegiatan";
import { useMutation, useQueryClient  } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { showMessageSuccess, showMessageError } from '@/lib/sweet-alert';


export const PostDataActivity = (onSuccess: () => void) => useMutation({
    mutationFn: postKegiatan, 
    onError: (error: AxiosError) => {
        if (error.response && error.response.data) {
            showMessageError((error.response.data as { message: string }).message || 'Terjadi kesalahan!');
        } else {
            showMessageError('Terjadi kesalahan!');
        }
        console.log(error);
    },
    onSuccess: () => {
        onSuccess();
        showMessageSuccess('data berhasil ditambahkan!');
    }
})

export const PostDataEditActivity = (onSuccess: () => void) => useMutation({
    mutationFn: postEditKegiatan, 
    onError: (error: AxiosError) => {
        if (error.response && error.response.data) {
            showMessageError((error.response.data as { message: string }).message || 'Terjadi kesalahan!');
        } else {
            showMessageError('Terjadi kesalahan!');
        }
        console.log(error);
    },
    onSuccess: () => {
        onSuccess();
        showMessageSuccess('data berhasil diubah!');
    }
})