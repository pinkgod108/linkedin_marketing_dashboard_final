interface EmptyStateProps {
  message: string;
}

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl2 border border-dashed border-neutral-200 bg-cream-light px-6 py-12 text-center shadow-soft">
      <span className="text-3xl">🌻</span>
      <p className="mt-3 max-w-sm text-neutral-700">{message}</p>
    </div>
  );
}
