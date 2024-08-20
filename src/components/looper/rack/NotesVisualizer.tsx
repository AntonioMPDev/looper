import { AppContext } from "../../context/AppContext";
import { useContext } from "react";

export default function NotesVisualizer({
    rowIndex,
    MakersTime,
}: {
    rowIndex: number;
    MakersTime: ({
        isLineal,
    }: {
        isLineal?: boolean | undefined;
    }) => JSX.Element;
}) {
    const { rows, setCurrrentRow, setIsPianoEditor } = useContext(AppContext);
    const row = rows[rowIndex];

    function handleOnclick() {
        setCurrrentRow(row.key);
        setIsPianoEditor(true);
    }

    return (
        <div className="flex flex-col w-[75%] pr-[0.25rem]">
            <MakersTime isLineal />
            <div
                className="rounded flex flex-col gap-px overflow-y-auto no-scrollbar max-h-[96px] cursor-pointer"
                onClick={handleOnclick}
            >
                {row.notes?.map((oct, octI) => (
                    <div
                        key={octI}
                        id={`oct-${octI}`}
                        className="bg-cyan-950 relative pointer-events-none"
                    >
                        <div className="absolute text-xs opacity-50 p-1">
                            {oct[11][0].note.note}
                        </div>
                        {oct.map((notesArr, notesArrI) => (
                            <div
                                key={notesArrI}
                                id={`notesline-${notesArrI}`}
                                className="flex gap-1 relative"
                            >
                                {notesArr.map((noteObj, noteI) => (
                                    <div
                                        key={noteI}
                                        id={`notei-${noteI}`}
                                        className="md:w-[5.5%] sm:w-[11%] w-[23%] w-[23%] h-2"
                                    >
                                        {noteObj.active ? (
                                            <div className="w-full">
                                                <div className="w-full h-px bg-gray-400"></div>
                                            </div>
                                        ) : null}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
