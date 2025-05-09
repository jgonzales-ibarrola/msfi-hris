import z, { array, coerce, string } from "zod";

const RoleEnum = z.enum([
  'ADMIN',
  'HUMAN_RESOURCE',
  'SECURITY_OFFICER',
  'SECURITY_GUARD',
  'EMPLOYEE',
  'SUPPLIER',
  'VISITOR',
])

export const CreateUserSchema = z.object({
	userName: string().min(1, "User Name is required."),
	email: string().email(),
	firstName: string().min(1, "First Name is required"),
	lastName: string().min(1, "Last Name is required"),
	initName: string().min(1, "Initial Name is required"),
	suffixName: string().min(1, "Suffix Name is required"),
	role: RoleEnum,
	permissions: array(string()).min(1, "Permission(s) is required"),
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

export type TCreateUserFormValues = z.infer<typeof CreateUserSchema>;
export type TUpdateUserFormValues = z.infer<typeof UpdateUserSchema>;