import { useRouter } from "next/navigation";
import { useState } from "react";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (data: { email: string; password: string }) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      localStorage.setItem(
        "lendsqr-userData",
        JSON.stringify({
          phone: "+234" + Math.floor(Math.random() * 9000000000 + 1000000000),
          organization: "Lendsqr",
          username: "user" + Math.floor(Math.random() * 10000),
          dateJoined: new Date().toISOString(),
          status: "active",
          email: data.email,
        })
      );
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
