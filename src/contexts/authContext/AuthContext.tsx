import { ReactNode, createContext, useState, useEffect } from "react";
import { IHomeless} from "../../pages/DashBoard/DashBoard";
import api from "../../server/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface IUserConstext {
  isLogin: boolean;
  isModal: boolean;
  isRegister: boolean;
  homeLess: IHomeless[];
  searchFor: string;
  isNextDisabled: boolean;
  isGoBackDisabled: boolean;
  isEdit: boolean;
  user: IHomeless | any;

  setIsRegister: (prevState: boolean) => boolean | void;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLogin: (prevState: boolean) => boolean | void;
  setIsModal: (prevState: boolean) => boolean | void;
  setSearchFor: React.Dispatch<React.SetStateAction<string>>;
  next(): void;
  goBack(): void;
  deleteHomeless(user: IHomeless): void;
  editHomeless(data: IHomeless): void;
  setEdit: React.Dispatch<React.SetStateAction<IHomeless>>;
  search(): void;
  logout(e: any): void;
}

interface IChildrenProps {
  children: ReactNode;
}

const customId = "custom-id-yes";

export const AuthContext = createContext<IUserConstext>({} as IUserConstext);

export default function AuthProvider({ children }: IChildrenProps) {
  const [isLogin, setIsLogin] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [searchFor, setSearchFor] = useState("");
  const [nextPage, setNextPage] = useState(1);
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const [isGoBackDisabled, setIsGoBackDisabled] = useState(true);
  const [user, setUser] = useState({});
  const [edit, setEdit] = useState<IHomeless>({} as IHomeless)
  const [isEdit, setIsEdit] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("database?_expand=user", {
        params: {
          _page: nextPage,
          _limit: 8,
        },
      })
      .then((res) => {
        setHomeLess(res.data);
      });
  }, [searchFor, nextPage, deleteHomeless]);

  useEffect(() => {
    const userId = localStorage.getItem("@userId");
    const token = localStorage.getItem("@TOKEN");
    api.defaults.headers.common.authorization = `Bearer ${token}`;
    api.get(`/users/${userId}`).then((res) => {
      setUser(res.data);
    });
  }, [isLogin]);

  useEffect(() => {
    const token = localStorage.getItem("@TOKEN");
    token ? setIsLogin(true) : setIsLogin(false);
  }, []);
  const [homeLess, setHomeLess] = useState<IHomeless[]>([]);

  function next() {
    api
      .get("database", {
        params: {
          _page: nextPage + 1,
          _limit: 8,
        },
      })
      .then((res) => {
        if (res.data.length > 0) {
          setNextPage(nextPage + 1);
        } else if (res.data.length < 0) {
          setIsNextDisabled(true);
        }
      });
    if (nextPage > 0) {
      setIsGoBackDisabled(false);
    }
  }

  function goBack() {
    api
      .get("database", {
        params: {
          _page: nextPage,
          _limit: 8,
        },
      })
      .then((res) => {
        if (nextPage <= 1) {
          setIsGoBackDisabled(false);
        } else if (nextPage > 1) {
          setIsGoBackDisabled(true);
          setIsNextDisabled(false);
        }
      });
    setNextPage(nextPage - 1);
  }

  function search() {
    const dados = homeLess.filter(user => user.name === searchFor )
    setHomeLess(dados)
    }

  function logout(e: any) {
    e.preventDefault();
    toast.success("Logout realizado com sucesso!", {
      autoClose: 1500,
      toastId: customId,
    });
    setTimeout(() => {
      setIsLogin(false);
      setUser({});
      localStorage.clear();
      navigate("/home", { replace: true });
    }, 2000);
  }

  function deleteHomeless(user: IHomeless) {
    const token = localStorage.getItem("@TOKEN")
    if (token) {
      api.delete(`database/${user.id}`)
      toast.success("Excluido com sucesso", {
        autoClose: 1500,
        toastId: customId,
      })
    } else {
      toast.error(`Necessario login`)
    }
  }

  function editHomeless(data: IHomeless) {
    const token = localStorage.getItem("@TOKEN")

    if (token) {
      api.patch(`database/${edit.id}`, data)
      toast.success("Editado com sucesso", {
        autoClose: 1500,
        toastId: customId,
      })
    } else {
      toast.error(`Necessario login`)
    }
    setIsEdit(false)
  }

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        isModal,
        homeLess,
        searchFor,
        isNextDisabled,
        isGoBackDisabled,
        isRegister,
        user,
        isEdit,

        setIsEdit,
        setEdit,
        setIsRegister,
        setIsLogin,
        setIsModal,
        setSearchFor,
        goBack,
        deleteHomeless,
        editHomeless,
        next,
        search,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
