import Controls from '../controls';
import Rack from './rack';

export default function Looper() {
    return (
        <div className="w-full p-2 flex items-center flex-col">
            <Controls />
            <Rack />
        </div>
    );
}