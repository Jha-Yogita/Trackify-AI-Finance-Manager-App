import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import arcjet, { createMiddleware, detectBot, shield } from "@arcjet/next";

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/account(.*)',
  '/transaction(.*)'
]);
const aj = arcjet({
  key: process.env.ARCJET_KEY,
 
  rules: [
    
    shield({
      mode: "LIVE",
    }),
    detectBot({
      mode: "LIVE", 
      allow: [
        "CATEGORY:SEARCH_ENGINE", 
        "GO_HTTP", 
        
      ],
    }),
  ],
});
export default clerkMiddleware(async(auth, req) => {
  const { userId } = await auth();

  if (!userId && isProtectedRoute(req)) {
    const { redirectToSignIn } = await auth();
    return redirectToSignIn();
  }
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/api/:path*"],
};