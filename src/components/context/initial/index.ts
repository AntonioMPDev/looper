import { Rows } from "../AppContext";
import { FaDrum } from "react-icons/fa";
import { GiDrum } from "react-icons/gi";
import { GiDrumKit } from "react-icons/gi";
import { MdPiano } from "react-icons/md";
import { piano_notes_twoo_oct_reversed, rowType } from "../../../constants";

export const rowsData: Rows = [
    {
        type: rowType.beat,
        label: "Kick",
        key: "kick",
        icon: FaDrum,
        steps: Array.from({ length: 16 }, (context, i) => ({
            note: "C4",
            active: false,
            context,
            i,
        })),
    },
    {
        type: rowType.beat,
        label: "Snare",
        key: "snare",
        icon: GiDrum,
        steps: Array.from({ length: 16 }, (context, i) => ({
            note: "C4",
            active: false,
            context,
            i,
        })),
    },
    {
        type: rowType.beat,
        label: "Hit hat",
        key: "hithat",
        icon: GiDrumKit,
        steps: Array.from({ length: 16 }, (context, i) => ({
            note: "C4",
            active: false,
            context,
            i,
        })),
    },
    {
        type: rowType.synth,
        label: "Synth Saw",
        key: "synthsaw",
        icon: MdPiano,
        steps: Array.from({ length: 16 }, (context, i) => ({
            note: "C4",
            active: false,
            context,
            i,
        })),
        notes: piano_notes_twoo_oct_reversed.map((oct) => {
            return oct.map((note) => {
                return Array.from({ length: 16 }, (context, i) => ({
                    note,
                    active: false,
                    context,
                    i,
                }));
            });
        }),
    },
];
