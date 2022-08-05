import { useState, createContext } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [modal, setModal] = useState("");

  const [isFetch, setIsFetch] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [fullname, setFullname] = useState("");
  const [selectedData, setSelectedData] = useState({
    pict: "/img/user-default.png",
  });
  const [listOutlet, setListOutlet] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [listBrand, setListBrand] = useState([]);
  const [newData, setNewData] = useState({});
  const [adminMode, setAdminMode] = useState("");
  const [currentBrand, setCurrentBrand] = useState("");
  const [userPict, setUserPict] = useState("");
  const [outletPict, setOutletPict] = useState("");
  const [ski, setSki] = useState(false);
  const [listCategory, setListCategory] = useState([]);
  const [listSubCategory, setListSubCategory] = useState([]);
  const [detailOrder, setDetailOrder] = useState({
    created_at: 0,
    detail_order: [],
    customer: {},
    invoice: "",
    key: "",
    ongkir: 0,
    expedition: "",
    status: "",
    total: 0,
    voucher: 0,
  });

  const contextValue = {
    globalCtx: {
      modal,
      errorMsg,
      isFetch,
      fullname,
      selectedData,
      listOutlet,
      listUser,
      newData,
      listBrand,
      adminMode,
      currentBrand,
      userPict,
      outletPict,
      ski,
      listCategory,
      listSubCategory,
      detailOrder,
    },
    globalAct: {
      setModal,
      setErrorMsg,
      setIsFetch,
      setFullname,
      setSelectedData,
      setListOutlet,
      setListUser,
      setNewData,
      setListBrand,
      setAdminMode,
      setCurrentBrand,
      setUserPict,
      setOutletPict,
      setSki,
      setListCategory,
      setListSubCategory,
      setDetailOrder,
    },
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
