import { useRouter } from "next/navigation";
import { useState } from "react";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: { email: string; password: string }) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      localStorage.setItem("lendsqr-userData", JSON.stringify(data));
      router.push("/dashboard");
    } catch (error) {
      console.error("Error storing login data:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleSubmit,
  };
};
