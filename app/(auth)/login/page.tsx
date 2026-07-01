"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { type LoginFormData, loginSchema } from "@/schemas/auth.schema";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-neutral-950">
      <div className="flex flex-1 flex-col gap-6 items-center justify-center px-6 py-12">
        <div className="flex gap-1 items-center justify-center text-[35px] font-bold">
          <div className="group flex h-14 w-14 hover-spin-return items-center justify-center rounded-md bg-linear-to-tr from-blue-600 to-cyan-400 font-bold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-cyan-400/50 dark:from-neutral-100 dark:to-neutral-300 dark:text-neutral-900 dark:shadow-none">
            <span className="text-[32px] tracking-wide transform transition-transform duration-300 group-hover:scale-110">
              B
            </span>
          </div>
          logify
        </div>
        <div className="w-full max-w-lg sm:shadow-[0_0_25px_0_rgba(0,0,0,0.15)] p-0 rounded-md sm:p-12">
          <div className="mb-10 text-center">
            <h1 className="text-[35px] font-semibold text-neutral-900 dark:text-neutral-100">
              Welcome
            </h1>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="hello@example.com"
              error={errors.email?.message}
              {...register("email")}
            />
            <Input
              label="Password"
              type="password"
              placeholder="********"
              error={errors.password?.message}
              {...register("password")}
            />

            <Button type="submit" fullWidth className="mt-2">
              Sign In
            </Button>

            <p className="text-center text-sm text-neutral-500 dark:text-neutral-400">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-[#0099ff] hover:underline dark:text-neutral-100"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
