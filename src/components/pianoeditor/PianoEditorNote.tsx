import { useCallback, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { hightLightNoteRow } from "../../hooks/pianoeditor/useLongPressKeyOnElement";

export default function PianoEditorNote({
    noteItem,
    octIndex,
    noteIndexCell,
    noteIndex,
}: {
    noteItem: {
        note: {
            note: string;
        };
        active: boolean;
        context: unknown;
        i: number;
    };
    octIndex: number;
    noteIndexCell: number;
    noteIndex: number;
}) {
    const { rows, currentRow, setRows, synthRef } = useContext(AppContext);

    const isActive = useCallback(
        function () {
            const indexRow = rows.findIndex((item) => item.key === currentRow);
            const row = rows[indexRow];
            if (row.notes) {
                const oct = row.notes[octIndex];
                const note = oct[noteIndex];
                const noteCell = note[noteIndexCell];
                return noteCell.active;
            }

            return false;
        },
        [currentRow, noteIndex, noteIndexCell, octIndex, rows]
    );

    const handleOnClick = useCallback(
        function () {
            const active = !isActive();
            if (active && synthRef.current) {
                const note = noteItem.note.note;
                const synthObj = synthRef.current[currentRow];
                synthObj.synth.triggerAttackRelease(note, "12n");
                hightLightNoteRow(true, note);
                setTimeout(() => {
                    hightLightNoteRow(false, note);
                }, 500);
            }

            const indexRow = rows.findIndex((item) => item.key === currentRow);
            const newRows = [...rows];
            const row = newRows[indexRow];
            if (row.notes) {
                const oct = row.notes[octIndex];
                const note = oct[noteIndex];
                const noteCell = note[noteIndexCell];
                noteCell.active = active;
            }
            setRows(newRows);
        },
        [
            currentRow,
            isActive,
            noteIndex,
            noteIndexCell,
            noteItem.note.note,
            octIndex,
            rows,
            setRows,
        ]
    );

    function classes() {
        const active = isActive();
        let naturalsNonNaturals = "";
        if (!noteItem.note.note.includes("#") && !active) {
            naturalsNonNaturals = "bg-gray-700 bg-opacity-75";
        }

        if (active) {
            naturalsNonNaturals = "bg-white bg-opacity-75";
        }

        return `w-[6.25%] h-full border border-gray-800/75 cursor-pointer ${naturalsNonNaturals}`;
    }

    return (
        <div
            onClick={handleOnClick}
            id={`note-${noteItem.note.note}-${noteItem.i}`}
            data-note={noteItem.note.note}
            className={classes()}
        ></div>
    );
}
