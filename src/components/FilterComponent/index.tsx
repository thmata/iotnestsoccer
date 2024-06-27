'use client'
import { getCompetitionList } from "@/services/api/api";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function FilterComponent() {

    // const { data, isLoading } = useQuery({
    //     queryKey: ["competitions"],
    //     queryFn: getCompetitionList,
    // })

    // console.log("## data", data)

    useEffect(() => {
        const requisition = async () => {
            const response = await getCompetitionList()
            console.log("## response", response)
        }

        requisition()
    }, [])

    return (
        <div className="w-full md:w-1/4 p-4 bg-gray-100">
            <h2 className="text-xl font-bold mb-4">Filtros</h2>

        </div>
    );
}
