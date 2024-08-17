export function bpmToMilliseconds(bpm: number) {
    if (bpm <= 0) {
        throw new Error("BPM must be a positive number");
    }
    return 60000 / bpm;
}

export function getBeats(bpm: number) {
    return bpmToMilliseconds(bpm) / 4;
}