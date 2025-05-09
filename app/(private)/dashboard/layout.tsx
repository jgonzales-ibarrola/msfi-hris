"use client";

import { usePathname } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { Fragment, ReactNode } from "react";

// Utility to format breadcrumb text
const formatBreadcrumb = (segment: string) => {
	return segment
		.replace(/-/g, " ") // Replace hyphens with spaces
		.replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter
};

// Function to generate breadcrumb items
const getBreadcrumbs = (pathname: string) => {
	const segments = pathname.split("/").filter((segment) => segment); // Remove empty segments

	return segments.map((segment, index) => {
		const href = "/" + segments.slice(0, index + 1).join("/"); // Construct full path for link
		return {
			label: formatBreadcrumb(segment),
			href,
			isLast: index === segments.length - 1,
		};
	});
};

export default function PrivateLayout({ children }: { children: ReactNode }) {
	const pathname = usePathname();
	const breadcrumbs = getBreadcrumbs(pathname);

	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
					<div className="flex items-center gap-2 px-4">
						<SidebarTrigger
							className="-ml-1"
							aria-label="Toggle Sidebar"
						/>
						<Separator
							orientation="vertical"
							className="mr-2 h-4"
						/>
						<Breadcrumb>
							<BreadcrumbList>
								{breadcrumbs.map((crumb, index) => (
									// No Fragment needed
									<Fragment key={`separator-${crumb.href}`}>
										{index > 0 && (
											<BreadcrumbSeparator className="hidden md:block" />
										)}
										<BreadcrumbItem>
											{crumb.isLast ? (
												<BreadcrumbPage>
													{crumb.label}
												</BreadcrumbPage>
											) : (
												<BreadcrumbLink
													href={crumb.href}
												>
													{crumb.label}
												</BreadcrumbLink>
											)}
										</BreadcrumbItem>
									</Fragment>
								))}
							</BreadcrumbList>
						</Breadcrumb>
					</div>
				</header>
				<main className="flex flex-1 flex-col gap-4 p-4 pt-0">
					{children}
				</main>
			</SidebarInset>
		</SidebarProvider>
	);
}
