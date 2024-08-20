import { useCallback, useContext, useEffect, useRef } from "react";
import { interval, takeUntil, Subject, Subscription } from "rxjs";
import { AppContext } from "../components/context/AppContext";
import { getBeats } from "../utils/time";
import * as Tone from "tone";
import { rowType } from "../constants";

let loopI = 0;

export default function useControls(
    isPlayingLocal?: boolean,
    setIsPlayingLocal?: React.Dispatch<React.SetStateAction<boolean>>,
    onKeySpace?: () => void
) {
    const stop$ = useRef(new Subject<void>()).current;
    const subscriptionRef = useRef<Subscription>();
    const {
        bpm,
        setIsPlaying,
        isPlaying,
        setBeatPosition,
        rows,
        playerRef,
        synthRef,
        isPianoEditor,
        region,
    } = useContext(AppContext);

    const start = useCallback(
        (cb?: (v: number) => void) => {
            if (isPlaying || isPlayingLocal) return;

            if (!setIsPlayingLocal) {
                setIsPlaying(true);
            } else {
                setIsPlayingLocal(true);
            }

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
                    if (!setIsPlayingLocal) {
                        setIsPlaying(false);
                    } else {
                        setIsPlayingLocal(false);
                    }
                },
            });

            subscriptionRef.current = subscription;
        },
        [bpm, isPlaying, isPlayingLocal, setIsPlaying, setIsPlayingLocal, stop$]
    );

    const stop = useCallback(
        (isPlayingLocal?: boolean) => {
            loopI = 0;

            if (!isPlaying && !isPlayingLocal) return;

            if (!setIsPlayingLocal) {
                setIsPlaying(false);
            } else {
                setIsPlayingLocal(false);
            }

            stop$.next();
            stop$.complete();

            if (subscriptionRef.current) {
                subscriptionRef.current.unsubscribe();
            }
        },
        [isPlaying, setIsPlaying, setIsPlayingLocal, stop$]
    );

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
                        if (beat.active && row.type === rowType.beat) {
                            const player =
                                playerRef.current &&
                                playerRef.current[row.key].player;
                            const regionRow = region[row.key];
                            if (player && "start" in player) {
                                if (regionRow) {
                                    player.start(
                                        0,
                                        regionRow.startAt,
                                        regionRow.endsAt
                                    );
                                } else {
                                    player.start();
                                }
                            }
                        }

                        if (row.type === rowType.synth) {
                            const octs = row.notes;
                            octs?.forEach((oct) => {
                                oct.forEach((noteLine) => {
                                    const beat = noteLine[i];
                                    if (beat.active && synthRef.current) {
                                        const synthObj =
                                            synthRef.current[row.key];

                                        synthObj.synth.triggerAttackRelease(
                                            beat.note.note,
                                            "12n"
                                        );
                                    }
                                });
                            });
                        }
                    });
                });
            });
        },
        [loop, playerRef, rows, setBeatPosition, start, synthRef]
    );

    const handleStop = useCallback(() => {
        stop();
        setBeatPosition(0);
    }, [setBeatPosition, stop]);

    const addEventListenerForSpace = useCallback((cb: () => void) => {
        const fn = (e: KeyboardEvent) => {
            if (e.code === "Space") {
                cb();
            }
        };
        document.addEventListener("keydown", fn);

        return fn;
    }, []);

    const removeEventListenerForSpace = useCallback(
        (fn: (e: KeyboardEvent) => void) => {
            document.removeEventListener("keydown", fn);
        },
        []
    );

    useEffect(() => {
        const fn = addEventListenerForSpace(() => {
            if (isPianoEditor && onKeySpace) {
                onKeySpace();
            } else {
                if (!isPlaying) {
                    handleStart();
                } else {
                    handleStop();
                }
            }
        });

        return () => {
            removeEventListenerForSpace(fn);
        };
    }, [
        addEventListenerForSpace,
        handleStart,
        handleStop,
        isPianoEditor,
        isPlaying,
        onKeySpace,
        removeEventListenerForSpace,
    ]);

    useEffect(() => {
        return () => {
            stop$.next();
            stop$.complete();

            if (subscriptionRef.current) {
                subscriptionRef.current.unsubscribe();
            }
        };
    }, [stop$]);

    return {
        start,
        stop,
        isPlaying,
        loop,
        handleStart,
        handleStop,
        addEventListenerForSpace,
        removeEventListenerForSpace,
    };
}
