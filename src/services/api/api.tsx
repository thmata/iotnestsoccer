"use server";
import api from '../config/AxiosConfig';
import { CompetitionListResponse } from "../../types/competitions.type"
import { RootCompetitionsMatches } from "@/types/matches.type";
import { RootMatch } from '@/types/matches.type';

export const getCompetitionList = async (): Promise<CompetitionListResponse> => {
    try {
        const response = await api.get(`/v4/competitions`,);
        return response.data as CompetitionListResponse;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getCompetitionTeamList = async (id: number) => {
    try {
        const response = await api.get(`/v4/competitions/${id}/teams`,);
        return response.data
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getMatchTeamList = async (id: number): Promise<RootMatch> => {
    try {
        const response = await api.get(`/v4/teams/${id}/matches`,);
        return response.data as RootMatch
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getNumberOfRounds = async (id: number | undefined): Promise<RootCompetitionsMatches> => {
    try {
        const response = await api.get(`/v4/competitions/${id}/matches`,);
        return response.data as RootCompetitionsMatches
    } catch (error) {
        console.error(error);
        throw error;
    }
}