import { useCallback, useContext, useState } from "react";
import { PianoContext } from "../../components/context/PianoEditorContext";
import * as Tone from "tone";
import { AppContext } from "../../components/context/AppContext";

export function hightLightNoteRow(isHighLighted: boolean, note: string) {
    const hightligtEl = document.getElementById(`row-note-${note}`);
    if (isHighLighted) {
        hightligtEl?.classList.add("higlight-note-row");
    } else {
        hightligtEl?.classList.remove("higlight-note-row");
    }
}

export default function useLongPressKeyOnElement(note: string) {
    const [holdDuration, setHoldDuration] = useState(0);
    const { pianoNotesData, setPianoNotesData, setStillHolding, stillHolding } =
        useContext(PianoContext);
    const { currentRow, synthRef } = useContext(AppContext);
    const [isTouch, setIsTouch] = useState(false);

    const hightLightNote = useCallback(
        function (isHighLighted: boolean) {
            hightLightNoteRow(isHighLighted, note);
        },
        [note]
    );

    const stop = useCallback(() => {
        hightLightNote(false);
        if (synthRef.current) {
            const sytnhObj = synthRef.current[currentRow];
            sytnhObj.synth.triggerRelease();
            if (pianoNotesData[note] && pianoNotesData[note].timer) {
                clearInterval(pianoNotesData[note].timer);
                setPianoNotesData({
                    ...pianoNotesData,
                    [note]: {
                        timer: 0,
                        isHolding: false,
                        holdDuration: 0,
                    },
                });
            }
        }
    }, [
        currentRow,
        hightLightNote,
        note,
        pianoNotesData,
        setPianoNotesData,
        synthRef,
    ]);

    const start = () => {
        hightLightNote(true);
        Tone.start();
        if (synthRef.current) {
            const sytnhObj = synthRef.current[currentRow];

            sytnhObj.synth.triggerAttack(note);
            setStillHolding(true);
            const timer = setInterval(() => {
                setHoldDuration((prevDuration) => prevDuration + 100);
            }, 100);
            setPianoNotesData({
                ...pianoNotesData,
                [note]: {
                    timer,
                    isHolding: true,
                    holdDuration,
                },
            });
        }
    };

    const handleMouseDown = (
        e:
            | React.MouseEvent<HTMLDivElement, MouseEvent>
            | React.TouchEvent<HTMLDivElement>
    ) => {
        if (!isTouch) {
            e.preventDefault();
            start();
        }
    };

    const handleMouseUp = () => {
        setStillHolding(false);
        stop();
    };

    // Handle the click (onClick)
    const handleClick = () => {
        if (holdDuration < 500) {
            // If held for less than 500ms, treat it as a click
            console.log("Button was clicked");
        }
    };

    const handleOnMouseLeave = () => {
        stop();
    };

    const reset = () => {
        const pianoNotesDataCopy = { ...pianoNotesData };
        for (const note in pianoNotesDataCopy) {
            if (
                Object.prototype.hasOwnProperty.call(pianoNotesDataCopy, note)
            ) {
                pianoNotesDataCopy[note].timer = 0; // Set timer to 0
                pianoNotesDataCopy[note].isHolding = false; // Set isHolding to false
            }
        }

        setPianoNotesData(pianoNotesDataCopy);
    };

    const handleOnMouseEnter = () => {
        if (stillHolding) {
            reset();
            start();
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleTouchStart = (_e: React.TouchEvent<HTMLDivElement>) => {
        setIsTouch(true);
        start();
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleTouchEnd = (_e: React.TouchEvent<HTMLDivElement>) => {
        setStillHolding(false);
        stop();
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleTouchCancel = (_e: React.TouchEvent<HTMLDivElement>) => {
        setStillHolding(false);
        stop();
    };

    return {
        handleMouseDown,
        handleMouseUp,
        handleClick,
        handleOnMouseLeave,
        handleOnMouseEnter,
        handleTouchStart,
        handleTouchEnd,
        handleTouchCancel,
    };
}
