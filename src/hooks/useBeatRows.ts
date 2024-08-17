import {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { AppContext } from "../components/context/AppContext";
import { DEFAULT_PAN, DEFAUL_VOL } from "../constants";
import { PlayerRef } from "../interface";

export default function useBeatRows() {
    const { playerRef, modalOpen, rows, currentRow } = useContext(AppContext);
    const canvasRef = useRef<null | HTMLCanvasElement>(null);
    const [showDetails, setShowDetails] = useState(false);
    const getDefaultValues = useCallback(function getDefaultValues(
        playerRef: PlayerRef,
        defaultValue: number
    ) {
        const defaultValues: Record<string, number> = {};
        Object.entries(playerRef.current ?? {}).forEach((item) => {
            defaultValues[item[0]] = defaultValue;
        });

        return defaultValues;
    },
    []);
    const [volume, setVolume] = useState(
        getDefaultValues(playerRef, DEFAUL_VOL)
    );
    const [pan, setPan] = useState(getDefaultValues(playerRef, DEFAULT_PAN));
    const row = useMemo(() => {
        return rows.find((r) => r.key.toLowerCase() === currentRow);
    }, [currentRow, rows]);
    const Icon = row?.icon;

    const drawWaveform = useCallback(
        function () {
            const canvas = canvasRef.current;
            if (canvas && playerRef.current && playerRef.current[currentRow]) {
                const player = playerRef.current[currentRow].player;

                const ctx = canvas.getContext("2d");
                if (ctx) {
                    const channelData = player.buffer.getChannelData(0);
                    // Downsample for performance
                    const samples = 1000;
                    const blockSize = Math.floor(channelData.length / samples);
                    const waveformValues = new Float32Array(samples);

                    for (let i = 0; i < samples; i++) {
                        waveformValues[i] = channelData[i * blockSize];
                    }

                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.beginPath();
                    ctx.moveTo(0, canvas.height / 2);

                    for (let i = 0; i < waveformValues.length; i++) {
                        const x = (i / waveformValues.length) * canvas.width;
                        const y = ((1 + waveformValues[i]) * canvas.height) / 2;
                        ctx.lineTo(x, y);
                    }

                    ctx.strokeStyle = "#7fa3b0";
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }

                setShowDetails(true);
            }
        },
        [currentRow, playerRef]
    );

    useEffect(() => {
        if (modalOpen.open && modalOpen.type === "ROW_OPEN") {
            drawWaveform();
        }

        if (playerRef.current && playerRef.current[currentRow]) {
            const playerObj = playerRef.current[currentRow];
            playerObj.player.set({
                volume: volume[currentRow] ?? DEFAUL_VOL,
            });
            playerObj.panner.pan.value = pan[currentRow] ?? DEFAULT_PAN;
        }
    }, [currentRow, drawWaveform, modalOpen, pan, playerRef, volume]);

    function handleCanvasClick() {
        if (playerRef.current) {
            const player = playerRef.current[currentRow].player;
            player.start();
        }
    }

    function handleVolume(v: number) {
        setVolume({ ...volume, [currentRow]: v });
        return v;
    }

    function handlePan(v: number) {
        setPan({ ...pan, [currentRow]: v });
        return v;
    }

    return {
        handlePan,
        handleCanvasClick,
        handleVolume,
        Icon,
        showDetails,
        row,
        volume,
        pan,
        canvasRef,
    };
}
