import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteKegiatan } from '@/services/kegiatan';
import { AxiosError } from 'axios';
import { showMessageSuccess, showMessageError } from '@/lib/sweet-alert';

export const useDeleteKegiatan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteKegiatan,
    onError: (error: AxiosError) => {
      if (error.response && error.response.data) {
        showMessageError((error.response.data as { message: string }).message || 'Terjadi kesalahan!');
      } else {
        showMessageError('Terjadi kesalahan!');
      }
      console.log(error);
    },
    onSuccess: () => {
      showMessageSuccess('Data berhasil dihapus!');
      queryClient.invalidateQueries({
        queryKey: ['GET_KEGIATAN'],
      });
    }
  });
};
