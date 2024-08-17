import { useContext } from "react";
import { IoPlay, IoStop } from "react-icons/io5";
import { AppContext } from "../context/AppContext";
import { Range } from "react-range";
import useControls from "../../hooks/useControls";
import RealTimeWaveForm from "../looper/waveforms/RealTimeWaveForm";

export default function Controls() {
    const { bpm, setBpm } = useContext(AppContext);
    const { isPlaying, handleStart, handleStop } = useControls();

    return (
        <>
            <div>
                <RealTimeWaveForm isPlaying={isPlaying} />
            </div>
            <div className="p-4 w-full justify-center flex">
                <div className="flex gap-4 items-center w-full max-w-[400px]">
                    <div className="flex gap-2 items-center w-full">
                        <label className="text-gray-300">
                            {bpm}
                            <span className="ml-1 text-sm">BPM</span>
                        </label>
                        <Range
                            disabled={isPlaying}
                            label="Select your value"
                            min={60}
                            max={240}
                            values={bpm}
                            onChange={(values) => setBpm(values)}
                            renderTrack={({ props, children }) => (
                                <div
                                    className="h-2 w-full bg-gray-700"
                                    {...props}
                                    style={props.style}
                                >
                                    {children}
                                </div>
                            )}
                            renderThumb={({ props }) => (
                                <div
                                    className="h-6 rounded-full bg-cyan-950 w-6 hover:bg-white transition ease-in-out duration-300"
                                    {...props}
                                    key={props.key}
                                    style={props.style}
                                />
                            )}
                        />
                    </div>
                    <div className="flex items-center">
                        {!isPlaying ? (
                            <button onClick={handleStart}>
                                <IoPlay className="text-3xl hover:opacity-50 transition ease-in-out duration-300" />
                            </button>
                        ) : (
                            <button onClick={handleStop}>
                                <IoStop className="text-3xl hover:opacity-50 transition ease-in-out duration-300" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
