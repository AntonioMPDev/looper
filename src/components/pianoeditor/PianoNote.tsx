import { PropsWithoutRef, useContext } from "react";
import useLongPressKeyOnElement from "../../hooks/pianoeditor/useLongPressKeyOnElement";
import { PianoContext } from "../context/PianoEditorContext";

export default function PianoNote(
    props: PropsWithoutRef<{
        note: string;
        className: string;
        bg: string;
    }>
) {
    const {
        handleMouseDown,
        handleMouseUp,
        handleOnMouseLeave,
        handleOnMouseEnter,
        handleTouchStart,
        handleTouchEnd,
        handleTouchCancel,
    } = useLongPressKeyOnElement(props.note);
    const { pianoNotesData } = useContext(PianoContext);

    const customProps = {
        ...props,
        onMouseDown: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
            handleMouseDown(e),
        onTouchStart: (e: React.TouchEvent<HTMLDivElement>) =>
            handleTouchStart(e),
        onTouchEnd: (e: React.TouchEvent<HTMLDivElement>) => handleTouchEnd(e),
        onTouchCancel: (e: React.TouchEvent<HTMLDivElement>) =>
            handleTouchCancel(e),
        onMouseUp: () => handleMouseUp(),
        onMouseLeave: () => handleOnMouseLeave(),
        onMouseEnter: () => handleOnMouseEnter(),
        className:
            props.className +
            ` ${
                pianoNotesData[props.note] &&
                pianoNotesData[props.note].isHolding
                    ? "bg-gray-important"
                    : props.bg
            }` +
            " flex items-end justify-end no-text-select",
    };

    return (
        <div
            datatype="note"
            {...customProps}
            onContextMenu={(e) => e.preventDefault()}
        >
            <div
                onContextMenu={(e) => e.preventDefault()}
                className="text-xs text-gray-400 pr-1 break-words text-right pointer-events-none no-text-select"
            >
                {props.note}
            </div>
        </div>
    );
}
