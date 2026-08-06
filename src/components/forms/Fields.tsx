import type { ReactNode } from "react";

const controlClass =
  "w-full rounded-xl border border-cream-300 bg-cream-50 px-4 py-3 text-sm text-bark-800 transition-colors placeholder:text-bark-500/50 hover:border-ochre-300 focus:border-ochre-500 focus:outline-none";

export function Label({
  htmlFor,
  children,
  required,
  requiredText,
}: {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
  requiredText: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 block text-sm font-medium text-bark-700"
    >
      {children}
      {required ? (
        <span className="ml-1.5 text-xs font-normal text-ochre-600">
          ({requiredText})
        </span>
      ) : null}
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={controlClass} />;
}

export function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  return <textarea {...props} className={`${controlClass} resize-y`} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={controlClass} />;
}

export function Field({
  id,
  label,
  required,
  requiredText,
  children,
  className = "",
}: {
  id: string;
  label: string;
  required?: boolean;
  requiredText: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label htmlFor={id} required={required} requiredText={requiredText}>
        {label}
      </Label>
      {children}
    </div>
  );
}
