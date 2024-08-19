import {
    MdOutlineRadioButtonChecked,
    MdRadioButtonUnchecked,
} from "react-icons/md";
import Steps from "../loops/Steps";
import useBeatRow from "../../../hooks/useBeatRow";
import { AppContext, Rows } from "../../context/AppContext";
import { useCallback, useContext } from "react";
import { rowType } from "../../../constants";

function NotesVisualizer({ rowIndex }: { rowIndex: number }) {
    const { rows, setCurrrentRow, setIsPianoEditor } = useContext(AppContext);
    const row = rows[rowIndex];

    function handleOnclick() {
        setCurrrentRow(row.key);
        setIsPianoEditor(true);
    }

    return (
        <div
            className="w-[75%] rounded flex flex-col gap-px overflow-y-auto no-scrollbar max-h-[96px] cursor-pointer pr-[0.25rem]"
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
                                        <div className="w-full pr-1">
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
    );
}

export default function BeatRow({
    rowItem,
    rowIndex,
}: {
    rowItem: Rows[0];
    rowIndex: number;
}) {
    const { setMute, mute, handleRowDetailsView, Icon } = useBeatRow(rowItem);

    const getLabelText = useCallback(function (label: string) {
        let labelNew = label;
        if (label.length > 7) {
            const result =
                label
                    .split("")
                    .map((c, i) => {
                        if (i < 6) {
                            return c;
                        }
                    })
                    .join("")
                    .trimEnd() + "..";
            labelNew = result;
        }
        return labelNew;
    }, []);

    return (
        <div className="px-2 py-2 border border-gray-200/5 bg-gray-800/30 rounded mb-1">
            <div
                className={`flex gap-4 ${
                    rowItem.type === rowType.synth
                        ? "items-end"
                        : "items-center"
                } sm:pr-4`}
            >
                <div className="sm:flex items-center">
                    <button
                        className="p-4 hover:opacity-50 transition ease-in-out duration-300"
                        onClick={() => setMute(!mute)}
                    >
                        {!mute ? (
                            <MdOutlineRadioButtonChecked />
                        ) : (
                            <MdRadioButtonUnchecked />
                        )}
                    </button>
                    <div className="flex">
                        <button
                            title={rowItem.label}
                            className={`${
                                rowItem.type === rowType.synth ? "h-[90px]" : ""
                            } text-xs bg-cyan-950 shadow py-2 sm:w-24 w-full rounded hover:opacity-50 transition ease-in-out duration-300`}
                            onClick={handleRowDetailsView}
                        >
                            <div
                                className={`${
                                    rowItem.type === rowType.synth
                                        ? "flex-col"
                                        : ""
                                } flex items-center justify-center gap-2`}
                            >
                                {Icon ? (
                                    <Icon className="sm:text-xl text-4xl" />
                                ) : null}
                                <div className="sm:flex hidden">
                                    {getLabelText(rowItem.label)}
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
                {rowItem.type === rowType.beat ? (
                    <Steps rowItem={rowItem} rowIndex={rowIndex} />
                ) : (
                    <NotesVisualizer rowIndex={rowIndex} />
                )}
            </div>
        </div>
    );
}
