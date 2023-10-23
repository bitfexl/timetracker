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
            <div>
                <a href="https://github.com/bitfexl/timetracker" target="_blank">
                    <img height={20} className="translate-y-1 -translate-x-2" src="https://github.com/favicon.ico" alt="GitHub icon" />
                    GitHub
                </a>
            </div>
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
                    printHeader={
                        <>
                            <h1>Time Records</h1>
                            <h2>{selectedProject.name}</h2>
                            <p>{selectedProject.description}</p>
                            <br />
                        </>
                    }
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
