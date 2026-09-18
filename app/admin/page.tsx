import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { getCurrentUser } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  const admin = await getCurrentUser();

  const [pendingInvites, usedInvites, totalMembers, activeMembers, awaitingActivation] =
    await Promise.all([
      prisma.invite.count({ where: { status: "pending" } }),
      prisma.invite.count({ where: { status: "used" } }),
      prisma.user.count({ where: { isAdmin: false } }),
      prisma.user.count({ where: { isAdmin: false, status: "active" } }),
      prisma.user.count({ where: { isAdmin: false, status: "registered" } }),
    ]);

  const stats = [
    { value: pendingInvites, label: "Pending invites" },
    { value: usedInvites, label: "Invites used" },
    { value: totalMembers, label: "Total members" },
    { value: activeMembers, label: "Active members" },
    { value: awaitingActivation, label: "Awaiting activation" },
  ];

  return (
    <div>
      <Badge>ADMIN</Badge>
      <h1 className="mt-4 text-3xl font-bold text-foreground">
        Welcome back, {admin?.name}
      </h1>
      <p className="mt-2 max-w-lg text-muted">
        Overview of your Jovia invites and members.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-border bg-surface p-6">
            <p className="text-3xl font-extrabold text-money-500">{stat.value}</p>
            <p className="mt-1 text-sm text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/admin/invites" variant="cta">
          Create an invite
        </ButtonLink>
        <ButtonLink href="/admin/members" variant="ghost">
          Review members
        </ButtonLink>
      </div>
    </div>
  );
}
