"use client";

import { useActionState } from "react";
import { updateMemberAction, type ActionState } from "@/lib/actions/admin";
import { FieldInput, FieldSelect, FieldTextarea } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { membershipPackages } from "@/lib/config/tiers";

const initialState: ActionState = {};

type Member = {
  id: string;
  name: string;
  email: string;
  username: string | null;
  phone: string | null;
  country: string | null;
  activePackage: string | null;
  status: string;
  activationDate: Date | null;
  loginNote: string | null;
  adminNote: string | null;
};

export function EditMemberForm({ member }: { member: Member }) {
  const [state, formAction, pending] = useActionState(updateMemberAction, initialState);

  return (
    <form action={formAction} className="space-y-5 rounded-2xl border border-border bg-surface p-6">
      <input type="hidden" name="id" value={member.id} />

      {state.error && (
        <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
          {state.error}
        </p>
      )}

      <FieldInput label="Full name" name="name" defaultValue={member.name} required error={state.fieldErrors?.name} />
      <FieldInput label="Username" name="username" defaultValue={member.username ?? ""} />
      <FieldInput label="Email" name="email" type="email" defaultValue={member.email} required />
      <FieldInput label="Phone" name="phone" defaultValue={member.phone ?? ""} />
      <FieldInput label="Country" name="country" defaultValue={member.country ?? ""} />

      <FieldSelect
        label="Payment plan"
        name="activePackage"
        defaultValue={member.activePackage ?? ""}
        options={[
          { value: "", label: "Not set" },
          ...membershipPackages.map((p) => ({ value: p.id, label: `${p.name} (${p.accessFee})` })),
        ]}
      />

      <FieldSelect
        label="Status"
        name="status"
        defaultValue={member.status}
        options={[
          { value: "registered", label: "Registered" },
          { value: "active", label: "Active" },
          { value: "suspended", label: "Suspended" },
        ]}
      />

      <FieldInput
        label="Activation date"
        name="activationDate"
        type="date"
        defaultValue={member.activationDate ? member.activationDate.toISOString().slice(0, 10) : ""}
      />

      <FieldTextarea
        label="Login details"
        name="loginNote"
        defaultValue={member.loginNote ?? ""}
        placeholder="e.g. Trading platform login: user123 / temp-pass-456"
        hint="Free text shown on the member's dashboard once set — e.g. platform credentials."
      />

      <FieldTextarea
        label="Admin notes"
        name="adminNote"
        defaultValue={member.adminNote ?? ""}
        placeholder={"Referral: Jane Doe\nSource: Instagram"}
        hint="Internal only — never shown to the member."
      />

      <Button type="submit" variant="cta" className="w-full" disabled={pending}>
        {pending ? "Saving…" : "Save changes"}
      </Button>
    </form>
  );
}
