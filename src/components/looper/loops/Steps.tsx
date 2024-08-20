import { Rows } from "../../context/AppContext";
import useSteps from "../../../hooks/useSteps";
import Step from "./Step";
import { useMemo } from "react";

export default function Steps({
    rowItem,
    rowIndex,
    MakersTime,
}: {
    rowItem: Rows[0];
    rowIndex: number;
    MakersTime: ({
        isLineal,
    }: {
        isLineal?: boolean | undefined;
    }) => JSX.Element;
}) {
    const { groupOfFour } = useSteps();
    const stepSize = "md:w-[5.5%] sm:w-[11%] w-[23%]";
    const { getFlag } = useMemo(() => groupOfFour(), [groupOfFour]);

    return (
        <div className="w-[75%]">
            <MakersTime />
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
