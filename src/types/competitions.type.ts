export interface CompetitionListResponse {
    count: number;
    filters: {
        client: string;
    };
    competitions: Competition[];
}

interface Competition {
    id: number;
    area: Area;
    name: string;
    code: string;
    type: string;
    emblem: string;
    plan: string;
    currentSeason: CurrentSeason;
    numberOfAvailableSeasons: number;
    lastUpdated: string;
}

interface Area {
    id: number;
    name: string;
    code: string;
    flag: string;
}

interface CurrentSeason {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
    winner: Winner | null;
}

interface Winner {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
    address: string;
    website: string;
    founded: number;
    clubColors: string;
    venue: string | null;
    lastUpdated: string;
}

export interface competitionsProps {
    name: string;
    emblem: string;
    id: number;
}

export interface selectedOptionProps {
    competition?: {
        name: string;
        emblem: string;
        id: number;
    }
    team?: {
        name: string;
        emblem: string;
        id: number;
    }
}

export interface DropdownCompetitionProps {
    setSelectedOption: React.Dispatch<React.SetStateAction<selectedOptionProps | undefined>>;
    selectedOption: selectedOptionProps | undefined;
}