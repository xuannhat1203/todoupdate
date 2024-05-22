import React, { useCallback, useState } from "react";

export default function AddJob({ sendData }: any) {
  const [valueInput, setValueInput] = useState<string>("");
    const [check,setCheck] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInput(e.target.value);
  };

  const handleClick = useCallback(() => {
    if(valueInput === ""){
        setCheck(true);
    }else{
        sendData(valueInput);
        setValueInput(""); 
    }
  }, [sendData, valueInput]);
  const closeModel = () => {
    setCheck(false);
  };
  return (
    <div>
      <form className="d-flex justify-content-center align-items-center mb-4">
        <div className="form-outline flex-fill">
          <input
            onChange={handleChange}
            type="text"
            id="form2"
            className="form-control"
            value={valueInput} 
          />
          <label className="form-label" htmlFor="form2">
            Nhập tên công việc
          </label>
        </div>
        <button
          onClick={handleClick}
          type="button"
          className="btn btn-info ms-2"
        >
          Thêm
        </button>
      </form>
      {check && <div className="overlay">
          <div className="modal-custom">
            <div className="modal-header-custom">
              <h5>Cảnh báo</h5>
              <i onClick={closeModel} className="fas fa-xmark" />
            </div>
            <div className="modal-body-custom">
              <p>Tên công việc không được phép để trống.</p>
            </div>
            <div className="modal-footer-footer">
              <button onClick={closeModel} className="btn btn-light">
                Đóng
              </button>
            </div>
          </div>
        </div>}
    </div>
  );
}
