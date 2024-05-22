import React, { useCallback, useState, useEffect } from "react";
import "./index.css";
import AddJob from "./components/AddJob";
import ListJob from "./components/ListJob";

interface Jobs {
  id: string;
  name: string;
  status: boolean;
}

function App() {
  const [arrJob, setArrJob] = useState<Jobs[]>([]);
  const [value, setValue] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("all");
  useEffect(() => {
    const storedJobs = localStorage.getItem("Job-Local");
    if (storedJobs) {
      setArrJob(JSON.parse(storedJobs));
    }
  }, []);

  const receiveDataFromAddJob = useCallback((data: string) => {
    setValue(data);
  }, []);

  const receiveDataFromListJob = useCallback((data: Jobs[]) => {
    setArrJob(data);
  }, []);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="card-body p-5">
                  <AddJob sendData={receiveDataFromAddJob} />
                  <ul className="nav nav-tabs mb-4 pb-2">
                    <li
                      className={`nav-item ${activeTab === "all" && "active"}`}
                      onClick={() => handleTabChange("all")}
                    >
                      <a className="nav-link">Tất cả</a>
                    </li>
                    <li
                      className={`nav-item ${activeTab === "completed" && "active"}`}
                      onClick={() => handleTabChange("completed")}
                    >
                      <a className="nav-link">Đã hoàn thành</a>
                    </li>
                    <li
                      className={`nav-item ${activeTab === "incomplete" && "active"}`}
                      onClick={() => handleTabChange("incomplete")}
                    >
                      <a className="nav-link">Chưa hoàn thành</a>
                    </li>
                  </ul>
                  <div className="tab-content" id="ex1-content">
                    <div className="tab-pane fade show active">
                      <ul className="list-group mb-0">
                        <ListJob
                          nameJob={value}
                          sendData2={receiveDataFromListJob}
                          activeTab={activeTab} 
                          arrJob2={arrJob} 
                        />
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
