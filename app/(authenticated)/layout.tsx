import Navbar from "@/components/Navbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/20">
      <Navbar />
      <main className="pb-16">
        {children}
      </main>
    </div>
  );
}
