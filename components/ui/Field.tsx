export function FieldInput({
  label,
  name,
  type = "text",
  defaultValue,
  placeholder,
  required = false,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  placeholder?: string;
  required?: boolean;
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
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className="mt-2 w-full rounded-lg border border-border bg-ink-raised px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted-soft focus:border-violet-500"
      />
      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

export function FieldSelect({
  label,
  name,
  defaultValue,
  options,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  options: { value: string; label: string }[];
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <select
        id={name}
        name={name}
        defaultValue={defaultValue ?? ""}
        className="mt-2 w-full rounded-lg border border-border bg-ink-raised px-3.5 py-2.5 text-sm text-foreground outline-none transition focus:border-violet-500"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {hint && <p className="mt-1.5 text-xs text-muted-soft">{hint}</p>}
    </div>
  );
}

export function FieldTextarea({
  label,
  name,
  defaultValue,
  placeholder,
  hint,
  rows = 3,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  hint?: string;
  rows?: number;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-foreground">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        rows={rows}
        className="mt-2 w-full rounded-lg border border-border bg-ink-raised px-3.5 py-2.5 text-sm text-foreground outline-none transition placeholder:text-muted-soft focus:border-violet-500"
      />
      {hint && <p className="mt-1.5 text-xs text-muted-soft">{hint}</p>}
    </div>
  );
}
