import { useState, createContext } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [modal, setModal] = useState("");
  const [popover, setPopover] = useState("");
  const [isFetch, setIsFetch] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [fullname, setFullname] = useState("");
  const [selectedData, setSelectedData] = useState("");
  const [listOutlet, setListOutlet] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [listBrand, setListBrand] = useState([]);
  const [newData, setNewData] = useState({});
  const [adminMode, setAdminMode] = useState("");

  const contextValue = {
    globalCtx: {
      modal,
      popover,
      errorMsg,
      isFetch,
      fullname,
      selectedData,
      listOutlet,
      listUser,
      newData,
      listBrand,
      adminMode,
    },
    globalAct: {
      setModal,
      setPopover,
      setErrorMsg,
      setIsFetch,
      setFullname,
      setSelectedData,
      setListOutlet,
      setListUser,
      setNewData,
      setListBrand,
      setAdminMode,
    },
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
