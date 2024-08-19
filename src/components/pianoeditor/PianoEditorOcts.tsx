import { DEFAUL_VOL, DEFAULT_PAN } from "../../constants";
import { useContext, useMemo, useState } from "react";
import Modal from "../modals";
import { AppContext } from "../context/AppContext";
import VolPanControls from "../controls/VolPanControls";
import PianoRoll from "./PianoRoll";
import PianoEditorMenu from "./PianoEditorMenu";
import MarkersNumbers from "./MarkersNumbers";
import Marker from './Marker';

export default function PianoEditorOcts() {
    const [popUpActive, setPopupActive] = useState(false);
    const { setIsPianoEditor, setModalOpen, modalOpen, rows, currentRow } =
        useContext(AppContext);
    const octs = useMemo(
        () => rows.find((item) => item.key === currentRow),
        [currentRow, rows]
    )?.notes;

    if (!octs) {
        return null;
    }

    const commonClasses =
        "w-full sm:pl-24 pl-16 flex max-h-[800px] absolute right-0";
    return (
        <>
            <Marker commonClasses={commonClasses} />
            <PianoRoll octs={octs} commonClasses={commonClasses} />
            <PianoEditorMenu
                commonClasses={commonClasses}
                setPopupActive={setPopupActive}
            />
            <MarkersNumbers commonClasses={commonClasses} />
            <Modal isOpen={popUpActive} onClose={() => setPopupActive(false)}>
                <div className="pb-10">
                    <div>
                        <VolPanControls
                            defaulVoltValue={DEFAUL_VOL}
                            defaulPanValue={DEFAULT_PAN}
                            onValueRawVolChange={() => 0}
                            onValueRawPanChange={() => 0}
                        />
                    </div>
                    <div className="pt-10 px-2 w-full flex flex-start absolute bottom-2 left-0">
                        <button
                            className="bg-gray-800 py-2 px-4 rounded text-xs w-full"
                            onClick={() => {
                                setIsPianoEditor(false);
                                setModalOpen({ ...modalOpen, open: false });
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
