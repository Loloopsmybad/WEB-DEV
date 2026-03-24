export default function InnerLayout({
    title,
    description,
    children,
  }: {
    title: string;
    description: string;
    children: React.ReactNode;
  }) {
    return (
      <main className="text-[#0b0f14] px-6">
  
       
        <section className="min-h-[60vh] flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl font-semibold">{title}</h1>
  
          <p className="mt-6 max-w-2xl text-black/60">
            {description}
          </p>
        </section>
  
       
        {children}
  
      </main>
    );
  }