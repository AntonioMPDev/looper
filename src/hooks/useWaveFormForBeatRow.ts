import { useContext, useEffect, useMemo, useRef } from "react";
import { audioFiles } from "../constants";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.esm.js";
import { useWavesurfer } from "@wavesurfer/react";
import { AppContext } from "../components/context/AppContext";

export default function useWaveFormForBeatRow() {
    const { currentRow, playerRef, region, setRegion } = useContext(AppContext);
    const containerRef = useRef(null);
    const grabberRef = useRef(null);

    const regions = useMemo(() => {
        return RegionsPlugin.create();
    }, []);

    const { isReady } = useWavesurfer({
        container: containerRef,
        height: 100,
        waveColor: "rgba(130, 130, 130)",
        progressColor: "rgb(130, 130, 130, 0.5)",
        url: `/${audioFiles.find((i) => i.key === currentRow)?.src}`,
        plugins: useMemo(() => [regions], [regions]),
        normalize: true
    });

    useEffect(() => {
        if (isReady) {
            regions.enableDragSelection({
                color: "rgba(255, 0, 0, 0.1)",
            });

            const defaultRegion = region[currentRow];
            if (defaultRegion && grabberRef.current) {
                regions.addRegion({
                    start: defaultRegion.startAt,
                    end: defaultRegion.endsAt,
                    color: "rgba(22, 78, 99, 0.2)",
                    content: grabberRef.current!,
                    drag: false,
                    resize: true,
                });
            } else {
                const player =
                    playerRef.current && playerRef.current[currentRow].player;
                regions.addRegion({
                    start: 0,
                    end: player?.buffer.duration,
                    color: "rgba(22, 78, 99, 0.2)",
                    content: grabberRef.current!,
                    drag: false,
                    resize: true,
                });
            }

            regions.on("region-updated", (r) => {
                setRegion({
                    ...region,
                    [currentRow]: {
                        startAt: r.start,
                        endsAt: r.end,
                    },
                });
            });

            regions.on("region-clicked", (region, e) => {
                e.stopPropagation();
                const player =
                    playerRef.current && playerRef.current[currentRow].player;

                player?.start(0, region.start, region.end);
            });
        }

        return () => {
            if (regions) {
                regions.clearRegions();
                regions.unAll();
            }
        };
    }, [currentRow, isReady, playerRef, region, regions, setRegion]);

    const commonGrabberStyle: React.CSSProperties = {
        position: "absolute",
        width: "2px",
        height: "2px",
        border: "1px solid",
        cursor: "pointer"
    };

    const wrapper: React.CSSProperties = {
        width: "100%",
        height: "100%",
        position: "relative",
    };
    return { commonGrabberStyle, wrapper, isReady, containerRef, grabberRef };
}
