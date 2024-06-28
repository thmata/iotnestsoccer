export interface RootMatch {
    filters: Filters
    resultSet: ResultSet
    matches: Match[]
}

interface Filters {
    competitions: string
    permission: string
    limit: number
}

interface ResultSet {
    count: number
    competitions: string
    first: string
    last: string
    played: number
    wins: number
    draws: number
    losses: number
}

interface Match {
    area: Area
    competition: Competition
    season: Season
    id: number
    utcDate: string
    status: string
    matchday: number
    stage: string
    group: any
    lastUpdated: string
    homeTeam: HomeTeam
    awayTeam: AwayTeam
    score: Score
    odds: Odds
    referees: any[]
}

interface Area {
    id: number
    name: string
    code: string
    flag: string
}

interface Competition {
    id: number
    name: string
    code: string
    type: string
    emblem: string
}

interface Season {
    id: number
    startDate: string
    endDate: string
    currentMatchday: number
    winner: any
}

interface HomeTeam {
    id: number
    name: string
    shortName: string
    tla: string
    crest: string
}

interface AwayTeam {
    id: number
    name: string
    shortName: string
    tla: string
    crest: string
}

interface Score {
    winner?: string
    duration: string
    fullTime: FullTime
    halfTime: HalfTime
}

interface FullTime {
    home?: number
    away?: number
}

interface HalfTime {
    home?: number
    away?: number
}

interface Odds {
    msg: string
}


export interface RootCompetitionsMatches {
    filters: Filters
    resultSet: ResultSet
    competition: Competition
    matches: Match[]
}