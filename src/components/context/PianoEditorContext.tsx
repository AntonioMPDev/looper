import { createContext, useState } from 'react';

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
}>({
    pianoNotesData: {},
    setPianoNotesData: () => {},
    stillHolding: false,
    setStillHolding: () => {},
});

export const PianoProvider = ({ children }: { children: React.ReactNode }) => {
    const [pianoNotesData, setPianoNotesData] = useState<PianoNotesData>(
        {} as PianoNotesData
    );
    const [stillHolding, setStillHolding] = useState<boolean>(false);
    return (
        <PianoContext.Provider
            value={{
                pianoNotesData,
                setPianoNotesData,
                stillHolding,
                setStillHolding,
            }}
        >
            {children}
        </PianoContext.Provider>
    );
};
