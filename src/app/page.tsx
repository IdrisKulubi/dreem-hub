import { ModeToggle } from "@/components/themes/mode-toggle";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <ModeToggle />
      <h1 className="text-4xl font-bold">Welcome to Dreem Hub</h1>
    </main>
  );
}