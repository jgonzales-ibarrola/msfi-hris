import { SignOut } from "@/components/auth/sign-out";
import React from "react";

async function UserProfilePage({
	params,
}: {
	params: Promise<{
		userQrCode: string;
	}>;
}) {
	const { userQrCode } = await params;

	return (
		<>
			<section>
				<h1 className="text-4xl font-bold">
					Hello User {userQrCode ? userQrCode : "No QR Code"}
				</h1>
			</section>

			<section>
				<SignOut />
			</section>
		</>
	);
}

export default UserProfilePage;
