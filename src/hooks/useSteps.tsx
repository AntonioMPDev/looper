import { AppContext } from "../components/context/AppContext";
import { useCallback, useContext } from "react";

export default function useSteps() {
    const { beatPosition } = useContext(AppContext);

    const groupOfFour = useCallback(function groupOfFour() {
        let position = 0;
        let flag = false;

        function getFlag() {
            if (position === 4) {
                flag = !flag;
                position = 0;
            }
            position += 1;

            return flag;
        }

        return { getFlag };
    }, []);

    const getMarkerColorCssClasses = useCallback(
        function (i: number) {
            const isCurrentStep = beatPosition === i;
            const markerColor = isCurrentStep
                ? "bg-red-300 opacity-70"
                : "bg-gray-600";

            return markerColor;
        },
        [beatPosition]
    );

    return { getMarkerColorCssClasses, groupOfFour };
}
