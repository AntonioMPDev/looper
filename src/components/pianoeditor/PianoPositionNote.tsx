import PianoNote from './PianoNote';

// eslint-disable-next-line react-refresh/only-export-components
export const nonNaturalClas = {
    "C#": " bottom-[10%]",
    "D#": " bottom-[26%]",
    "F#": " top-[40%]",
    "G#": " top-[25%]",
    "A#": " top-[10%]",
};


export default function PianoPositionNote({
    note,
}: {
    note: { note: keyof typeof nonNaturalClas };
}) {
    const commonClass = "border border-gray-400 cursor-pointer";
    const movementClassesForNonNaturals =
        "max-h-20 sm:w-16 w-10 h-[7%]" +
        nonNaturalClas[
            note.note.slice(0, -1) as keyof typeof nonNaturalClas
        ];

    if (note.note.includes("#")) {
        return (
            <PianoNote
                note={note.note}
                bg={"bg-black"}
                className={`${commonClass} ${movementClassesForNonNaturals} absolute`}
            ></PianoNote>
        );
    }

    return (
        <PianoNote
            note={note.note}
            bg={"bg-white"}
            className={`${commonClass} sm:w-24 w-16 h-[14.28%]`}
        ></PianoNote>
    );
}
