"use client";
import {
	CreateUserSchema,
	TCreateUserFormValues,
} from "@/types/forms/auth";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { PlusCircleIcon } from "lucide-react";

const permissionsInDB = ["VIEW", "UPDATE", "CREATE", "DELETE"];

export default function UserCreateForm() {
	const form = useForm<TCreateUserFormValues>({
		resolver: zodResolver(CreateUserSchema),
		defaultValues: {
			userName: "",
			email: "",
			firstName: "",
			lastName: "",
			initName: "",
			suffixName: "",
			rolesPermissions: [{
				permissionId: '',
				roleId: '',
			}],
			status: "",
			password: "",
			qrCode: "",
			agency: "",
			department: "",
			companyName: "",
			dateHired: new Date(),
			registeredDate: new Date(),
			avatar: "",
			phoneNumber: "",
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: TCreateUserFormValues) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	const submitting = form.formState.isSubmitting;

	const {
		fields: fieldsPermission,
		append: fieldAppend,
		remove: fieldRemove,
	} = useFieldArray({
		control: form.control, // control props comes from useForm (optional: if you are using FormProvider)
		name: "rolesPermissions" as const, // unique name for your Field Array
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="userName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Username</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter your username"
									{...field}
								/>
							</FormControl>
							<FormDescription></FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="userName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email (optional)</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter your email"
									{...field}
								/>
							</FormControl>
							<FormDescription></FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="firstName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>First Name</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter your first name"
									{...field}
								/>
							</FormControl>
							<FormDescription></FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="lastName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Last Name</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter your last name"
									{...field}
								/>
							</FormControl>
							<FormDescription></FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="initName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Initial Name</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter your initial name"
									{...field}
								/>
							</FormControl>
							<FormDescription></FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="suffixName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Suffix Name</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter your suffix name"
									{...field}
								/>
							</FormControl>
							<FormDescription></FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" disabled={submitting}>
					{submitting ? "Creating..." : "Create"}
				</Button>
			</form>
		</Form>
	);
}
