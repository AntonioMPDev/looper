import { RxCross2 } from 'react-icons/rx';

export default function Modal({
    isOpen,
    children,
    onClose,
}: {
    isOpen: boolean;
    children: React.ReactNode;
    onClose: () => void
}) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="scale-up-center fixed top-0 left-0 flex h-screen w-full p-2 z-10 items-center justify-center">
            <div className="bg-cyan-950 sm:px-10 sm:py-10 px-4 py-8 rounded-md relative shadow-xl sm:w-1/2 w-full max-w-[600px]">
                <button className="absolute right-2 top-2" onClick={onClose}>
                    <RxCross2 />
                </button>
                <div>{children}</div>
            </div>
        </div>
    );
}