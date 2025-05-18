import { prisma } from "@/lib/prisma";
import { CreateRoleSchema } from "@/types/forms/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
	try {
		const roles = await prisma.role.findMany();
		if (!roles) {
			console.log("Failed to fetch roles.");
			return NextResponse.json(
				{ message: "Failed to fetch roles." },
				{ status: 400 }
			);
		}

		return NextResponse.json(roles);
	} catch (error) {
		console.log("Server Error, failed to fetch ROLES.");
		return NextResponse.json(
			{ message: "Server Error, failed to fetch ROLES." },
			{ status: 500 }
		);
	}
}

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const parsed = CreateRoleSchema.safeParse(body);
		if (!parsed.success) {
			console.log("Missing Field(s).");
			return NextResponse.json(
				{ message: "Missing Field(s).", error: parsed.error.format() },
				{ status: 400 }
			);
		}

		const { name, description } = parsed.data;
		const newRole = await prisma.role.create({
			data: {
				name,
				description,
			},
		});

		if (!newRole) {
			console.log("Something went wrong, please try again.");
			return NextResponse.json(
				{ message: "Something went wrong, please try again." },
				{ status: 400 }
			);
		}

		return NextResponse.json(newRole, { status: 201 });
	} catch (error) {
		console.log("Server Error, failed to create ROLES. " + error);
		return NextResponse.json(
			{ message: "Server Error, failed to create ROLES. " + error },
			{ status: 500 }
		);
	}
}
