import { useContext } from "react";
import useBeatRows from "../../hooks/useBeatRows";
import { AppContext } from "../context/AppContext";
import { DEFAUL_VOL, DEFAULT_PAN, rowType } from "../../constants";
import PopUp from "./PopUp";
import WaveFormForBeatRow from "../looper/waveforms/WaveFormForBeatRow";
import VolPanControls from "../controls/VolPanControls";

export default function BeatPopUp() {
    const {
        showDetails,
        Icon,
        row,
        volume,
        handleVolume,
        handlePan,
        pan,
    } = useBeatRows();
    const { currentRow } = useContext(AppContext);

    if (row?.type === rowType.synth) {
        return null;
    }

    return (
        <div className={`${!showDetails ? "hidden" : ""}`}>
            <PopUp>
                <div className="flex items-center gap-2 text-xl pb-2">
                    <div>{Icon ? <Icon /> : null}</div>
                    <div>{row?.label}</div>
                </div>
                <VolPanControls
                    defaulVoltValue={volume[currentRow] ?? DEFAUL_VOL}
                    onValueRawVolChange={handleVolume}
                    defaulPanValue={pan[currentRow] ?? DEFAULT_PAN}
                    onValueRawPanChange={handlePan}
                />
                <WaveFormForBeatRow />
            </PopUp>
        </div>
    );
}
