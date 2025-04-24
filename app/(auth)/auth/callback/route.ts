import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const host = request.headers.get("host"); // current host
      const isLocalEnv = process.env.NODE_ENV === "development";
      const redirectPath = next || '/dashboard'

      console.log('Auth callback debug info:');
      console.log('Origin:', origin);
      console.log('Next param:', next);
      console.log('Redirect path:', redirectPath);
      console.log('Forwarded host:', forwardedHost);
      console.log('Host:', host);
      console.log('Is local env:', isLocalEnv);
      console.log('Request URL:', request.url);
      console.log('Request headers:', Object.fromEntries(request.headers.entries()));

      let redirectUrl;
      
      if (isLocalEnv) {
        // Local development environment
        redirectUrl = `${origin}${redirectPath}`;
      } else if (forwardedHost) {
        // Use forwarded host if available (common in production with load balancers)
        redirectUrl = `https://${forwardedHost}${redirectPath}`;
      } else if (host) {
        // Fallback to the host header if available
        redirectUrl = `https://${host}${redirectPath}`;
      } else {
        // Last resort fallback
        redirectUrl = `${origin}${redirectPath}`;
      }
      
      console.log('Final redirect URL:', redirectUrl);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
