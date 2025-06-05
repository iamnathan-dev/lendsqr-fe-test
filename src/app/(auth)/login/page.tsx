"use client";

import LoginForm from "../components/auth-form";
import { useLogin } from "../hook/useLogin";

const Login = () => {
  const { handleSubmit, loading } = useLogin();

  return (
    <>
      <div className="flex flex-col space-y-15">
        <div className="flex flex-col space-y-2">
          <h1 className="text-custome text-4xl font-bold">Welcome!</h1>
          <h5 className="text-custome-secondary text-lg">
            Enter details to login.
          </h5>
        </div>

        <LoginForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </>
  );
};

export default Login;
