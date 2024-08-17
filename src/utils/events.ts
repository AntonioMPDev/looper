import { eventListeners } from "../constants";

export function removeEvents(
    eventsList: { event: EventListener; type: string }[]
) {
    eventsList.forEach((event) => {
        document.removeEventListener(event.type, event.event);
    });
}

export function getSettedEvents(handleUserInteraction: () => void) {
    const eventsList: { event: EventListener; type: string }[] = [];

    eventListeners.forEach((eventType) => {
        document.addEventListener(eventType, handleUserInteraction);
        eventsList.push({
            type: eventType,
            event: handleUserInteraction,
        });
    });

    return eventsList;
}
