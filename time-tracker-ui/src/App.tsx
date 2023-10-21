import { MainLayout } from "./layout/MainLayout";
import { TrackingPage } from "./pages/TrackingPage";
import { CompleteTimeRecord } from "./types/TimeRecord";
import { useLocalStorage } from "./util/LocalStorageHook";

function App() {
    const [timeRecords, setTimeRecords] = useLocalStorage<CompleteTimeRecord[]>("timerecords", []);

    const header = (
        <div>
            <h1>Time Tracker</h1>
        </div>
    );

    const footer = (
        <div className="flex justify-around gap-20 text-justify">
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ea esse expedita ipsum iusto repellendus reprehenderit
                incidunt maiores? Eaque rem commodi tempore tempora enim voluptatibus dolorum voluptates, vel labore non!
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ea esse expedita ipsum iusto repellendus reprehenderit
                incidunt maiores? Eaque rem commodi tempore tempora enim voluptatibus dolorum voluptates, vel labore non!
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ea esse expedita ipsum iusto repellendus reprehenderit
                incidunt maiores? Eaque rem commodi tempore tempora enim voluptatibus dolorum voluptates, vel labore non!
            </p>
        </div>
    );

    return (
        <MainLayout header={header} footer={footer}>
            <TrackingPage
                records={timeRecords}
                onUpdate={(e) => setTimeRecords(e.records)}
                printHeader={<h1>Time Records</h1>}
                printFooter={<p>Total: 12:53</p>}
            ></TrackingPage>
        </MainLayout>
    );
}

export default App;
