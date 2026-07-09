"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthLayout from "@/components/auth/auth-layout";
import FormInput from "@/components/form/form-input";
import FormCheckbox from "@/components/form/form-checkbox";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

export default function SignupPage() {
  const router = useRouter();
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.terms) {
      setError("Please accept the terms and conditions");
      return;
    }

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (typeof window === "undefined") return;

      // Save initial form data to sessionStorage for KYB
      sessionStorage.setItem(
        "pendingAccount",
        JSON.stringify({
          id: Date.now().toString(),
          companyName: formData.companyName,
          email: formData.email,
          phone: formData.phone,
        }),
      );

      addToast({
        type: "success",
        message: "Account created. Continue verification.",
      });
      router.push("/verify/email");
    } catch (err) {
      setError("Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const strengthColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
  ];
  const strengthLabels = ["Weak", "Fair", "Good", "Strong"];

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Start sending NGN → CNY payouts in minutes"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormInput
          label="Company Name"
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Temitope CNY"
          required
        />
        <FormInput
          label="Business Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="company@business.com"
          required
        />
        <FormInput
          label="Phone Number"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+234..."
          required
        />
        <div>
          <FormInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a strong password"
            required
          />
          {formData.password && (
            <div className="mt-2">
              <div className="flex gap-1 mb-1">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full ${
                      i < passwordStrength
                        ? strengthColors[passwordStrength - 1]
                        : "bg-gray-200"
                    }`}
                  ></div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Password strength:{" "}
                <span className="font-medium">
                  {strengthLabels[passwordStrength - 1] || "Weak"}
                </span>
              </p>
            </div>
          )}
        </div>

        <FormInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          required
        />

        <FormCheckbox
          label={
            <>
              I agree to the{" "}
              <Link href="#" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="#" className="text-primary hover:underline">
                Privacy Policy
              </Link>
            </>
          }
          name="terms"
          checked={formData.terms}
          onChange={handleChange}
          required
        />

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <Button type="submit" disabled={loading} className="w-full h-11">
          {loading ? "Creating account…" : "Create Account"}
        </Button>

        <p className="pt-1 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
