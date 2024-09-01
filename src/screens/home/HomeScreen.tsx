import { useEffect, useRef, useState } from "react";
import { FiGrid } from "react-icons/fi";
import { api } from "../../config/axios";
import LocalComponent from "./components/LocalsComponent";

export default function HomeScreen() {
    const [locals, setLocals] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        document.title = "Home";
        api.get(`/v1/locals/all`)
            .then((response) => {
                setLocals(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsModalOpen(false);
            }
        };

        if (isModalOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isModalOpen]);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    return (
        <div className="flex flex-col flex-1 bg-white relative">
            <div className="bg-blue-400 w-full flex h-16 justify-center items-center">
                <div className="absolute flex left-2 w-12 h-12 justify-center items-center">
                    <button
                        className="absolute left-0 w-10 h-10"
                        onClick={toggleModal}
                        ref={buttonRef}
                    >
                        <FiGrid size={30} />
                    </button>
                    {isModalOpen && (
                        <div
                            className="absolute bg-white p-4 border rounded shadow-lg w-56 sm:w-64 md:w-72 lg:w-80 xl:w-96"
                            style={{
                                top: "70%",
                                left: 8,
                                transform: "translateY(8px)",
                            }}
                            ref={modalRef}
                        >
                            <h2 className="text-xl font-bold mb-2">Menu</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2 w-full">
                                <div className="flex justify-center items-center min-h-[6rem] min-w-[2rem] rounded-lg bg-blue-800">
                                    <p className="text-white">LOCAIS</p>
                                </div>
                                <div className="flex justify-center items-center min-h-[6rem] min-w-[2rem] rounded-lg bg-blue-800">
                                    <p className="text-white">RESERVAS</p>
                                </div>
                                <div className="flex justify-center items-center min-h-[6rem] min-w-[2rem] rounded-lg bg-blue-800">
                                    <p className="text-white">USUARIOS</p>
                                </div>
                                <div className="flex justify-center items-center min-h-[6rem] min-w-[2rem] rounded-lg bg-blue-800">
                                    <p className="text-white">CLIENTES</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-center">
                        OrganizationForAll
                    </h1>
                </div>
                <div className="absolute flex right-2 w-12 h-12 bg-white rounded-full justify-center items-center">
                    <button className="w-10 h-10 bg-slate-200 rounded-full"></button>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 bg-white w-full h-full p-4">
                {locals.map((local: any) => (
                    <LocalComponent local={local} key={local.name} />
                ))}
            </div>
        </div>
    );
}
