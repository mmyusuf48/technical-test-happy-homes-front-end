import { getProyek, queries } from "@/services/proyek";
import { useQuery } from "@tanstack/react-query";

export const GetDataProyek = () => useQuery({
    queryKey: [queries.GET_PROYEK],
    queryFn: getProyek,
  });