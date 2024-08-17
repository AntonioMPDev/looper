import { useCallback, useContext, useEffect, useRef } from "react";
import { interval, takeUntil, Subject, Subscription } from "rxjs";
import { AppContext } from "../components/context/AppContext";
import { getBeats } from "../utils/time";
import * as Tone from "tone";

let loopI = 0;

export default function useControls() {
    const stop$ = useRef(new Subject<void>()).current;
    const subscriptionRef = useRef<Subscription>();
    const { bpm, setIsPlaying, isPlaying, setBeatPosition, rows, playerRef } =
        useContext(AppContext);

    const start = useCallback(
        (cb?: (v: number) => void) => {
            if (isPlaying) return;
            setIsPlaying(true);

            const source$ = interval(getBeats(bpm[0]));
            const subscription = source$.pipe(takeUntil(stop$)).subscribe({
                next: (value) => {
                    if (cb) {
                        cb(value);
                    }
                },
                error: (err) => console.error("Error:", err),
                complete: () => {
                    console.log("Interval completed");
                    setIsPlaying(false);
                },
            });

            subscriptionRef.current = subscription;
        },
        [bpm, isPlaying, setIsPlaying, stop$]
    );

    const stop = useCallback(() => {
        loopI = 0;
        if (!isPlaying) return;
        setIsPlaying(false);

        stop$.next();
        stop$.complete();

        if (subscriptionRef.current) {
            subscriptionRef.current.unsubscribe();
        }
    }, [isPlaying, setIsPlaying, stop$]);

    const loop = useCallback((cb: (i: number) => void) => {
        cb(loopI);
        if (loopI < 15) {
            loopI += 1;
        } else {
            loopI = 0;
        }
    }, []);
    
    const handleStart = useCallback(
        function () {
            Tone.start();
            start(() => {
                loop((i) => {
                    setBeatPosition(i);
                    rows.forEach((row) => {
                        const beat = row.steps[i];
                        if (beat.active) {
                            const player =
                                playerRef.current &&
                                playerRef.current[row.key].player;
                            if (player && "start" in player) {
                                player.start();
                            }
                        }
                    });
                });
            });
        },
        [loop, playerRef, rows, setBeatPosition, start]
    );

    const handleStop = useCallback(() => {
        stop();
        setBeatPosition(0);
    }, [setBeatPosition, stop]);

    useEffect(() => {
        const fn = (e: KeyboardEvent) => {
            if (e.code === "Space") {
                if (!isPlaying) {
                    handleStart();
                } else {
                    handleStop();
                }
            }
        };
        document.addEventListener("keydown", fn);

        return () => {
            document.removeEventListener("keydown", fn);
        };
    }, [handleStart, handleStop, isPlaying]);

    useEffect(() => {
        return () => {
            stop$.next();
            stop$.complete();

            if (subscriptionRef.current) {
                subscriptionRef.current.unsubscribe();
            }
        };
    }, [stop$]);

    return { start, stop, isPlaying, loop, handleStart, handleStop };
}
