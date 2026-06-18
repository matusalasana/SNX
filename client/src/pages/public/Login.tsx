import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useLogin } from "../../hooks/auth/useLogin";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => login(data);

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-black">
      <div className="w-full max-w-md">
        {/* CARD */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 backdrop-blur-xl p-6 sm:p-8 shadow-xl">
          
          {/* HEADER */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">
              Welcome Back, Sana
            </h1>

            <p className="mt-2 text-sm text-zinc-400">
              Sign in to your account
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-sm text-zinc-300">
                Email
              </label>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />

                <input
                  {...register("email")}
                  type="email"
                  placeholder="you@example.com"
                  className="
                    w-full rounded-xl
                    border border-zinc-800
                    bg-zinc-950/60
                    px-4 py-3 pl-10
                    text-white
                    placeholder:text-zinc-600
                    outline-none
                    focus:border-amber-500/50
                    focus:ring-2 focus:ring-amber-500/10
                    transition
                  "
                />
              </div>

              {errors.email && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="mb-2 block text-sm text-zinc-300">
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />

                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="
                    w-full rounded-xl
                    border border-zinc-800
                    bg-zinc-950/60
                    px-4 py-3 pl-10 pr-10
                    text-white
                    placeholder:text-zinc-600
                    outline-none
                    focus:border-amber-500/50
                    focus:ring-2 focus:ring-amber-500/10
                    transition
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-amber-400 transition"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1 text-sm text-red-400">
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
                font-medium
                text-black
                hover:bg-amber-400
                transition
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