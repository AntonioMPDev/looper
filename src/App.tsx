import { AppStateProvider } from "./components/context/AppContext";
import Screen from "./Screen";
import AppInitializer from "./AppInitializer";

function App() {
    return (
        <div id="app" className="flex flex-col">
            <AppStateProvider>
                <AppInitializer>
                    <Screen />
                </AppInitializer>
            </AppStateProvider>
        </div>
    );
}

export default App;

