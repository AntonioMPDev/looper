import { useEffect, useRef } from "react";
import * as Tone from "tone";

export default function RealTimeWaveForm({
    isPlaying,
}: {
    isPlaying: boolean;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const analyserRef = useRef<Tone.Analyser | null>(null);
    const animationFrameIdRef = useRef<number | null>(null);

    useEffect(() => {
        // Create an analyser node and connect it to the master output
        analyserRef.current = new Tone.Analyser("waveform", 1024);
        Tone.getDestination().connect(analyserRef.current);

        const canvas = canvasRef.current;
        const drawWaveform = () => {
            if (canvas) {
                const ctx = canvas.getContext("2d");
                const { width, height } = canvas;
                if (analyserRef.current && ctx) {
                    const values = analyserRef.current.getValue();

                    ctx.clearRect(0, 0, width, height);
                    ctx.beginPath();
                    const sliceWidth = width / values.length;
                    let x = 0;

                    for (let i = 0; i < values.length; i++) {
                        const v = ((values[i] as number) + 1) / 2; // normalize to 0-1 range
                        const y = v * height;

                        if (i === 0) {
                            ctx.moveTo(x, y);
                        } else {
                            ctx.lineTo(x, y);
                        }

                        x += sliceWidth;
                    }

                    ctx.strokeStyle = "#7fa3b0";

                    ctx.lineTo(canvas.width, canvas.height / 2);
                    ctx.stroke();

                    if (isPlaying) {
                        animationFrameIdRef.current =
                            requestAnimationFrame(drawWaveform);
                    }
                }
            }
        };

        const drawInitialForm = () => {
            if (canvas) {
                const ctx = canvas.getContext("2d")!;
                const { width, height } = canvas;
                const middleY = height / 2;

                // Draw a horizontal line in the middle
                ctx.beginPath();
                ctx.moveTo(0, middleY);
                ctx.lineTo(width, middleY);
                ctx.strokeStyle = "#7fa3b0";

                ctx.stroke();
            }
        };

        if (isPlaying) {
            drawWaveform();
        } else {
            drawInitialForm();
        }

        return () => {
            if (animationFrameIdRef.current) {
                cancelAnimationFrame(animationFrameIdRef.current);
            }
        };
    }, [isPlaying]);

    return (
        <canvas
            ref={canvasRef}
            width="800"
            height="200"
            className="w-full hover:opacity-80 cursor-pointer"
        />
    );
}
