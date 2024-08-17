export function detectDeviceType() {
    const userAgent = navigator.userAgent;

    if (/android/i.test(userAgent)) {
        return "ANDROID";
    } else if (
        /iPad|iPhone|iPod/.test(userAgent) &&
        !(window as typeof window & { MSStream: boolean }).MSStream
    ) {
        return "IOS";
    } else if (/windows phone/i.test(userAgent)) {
        return "WINDOW_PHONE";
    } else if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
        return "TABLET";
    } else if (/mobile|android|touch|webos|hpwos|fennec/i.test(userAgent)) {
        return "MOBILE";
    } else {
        return "Desktop";
    }
}

export function isDesktop() {
    const device = detectDeviceType();
    if (
        device === "ANDROID" ||
        device === "IOS" ||
        device === "WINDOW_PHONE" ||
        device === "TABLET" ||
        device === "MOBILE"
    ) {
        return false;
    }

    return true;
}
