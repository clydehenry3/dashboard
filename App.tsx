import { NavBar } from "./components/NavBar";
import { HeroPanel } from "./components/HeroPanel";
import { SummaryCards } from "./components/SummaryCards";
import { EntriesTable } from "./components/EntriesTable";

export default function App() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <HeroPanel />
        <SummaryCards />
        <EntriesTable />
      </main>
    </div>
  );
}