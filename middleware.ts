import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/lobby", "/sign-in(.*)", "/"]);
const isAdminRoute = createRouteMatcher(["/dashboard(.*)"]);
const isHRRoute = createRouteMatcher(["/dashboard", "/dashboard/users"]);
const isEmployee = createRouteMatcher(["/profile(.*)"]);

export default clerkMiddleware(async (auth, req) => {
	const metadata = (await auth()).sessionClaims?.metadata;
	const roles = metadata?.roles || [];
	const userQrCode = metadata?.qrCode;

	const pathSegments = req.nextUrl.pathname.split("/");
	const lastSegment = pathSegments[pathSegments.length - 1];

	if (!isPublicRoute(req)) {
		await auth.protect();

		if (isEmployee(req)) {
			const expectedPath = `/profile/${userQrCode}`;

			if (req.nextUrl.pathname !== expectedPath) {
				// If trying to access another profile
				if (lastSegment !== userQrCode) {
					const url = new URL(
						"/unauthorized?message=You don’t have access here.",
						req.url
					);
					return NextResponse.redirect(url);
				}

				// If not at the correct path, redirect them to their profile
				const url = new URL(expectedPath, req.url);
				return NextResponse.redirect(url);
			}

			// Allow access to their own profile
			return NextResponse.next();
		}

		if (isHRRoute(req)) {
			let url = null;

			if (!roles.includes("cmat7zm0g0003v2x4o4w1ho74")) {
				url = new URL(
					"/unauthorized?message=You don\t have access here.",
					req.url
				);
				return NextResponse.redirect(url);
			}

			return NextResponse.next();
		}

		if (isAdminRoute(req)) {
			let url = null;

			if (!roles.includes("cmat7zrd60004v2x4d01q6lgm")) {
				url = new URL(
					"/unauthorized?message=You don\t have access here.",
					req.url
				);
				return NextResponse.redirect(url);
			}

			return NextResponse.next();
		}
	}

	return NextResponse.next();
});

export const config = {
	matcher: [
		"/dashboard/:path*",
		"/sign-in/:path*",
		"/lobby",
		"/profile/:path*",
	],
};
