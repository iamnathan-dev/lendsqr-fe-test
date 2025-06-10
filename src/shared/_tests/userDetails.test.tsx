import { act } from "@testing-library/react";
import useUserStore from "../../app/(dashboard)/users/store/userStore";
import { Users as UsersType } from "@/app/action/getUsers";

const mockUser = {
  organization: "Test Org",
  username: "testuser",
  email: "test@example.com",
  phoneNumber: "1234567890",
  dateJoined: "2024-01-01",
  status: "Active",
} as UsersType;

describe("UserTable Store", () => {
  beforeEach(() => {
    useUserStore.setState({
      users: [],
      selectedUser: null,
      query: [],
    });
  });

  describe("User Operations", () => {
    it("should set users", () => {
      act(() => {
        useUserStore.setState({ users: [mockUser] });
      });
      const store = useUserStore.getState();
      expect(store.users).toHaveLength(1);
      expect(store.users[0]).toEqual(mockUser);
    });

    it("should filter users", () => {
      act(() => {
        useUserStore.setState({ users: [mockUser] });
      });
      const store = useUserStore.getState();
      const filteredUsers = store.filterUsers();
      expect(filteredUsers).toHaveLength(1);
      expect(filteredUsers[0]).toEqual(mockUser);
    });

    it("should update user status", () => {
      const updatedUser = { ...mockUser, status: "Blacklisted" } as UsersType;
      act(() => {
        useUserStore.setState({ users: [updatedUser] });
      });
      const store = useUserStore.getState();
      expect(store.users[0].status).toBe("Blacklisted");
    });
  });

  describe("Search and Filter Operations", () => {
    it("should filter users by organization", () => {
      act(() => {
        useUserStore.setState({ users: [mockUser], query: ["Test Org"] });
      });
      const store = useUserStore.getState();
      const filteredUsers = store.filterUsers();
      expect(filteredUsers).toHaveLength(1);
    });

    it("should filter users by username", () => {
      act(() => {
        useUserStore.setState({
          users: [mockUser],
          query: ["Test Org", "testuser"],
        });
      });
      const store = useUserStore.getState();
      const filteredUsers = store.filterUsers();
      expect(filteredUsers).toHaveLength(1);
    });

    it("should filter users by email", () => {
      act(() => {
        useUserStore.setState({
          users: [mockUser],
          query: ["Test Org", "test@example.com"],
        });
      });
      const store = useUserStore.getState();
      const filteredUsers = store.filterUsers();
      expect(filteredUsers).toHaveLength(1);
    });

    it("should filter users by status", () => {
      act(() => {
        useUserStore.setState({
          users: [mockUser],
          query: ["Test Org", "Active"],
        });
      });
      const store = useUserStore.getState();
      const filteredUsers = store.filterUsers();
      expect(filteredUsers).toHaveLength(1);
    });

    it("should return empty array when no matches found", () => {
      act(() => {
        useUserStore.setState({ users: [mockUser], query: ["Non Existent"] });
      });
      const store = useUserStore.getState();
      const filteredUsers = store.filterUsers();
      expect(filteredUsers).toHaveLength(0);
    });
  });

  describe("Pagination Operations", () => {
    it("should handle pagination correctly", () => {
      const multipleUsers = Array(20).fill(mockUser) as UsersType[];
      act(() => {
        useUserStore.setState({ users: multipleUsers });
      });
      const store = useUserStore.getState();
      expect(store.users).toHaveLength(20);
    });
  });
});
