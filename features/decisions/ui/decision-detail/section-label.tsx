export default function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-muted-foreground text-[11px] font-semibold tracking-wider uppercase">
      {children}
    </h2>
  );
}
