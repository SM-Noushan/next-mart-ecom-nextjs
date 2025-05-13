import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./app/services/AuthService";

type TRole = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];
const roleBasedPrivateRoutes = {
  user: [/^\/user/, /^\/create-shop/],
  admin: [/^\/admin/],
};

export const middleware = async (req: NextRequest) => {
  const { pathname } = req.nextUrl;
  const userInfo = await getCurrentUser();
  if (!userInfo) {
    if (authRoutes.includes(pathname)) return NextResponse.next();
    else
      return NextResponse.redirect(
        new URL(`/login?redirectPath=${pathname}`, req.url)
      );
  }
  if (userInfo && roleBasedPrivateRoutes[userInfo.role as TRole]) {
    const routes = roleBasedPrivateRoutes[userInfo.role as TRole];
    if (routes.some((route) => pathname.match(route)))
      return NextResponse.next();

    return NextResponse.redirect(new URL(`/${userInfo.role}`, req.url));
  }
};

export const config = {
  matcher: [
    "/login",
    "/register",
    "/create-shop",
    "/admin",
    "/admin/:path",
    "/user",
    "/user/:path",
  ],
};
