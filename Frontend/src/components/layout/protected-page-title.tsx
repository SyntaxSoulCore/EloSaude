type ProtectedPageTitleProps = {
  title: string;
};

export function ProtectedPageTitle({ title }: ProtectedPageTitleProps) {
  return (
    <section className="flex min-h-[calc(100vh-9rem)] items-start">
      <h1 className="text-3xl font-semibold tracking-tight text-body">{title}</h1>
    </section>
  );
}
