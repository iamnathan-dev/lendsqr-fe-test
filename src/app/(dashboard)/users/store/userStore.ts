import { Users } from "@/app/action/getUsers";
import { create } from "zustand";

interface UserState {
  users: Users[];
  selectedUser: Users | null;
  query: string[];
  setUsers: (users: Users[]) => void;
  setSelectedUser: (user: Users | null) => void;
  setQuery: (query: string[]) => void;
  filterUsers: () => Users[];
}

const useUserStore = create<UserState>((set, get) => {
  return {
    users: [],
    selectedUser: null,
    query: [],

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

      if (query.length === 0) {
        return users;
      }

      const filteredUsers = users.filter((user) => {
        return query.some((searchTerm) => {
          const lowercaseSearchTerm = (searchTerm || "").toLowerCase();
          return (
            user.organization?.toLowerCase().includes(lowercaseSearchTerm) ||
            user.username?.toLowerCase().includes(lowercaseSearchTerm) ||
            user.email?.toLowerCase().includes(lowercaseSearchTerm) ||
            user.phoneNumber?.toLowerCase().includes(lowercaseSearchTerm) ||
            user.dateJoined?.toLowerCase().includes(lowercaseSearchTerm) ||
            user.status?.toLowerCase().includes(lowercaseSearchTerm)
          );
        });
      });

      return filteredUsers;
    },
  };
});

export default useUserStore;
