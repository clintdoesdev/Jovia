import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { EditMemberForm } from "@/components/admin/EditMemberForm";

export default async function EditMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const member = await prisma.user.findUnique({ where: { id } });
  if (!member) notFound();

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="text-3xl font-bold text-foreground">Edit member</h1>
      <p className="mt-2 text-muted">
        Update {member.name}&apos;s details, activation date, and login information.
      </p>

      <div className="mt-6">
        <EditMemberForm member={member} />
      </div>
    </div>
  );
}
