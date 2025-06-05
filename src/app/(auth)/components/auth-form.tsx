"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { loginSchema } from "../schema/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const LoginForm = ({
  onSubmit,
  loading,
}: {
  onSubmit: (data: { email: string; password: string }) => void;
  loading?: boolean;
}) => {
  type FormValues = z.infer<typeof loginSchema>;
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: process.env.NEXT_PUBLIC_TEST_EMAIL || "",
      password: process.env.NEXT_PUBLIC_TEST_PASSWORD || "",
    },
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email"
                      {...field}
                      className="!bg-transparent rounded-sm !p-2 h-11 shadow-none border-1 focus-visible:ring-0 focus-visible:border-main placeholder:text-gray-400"
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        {...field}
                        className="!bg-transparent rounded-sm !p-2 h-11 shadow-none border-1 focus-visible:ring-0 focus-visible:border-main placeholder:text-gray-400"
                      />
                      <button
                        type="button"
                        className="absolute right-3 outline-none top-1/2 -translate-y-1/2 cursor-pointer text-main text-xs "
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "HIDE" : "SHOW"}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <Link
              href="#"
              className="outline-none no-underline text-main text-xs"
            >
              FORGOT PASSWORD?
            </Link>

            <Button
              size={"lg"}
              type="submit"
              disabled={loading}
              className="w-full rounded-sm text-white cursor-pointer !bg-main focus-visible:ring-0"
            >
              LOG IN
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default LoginForm;
