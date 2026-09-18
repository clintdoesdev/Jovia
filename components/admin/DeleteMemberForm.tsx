"use client";

import { deleteMemberAction } from "@/lib/actions/admin";
import { Button } from "@/components/ui/Button";

export function DeleteMemberForm({ id, name }: { id: string; name: string }) {
  return (
    <form
      action={deleteMemberAction}
      onSubmit={(e) => {
        if (!confirm(`Delete ${name}'s account? This can't be undone.`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={id} />
      <Button type="submit" variant="danger">
        Delete
      </Button>
    </form>
  );
}
