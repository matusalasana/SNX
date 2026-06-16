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

const Login = () => {
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
    <main className="min-h-screen flex items-center justify-center px-4 py-10">

      {/* ONLY CONTENT - NO BACKGROUND LAYERS */}
      <div className="w-full max-w-md">

        <div className="rounded-2xl border border-outline-variant bg-surface-container p-6 sm:p-8 shadow-xl">

          {/* HEADER */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-on-surface">
              Welcome Back
            </h1>
            <p className="mt-2 text-sm text-on-surface-variant">
              Sign in to your account
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-sm text-on-surface">
                Email
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-outline"
                />

                <input
                  {...register("email")}
                  type="email"
                  placeholder="you@example.com"
                  className="
                    w-full rounded-xl
                    border border-outline-variant
                    bg-surface
                    px-4 py-3 pl-10
                    text-on-surface
                    placeholder:text-on-surface-variant
                    outline-none
                    focus:border-primary
                    focus:ring-2 focus:ring-primary/20
                  "
                />
              </div>

              {errors.email && (
                <p className="mt-1 text-sm text-error">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="mb-2 block text-sm text-on-surface">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-outline"
                />

                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="
                    w-full rounded-xl
                    border border-outline-variant
                    bg-surface
                    px-4 py-3 pl-10 pr-10
                    text-on-surface
                    placeholder:text-on-surface-variant
                    outline-none
                    focus:border-primary
                    focus:ring-2 focus:ring-primary/20
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-outline"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {errors.password && (
                <p className="mt-1 text-sm text-error">
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
                bg-primary
                py-3
                font-medium
                text-black
                transition
                hover:opacity-90
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
};

export default Login;