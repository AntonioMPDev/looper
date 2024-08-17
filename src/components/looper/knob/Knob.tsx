import { KnobPercentageProps, KnobProps } from "../../interface";
import { KnobBase } from "./KnobBase";

export function Knob(props: KnobPercentageProps & KnobProps) {
    return (
        <KnobBase
            valueDefault={props.defaultValue ?? valueDefault}
            valueMin={props.min ? props.min : valueMin}
            valueMax={props.max ? props.max : valueMax}
            stepFn={stepFn}
            stepLargerFn={stepLargerFn}
            valueRawRoundFn={valueRawRoundFn}
            valueRawDisplayFn={props.valueRawFn ?? valueRawDisplayFn}
            showOutput={true}
            {...props}
        />
    );
}

const valueMin = 0;
const valueMax = 100;
const valueDefault = 50;
const stepFn = (): number => 1;
const stepLargerFn = (): number => 10;
const valueRawRoundFn = Math.round;
const valueRawDisplayFn = (valueRaw: number): string =>
    `${valueRawRoundFn(valueRaw)}`;

