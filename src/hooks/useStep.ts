import { useCallback, useContext, useMemo, useState } from "react";
import { AppContext, Rows } from "../components/context/AppContext";
import { rowType } from "../constants";

export default function useStep(
    step: Rows[0]["steps"][0],
    condition: boolean,
    rowIndex: number
) {
    const [active, setActive] = useState(step.active);
    const { rows, setRows, beatPosition, setIsPianoEditor, setCurrrentRow } =
        useContext(AppContext);

    const bg = useMemo(
        () => (condition ? "bg-cyan-950" : "bg-cyan-900"),
        [condition]
    );

    const handleStepClick = useCallback(
        function () {
            const newStepActive = !active;
            const rowsCopy = [...rows];
            const row = rowsCopy[rowIndex];
            if (row.type !== rowType.synth) {
                const stepsOfCurrentRow = row.steps;
                const currentStep = stepsOfCurrentRow[step.i];
                currentStep.active = newStepActive;

                setActive(newStepActive);
                setRows(rowsCopy);
            } else {
                setCurrrentRow(row.key);
                setIsPianoEditor(true);
            }
        },
        [active, rowIndex, rows, setCurrrentRow, setIsPianoEditor, setRows, step.i]
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
