import * as Tone from "tone";
import { Player, Panner, Synth } from "tone";
import { KnobHeadless } from "react-knob-headless";
import { KnobBaseThumb } from "./components/looper/knob/KnobBaseThumb";
import { KnobBase } from "./components/looper/knob/KnobBase";

export interface Players {
    [key: string]: { player: Tone.Player; panner: Tone.Panner };
}

export interface Synths {
    [key: string]: { synth: Tone.Synth; panner: Tone.Panner };
}

export type PlayerRef = React.MutableRefObject<
    | {
          [key: string]: {
              player: Player;
              panner: Panner;
          };
      }
    | undefined
>;

export type SynthRef = React.MutableRefObject<
    | {
          [key: string]: {
              synth: Synth<Tone.SynthOptions>;
              panner: Panner;
          };
      }
    | undefined
>;
export type KnobHeadlessProps = React.ComponentProps<typeof KnobHeadless>;
export type KnobBaseThumbProps = React.ComponentProps<typeof KnobBaseThumb>;
export type KnobBaseProps = Pick<
    KnobHeadlessProps,
    | "valueMin"
    | "valueMax"
    | "valueRawRoundFn"
    | "valueRawDisplayFn"
    | "orientation"
    | "mapTo01"
    | "mapFrom01"
> &
    Pick<KnobBaseThumbProps, "theme"> & {
        readonly label: string;
        readonly valueDefault: number;
        readonly stepFn: (valueRaw: number) => number;
        readonly stepLargerFn: (valueRaw: number) => number;
    };

export type KnobProps = {
    min: number;
    max: number;
    defaultValue?: number;
    valueRawFn?: (valueRaw: number) => string;
    onValueRawChange?: (v: number) => void;
};
type KnobBasePropsKnob = React.ComponentProps<typeof KnobBase>;
export type KnobPercentageProps = Pick<
    KnobBasePropsKnob,
    "theme" | "label" | "orientation"
>;
