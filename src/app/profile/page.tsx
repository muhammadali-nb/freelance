'use client';

import { RouteGuard } from "@/components/auth/route-guard";
import ClientProfile from "@/components/profile/client-profile";
import FreelancerProfile from "@/components/profile/freelancer-profile";
import { useRole } from "@/context/role-context";
import { useAuth } from "@/context/auth-context";
import type { UserRole } from "@/context/role-context";

export default function ProfilePage() {
	const {role} = useRole();
	const { user } = useAuth();

	if (!user) {
		return null;
	}

	return (
		<div className="container mx-auto px-4 py-8">
			{role === "freelancer" ? (
				<RouteGuard allowedRoles={["freelancer" as UserRole]}>
					<FreelancerProfile user={user} />
				</RouteGuard>
			) : (
				<RouteGuard allowedRoles={["client" as UserRole]}>
					<ClientProfile user={user} />
				</RouteGuard>
			)}
		</div>
	);
}
