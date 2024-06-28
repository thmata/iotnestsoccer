"use client"
import FilterComponent from "@/components/FilterComponent";
import ResultsComponent from "@/components/ResultsComponent";
import TopBarComponent from "@/components/TopBarComponent";
import { selectedOptionProps } from "@/types/competitions.type";
import { useState } from "react";

export default function Home() {
  const [selectedOption, setSelectedOption] = useState<selectedOptionProps>();

  return (
    <>
      <header>
        <TopBarComponent />
      </header>
      <main className="lg:px-[5rem] h-[100%] flex mt-5 flex-col">
        <FilterComponent selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        <ResultsComponent selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
      </main>
    </>
  );
}
