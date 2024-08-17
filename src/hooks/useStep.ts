import { useCallback, useContext, useMemo, useState } from "react";
import { AppContext, Rows } from "../components/context/AppContext";

export default function useStep(
    step: Rows[0]["steps"][0],
    condition: boolean,
    rowIndex: number
) {
    const [active, setActive] = useState(step.active);
    const { rows, setRows, beatPosition } = useContext(AppContext);

    const bg = useMemo(
        () => (condition ? "bg-cyan-950" : "bg-cyan-900"),
        [condition]
    );

    const handleStepClick = useCallback(
        function () {
            const newStepActive = !active;
            const rowsCopy = [...rows];
            const stepsOfCurrentRow = rowsCopy[rowIndex].steps;
            const currentStep = stepsOfCurrentRow[step.i];
            currentStep.active = newStepActive;

            setActive(newStepActive);
            setRows(rowsCopy);
        },
        [active, rowIndex, rows, setRows, step.i]
    );

    const getStepColor = useCallback(
        function () {
            return active
                ? condition
                    ? "stepHightLightOrange"
                    : "stepHightLightWhite"
                : bg;
        },
        [active, bg, condition]
    );

    return { handleStepClick, getStepColor, beatPosition };
}
