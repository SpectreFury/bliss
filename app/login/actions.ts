"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export async function login(formData: FormData) {
  try {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const response = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    if (response.user) {
      revalidatePath("/", "layout");
      redirect("/dashboard");
    }
  } catch (error) {
    console.log("login error", error);
  }
}

export async function signup(formData: FormData) {
  try {
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const response = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    if (response.user) {
      revalidatePath("/", "layout");
      redirect("/dashboard");
    }
  } catch (error) {
    console.log("signup error", error);
  }
}

export async function signout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  redirect("/");
}

export async function signInWithGoogle() {
  const supabase = await createClient();

  // Get the site URL from environment or construct it
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : `https://${process.env.VERCEL_URL || ""}`);

  console.log("Sign in with Google - Site URL:", siteUrl);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${siteUrl}/auth/callback?next=/dashboard`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    console.error("Google sign in error:", error);
    redirect("/error");
  }

  if (data.url) {
    console.log("Redirecting to Google OAuth URL:", data.url);
    redirect(data.url);
  }
}
