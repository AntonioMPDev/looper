import PianoEditorNote from './PianoEditorNote';

export default function PianoEditorOct({
    oct,
}: {
    oct: {
        note: string;
    }[];
}) {
    return (
        <div className="w-full h-[50%]">
            {oct.map((note, i) => (
                <div key={i} className="w-full h-[8.33%] flex">
                    {Array.from({ length: 16 }).map((_, i) => (
                        <PianoEditorNote note={note} key={i} />
                    ))}
                </div>
            ))}
        </div>
    );
}
