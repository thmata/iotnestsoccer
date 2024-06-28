import { getCompetitionList } from '@/services/api/api';
import React, { useState, useEffect, useRef } from 'react';
import { competitionsProps, selectedOptionProps } from '@/types/competitions.type';

interface DropdownCompetitionProps {
    setSelectedOption: React.Dispatch<React.SetStateAction<selectedOptionProps | undefined>>;
    selectedOption: selectedOptionProps | undefined;
}

const DropdownCompetition: React.FC<DropdownCompetitionProps> = ({ setSelectedOption, selectedOption }) => {

    const [competitions, setCompetitions] = useState<competitionsProps[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    async function getApiDataOnCLient() {
        try {
            const data = await getCompetitionList();
            console.log("## data", data)
            var competitions: competitionsProps[] = data?.competitions?.map((competition) => {
                return {
                    name: competition.name,
                    emblem: competition.emblem,
                    id: competition.id
                }
            })
            setCompetitions(competitions)
        } catch {
            console.log('Erro ao buscar dados da API');
        }
    }

    const handleOptionClick = (name: string, emblem: string, id: number) => {
        setSelectedOption({
            competition: {
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
    }, []);

    return (
        <div ref={dropdownRef} className="relative">
            <label>Escolha o campeonato:</label>
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="border border-gray-300 p-2 cursor-pointer bg-white"
            >
                {selectedOption?.competition ?
                    <div className="flex items-center p-1 cursor-pointer">
                        <img className="w-7 h-7" src={selectedOption?.competition?.emblem} alt={selectedOption?.competition?.name} />
                        <p className="pl-2">
                            {selectedOption?.competition?.name}
                        </p>
                    </div>
                    : 'Selecione uma opção'}
            </div>
            {isOpen && (
                <ul className="border border-gray-300 p-0 m-0 list-none absolute bg-white z-10 w-full">
                    {competitions.map((option, index) => (
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

export default DropdownCompetition;
