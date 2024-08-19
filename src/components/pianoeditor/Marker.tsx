import { useContext } from "react";
import { RxTriangleDown } from "react-icons/rx";
import { PianoContext } from "../context/PianoEditorContext";
import { MARKER_TIME_ID } from "../../constants";

export default function Marker({ commonClasses }: { commonClasses: string }) {
    const { pianoRollContainerRef, pianoRollMarkerRef } =
        useContext(PianoContext);

    return (
        <div className={`flex-col ${commonClasses} h-full pointer-events-none`}>
            <div
                className="w-full h-full bg-gray-900 overflow-x-clip"
                ref={pianoRollContainerRef}
            >
                <div
                    className="w-px h-full bg-gray-300 relative z-20 left-0"
                    ref={pianoRollMarkerRef}
                    id={MARKER_TIME_ID}
                >
                    <RxTriangleDown className="absolute -top-6 -left-[14px] opacity-70 text-3xl" />
                </div>
            </div>
        </div>
    );
}
