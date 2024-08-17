import { useContext } from 'react';
import useBeatRows from '../../hooks/useBeatRows';
import { AppContext } from '../context/AppContext';
import { DEFAUL_VOL, DEFAULT_PAN, rowType } from '../../constants';
import PopUp from './PopUp';
import RangeSlider from '../looper/ranges/RangeSlider';
import WaveFormForBeatRow from '../looper/waveforms/WaveFormForBeatRow';


export default function BeatPopUp() {
    const {
        showDetails,
        Icon,
        row,
        volume,
        handleVolume,
        handlePan,
        pan,
        handleCanvasClick,
        canvasRef,
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
                <div className={`flex items-center gap-2 py-4 pb-8`}>
                    <div className="flex gap-4">
                        <div className="flex justify-center items-center gap-2">
                            <RangeSlider
                                min={-60}
                                max={-1}
                                defaultValue={volume[currentRow] ?? DEFAUL_VOL}
                                onValueRawChange={handleVolume}
                            />
                            <div>Volume</div>
                        </div>
                        <div className="flex justify-center items-center gap-2">
                            <RangeSlider
                                min={-1}
                                max={1}
                                defaultValue={pan[currentRow] ?? DEFAULT_PAN}
                                onValueRawChange={handlePan}
                            />
                            <div>Pan</div>
                        </div>
                    </div>
                </div>
                <WaveFormForBeatRow
                    handleCanvasClick={handleCanvasClick}
                    canvasRef={canvasRef}
                />
            </PopUp>
        </div>
    );
}
