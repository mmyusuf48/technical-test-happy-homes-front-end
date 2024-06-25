import { getUserRate, queries } from "@/services/user-rate";
import { useQuery } from "@tanstack/react-query";

export const GetDataUserRate = () => useQuery({
    queryKey: [queries.GET_USER_RATE],
    queryFn: getUserRate,
  });