import { AppContext } from "../../context/AppContext";
import { useContext } from "react";
import useSteps from "../../../hooks/useSteps";

export default function MakersTime({ isLineal }: { isLineal?: boolean }) {
    const { rows } = useContext(AppContext);
    const { getMarkerColorCssClasses } = useSteps();

    const stepSize = "md:w-[5.5%] sm:w-[11%] w-[23%]";

    return (
        <div
            className={`flex ${
                !isLineal ? "flex-wrap" : ""
            } gap-1 w-full sm:mb-0 mb-1`}
        >
            {rows[0].steps.map((_, i) => (
                <span
                    key={i}
                    className={`${stepSize} flex ${
                        !isLineal ? "px-[3px]" : ""
                    } mb-1`}
                >
                    <span
                        className={`${getMarkerColorCssClasses(i)} w-full h-px`}
                    ></span>
                </span>
            ))}
        </div>
    );
}
