export default function PianoEditorNote({ note }: { note: { note: string } }) {
    return (
        <div
            className={`w-[6.25%] h-full border border-gray-800/75 cursor-pointer ${
                note.note.includes("#") ? "bg-gray-700 bg-opacity-75" : ""
            }`}
        ></div>
    );
}