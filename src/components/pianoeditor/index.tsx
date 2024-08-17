import { PianoProvider } from "../context/PianoEditorContext";
import Piano from "./Piano";
import PianoEditorOcts from "./PianoEditorOcts";

export default function PianoEditor() {
    return (
        <PianoProvider>
            <div className="shadow-inset-center scale-up-center flex flex-col bg-gray-900 h-full w-full overflow-hidden justify-center items-center pt-14">
                <Piano />
                <PianoEditorOcts />
            </div>
        </PianoProvider>
    );
}
