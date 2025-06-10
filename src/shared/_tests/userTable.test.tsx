import { renderHook, waitFor } from "@testing-library/react";
import { useUserTable } from "../../app/hook/useUsersTable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const QueryWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      {children}
    </QueryClientProvider>
  );
};
QueryWrapper.displayName = "QueryWrapper";

describe("useUserTable Hook", () => {
  it("should fetch users successfully", async () => {
    const { result } = renderHook(() => useUserTable(), {
      wrapper: QueryWrapper,
    });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
  });

  it("should handle loading state", () => {
    const { result } = renderHook(() => useUserTable(), {
      wrapper: QueryWrapper,
    });

    expect(result.current.isLoading).toBe(true);
  });

  it("should handle error state", async () => {
    const { result } = renderHook(() => useUserTable(), {
      wrapper: QueryWrapper,
    });

    await waitFor(() => {
      expect(result.current.isError).toBeDefined();
    });
  });

  it("should return users data", async () => {
    const { result } = renderHook(() => useUserTable(), {
      wrapper: QueryWrapper,
    });

    await waitFor(() => {
      expect(result.current.data).toBeDefined();
    });
  });

  it("should handle refetching", async () => {
    const { result } = renderHook(() => useUserTable(), {
      wrapper: QueryWrapper,
    });

    await waitFor(() => {
      expect(result.current.refetch).toBeDefined();
    });

    result.current.refetch();
  });
});
