"use client";

import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

const SignInWithGoogleButton = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const router = useRouter();

  async function signIn() {
    const data = await signInWithGoogle();

    if (data) {
      router.push("/dashboard");
    }
  }

  return (
    <Button type="button" variant="outline" className="w-full" onClick={signIn}>
      Login with Google
    </Button>
  );
};

export default SignInWithGoogleButton;
