import FilterComponent from "@/components/FilterComponent";
import ResultsComponent from "@/components/ResultsComponent";
import TopBarComponent from "@/components/TopBarComponent";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <header>
        <TopBarComponent />
      </header>
      <main className="px-[5rem] h-[100%] flex mt-5 md:flex-row">
        <FilterComponent />
        <ResultsComponent />
      </main>
    </>
  );
}
