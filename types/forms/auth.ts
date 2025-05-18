import z, { array, coerce, number, object, string } from "zod";

export const CreateUserSchema = object({
	userName: string().min(1, "User Name is required."),
	email: string().email(),
	firstName: string().min(1, "First Name is required"),
	lastName: string().min(1, "Last Name is required"),
	initName: string().min(1, "Initial Name is required"),
	suffixName: string().min(1, "Suffix Name is required"),
	roles: array(
		object({
			roleId: string().min(1, "role is required."),
		})
	).min(1, 'at least one role is required.'),
	status: string().min(1, "Status is required"),
	password: string().min(1, "Password is required"),
	qrCode: string().min(1, "QR Code is required"),

	// Profile table Fields
	agency: string().optional(),
	department: string().optional(),
	companyName: string().optional(),
	dateHired: coerce.date(),
	registeredDate: coerce.date(),
	avatar: string().optional(),
	phoneNumber: string().optional(),
});

export const UpdateUserSchema = CreateUserSchema.omit({
	email: true,
	password: true,
	userName: true,
	qrCode: true,
}).partial();

export const CreateRoleSchema = object({
	name: string().min(1, "name of the role is required"),
	description: string().min(1, "description is required."),
});

export const CreatePermissionSchema = object({
	name: string().min(1, "name of the permission is required"),
	description: string().min(1, "description is required."),
})

export type TCreateUserFormValues = z.infer<typeof CreateUserSchema>;
export type TUpdateUserFormValues = z.infer<typeof UpdateUserSchema>;
export type TCreateRoleFormValues = z.infer<typeof CreateRoleSchema>;
export type TCreatePermissionFormValues = z.infer<typeof CreatePermissionSchema>;