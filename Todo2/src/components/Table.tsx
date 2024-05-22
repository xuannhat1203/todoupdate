import { useState, useEffect } from "react";

interface Infor {
  id: string;
  name: string;
  age: string;
  email: string;
  address: string;
  blocked: boolean; // Added blocked property
}

interface TableProps {
  data: Infor[];
}

export default function Table({ data }: TableProps) {
  const [arrInfor, setArrInfor] = useState<Infor[]>(() => {
    const storedData = localStorage.getItem("Infors");
    return storedData ? JSON.parse(storedData) : [];
  });

  const [check, setCheck] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>("");
  const [checkEdit, setCheckEdit] = useState<boolean>(false);
  const [blockId, setBlockId] = useState<string>(""); // Changed to string to store user ID

  useEffect(() => {
    if (data.length > 0) {
      const dataWithBlockStatus = data.map(item => ({ ...item, blocked: false }));
      setArrInfor(dataWithBlockStatus);
      localStorage.setItem("Infors", JSON.stringify(dataWithBlockStatus));
    }
  }, [data]);

  const handleDelete = (id: string) => {
    setCheck(true);
    setDeleteId(id);
  };

  const handleSubmitDelete = () => {
    const updatedArrInfor = arrInfor.filter((item) => item.id !== deleteId);
    setArrInfor(updatedArrInfor);
    localStorage.setItem("Infors", JSON.stringify(updatedArrInfor));
    setCheck(false);
  };

  const handleBlock = (id: string) => {
    setCheckEdit(true);
    setBlockId(id);
  };

  const handleSubmitBlock = () => {
    const updatedArrInfor = arrInfor.map((item) =>
      item.id === blockId ? { ...item, blocked: !item.blocked } : item
    );
    setArrInfor(updatedArrInfor);
    localStorage.setItem("Infors", JSON.stringify(updatedArrInfor));
    setCheckEdit(false);
    setBlockId("");
  };

  const handleCancel = () => {
    setCheck(false);
    setDeleteId("");
    setCheckEdit(false);
    setBlockId("");
  };

  return (
    <>
      <table className="table table-bordered table-hover table-striped">
        <thead>
          <tr>
            <th>STT</th>
            <th>Họ và tên</th>
            <th>Ngày sinh</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th>Trạng thái</th>
            <th colSpan={3}>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {arrInfor.map((infor, index) => (
            <tr key={infor.id}>
              <td>{index + 1}</td>
              <td>{infor.name}</td>
              <td>{infor.age}</td>
              <td>{infor.email}</td>
              <td>{infor.address}</td>
              <td>{infor.blocked ? "Đã chặn" : "Hoạt động"}</td>
              <td onClick={() => handleBlock(infor.id)}>
                {infor.blocked ? "Bỏ chặn" : "Chặn"}
              </td>
              <td>Chỉnh sửa</td>
              <td onClick={() => handleDelete(infor.id)}>Xóa</td>
            </tr>
          ))}
        </tbody>
      </table>
      {check && (
        <div className="overlay">
          <div className="modal-custom">
            <div className="modal-title">
              <h4>Cảnh báo</h4>
              <i className="fa-solid fa-xmark" onClick={handleCancel} />
            </div>
            <div className="modal-body-custom">
              <span>Bạn có chắc chắn muốn xóa tài khoản này?</span>
            </div>
            <div className="modal-footer-custom">
              <button className="btn btn-light" onClick={handleCancel}>
                Hủy
              </button>
              <button onClick={handleSubmitDelete} className="btn btn-danger">
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
      {checkEdit && (
        <div className="overlay">
          <div className="modal-custom">
            <div className="modal-title">
              <h4>Cảnh báo</h4>
              <i className="fa-solid fa-xmark" onClick={handleCancel} />
            </div>
            <div className="modal-body-custom">
              <span>
                Bạn có chắc chắn muốn {blockId && arrInfor.find(item => item.id === blockId)?.blocked ? "bỏ chặn" : "chặn"} tài khoản này?
              </span>
            </div>
            <div className="modal-footer-custom">
              <button className="btn btn-light" onClick={handleCancel}>
                Hủy
              </button>
              <button onClick={handleSubmitBlock} className="btn btn-danger">
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
