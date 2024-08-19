import { useCallback, useContext, useEffect } from "react";
import * as Tone from "tone";
import { AppContext } from "../components/context/AppContext";
import { audioFiles, DEFAUL_VOL } from "../constants";
import { Players, Synths } from "../interface";
import { getSettedEvents, removeEvents } from "../utils/events";

const synthsObs = [
    {
        synth: new Tone.Synth({
            envelope: {
                decay: 0.2,
                sustain: 0.5,
                release: 0.4,
            },
            oscillator: {
                type: "sawtooth",
            },
        }).toDestination(),
        key: "synthsaw",
    },
];

export default function useAppInitializer() {
    const { playerRef, synthRef, setIsLoading } = useContext(AppContext);

    function getPreparedPlayers() {
        const players: Players = {};
        audioFiles.forEach((file) => {
            const player = new Tone.Player(file.src).toDestination();
            player.set({
                volume: DEFAUL_VOL,
            });
            const panner = new Tone.Panner(0).toDestination();
            player.connect(panner);

            players[file.key] = {
                player,
                panner,
            };
        });
        return players;
    }

    function getPreparedSynths() {
        const synths: Synths = {};
        synthsObs.forEach((synthObj) => {
            synthObj.synth.set({
                volume: DEFAUL_VOL,
            });
            const panner = new Tone.Panner(0).toDestination();
            synthObj.synth.connect(panner);
            const synth = synthObj.synth;

            synths[synthObj.key] = {
                synth,
                panner,
            };
        });
        return synths;
    }

    function setKickConfiguration(playerKick: Players[0]) {
        if (playerKick) {
            playerKick.player.fadeOut = "12n";
        }
    }

    const preloadAndSetPlayers = useCallback(
        function () {
            const players = getPreparedPlayers();
            setKickConfiguration(players["kick"]);
            Tone.loaded().then(() => {
                playerRef.current = players;
            });
        },
        [playerRef]
    );

    const preloadAndSetSynths = useCallback(
        function () {
            const synths = getPreparedSynths();
            synthRef.current = synths;
        },
        [synthRef]
    );

    const initialize = useCallback(
        function () {
            Tone.start();
            preloadAndSetPlayers();
            preloadAndSetSynths();
        },
        [preloadAndSetPlayers, preloadAndSetSynths]
    );

    useEffect(() => {
        setIsLoading(false);

        const eventsList = getSettedEvents(() => {
            Tone.start();
            initialize();
            removeEvents(eventsList);
        });

        return () => {
            removeEvents(eventsList);
        };
    }, [initialize, setIsLoading]);

    return { initialize };
}
