import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AppContext } from "../context/AppContext";
import { DEFAUL_VOL, DEFAULT_PAN, rowType } from "../../constants";
import PopUp from "./PopUp";
import VolPanControls from "../controls/VolPanControls";
import { SynthRef } from "../../interface";

function useSynthPopUp() {
    const { synthRef, currentRow } = useContext(AppContext);

    const getDefaultValues = useCallback(function (
        synthRef: SynthRef,
        defaultValue: number
    ) {
        const defaultValues: Record<string, number> = {};
        Object.entries(synthRef.current ?? {}).forEach((item) => {
            defaultValues[item[0]] = defaultValue;
        });

        return defaultValues;
    },
    []);

    const [volume, setVolume] = useState(
        getDefaultValues(synthRef, DEFAUL_VOL)
    );
    const [pan, setPan] = useState(getDefaultValues(synthRef, DEFAULT_PAN));

    function handleVolume(v: number) {
        setVolume({ ...volume, [currentRow]: v });
        return v;
    }

    function handlePan(v: number) {
        setPan({ ...pan, [currentRow]: v });
        return v;
    }

    useEffect(() => {
        if (synthRef.current && synthRef.current[currentRow]) {
            const playerObj = synthRef.current[currentRow];
            playerObj.synth.set({
                volume: volume[currentRow] ?? DEFAUL_VOL,
            });
            playerObj.panner.pan.value = pan[currentRow] ?? DEFAULT_PAN;
        }
    }, [currentRow, pan, synthRef, volume]);

    return { handleVolume, handlePan, volume, pan };
}

export default function SynthPopUp() {
    const { currentRow, rows } = useContext(AppContext);
    const row = useMemo(() => {
        return rows.find((r) => r.key.toLowerCase() === currentRow);
    }, [currentRow, rows]);
    const Icon = row?.icon;
    const { isPianoEditor, setIsPianoEditor } = useContext(AppContext);
    const { handleVolume, volume, handlePan, pan } = useSynthPopUp();

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
                <VolPanControls
                    defaulVoltValue={volume[currentRow] ?? DEFAUL_VOL}
                    onValueRawVolChange={handleVolume}
                    defaulPanValue={pan[currentRow] ?? DEFAULT_PAN}
                    onValueRawPanChange={handlePan}
                />
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
