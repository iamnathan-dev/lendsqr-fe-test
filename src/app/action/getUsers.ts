import axios from "axios";

export interface Users {
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: "Active" | "Inactive" | "Pending" | "Blacklisted";
}

interface ApiResponse {
  users: Users[];
}

export const getUsers = async (): Promise<Users[]> => {
  const { data } = await axios.get<ApiResponse>(
    `${process.env.NEXT_PUBLIC_API_URL}/ac0131c3-b824-4bc5-8be5-22e0bb93fd11`
  );

  return data.users.map((user: Users) => ({
    ...user,
    dateJoined: new Date(user.dateJoined).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }),
    status: user.status as Users["status"],
  }));
};
