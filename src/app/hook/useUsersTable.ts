import { useQuery } from "@tanstack/react-query";
import { getUsers, Users } from "../action/getUsers";

export const useUserTable = () => {
  return useQuery<Users[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });
};
