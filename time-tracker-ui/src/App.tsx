import { useEffect, useState } from "react";
import { MainLayout } from "./layout/MainLayout";
import { ProjectSelectionPage } from "./pages/ProjectSelectionPage";
import { TrackingPage } from "./pages/TrackingPage";
import { Project } from "./types/Project";
import { m2HHmm } from "./types/TimeRecord";
import { useLocalStorage } from "./util/LocalStorageHook";
import { Button } from "antd";

function App() {
    const [projects, setProjects] = useLocalStorage<Project[]>("projects", []);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // update project if records have changed
    useEffect(() => {
        if (selectedProject != null) {
            setProjects([selectedProject, ...projects.filter((p) => p.name != selectedProject.name)]);
        }
    }, [selectedProject]);

    const header = (
        <div>
            <h1>Time Tracker</h1>
            {selectedProject && (
                <Button type="link" onClick={() => setSelectedProject(null)}>
                    {"<-- Back to project selection"}
                </Button>
            )}
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

    const totalTimeMinutes = selectedProject?.timeRecords.reduce((sum, curr) => sum + curr.timeInMinutes, 0);

    return (
        <MainLayout header={header} footer={footer}>
            {selectedProject == null ? (
                <ProjectSelectionPage
                    projects={projects}
                    onCreate={(project) => setProjects([...projects, project])}
                    onOpen={(project) => setSelectedProject(project)}
                ></ProjectSelectionPage>
            ) : (
                <TrackingPage
                    records={selectedProject?.timeRecords}
                    onUpdate={(e) => setSelectedProject({ ...selectedProject, timeRecords: e.records })}
                    printHeader={<h1>Time Records</h1>}
                    printFooter={
                        <p>
                            Total time: {m2HHmm(totalTimeMinutes!)} = {Math.round((totalTimeMinutes! / 60) * 100) / 100} hours
                        </p>
                    }
                ></TrackingPage>
            )}
        </MainLayout>
    );
}

export default App;
