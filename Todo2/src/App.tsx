import { useCallback, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Table from "./components/Table";

interface Infor {
  id: string;
  name: string;
  age: string;
  email: string;
  address: string;
  blocked:boolean
}

export default function App() {
  const [data, setData] = useState<Infor[]>([]);

  const receiveDataFromHeader = useCallback((data: Infor[]) => {
    setData(data);
  }, []);

  return (
    <div className="w-[80%] m-auto mt-4 h-[100vh]">
      <main className="main">
        <Header sendData={receiveDataFromHeader} />
        {/* Danh sách nhân viên */}
        <Table data={data} />
        <Footer />
      </main>
    </div>
  );
}
