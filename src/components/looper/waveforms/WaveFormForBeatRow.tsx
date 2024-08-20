import useWaveFormForBeatRow from '../../../hooks/useWaveFormForBeatRow';

export default function WaveFormForBeatRow() {
    const { isReady, containerRef, commonGrabberStyle, wrapper, grabberRef } =
        useWaveFormForBeatRow();
    return (
        <div className="mt-2">
            <div className="relative cursor-pointer">
                <div
                    className={`${
                        !isReady ? "hidden" : ""
                    } w-full bg-black hover:opacity-80 cursor-pointer`}
                    ref={containerRef}
                />
                <div style={wrapper} ref={grabberRef}>
                    <span
                        className="grabber1"
                        style={{ ...commonGrabberStyle, top: 0, left: 0 }}
                    ></span>
                    <span
                        className="grabber2"
                        style={{ ...commonGrabberStyle, top: 0, right: 0 }}
                    ></span>
                    <span
                        className="grabber3"
                        style={{ ...commonGrabberStyle, bottom: 0, left: 0 }}
                    ></span>
                    <span
                        className="grabber4"
                        style={{ ...commonGrabberStyle, bottom: 0, right: 0 }}
                    ></span>
                </div>
            </div>
            <div>
                <div className="text-xs mt-2 text-gray-400">
                    Click and drag to add a region
                </div>
            </div>
        </div>
    );
}
