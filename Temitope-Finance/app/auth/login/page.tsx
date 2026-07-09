"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthLayout from "@/components/auth/auth-layout";
import FormInput from "@/components/form/form-input";
import FormCheckbox from "@/components/form/form-checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

export default function LoginPage() {
  const router = useRouter();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Mock API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const identifier = formData.email.trim();
      const password = formData.password.trim();

      if (identifier && password) {
        addToast({ type: "success", message: "Signed in successfully." });
        if (typeof window !== "undefined") {
          localStorage.setItem("temitopeLoggedIn", "true");
          localStorage.setItem("temitopeSignInAccess", "true");
          router.push("/dashboard");
          return;
        }
        router.push("/auth/login");
      } else {
        setError("Please fill in all fields");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Sign in to your Temitop account">
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormInput
          label="Email or Username"
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter any email or username"
          required
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <FormCheckbox
            label="Remember me"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
          />
          <Link
            href="/auth/forgot-password"
            className="text-sm font-medium text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <Button type="submit" disabled={loading} className="w-full h-11">
          {loading ? "Signing in…" : "Sign In"}
        </Button>

        <p className="pt-1 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
