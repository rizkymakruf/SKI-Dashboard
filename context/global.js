import { useState, createContext } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [modal, setModal] = useState("");
  const [popover, setPopover] = useState("");
  const [isFetch, setIsFetch] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [fullname, setFullname] = useState("Faouzia");
  const [selectedData, setSelectedData] = useState("");
  const [listOutlet, setListOutlet] = useState([]);
  const [listUser, setListUser] = useState([]);

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
    },
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
