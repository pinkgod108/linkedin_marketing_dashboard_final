interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

export default function ChartCard({ title, children }: ChartCardProps) {
  return (
    <div className="rounded-xl2 bg-cream-light p-5 shadow-soft">
      <h3 className="mb-4 font-semibold text-maroon">{title}</h3>
      {children}
    </div>
  );
}
