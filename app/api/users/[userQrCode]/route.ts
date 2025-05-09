import { prisma } from "@/lib/prisma";
import { UpdateUserSchema } from "@/types/forms/auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, {params} : {
	params: Promise<{userQrCode: string}>
}) {
	try {
		const {userQrCode} = await params;

		if (!userQrCode) {
			console.log("Please provide QR Code.");
			return NextResponse.json(
				{ message: "Please provide QR Code."},
				{ status: 400 }
			);
		}

		const user = await prisma.user.findUnique({ where: { qrCode: userQrCode }})

		if (!user) {
			console.log("User not found.");
			return NextResponse.json(
				{ message: "User not found."},
				{ status: 400 }
			);
		}

		const body = await req.json();
		const parsed = UpdateUserSchema.safeParse(body);
		if (!parsed.success) {
			console.log("Missing Fields.");
			return NextResponse.json(
				{ message: "Missing Fields.", error: parsed.error.format() },
				{ status: 400 }
			);
		}
		const {
			dateHired,
			firstName,
			initName,
			lastName,
			permissions,
			registeredDate,
			role,
			status,
			suffixName,
			agency,
			avatar,
			companyName,
			department,
			phoneNumber,
		} = parsed.data;

		/** Example Request Body
     * {
        "first_name": "Test1",
        "last_name": "Ting2",
        "email_address": [
          "test.ting@gmail.com"
        ],
        "username": "testting123",
        "password": "StrongTest431@12",
        "public_metadata": {
          "role": "ADMIN",
          "permissions": ["VIEW", "ALL", "DELETE"]
        }
      }
     */
		const reqNewUserClerkBody = {
			first_name: firstName,
			last_name: lastName,
			public_metadata: {
				role,
				permissions,
			},
		};

		/** Example Response when user is successfully created.
     * {
      "id": "user_2wnH7oAWd3oI3jXM0ki6xqv9Dik",
      "object": "user",
      "username": "testting123",
      "first_name": "Test1",
      "last_name": "Ting2",
      "image_url": "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yd2RYVTR4dTFlSDFITnJ6cmNLcmZ4RnIwZDEiLCJyaWQiOiJ1c2VyXzJ3bkg3b0FXZDNvSTNqWE0wa2k2eHF2OURpayIsImluaXRpYWxzIjoiVFQifQ",
      "has_image": false,
      "primary_email_address_id": "idn_2wnH7n76r2IMk5qKOxfFQxGlEuz",
      "primary_phone_number_id": null,
      "primary_web3_wallet_id": null,
      "password_enabled": true,
      "two_factor_enabled": false,
      "totp_enabled": false,
      "backup_code_enabled": false,
      "email_addresses": [
      {}
      ],
      "phone_numbers": [ ],
      "web3_wallets": [ ],
      "passkeys": [ ],
      "external_accounts": [ ],
      "saml_accounts": [ ],
      "enterprise_accounts": [ ],
      "public_metadata": {
      "role": "ADMIN",
      "permissions": []
      },
      "private_metadata": { },
      "unsafe_metadata": { },
      "external_id": null,
      "last_sign_in_at": null,
      "banned": false,
      "locked": false,
      "lockout_expires_in_seconds": null,
      "verification_attempts_remaining": 100,
      "created_at": 1746670252549,
      "updated_at": 1746670252565,
      "delete_self_enabled": true,
      "create_organization_enabled": true,
      "last_active_at": null,
      "mfa_enabled_at": null,
      "mfa_disabled_at": null,
      "legal_accepted_at": null,
      "profile_image_url": "https://www.gravatar.com/avatar?d=mp"
      }
     */
		const reqNewUserClerk = await fetch(`https://api.clerk.com/v1/users/${user.clerkUserId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
			},
			body: JSON.stringify(reqNewUserClerkBody),
		});
		const resNewUserClerk = await reqNewUserClerk.json();
		if (resNewUserClerk.errors && resNewUserClerk.errors.length > 0) {
			const errors = resNewUserClerk.errors;

			if (errors.length === 1) {
				const singleError = errors[0].long_message;
				console.log(`Clerk error: ${singleError}`);

				return NextResponse.json(
					{
						message: errors[0].long_message,
					},
					{ status: 400 }
				);
			} else {
				errors.forEach((err: any) =>
					console.log(`Clerk error: ${err.long_message}`)
				);

				return NextResponse.json(
					{
						message: "Please complete the required fields.",
						errors: errors.toString(),
					},
					{ status: 400 }
				);
			}
		}

		const updateUser = await prisma.user.update({
			where: {
				clerkUserId: user.clerkUserId
			},
			data: {
				role,
				status,
				firstName,
				initName,
				lastName,
				permissions,
				suffixName,
				Profile: {
					update: {
						agency,
						companyName,
						avatar,
						dateHired,
						department,
						phoneNumber,
						registeredDate,
					},
				},
			},
		});

		return NextResponse.json(
			{ message: "Successfully Updated a User.", data: updateUser },
			{ status: 201 }
		);
	} catch (error: any) {
		return NextResponse.json(
			{ message: "Failed to Update the User with Clerk Auth.", error: error.message },
			{ status: 500 }
		);
	}
}