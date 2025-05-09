import { prisma } from "@/lib/prisma";
import { CreateUserSchema, UpdateUserSchema } from "@/types/forms/auth";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const parsed = CreateUserSchema.safeParse(body);
		if (!parsed.success) {
			console.log("Missing Fields.");
			return NextResponse.json(
				{ message: "Missing Fields.", error: parsed.error.format() },
				{ status: 400 }
			);
		}
		const {
			dateHired,
			email,
			firstName,
			initName,
			lastName,
			password,
			permissions,
			qrCode,
			registeredDate,
			role,
			status,
			suffixName,
			userName,
			agency,
			avatar,
			companyName,
			department,
			phoneNumber,
		} = parsed.data;

		const salt = bcrypt.genSaltSync(10);
		const hashedPassword = bcrypt.hashSync(password, salt);

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
			email_address: [email],
			username: userName,
			password,
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
		const reqNewUserClerk = await fetch("https://api.clerk.com/v1/users", {
			method: "POST",
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

		const isQrCodeExistDB = await prisma.user.findUnique({
			where: { qrCode },
		});
		if (isQrCodeExistDB?.qrCode === qrCode) {
			console.log("QR Code already exist.");
			return NextResponse.json(
				{ message: "QR Code already exist." },
				{ status: 400 }
			);
		}
		if (isQrCodeExistDB?.userName === userName) {
			console.log("Username already exist.");
			return NextResponse.json(
				{ message: "Username already exist." },
				{ status: 400 }
			);
		}

		const newUser = await prisma.user.create({
			data: {
				qrCode,
				clerkUserId: resNewUserClerk.id,
				role,
				status,
				email,
				firstName,
				initName,
				lastName,
				password: hashedPassword,
				permissions,
				suffixName,
				userName,
				Profile: {
					create: {
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
			{ message: "Successfully Created New User.", data: newUser },
			{ status: 201 }
		);
	} catch (error) {
		return NextResponse.json(
			{ message: "Failed to Create User with Clerk Auth." },
			{ status: 500 }
		);
	}
}