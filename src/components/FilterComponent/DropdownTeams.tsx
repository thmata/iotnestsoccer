import { getCompetitionTeamList } from '@/services/api/api';
import React, { useState, useEffect, useRef } from 'react';
import { competitionsProps, DropdownCompetitionProps } from '@/types/competitions.type';
import { RootTeam } from '@/types/teams.types';

const DropdownTeams: React.FC<DropdownCompetitionProps> = ({ setSelectedOption, selectedOption }) => {

    const [teams, setTeams] = useState<any>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    async function getApiDataOnCLient() {
        try {
            if (selectedOption?.competition?.id) {
                const data: RootTeam = await getCompetitionTeamList(selectedOption?.competition?.id);
                const team = data.teams.map((team) => {
                    return {
                        name: team.name,
                        emblem: team.crest,
                        id: team.id
                    }
                });
                setTeams(team)
            }
        } catch {
            console.log('Erro ao buscar dados da API');
        }
    }

    const handleOptionClick = (name: string, emblem: string, id: number) => {
        setSelectedOption({
            ...selectedOption,
            team: {
                name,
                emblem,
                id
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
    }, [selectedOption?.competition]);

    return (
        <div ref={dropdownRef} className="relative mt-5">
            <label>Selecione um time:</label>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="border border-gray-300 p-2 cursor-pointer bg-white"
            >
                {selectedOption?.team ?
                    <div className="flex items-center p-1 cursor-pointer">
                        {!(selectedOption?.team.id === 0) && <img className="w-7 h-7" src={selectedOption?.team?.emblem} alt={selectedOption?.team?.name} />}
                        <p className="pl-2">
                            {selectedOption?.team?.name}
                        </p>
                    </div>
                    : 'Selecione uma opção'}
            </div>
            {isOpen && (
                <ul className="border border-gray-300 p-0 m-0 list-none absolute bg-white z-10 w-full max-h-60 overflow-y-auto">
                    <div onClick={() => handleOptionClick("Todos", "todos", 0)} className="flex items-center p-2 cursor-pointer hover:bg-gray-100">
                        <p>Todos</p>
                    </div>
                    {teams.map((option: any, index: any) => (
                        <div onClick={() => handleOptionClick(option.name, option.emblem, option.id)} key={index} className="flex items-center p-2 cursor-pointer hover:bg-gray-100">
                            <img className="w-9 h-9" src={option.emblem} alt={option.name} />
                            <li className="pl-2">
                                {option.name}
                            </li>
                        </div>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DropdownTeams;
