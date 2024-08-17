import { useCallback, useContext, useEffect } from "react";
import * as Tone from "tone";
import { AppContext } from "../components/context/AppContext";
import { audioFiles, DEFAUL_VOL } from "../constants";
import { Players } from "../interface";
import { getSettedEvents, removeEvents } from '../utils/events';

export default function useAppInitializer() {
    const { playerRef, setIsLoading } = useContext(AppContext);

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

    const initialize = useCallback(
        function () {
            Tone.start();
            preloadAndSetPlayers();
        },
        [preloadAndSetPlayers]
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
