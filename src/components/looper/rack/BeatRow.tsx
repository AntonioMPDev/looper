import {
    MdOutlineRadioButtonChecked,
    MdRadioButtonUnchecked,
} from "react-icons/md";
import Steps from "../loops/Steps";
import useBeatRow from "../../../hooks/useBeatRow";
import {  Rows } from "../../context/AppContext";
import { useCallback } from "react";
import { rowType } from "../../../constants";
import NotesVisualizer from './NotesVisualizer';
import MakersTime from './MakersTime';

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
                    <Steps
                        rowItem={rowItem}
                        rowIndex={rowIndex}
                        MakersTime={MakersTime}
                    />
                ) : (
                    <NotesVisualizer
                        MakersTime={MakersTime}
                        rowIndex={rowIndex}
                    />
                )}
            </div>
        </div>
    );
}
