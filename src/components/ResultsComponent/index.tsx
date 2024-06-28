import React from 'react';
import { DropdownCompetitionProps } from "@/types/competitions.type";

export default function ResultsComponent({ selectedOption }: DropdownCompetitionProps) {
    const matches = selectedOption?.match?.matchSelected || [];

    const groupMatchesByMatchday = (matches: any[]) => {
        return matches.reduce((groupedMatches, match) => {
            const matchday = match.selectedMatch.matchday;
            if (!groupedMatches[matchday]) {
                groupedMatches[matchday] = [];
            }
            groupedMatches[matchday].push(match);
            return groupedMatches;
        }, {});
    };

    const groupedMatches = groupMatchesByMatchday(matches);

    return (
        <div className="w-full p-4 bg-white">
            <h2 className="text-xl font-bold mb-4">Resultados</h2>
            {Object.keys(groupedMatches).length === 0 && <p>Nenhum resultado encontrado, selecione todos os filtros.</p>}
            <div className="overflow-x-auto">
                {selectedOption?.competition?.name && Object.keys(groupedMatches).length !== 0 && <div className='flex items-center text-[22px] justify-center'><span><img className='max-h-[65px] max-w-[65] m-auto' src={selectedOption.competition.emblem} alt={selectedOption.competition.name} /> </span> <h2 className='text-[16px] sm:text-[24px]'>{selectedOption?.competition?.name}</h2></div>}
                {Object.keys(groupedMatches).map((matchday) => (
                    <div key={matchday} className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Rodada {matchday}</h3>
                        <div className="shadow overflow-hidden sm:rounded-lg">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:w-[25%]">Data</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:w-[25%]">Time Casa</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:w-[25%]">Placar</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:w-[25%]">Time Visitante</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {groupedMatches[matchday].map((match: any) => (
                                            <tr key={match.selectedMatch.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(match.selectedMatch.utcDate).toLocaleDateString()}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center">
                                                    {match.selectedMatch.homeTeam.name}
                                                    <img className="ml-2 h-6 w-6" src={match?.selectedMatch.homeTeam.crest} alt={`${match.selectedMatch.homeTeam.name} crest`} />
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{match.selectedMatch.score.fullTime.home} - {match.selectedMatch.score.fullTime.away}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 flex items-center">
                                                    <img className="mr-2 h-6 w-6" src={match?.selectedMatch.awayTeam.crest} alt={`${match.selectedMatch.awayTeam.name} crest`} />
                                                    {match.selectedMatch.awayTeam.name}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
