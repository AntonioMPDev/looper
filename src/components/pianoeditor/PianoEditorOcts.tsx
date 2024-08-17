import { CiMenuFries } from "react-icons/ci";
import { piano_notes_twoo_oct } from "../../constants";
import PianoEditorOct from "./PianoEditorOct";
import { useContext, useState } from "react";
import Modal from "../modals";
import { AppContext } from "../context/AppContext";

export default function PianoEditorOcts() {
    const [popUpActive, setPopupActive] = useState(false);
    const { setIsPianoEditor, setModalOpen, modalOpen } =
        useContext(AppContext);

    const commonClasses =
        "w-full sm:pl-24 pl-16 h-full flex max-h-[800px] absolute right-0";
    return (
        <>
            <div className={`flex-col ${commonClasses}`}>
                <div className="w-full h-full bg-gray-900 bg-opacity-75">
                    {piano_notes_twoo_oct.map((oct, i) => (
                        <PianoEditorOct oct={oct} key={i} />
                    ))}
                </div>
            </div>
            <div className={`flex-col ${commonClasses}`}>
                <div className="absolute sm:pl-24 pl-16 w-full h-8 -top-[2em] right-0 bg-gray-800">
                    <div className="absolute z-20 top-0 right-0 flex mr-1 items-center h-full">
                        <button
                            className="p-1 sm:mt-0 mt-1"
                            onClick={() => setPopupActive(true)}
                        >
                            <CiMenuFries className="text-xl" />
                        </button>
                    </div>
                </div>
            </div>
            <div className={`${commonClasses} pointer-events-none`}>
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="w-[25%] h-full border-r border-gray-600/80"
                    >
                        <div className="text-xs opacity-60 absolute -top-4 ml-px">
                            {i + 1}
                        </div>
                    </div>
                ))}
            </div>
            <Modal isOpen={popUpActive} onClose={() => setPopupActive(false)}>
                <div className="pt-10 px-6 flex flex-start">
                    <button
                        className="bg-gray-800 py-2 px-4 rounded text-sm"
                        onClick={() => {
                            setIsPianoEditor(false)
                            setModalOpen({ ...modalOpen, open: false });
                        }}
                    >
                        Close
                    </button>
                </div>
            </Modal>
        </>
    );
}
