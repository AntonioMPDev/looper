import { useId, useState } from "react";
import {
    KnobHeadless,
    KnobHeadlessLabel,
    KnobHeadlessOutput,
    useKnobKeyboardControls,
} from "react-knob-headless";
import { mapFrom01Linear, mapTo01Linear } from "@dsp-ts/math";
import { KnobBaseThumb } from "./KnobBaseThumb";
import { KnobBaseProps } from '../../interface';

export function KnobBase({
    theme,
    label,
    valueDefault,
    valueMin,
    valueMax,
    valueRawRoundFn,
    valueRawDisplayFn,
    orientation,
    stepFn,
    stepLargerFn,
    mapTo01 = mapTo01Linear,
    mapFrom01 = mapFrom01Linear,
    showOutput,
    onValueRawChange,
}: KnobBaseProps & {
    showOutput?: boolean;
    onValueRawChange?: (v: number) => void;
}) {
    const knobId = useId();
    const labelId = useId();
    const [valueRaw, setValueRaw] = useState<number>(valueDefault);
    const value01 = mapTo01(valueRaw, valueMin, valueMax);
    const step = stepFn(valueRaw);
    const stepLarger = stepLargerFn(valueRaw);
    const dragSensitivity = 0.006;

    const keyboardControlHandlers = useKnobKeyboardControls({
        valueRaw,
        valueMin,
        valueMax,
        step,
        stepLarger,
        onValueRawChange: setValueRaw,
    });

    return (
        <div
            className={
                "bg-gray-600 relative shadow-md w-6 h-6 rounded-full flex flex-col gap-0.5 justify-center items-center text-xs select-none knob-wrapper"
            }
        >
            <KnobHeadlessLabel id={labelId}>{label}</KnobHeadlessLabel>
            <KnobHeadless
                id={knobId}
                aria-labelledby={labelId}
                className="relative w-16 h-16 outline-none"
                valueMin={valueMin}
                valueMax={valueMax}
                valueRaw={valueRaw}
                valueRawRoundFn={valueRawRoundFn}
                valueRawDisplayFn={valueRawDisplayFn}
                dragSensitivity={dragSensitivity}
                orientation={orientation}
                mapTo01={mapTo01}
                mapFrom01={mapFrom01}
                onValueRawChange={(v) => {
                    if (onValueRawChange) {
                        onValueRawChange(v);
                    }
                    setValueRaw(v);
                }}
                {...keyboardControlHandlers}
            >
                <KnobBaseThumb theme={theme} value01={value01} />
            </KnobHeadless>
            {showOutput && (
                <KnobHeadlessOutput className='absolute top-8 values-knob-view' htmlFor={knobId}>
                    {valueRawDisplayFn(valueRaw)}
                </KnobHeadlessOutput>
            )}
        </div>
    );
}
