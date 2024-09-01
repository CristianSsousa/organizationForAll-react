import { addHours, isWithinInterval, parseISO, set } from "date-fns";
import { useEffect, useState } from "react";
import { Local } from "../../../interface/Local/Local";

export default function LocalComponent({ local }: { local: Local }) {
    const localItem = local;

    const [livre, setLivre] = useState<boolean>(true);

    const verifyDate = () => {
        const atualDate = set(new Date(), {
            minutes: 0,
            seconds: 0,
            milliseconds: 0,
        });

        const rangeMax = addHours(atualDate, 1);

        if (
            !Array.isArray(localItem.reserves) ||
            localItem.reserves.length === 0
        ) {
            setLivre(true);
            return;
        }

        localItem.reserves.forEach((reserve) => {
            const dateFormated =
                reserve.date.split("/").reverse().join("-") +
                "T" +
                reserve.hour;

            const reserveDate = set(parseISO(dateFormated), {
                minutes: 0,
                seconds: 0,
                milliseconds: 0,
            });

            if (
                isWithinInterval(reserveDate, {
                    start: atualDate,
                    end: rangeMax,
                })
            ) {
                setLivre(false);
            } else {
                setLivre(true);
            }
        });
    };

    useEffect(() => {
        verifyDate();
    }, [localItem.reserves]);

    return (
        <div
            key={local.name}
            className="bg-gray-800 rounded-lg p-4 min-h-60 text-white space-y-1"
        >
            <div className="p-2 w-full h-2/3 bg-gray-400 rounded-md">
                <h1 className="text-lg font-semibold">{localItem.name}</h1>
                <p>Capacidade: {localItem.capacity}</p>
                <p>Criado: {localItem.createdAt}</p>
            </div>
            <div
                className={`p-2 w-full h-1/3  rounded-md ${
                    livre ? "bg-green-500" : "bg-red-600"
                }`}
            >
                <h1 className="text-lg font-semibold">
                    {livre ? "Disponível" : "Reservado"}
                </h1>
            </div>
        </div>
    );
}
