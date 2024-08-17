import RowsBeat from "./BeatRows";

export default function Rack() {
    return (
        <div className="bg-cyan-900 rounded-xl w-full max-w-screen-md">
            <div className="sm:px-4 px-2 py-6 bg-gray-900 rounded shadow">
                <RowsBeat />
            </div>
        </div>
    );
}
