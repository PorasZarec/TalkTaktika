import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";

// 1. Define the rules for our login form using Zod
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// TypeScript type derived automatically from the Zod schema
type LoginFormValues = z.infer<typeof loginSchema>;

export function Login() {
  const navigate = useNavigate();

  // 2. Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  // 3. Handle the submission (Simulating an API call for now)
  const onSubmit = async (data: LoginFormValues) => {
    console.log("Form submitted with:", data);

    // Simulate a brief network delay so we can see the loading state
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // After "logging in", redirect the user to the dashboard
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-heading font-bold text-primary">
              TalkTaktika
            </h2>
            <p className="text-base-content/70 mt-2">Admin Dashboard Access</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <input
                type="email"
                placeholder="admin@talktaktika.ph"
                className={`input input-bordered w-full ${errors.email ? "input-error" : ""}`}
                {...register("email")}
              />
              {errors.email && (
                <span className="text-error text-sm mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className={`input input-bordered w-full ${errors.password ? "input-error" : ""}`}
                {...register("password")}
              />
              {errors.password && (
                <span className="text-error text-sm mt-1">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-soft btn-primary h-12 text-lg rounded-xl"
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
