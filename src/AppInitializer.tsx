import { useContext } from "react";
import { AppContext } from "./components/context/AppContext";
import Spinner from "./components/Spinner";
import useAppInitializer from "./hooks/useAppInitializer";

export default function AppInitializer({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isLoading } = useContext(AppContext);
    const { initialize } = useAppInitializer();

    if (isLoading) {
        return (
            <button onClick={() => initialize()} className="mb-16">
                <Spinner />
            </button>
        );
    }

    return <>{children}</>;
}
