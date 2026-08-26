export function FormField({
  label,
  name,
  type = "text",
  autoComplete,
  placeholder,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required
        className="mt-2 w-full rounded-lg border border-border bg-ink-raised px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted-soft focus:border-violet-500"
      />
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}
