import { createContext, useRef, useState } from 'react';

type PianoNotesData = Record<
    string,
    {
        timer: number;
        isHolding: boolean;
        holdDuration: number;
    }
>;
// Create a context with a default value
export const PianoContext = createContext<{
    pianoNotesData: PianoNotesData;
    setPianoNotesData: React.Dispatch<React.SetStateAction<PianoNotesData>>;
    stillHolding: boolean;
    setStillHolding: React.Dispatch<React.SetStateAction<boolean>>;
    pianoRollContainerRef: React.RefObject<HTMLDivElement>;
    pianoRollMarkerRef: React.RefObject<HTMLDivElement>;
}>({
    pianoNotesData: {},
    setPianoNotesData: () => {},
    stillHolding: false,
    setStillHolding: () => {},
    pianoRollContainerRef: {} as React.RefObject<HTMLDivElement>,
    pianoRollMarkerRef: {} as React.RefObject<HTMLDivElement>

});

export const PianoProvider = ({ children }: { children: React.ReactNode }) => {
    const [pianoNotesData, setPianoNotesData] = useState<PianoNotesData>(
        {} as PianoNotesData
    );
    const [stillHolding, setStillHolding] = useState<boolean>(false);
    const pianoRollContainerRef = useRef<HTMLDivElement>(null);
    const pianoRollMarkerRef = useRef<HTMLDivElement>(null);


    return (
        <PianoContext.Provider
            value={{
                pianoNotesData,
                setPianoNotesData,
                stillHolding,
                setStillHolding,
                pianoRollContainerRef,
                pianoRollMarkerRef,
            }}
        >
            {children}
        </PianoContext.Provider>
    );
};
