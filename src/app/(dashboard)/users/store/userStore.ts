import { Users } from "@/app/action/getUsers";
import { create } from "zustand";

interface UserState {
  users: Users[];
  selectedUser: Users | null;
  query: string;
  setUsers: (users: Users[]) => void;
  setSelectedUser: (user: Users | null) => void;
  setQuery: (query: string) => void;
  filterUsers: () => Users[];
}

const useUserStore = create<UserState>((set, get) => {
  return {
    users: [],
    selectedUser: null,
    query: "",

    setUsers: (users) => {
      set({ users });
    },

    setSelectedUser: (user) => {
      set({ selectedUser: user });
    },

    setQuery: (query) => {
      set({ query });
    },

    filterUsers: () => {
      const { users, query } = get();

      if (query === "") {
        return users;
      }

      const filteredUsers = users.filter((user) => {
        const matchesSearch =
          user.organization
            ?.toLowerCase()
            .includes((query || "").toLowerCase()) ||
          user.username?.toLowerCase().includes((query || "").toLowerCase()) ||
          user.email?.toLowerCase().includes((query || "").toLowerCase()) ||
          user.phoneNumber
            ?.toLowerCase()
            .includes((query || "").toLowerCase()) ||
          user.dateJoined
            ?.toLowerCase()
            .includes((query || "").toLowerCase()) ||
          user.status?.toLowerCase().includes((query || "").toLowerCase());

        return matchesSearch;
      });
      return filteredUsers;
    },
  };
});

export default useUserStore;
