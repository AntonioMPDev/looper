import { Rows } from "../../context/AppContext";
import useSteps from "../../../hooks/useSteps";
import Step from "./Step";
import { useMemo } from "react";

export default function Steps({
    rowItem,
    rowIndex,
}: {
    rowItem: Rows[0];
    rowIndex: number;
}) {
    const { getMarkerColorCssClasses, groupOfFour } = useSteps();
    const stepSize = "md:w-[5.5%] sm:w-[11%] w-[23%]";
    const { getFlag } = useMemo(() => groupOfFour(), [groupOfFour]);

    return (
        <div className="w-[75%]">
            <div className="flex flex-wrap gap-1 w-full sm:mb-0 mb-1">
                {rowItem.steps.map((_, i) => (
                    <span key={i} className={`${stepSize} flex px-[3px] mb-1`}>
                        <span
                            className={`${getMarkerColorCssClasses(
                                i
                            )} w-full h-px`}
                        ></span>
                    </span>
                ))}
            </div>
            <div className="flex flex-wrap gap-1 w-full">
                {rowItem.steps.map((step, i) => (
                    <Step
                        key={i}
                        condition={getFlag()}
                        step={step}
                        rowIndex={rowIndex}
                        stepSize={stepSize}
                    />
                ))}
            </div>
        </div>
    );
}
