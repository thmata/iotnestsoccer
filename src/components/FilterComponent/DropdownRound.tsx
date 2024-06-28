import { getMatchTeamList, getNumberOfRounds } from '@/services/api/api';
import React, { useState, useEffect, useRef } from 'react';
import { competitionsProps, DropdownCompetitionProps } from '@/types/competitions.type';

const DropdownRound: React.FC<DropdownCompetitionProps> = ({ setSelectedOption, selectedOption }) => {

    const [teams, setTeams] = useState<any>();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    async function getApiDataOnCLient() {
        try {
            if (selectedOption?.team?.id || selectedOption?.team?.id === 0) {
                if (selectedOption?.team?.id === 0) {
                    const data = await getNumberOfRounds(selectedOption?.competition?.id);
                    setTeams({
                        match: Array.from({ length: data.matches[data.matches.length - 1]?.matchday }, (_, index) => index),
                        matchFounds: data.matches
                    })
                }
                const data = await getMatchTeamList(selectedOption?.team?.id);
                setTeams({
                    match: Array.from({ length: data.matches[data.matches.length - 1]?.matchday }, (_, index) => index),
                    matchFounds: data.matches
                })
                console.log("## data", data)
            }
        } catch {
            console.log('Erro ao buscar dados da API');
        }
    }

    const handleOptionClick = (id: number) => {
        console.log("## ID", id)
        setSelectedOption({
            ...selectedOption,
            match: {
                selectedRound: id,
                matchSelected: id === 0 ? teams.matchFounds.map((item: { matchday: any; }) => {
                    return {
                        matchday: item.matchday,
                        selectedMatch: {
                            ...item
                        }
                    }
                }) : teams.matchFounds.filter((match: any) => match.matchday === id).map((match: any) => {
                    return {
                        matchday: match.matchday,
                        selectedMatch: {
                            ...match
                        }
                    }
                }),
                listOfMatches: teams.matchFounds
            }
        });

        setIsOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        getApiDataOnCLient();
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectedOption?.team]);

    return (
        <div ref={dropdownRef} className="relative mt-5">
            <label>Rodada: </label>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="border border-gray-300 p-2 cursor-pointer bg-white"
            >
                {selectedOption?.match ?
                    <div className="flex items-center p-1 cursor-pointer">
                        <p className="pl-2">
                            {selectedOption?.match?.selectedRound === 0 ? 'Todas' : selectedOption?.match?.selectedRound}
                        </p>
                    </div>
                    : 'Selecione uma opção'}
            </div>
            {isOpen && (
                <ul className="border border-gray-300 p-0 m-0 list-none absolute bg-white z-10 w-full max-h-60 overflow-y-auto">
                    <div onClick={() => handleOptionClick(0)} className="flex items-center p-2 cursor-pointer hover:bg-gray-100">
                        <p>Todas</p>
                    </div>
                    {teams?.match?.map((option: number, index: number) => (
                        <div onClick={() => handleOptionClick(index + 1)} key={index} className="flex items-center p-2 cursor-pointer hover:bg-gray-100">
                            <li className="pl-2">
                                {index + 1}
                            </li>
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DropdownRound;
