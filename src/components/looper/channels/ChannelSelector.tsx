import { useState } from 'react';

export default function ChannelSelector() {
    const [channel, setChannel] = useState(0);

    return (
        <input
            className="w-10 py-1 bg-gray-600 rounded text-center"
            type="number"
            value={channel}
            onChange={(e) => setChannel(parseInt(e.target.value))}
        />
    );
}
