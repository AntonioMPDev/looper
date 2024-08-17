import { useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext';
import { DEFAUL_VOL, DEFAULT_PAN, rowType } from '../../constants';
import PopUp from './PopUp';
import RangeSlider from '../looper/ranges/RangeSlider';

export default function SynthPopUp() {
    const { currentRow, rows } = useContext(AppContext);
    const row = useMemo(() => {
        return rows.find((r) => r.key.toLowerCase() === currentRow);
    }, [currentRow, rows]);
    const Icon = row?.icon;
    const { isPianoEditor, setIsPianoEditor } = useContext(AppContext);

    if (row?.type === rowType.beat || isPianoEditor) {
        return null;
    }

    return (
        <div className={``}>
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
                                defaultValue={DEFAUL_VOL}
                                onValueRawChange={() => {}}
                            />
                            <div>Volume</div>
                        </div>
                        <div className="flex justify-center items-center gap-2">
                            <RangeSlider
                                min={-1}
                                max={1}
                                defaultValue={DEFAULT_PAN}
                                onValueRawChange={() => {}}
                            />
                            <div>Pan</div>
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        onClick={() => setIsPianoEditor(true)}
                        className="bg-cyan-900 p-4 w-full rounded"
                    >
                        Piano Roll
                    </button>
                </div>
            </PopUp>
        </div>
    );
}
