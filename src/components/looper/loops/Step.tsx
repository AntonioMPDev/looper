import { useContext } from "react";
import { AppContext, Rows } from "../../context/AppContext";
import { FaSquare } from "react-icons/fa";
import useStep from "../../../hooks/useStep";

export default function Step({
    condition,
    step,
    rowIndex,
    stepSize,
}: {
    condition: boolean;
    step: Rows[0]["steps"][0];
    rowIndex: number;
    stepSize?: string;
}) {
    const { isPlaying } = useContext(AppContext);
    const { beatPosition, handleStepClick, getStepColor } = useStep(
        step,
        condition,
        rowIndex
    );

    return (
        <>
            {beatPosition === step.i && step.active && isPlaying ? (
                <div
                    className={`${stepSize} flex items-center justify-center rounded h-6`}
                >
                    <div className="">
                        <FaSquare className="border border-orange-400 bg-white opacity-70 rounded" />
                    </div>
                </div>
            ) : (
                <button
                    className={`${stepSize} w-[23%] flex items-center justify-center shadow rounded h-8 ${getStepColor()} p-1 hover:opacity-50 transition ease-in-out duration-300`}
                    onClick={() => handleStepClick()}
                ></button>
            )}
        </>
    );
}
