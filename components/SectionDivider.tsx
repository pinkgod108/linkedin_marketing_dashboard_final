interface SectionDividerProps {
  title: string;
  description?: string;
}

export default function SectionDivider({ title, description }: SectionDividerProps) {
  return (
    <div className="mb-6 mt-12 first:mt-0">
      <div className="flex items-center gap-3">
        <span className="h-2.5 w-2.5 rounded-full bg-mustard" />
        <h2 className="text-2xl font-bold text-maroon">{title}</h2>
      </div>
      {description && (
        <p className="mt-1 pl-5 text-sm text-neutral-700">{description}</p>
      )}
      <div className="mt-4 h-px w-full bg-neutral-200" />
    </div>
  );
}
