import { createContext, useRef, useState } from "react";
import React from "react";
import { Player, Panner } from "tone";
import { IconType } from "react-icons";
import { rowsData } from "./initial";

export type Rows = {
    type: "SYNTH" | "BEAT";
    label: string;
    key: string;
    icon: IconType;
    steps: {
        note: string;
        active: boolean;
        context: unknown;
        i: number;
    }[];
    notes?: {
        note: {
            note: string;
        };
        active: boolean;
        context: unknown;
        i: number;
    }[][][][];
}[];

type ModalType = "ROW_OPEN";

// Create a context with a default value
export const AppContext = createContext<{
    rows: Rows;
    setRows: React.Dispatch<React.SetStateAction<Rows>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    playerRef: React.MutableRefObject<
        { [key: string]: { player: Player; panner: Panner } } | undefined
    >;
    bpm: number[];
    setBpm: React.Dispatch<React.SetStateAction<number[]>>;
    beatPosition: number;
    setBeatPosition: React.Dispatch<React.SetStateAction<number>>;
    isPlaying: boolean;
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    modalOpen: { open: boolean; type: ModalType };
    setModalOpen: React.Dispatch<
        React.SetStateAction<{ open: boolean; type: ModalType }>
    >;
    currentRow: string;
    setCurrrentRow: React.Dispatch<React.SetStateAction<string>>;
    isPianoEditor: boolean;
    setIsPianoEditor: React.Dispatch<React.SetStateAction<boolean>>;
}>({
    rows: [],
    setRows: () => {},
    isLoading: true,
    setIsLoading: () => {},
    playerRef: {} as React.MutableRefObject<
        { [key: string]: { player: Player; panner: Panner } } | undefined
    >,
    bpm: [120],
    setBpm: () => {},
    beatPosition: 120,
    setBeatPosition: () => {},
    isPlaying: false,
    setIsPlaying: () => {},
    modalOpen: { open: false, type: "ROW_OPEN" },
    setModalOpen: () => {},
    currentRow: "",
    setCurrrentRow: () => {},
    isPianoEditor: false,
    setIsPianoEditor: () => {},
});

export const AppStateProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [rows, setRows] = useState<Rows>(rowsData);
    const [isLoading, setIsLoading] = useState(true);
    const playerRef = useRef<{
        [key: string]: { player: Player; panner: Panner };
    }>();
    const [bpm, setBpm] = useState<number[]>([120]);
    const [beatPosition, setBeatPosition] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [modalOpen, setModalOpen] = useState({
        open: false,
        type: "ROW_OPEN",
    } as { type: ModalType; open: boolean });
    const [currentRow, setCurrrentRow] = useState("");
    const [isPianoEditor, setIsPianoEditor] = useState(false);

    return (
        <AppContext.Provider
            value={{
                rows,
                setRows,
                isLoading,
                setIsLoading,
                playerRef,
                bpm,
                setBpm,
                beatPosition,
                setBeatPosition,
                isPlaying,
                setIsPlaying,
                modalOpen,
                setModalOpen,
                currentRow,
                setCurrrentRow,
                isPianoEditor,
                setIsPianoEditor,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
