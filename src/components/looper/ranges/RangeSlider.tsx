import { KnobPercentageProps, KnobProps } from "../../../interface";
import { Knob } from "../knob/Knob";

export default function RangeSlider(
    props: Partial<KnobPercentageProps> & KnobProps
) {
    return <Knob {...props} label="" theme="stone" />;
}
