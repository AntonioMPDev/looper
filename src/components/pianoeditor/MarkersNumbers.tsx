export default function MarkersNumbers({
    commonClasses,
}: {
    commonClasses: string;
}) {
    return (
        <div className={`${commonClasses} h-full pointer-events-none`}>
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
    );
}