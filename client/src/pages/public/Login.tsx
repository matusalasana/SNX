import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useLogin } from "../../hooks/auth/useLogin";
import { useAuth } from "../../hooks/auth/useAuth";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending } = useLogin();
  const { data: user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => login(data);

  useEffect(() => {
    if (user) {
      navigate("/admin", { replace: true });
    }
  }, [user, navigate]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-900">
      <div className="w-full max-w-md">
        {/* CARD */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-colors dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
          
          {/* HEADER */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
              Welcome Back, Sana
            </h1>

            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Sign in to your account
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-sm text-zinc-700 dark:text-zinc-300">
                Email
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />

                <input
                  {...register("email")}
                  type="email"
                  placeholder="you@example.com"
                  className="
                    w-full rounded-xl
                    border border-zinc-200
                    bg-white
                    px-4 py-3 pl-10
                    text-zinc-900
                    placeholder:text-zinc-400
                    outline-none
                    transition
                    focus:border-amber-400
                    focus:ring-2 focus:ring-amber-400/20
                    dark:border-zinc-800
                    dark:bg-zinc-950
                    dark:text-white
                  "
                />
              </div>

              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="mb-2 block text-sm text-zinc-700 dark:text-zinc-300">
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />

                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="
                    w-full rounded-xl
                    border border-zinc-200
                    bg-white
                    px-4 py-3 pl-10 pr-10
                    text-zinc-900
                    placeholder:text-zinc-400
                    outline-none
                    transition
                    focus:border-amber-400
                    focus:ring-2 focus:ring-amber-400/20
                    dark:border-zinc-800
                    dark:bg-zinc-950
                    dark:text-white
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 transition hover:text-amber-500"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isPending}
              className="
                w-full rounded-xl
                bg-amber-500
                py-3
                font-medium text-black
                transition-colors
                hover:bg-amber-400
                disabled:opacity-50
              "
            >
              {isPending ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}