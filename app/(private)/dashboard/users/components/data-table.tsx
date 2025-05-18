"use client";

import {
	ColumnDef,
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import UserForm from "./user-create-form";
import UserCreateForm from "./user-create-form";
import { PlusCircleIcon } from "lucide-react";

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const router = useRouter();

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		onSortingChange: setSorting,
		getSortedRowModel: getSortedRowModel(),
		onColumnFiltersChange: setColumnFilters,
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			sorting,
			columnFilters,
		},
	});

	return (
		<div>
			{/* Header */}
			<div className="flex items-center justify-between">
				{/* Left side */}
				<div className="flex items-center py-4">
					<Input
						placeholder="Filter firstname..."
						value={
							(table
								.getColumn("firstName")
								?.getFilterValue() as string) ?? ""
						}
						onChange={(event) =>
							table
								.getColumn("firstName")
								?.setFilterValue(event.target.value)
						}
						className="max-w-sm"
					/>
				</div>

				{/* Right side */}
				<div>
					<Sheet>
						<SheetTrigger asChild><Button type="button" className="cursor-pointer"><PlusCircleIcon />Create User</Button></SheetTrigger>
						<SheetContent>
							<SheetHeader>
								<SheetTitle>Fill the empty fields.</SheetTitle>
								<SheetDescription>
									The required fields must not be empty.
								</SheetDescription>
							</SheetHeader>

							{/* UserForm */}
							<div className="p-4 overflow-auto">
								<UserCreateForm />
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>

			{/* Data Table */}
			<div className="rounded-md border mb-2">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef
															.header,
														header.getContext()
												  )}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							// eslint-disable-next-line
							table.getRowModel().rows.map((row: any) => (
								<TableRow
									key={row.id}
									data-state={
										row.getIsSelected() && "selected"
									}
									onClick={() =>
										router.push(
											`/dashboard/users/${row.original.qrCode}`
										)
									}
									className="cursor-pointer"
								>
									{row.getVisibleCells().map(
										(
											cell: // eslint-disable-next-line
											any
										) => (
											<TableCell key={cell.id}>
												{flexRender(
													cell.column.columnDef.cell,
													cell.getContext()
												)}
											</TableCell>
										)
									)}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<DataTablePagination table={table} />
		</div>
	);
}
