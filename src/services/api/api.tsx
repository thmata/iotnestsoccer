"use server";
import api from '../config/AxiosConfig';
import { CompetitionListResponse } from "../../types/competitions.type"

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