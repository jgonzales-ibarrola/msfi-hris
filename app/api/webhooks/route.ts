import { prisma } from "@/lib/prisma";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const evt = await verifyWebhook(req);

		// Do something with payload
		// For this guide, log payload to console
		const { id } = evt.data;
		const eventType = evt.type;
		console.log(
			`Received webhook with ID ${id} and event type of ${eventType}`
		);
		/** EXAMPLE OF WEBHOOK PAYLOAD
     * 
     * // Webhook payload: {
    //   birthday: '',
    //   created_at: 1654012591514,
    //   email_addresses: [
    //     {
    //       email_address: 'example@example.org',
    //       id: 'idn_29w83yL7CwVlJXylYLxcslromF1',
    //       linked_to: [],
    //       object: 'email_address',
    //       verification: [Object]
    //     }
    //   ],
    //   external_accounts: [],
    //   external_id: '567772',
    //   first_name: 'Example',
    //   gender: '',
    //   id: 'user_29w83sxmDNGwOuEthce5gg56FcC',
    //   image_url: 'https://img.clerk.com/xxxxxx',
    //   last_name: 'Example',
    //   last_sign_in_at: 1654012591514,
    //   object: 'user',
    //   password_enabled: true,
    //   phone_numbers: [],
    //   primary_email_address_id: 'idn_29w83yL7CwVlJXylYLxcslromF1',
    //   primary_phone_number_id: null,
    //   primary_web3_wallet_id: null,
    //   private_metadata: {},
    //   profile_image_url: 'https://www.gravatar.com/avatar?d=mp',
    //   public_metadata: {},
    //   two_factor_enabled: false,
    //   unsafe_metadata: {},
    //   updated_at: 1654012591835,
    //   username: null,
    //   web3_wallets: []
    // }
     */

		if (evt.type === "user.deleted") {
			const userId = evt.data.id;

			const userInDB = await prisma.user.delete({
				where: { clerkUserId: userId },
				select: { firstName: true, lastName: true, userName: true },
			});

			if (!userInDB) {
				console.log("Missing User in DB.");
				return new Response("Missing User in DB.", { status: 400 });
			}

			console.log(
				`User is deleted both Clerk & DB (Postgresql): ${userInDB.userName}`
			);
		}

		return new Response("Webhook received", { status: 200 });
	} catch (err) {
		console.error("Error verifying webhook:", err);
		return new Response("Error verifying webhook", { status: 400 });
	}
}
