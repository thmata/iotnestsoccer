import api from '../config/AxiosConfig';

export const getCompetitionList = async () => {
    try {
        const response = await api.get(`/v4/competitions`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}