import { queries, getKegiatan } from "@/services/kegiatan";
import { useQuery } from "@tanstack/react-query";

export const GetDataKegiatan = (user_rate_id:string) => useQuery({
    queryKey: [queries.GET_KEGIATAN, user_rate_id],
    queryFn: () => getKegiatan(user_rate_id),
    enabled: !!user_rate_id,
});