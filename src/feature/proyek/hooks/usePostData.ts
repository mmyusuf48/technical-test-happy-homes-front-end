import { postProyek } from "@/services/proyek";
import { useMutation } from "@tanstack/react-query";
import { showMessageSuccess } from '@/lib/sweet-alert';

export const PostDataProyek = (onSuccess: () => void) => useMutation({
    mutationFn: postProyek, 
    onError: (error) => {
        console.log(error)
    },
    onSuccess: (res) => {
        onSuccess();
        
    }
})