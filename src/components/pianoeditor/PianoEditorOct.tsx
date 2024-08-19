import PianoEditorNote from "./PianoEditorNote";

export default function PianoEditorOct({
    oct,
    octIndex,
}: {
    oct: {
        note: {
            note: string;
        };
        active: boolean;
        context: unknown;
        i: number;
    }[][];
    octIndex: number;
}) {
    return (
        <div className="w-full h-[50%]">
            {oct.map((notes, noteIndex) => (
                <div
                    key={noteIndex}
                    className="w-full h-[8.33%] flex"
                    id={`row-note-${notes[0].note.note}`}
                >
                    {notes.map((item, noteIndexCell) => (
                        <PianoEditorNote
                            octIndex={octIndex}
                            noteItem={item}
                            noteIndexCell={noteIndexCell}
                            noteIndex={noteIndex}
                            key={noteIndexCell}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}
