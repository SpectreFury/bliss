"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

const SignInWithGoogleButton = () => {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={() => signIn("google")}
    >
      Login with Google
    </Button>
  );
};

export default SignInWithGoogleButton;
