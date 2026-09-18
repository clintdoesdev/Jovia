import { prisma } from "@/lib/prisma";
import { membershipPackages } from "@/lib/config/tiers";
import { siteConfig } from "@/lib/site-config";
import { revokeInviteAction } from "@/lib/actions/admin";
import { CreateInviteForm } from "@/components/admin/CreateInviteForm";
import { CopyLinkButton } from "@/components/admin/CopyLinkButton";
import { Button } from "@/components/ui/Button";

function packageLabel(packageId: string | null) {
  if (!packageId) return null;
  return membershipPackages.find((p) => p.id === packageId)?.name ?? packageId;
}

function statusBadge(status: string, expiresAt: Date | null) {
  const expired = status === "pending" && expiresAt && expiresAt.getTime() < Date.now();
  const label = expired ? "expired" : status;
  const color =
    label === "used"
      ? "bg-white/10 text-muted"
      : label === "revoked" || label === "expired"
        ? "bg-red-500/10 text-red-400"
        : "bg-money-500/10 text-money-500";
  return (
    <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${color}`}>
      {label}
    </span>
  );
}

export default async function AdminInvitesPage() {
  const invites = await prisma.invite.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true, email: true } } },
  });

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground">Invites</h1>
      <p className="mt-2 max-w-lg text-muted">
        Generate single-use links. Only people holding a valid link can pay and register.
      </p>

      <div className="mt-8 max-w-md">
        <CreateInviteForm />
      </div>

      <h2 className="mt-10 text-xl font-bold text-foreground">All invites ({invites.length})</h2>
      <div className="mt-4 space-y-3">
        {invites.map((invite) => {
          const url = `${siteConfig.url}/invite/${invite.code}`;
          return (
            <div key={invite.id} className="rounded-2xl border border-border bg-surface p-5">
              <div className="flex flex-wrap items-center gap-2">
                {statusBadge(invite.status, invite.expiresAt)}
                {packageLabel(invite.packageId) && (
                  <span className="rounded-full bg-surface px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-muted">
                    {packageLabel(invite.packageId)}
                  </span>
                )}
              </div>

              {invite.note && (
                <p className="mt-2 text-sm font-semibold text-foreground">{invite.note}</p>
              )}

              <p className="mt-2 break-all text-xs text-muted-soft">{url}</p>

              <p className="mt-2 text-xs text-muted-soft">
                Created {invite.createdAt.toLocaleDateString()}
                {invite.expiresAt && ` · expires ${invite.expiresAt.toLocaleDateString()}`}
                {invite.user && ` — registered as ${invite.user.name} (${invite.user.email})`}
              </p>

              <div className="mt-4 flex gap-2">
                <CopyLinkButton url={url} />
                {invite.status === "pending" && (
                  <form action={revokeInviteAction}>
                    <input type="hidden" name="id" value={invite.id} />
                    <Button type="submit" variant="danger">
                      Revoke
                    </Button>
                  </form>
                )}
              </div>
            </div>
          );
        })}
        {invites.length === 0 && (
          <p className="text-sm text-muted-soft">No invites yet — create one above.</p>
        )}
      </div>
    </div>
  );
}
