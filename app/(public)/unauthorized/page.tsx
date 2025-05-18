"use client";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { ChevronLeftCircleIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const UnauthorizedPage = () => {
	const router = useRouter();

	const searchParams = useSearchParams();

	const message = searchParams.get("message");

	return (
		<>
			<section className="h-screen flex items-center justify-center">
				<Card className="w-full md:w-fit">
					<CardHeader>
						<CardTitle>
              <h1 className="text-4xl">Unauthorized Access.</h1>
            </CardTitle>
						<CardDescription>
							<p className="text-muted-foreground text-sm">
								Please contact admin if continues.
							</p>
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-lg">{message}</p>
					</CardContent>
          <CardFooter>
            <Button type="button" onClick={() => router.back()} className="cursor-pointer">
              <ChevronLeftCircleIcon /> Go back from previous page
            </Button>
          </CardFooter>
				</Card>
			</section>
		</>
	);
};

export default UnauthorizedPage;
