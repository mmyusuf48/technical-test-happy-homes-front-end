import { postUserRate } from "@/services/user-rate";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { showMessageSuccess, showMessageError } from '@/lib/sweet-alert';

export const PostDataUserRate = (onSuccessCallback: () => void) => useMutation({
    mutationFn: postUserRate, 
    onError: (error: AxiosError) => {
        if (error.response && error.response.data) {
            showMessageError((error.response.data as { message: string }).message || 'Terjadi kesalahan!');
        } else {
            showMessageError('Terjadi kesalahan!');
        }
        console.log(error);
    },
    onSuccess: () => {
        showMessageSuccess('User Rate berhasil ditambahkan!');
        onSuccessCallback();
    }
})