export { default } from "next-auth/middleware";

export const config = { matcher: ["/", "/post/:path*", "/profile"] };
