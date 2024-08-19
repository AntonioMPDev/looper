import PianoEditorOct from './PianoEditorOct';

export default function PianoRoll({
    octs,
    commonClasses,
}: {
    octs: {
        note: {
            note: string;
        };
        active: boolean;
        context: unknown;
        i: number;
    }[][][];
    commonClasses: string;
}) {
    return (
        <div className={`flex-col ${commonClasses} h-full`}>
            <div className="w-full h-full bg-gray-900 bg-opacity-75">
                {octs.map((oct, i) => (
                    <PianoEditorOct octIndex={i} oct={oct} key={i} />
                ))}
            </div>
        </div>
    );
}
