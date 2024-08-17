import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext, Rows } from "../components/context/AppContext";

export default function useBeatRow(rowItem: Rows[0]) {
    const [mute, setMute] = useState(false);
    const Icon = rowItem.icon ?? null;
    const { playerRef, setModalOpen, setCurrrentRow } = useContext(AppContext);

    useEffect(() => {
        if (playerRef.current && playerRef.current[rowItem.key]) {
            const playerObj = playerRef.current[rowItem.key];
            if (mute) {
                playerObj.player.mute = true;
            } else {
                playerObj.player.mute = false;
            }
        }
    }, [mute, playerRef, rowItem.key]);

    const handleRowDetailsView = useCallback(() => {
        setCurrrentRow(rowItem.key);
        setModalOpen({ type: "ROW_OPEN", open: true });
    }, [rowItem.key, setCurrrentRow, setModalOpen]);

    return { handleRowDetailsView, setMute, Icon, mute };
}
