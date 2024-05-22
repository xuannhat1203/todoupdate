import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

interface Jobs {
  id: string;
  name: string;
  status: boolean;
}
interface Props {
  nameJob: string;
  sendData2: (data: Jobs[]) => void;
  activeTab: string;
  arrJob2: Jobs[];
}

export default function ListJob({ nameJob, sendData2, activeTab, arrJob2 }: Props) {
  const [filteredJobs, setFilteredJobs] = useState<Jobs[]>([]);

  useEffect(() => {
    if (activeTab === "all") {
      setFilteredJobs(arrJob);
    } else if (activeTab === "completed") {
      setFilteredJobs(arrJob.filter(job => job.status === true));
    } else if (activeTab === "incomplete") {
      setFilteredJobs(arrJob.filter(job => !job.status));
    }
  }, [activeTab, arrJob2]);
  const [arrJob, setArrJob] = useState<Jobs[]>([]);
  const [check, setCheck] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>("");
  useEffect(() => {
    const storedJobs = localStorage.getItem("Job-Local");
    if (storedJobs) {
      setArrJob(JSON.parse(storedJobs));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("Job-Local", JSON.stringify(arrJob));
  }, [arrJob]);
  useEffect(() => {
    const newJob: Jobs = {
      id: uuidv4(),
      name: nameJob,
      status: false,
    };
    if (nameJob) {
      const existingJob = arrJob.find((job) => job.name === nameJob);
      if (!existingJob) {
        setArrJob((prevArrJob) => [...prevArrJob, newJob]);
      }
    }
  }, [nameJob, arrJob]);
  const handleDelete = (id: string) => {
    setCheck(true);
    setDeleteId(id);
  };
  const checkedCheckBox = (id: string) => {
    setArrJob((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: !item.status } : item
      )
    );
  };
  const submitDelete = () => {
    setArrJob((prevArrJob) =>
      prevArrJob.filter((item) => item.id !== deleteId)
    );
    setCheck(false);
  };
  const closeModel = () => {
    setCheck(false);
  };
  return (
    <>
      {filteredJobs.map((job) => (
        <li
          key={job.id}
          className="list-group-item d-flex align-items-center justify-content-between border-0 mb-2 rounded"
          style={{ backgroundColor: "#f4f6f7" }}
        >
          <div style={{ display: "flex", height: "25px" }}>
            <input
              onChange={() => checkedCheckBox(job.id)}
              className="form-check-input me-2"
              type="checkbox"
            />
            {job.status ? <s>{job.name}</s> : <p>{job.name}</p>}
          </div>
          <div className="d-flex gap-3">
            <i className="fas fa-pen-to-square text-warning" />
            <i
              onClick={() => handleDelete(job.id)}
              className="far fa-trash-can text-danger"
            />
          </div>
        </li>
      ))}
      {check && (
        <div className="overlay">
          <div className="modal-custom">
            <div className="modal-header-custom">
              <h5>Xác nhận</h5>
              <i onClick={closeModel} className="fas fa-xmark" />
            </div>
            <div className="modal-body-custom">
              <p>Bạn chắc chắn muốn xóa công việc quét nhà?</p>
            </div>
            <div className="modal-footer-footer">
              <button onClick={closeModel} className="btn btn-light">
                Hủy
              </button>
              <button onClick={submitDelete} className="btn btn-danger">
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
