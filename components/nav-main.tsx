"use client";

import {
	CalendarClockIcon,
	ChartLineIcon,
	CircleUserIcon,
	ContactIcon,
	UsersIcon,
} from "lucide-react";

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
	{
		title: "Dashboard",
		url: "/dashboard",
		icon: ChartLineIcon,
	},
	{
		title: "Users",
		url: "/dashboard/users",
		icon: ChartLineIcon,
	},
	{
		title: "Employees",
		url: "/dashboard/employees",
		icon: UsersIcon,
	},
	{
		title: "Visitors",
		url: "/dashboard/visitors",
		icon: CircleUserIcon,
	},
	{
		title: "Suppliers",
		url: "/dashboard/suppliers",
		icon: ContactIcon,
	},
	{
		title: "Employee Logs",
		url: "/dashboard/logs",
		icon: CalendarClockIcon,
	},
];

export function NavMain() {
	return (
		<SidebarGroup>
			<SidebarGroupContent>
				<SidebarMenu>
					{items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton asChild>
								<a href={item.url}>
									<item.icon />
									<span>{item.title}</span>
								</a>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
