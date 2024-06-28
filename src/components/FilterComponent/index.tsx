"use client"
import { useEffect, useState } from 'react';
import { getCompetitionList, getCompetitionTeamList } from "@/services/api/api";
import DropdownCompetition from './DropdownCompetition';
import DropdownTeams from './DropdownTeams';
import { competitionsProps, selectedOptionProps, DropdownCompetitionProps } from "@/types/competitions.type";
import DropdownRound from './DropdownRound';

export default function FilterComponent({ selectedOption, setSelectedOption }: DropdownCompetitionProps) {

    useEffect(() => {
        console.log("## selectedOption", selectedOption)
    }, [selectedOption])

    return (
        <div className="w-full p-4 bg-gray-100">
            <h2 className="text-xl font-bold mb-4">Filtros</h2>
            <DropdownCompetition setSelectedOption={setSelectedOption} selectedOption={selectedOption} />
            {selectedOption && selectedOption.competition &&
                <DropdownTeams setSelectedOption={setSelectedOption} selectedOption={selectedOption} />}
            {selectedOption && selectedOption.team &&
                <DropdownRound setSelectedOption={setSelectedOption} selectedOption={selectedOption} />}
        </div>
    );
}

