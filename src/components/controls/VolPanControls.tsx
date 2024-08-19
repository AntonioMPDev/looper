import RangeSlider from '../looper/ranges/RangeSlider';

export default function VolPanControls({
    defaulVoltValue,
    onValueRawVolChange,
    defaulPanValue,
    onValueRawPanChange,
}: {
    defaulVoltValue: number;
    onValueRawVolChange: (v: number) => number;
    defaulPanValue: number;
    onValueRawPanChange: (v: number) => number;
}) {
    return (
        <div className={`flex items-center gap-2 py-4 pb-8`}>
            <div className="flex gap-4">
                <div className="flex justify-center items-center gap-2">
                    <RangeSlider
                        min={-60}
                        max={-1}
                        defaultValue={defaulVoltValue}
                        onValueRawChange={onValueRawVolChange}
                    />
                    <div>Volume</div>
                </div>
                <div className="flex justify-center items-center gap-2">
                    <RangeSlider
                        min={-1}
                        max={1}
                        defaultValue={defaulPanValue}
                        onValueRawChange={onValueRawPanChange}
                    />
                    <div>Pan</div>
                </div>
            </div>
        </div>
    );
}
