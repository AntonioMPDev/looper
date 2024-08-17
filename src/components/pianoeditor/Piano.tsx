import { nonNaturalClasses, piano_notes_twoo_oct } from "../../constants";
import { useContext } from "react";
import { PianoContext } from "../context/PianoEditorContext";
import PianoPositionNote from "./PianoPositionNote";

export default function Piano() {
    const { setStillHolding } = useContext(PianoContext);

    return (
        <div className="flex flex-col w-24 left-0 h-full max-h-[800px] absolute z-10">
            {piano_notes_twoo_oct.map((oct, i) => (
                <div
                    key={i}
                    className="flex w-full flex-col-reverse justify-center relative left-0 h-[50%]"
                    onMouseLeave={() => setStillHolding(false)}
                    onMouseEnter={() => setStillHolding(false)}
                >
                    {oct.map((note) => (
                        <PianoPositionNote
                            key={note.note}
                            note={
                                note as {
                                    note: keyof typeof nonNaturalClasses;
                                }
                            }
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}
