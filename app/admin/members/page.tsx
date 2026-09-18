import { prisma } from "@/lib/prisma";
import { membershipPackages } from "@/lib/config/tiers";
import { setMemberStatusAction } from "@/lib/actions/admin";
import { DeleteMemberForm } from "@/components/admin/DeleteMemberForm";
import { Button, ButtonLink } from "@/components/ui/Button";

function packageLabel(packageId: string | null) {
  if (!packageId) return null;
  return membershipPackages.find((p) => p.id === packageId)?.name ?? packageId;
}

function statusBadge(status: string) {
  const color =
    status === "active"
      ? "bg-money-500/10 text-money-500"
      : status === "suspended"
        ? "bg-red-500/10 text-red-400"
        : "bg-gold-500/10 text-gold-400";
  return (
    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${color}`}>
      {status}
    </span>
  );
}

export default async function AdminMembersPage() {
  const members = await prisma.user.findMany({
    where: { isAdmin: false },
    orderBy: { createdAt: "desc" },
    include: { invite: { select: { note: true, code: true } } },
  });

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold text-foreground">Members ({members.length})</h1>
        <ButtonLink href="/admin/members/export" variant="ghost">
          Export CSV
        </ButtonLink>
      </div>
      <p className="mt-2 text-muted">Everyone who has registered, via signup or an invite.</p>

      <div className="mt-6 space-y-3">
        {members.map((member) => (
          <div key={member.id} className="rounded-2xl border border-border bg-surface p-5">
            <div className="flex flex-wrap items-center gap-2">
              <p className="font-semibold text-foreground">{member.name}</p>
              {statusBadge(member.status)}
              {packageLabel(member.activePackage) && (
                <span className="rounded-full bg-ink-raised px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-muted">
                  {packageLabel(member.activePackage)}
                </span>
              )}
            </div>

            <p className="mt-1.5 text-sm text-muted-soft">
              {member.username && `@${member.username} · `}
              {member.email}
              {member.phone && ` · ${member.phone}`}
              {member.country && ` · ${member.country}`}
            </p>

            <p className="mt-1 text-xs text-muted-soft">
              Joined {member.createdAt.toLocaleDateString()}
              {member.activationDate && ` · activates ${member.activationDate.toLocaleDateString()}`}
              {member.invite && ` · invite: ${member.invite.note ?? member.invite.code}`}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <ButtonLink href={`/admin/members/${member.id}/edit`} variant="ghost">
                Edit
              </ButtonLink>
              <form action={setMemberStatusAction}>
                <input type="hidden" name="id" value={member.id} />
                <input
                  type="hidden"
                  name="status"
                  value={member.status === "suspended" ? "active" : "suspended"}
                />
                <Button type="submit" variant="ghost">
                  {member.status === "suspended" ? "Reactivate" : "Suspend"}
                </Button>
              </form>
              {member.status === "registered" && (
                <form action={setMemberStatusAction}>
                  <input type="hidden" name="id" value={member.id} />
                  <input type="hidden" name="status" value="active" />
                  <Button type="submit" variant="cta">
                    Mark Active
                  </Button>
                </form>
              )}
              <DeleteMemberForm id={member.id} name={member.name} />
            </div>
          </div>
        ))}
        {members.length === 0 && <p className="text-sm text-muted-soft">No members yet.</p>}
      </div>
    </div>
  );
}
