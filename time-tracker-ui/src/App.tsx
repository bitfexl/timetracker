import { MainLayout } from "./layout/MainLayout";
import { ProjectPage } from "./pages/ProjectPage";

function App() {
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
            <ProjectPage></ProjectPage>
        </MainLayout>
    );
}

export default App;
