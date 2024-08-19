import { useCallback, useContext, useState } from "react";
import { CiMenuFries } from "react-icons/ci";
import { FaPlay, FaStop } from "react-icons/fa";
import useControls from "../../hooks/useControls";
import { PianoContext } from "../context/PianoEditorContext";
import { MARKER_TIME_ID, MARKER_TIME_STYLE_ID } from "../../constants";
import { getBeats } from "../../utils/time";
import { AppContext } from "../context/AppContext";

function useMarkerControl() {
    const [isPlaying, setIsPlaying] = useState(false);
    const { start, stop, loop } = useControls(
        isPlaying,
        setIsPlaying,
        onKeySpace
    );
    const { pianoRollContainerRef, pianoRollMarkerRef } =
        useContext(PianoContext);
    const { bpm, rows, currentRow, synthRef } = useContext(AppContext);

    const addStyleMoveMarker = useCallback(
        function (containerWidth: number | undefined) {
            const time = getBeats(bpm[0]) * 16;
            function getInnerStyleHtml() {
                return `
                    #${MARKER_TIME_ID} {
                        animation: moveMarker ${time}ms linear infinite;
                    }
    
                    @keyframes moveMarker {
                        0% { left: 0; }
                        100% { left: ${containerWidth}px; }
                    }
                `;
            }
            if (containerWidth) {
                const styleTagPresent =
                    document.getElementById(MARKER_TIME_STYLE_ID);
                if (!styleTagPresent) {
                    const styletag = document.createElement("style");
                    styletag.id = MARKER_TIME_STYLE_ID;
                    styletag.innerHTML = getInnerStyleHtml();

                    document.head.appendChild(styletag);
                } else {
                    styleTagPresent.innerHTML = getInnerStyleHtml();
                }
            }
        },
        [bpm]
    );

    const removeStyleMoveMarker = useCallback(() => {
        const styleTagPresent = document.getElementById(MARKER_TIME_STYLE_ID);
        if (styleTagPresent) {
            styleTagPresent.remove();
        }
    }, []);

    const handleStart = useCallback(
        function () {
            const containerWidth = pianoRollContainerRef.current?.clientWidth;
            addStyleMoveMarker(containerWidth);
            // Tone.start();

            const marker = pianoRollMarkerRef.current;
            if (containerWidth && containerWidth > 0 && marker) {
                const row = rows.find((row) => row.key === currentRow);
                if (row) {
                    const octs = row.notes;
                    start(() => {
                        loop((i) => {
                            octs?.forEach((oct) => {
                                oct.forEach((noteLine) => {
                                    const beat = noteLine[i];
                                    if (beat.active && synthRef.current) {
                                        const synthOb = synthRef.current[currentRow]
                                        synthOb.synth.triggerAttackRelease(
                                            beat.note.note,
                                            "12n"
                                        );
                                    }
                                });
                            });
                        });
                    });

                    setIsPlaying(true);
                    console.log("Started...");
                }
            }
        },
        [addStyleMoveMarker, currentRow, loop, pianoRollContainerRef, pianoRollMarkerRef, rows, start, synthRef]
    );

    const handleStop = useCallback(
        function () {
            removeStyleMoveMarker();
            stop(true);
            setIsPlaying(false);
            console.log("Stoped...");
        },
        [removeStyleMoveMarker, stop]
    );

    function onKeySpace() {
        if (!isPlaying) {
            handleStart();
        } else {
            handleStop();
        }
    }

    return { handleStart, handleStop, isPlaying, setIsPlaying };
}

export default function PianoEditorMenu({
    setPopupActive,
    commonClasses,
}: {
    commonClasses: string;
    setPopupActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { handleStart, handleStop, isPlaying } = useMarkerControl();

    return (
        <div className={`flex-col ${commonClasses} h-0 top-0`}>
            <div className="absolute sm:pl-24 pl-16 w-full h-8  right-0 bg-gray-800">
                <div className="absolute z-20 top-0 right-0 flex mr-1 items-center h-full">
                    <button
                        className="p-1 sm:mt-0 mt-1"
                        onClick={() => setPopupActive(true)}
                    >
                        <CiMenuFries className="text-xl" />
                    </button>
                </div>
                <div className="absolute z-20 top-0 flex mr-1 items-center h-full">
                    {!isPlaying ? (
                        <button
                            className="p-1 sm:mt-0 mt-1"
                            onClick={handleStart}
                        >
                            <FaPlay />
                        </button>
                    ) : (
                        <button
                            className="p-1 sm:mt-0 mt-1"
                            onClick={handleStop}
                        >
                            <FaStop />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
