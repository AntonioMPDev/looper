export default function WaveFormForBeatRow({
    handleCanvasClick,
    canvasRef,
}: {
    handleCanvasClick: () => void;
    canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
}) {
    return (
        <div className="mt-2">
            <canvas
                onClick={handleCanvasClick}
                ref={canvasRef}
                id="waveformCanvas"
                width="600"
                height="200"
                className="rounded-xl w-full bg-black hover:opacity-80 cursor-pointer"
            ></canvas>
        </div>
    );
}