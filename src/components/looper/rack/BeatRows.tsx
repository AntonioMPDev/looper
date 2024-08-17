import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import BeatRow from "./BeatRow";
import BeatPopUp from '../../modals/BeatPopUp';
import SynthPopUp from '../../modals/SynthPopUp';

export default function BeatRows() {
    const { rows } = useContext(AppContext);

    return (
        <>
            {rows.map((rowItem, rowIndex) => (
                <BeatRow
                    key={rowItem.key}
                    rowItem={rowItem}
                    rowIndex={rowIndex}
                />
            ))}
            <BeatPopUp />
            <SynthPopUp />
        </>
    );
}
 