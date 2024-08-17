import { useContext } from "react";
import Looper from "./components/looper";
import PianoEditor from "./components/pianoeditor";
import { AppContext } from "./components/context/AppContext";

export default function Screen() {
    const { isPianoEditor } = useContext(AppContext);

    if (isPianoEditor) {
        return <PianoEditor />;
    }
    return <Looper />;
}
