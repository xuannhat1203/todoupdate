import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

interface Infor {
  id: string;
  name: string;
  age: string;
  email: string;
  address: string;
  blocked:boolean
}

interface SendInfor {
  sendData: (data: Infor[]) => void;
}

export default function Header({ sendData }: SendInfor) {
  const [infor, setInfor] = useState<Infor>({
    id: "",
    name: "",
    age: "",
    email: "",
    address: "",
    blocked:false,
  });

  const [arrInfor, setArrInfor] = useState<Infor[]>([]);

  useEffect(() => {
    const storedJobs = localStorage.getItem("Infors");
    if (storedJobs) {
      setArrInfor(JSON.parse(storedJobs));
    }
  }, []);

  const addStudents = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newStudent: Infor = {
      id: uuidv4(),
      name: infor.name,
      age: infor.age,
      email: infor.email,
      address: infor.address,
      blocked:false,
    };
    const existingStudent = arrInfor.find((item) => item.name === infor.name);
    if (existingStudent) {
      console.log("Nhân viên đã tồn tại");
      return;
    }
    const updatedArrInfor = [...arrInfor, newStudent];
    setArrInfor(updatedArrInfor);
    setInfor({
      id: "",
      name: "",
      age: "",
      email: "",
      address: "",
      blocked:false
    });
    localStorage.setItem("Infors", JSON.stringify(updatedArrInfor));
    setStatus(false);
    sendData(updatedArrInfor);
  };

  const [status, setStatus] = useState<boolean>(false);
  const handleAdd = () => {
    setStatus(true);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setInfor((prevInfor) => ({
      ...prevInfor,
      [name]: value,
    }));
  };

  return (
    <>
      <header className="d-flex justify-content-between mb-3">
        <h3>Nhân viên</h3>
        <button onClick={handleAdd} className="btn btn-primary">
          Thêm mới nhân viên
        </button>
      </header>
      <div className="d-flex align-items-center justify-content-end gap-2 mb-3">
        <input
          style={{ width: "350px" }}
          type="text"
          className="form-control"
          placeholder="Tìm kiếm theo email"
        />
        <i className="fa-solid fa-arrows-rotate" title="Refresh"></i>
      </div>
      {status && (
        <div className="overlay">
          <form className="form">
            <div className="d-flex justify-content-between align-items-center">
              <h4>Chỉnh sửa nhân viên</h4>
              <i className="fa-solid fa-xmark" />
            </div>
            <div>
              <label className="form-label" htmlFor="userName">
                Họ và tên
              </label>
              <input
                onChange={handleInputChange}
                name="name"
                id="userName"
                type="text"
                className="form-control"
                value={infor.name}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="dateOfBirth">
                Ngày sinh
              </label>
              <input
                onChange={handleInputChange}
                name="age"
                id="dateOfBirth"
                type="date"
                className="form-control"
                value={infor.age}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="email">
                Email
              </label>
              <input
                onChange={handleInputChange}
                name="email"
                id="email"
                type="email"
                className="form-control"
                value={infor.email}
              />
            </div>
            <div>
              <label className="form-label" htmlFor="address">
                Địa chỉ
              </label>
              <textarea
                onChange={handleInputChange}
                name="address"
                className="form-control"
                id="address"
                rows={3}
                value={infor.address}
              />
            </div>
            <div>
              <button onClick={addStudents} className="w-100 btn btn-primary">
                Thêm mới
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
