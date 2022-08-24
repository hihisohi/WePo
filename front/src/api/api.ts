import { ILogin } from "../components/user/LoginForm";
import {
    curUserState,
    IAward,
    ICertificate,
    IEducation,
    IProject,
    isLoginState,
    IUser,
    usersState,
} from "./../atoms";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import Certificate from "./../components/certificate/Certificate";

export async function UserLogin({ email, password }: ILogin) {
    try {
        const setCurUser = useSetRecoilState(curUserState);
        const { data: newUser } = await axios.post("/user/login", {
            email,
            password,
        });
        const { token } = await newUser;
        await sessionStorage.setItem("userToken", token);
        setCurUser(newUser);
        return newUser as IUser;
    } catch (err) {
        console.log(err);
    }
}

export async function UserLogout() {
    const setCurUser = useSetRecoilState(curUserState);
    sessionStorage.remove("userToken");
    setCurUser(null);
}

// 회원가입 완료
export async function createtUser({ email, password, name }: IUser) {
    try {
        const { data } = await axios.post("http://localhost:5001/user/register", {
            email,
            password,
            name,
        });
        console.log(data);
        const newUser: IUser = await {
            ...data,
            description: "",
            createdAt: "",
            picture: "",
            updatedAt: "",
        };
        return newUser;
    } catch (err) {
        console.log(err);
    }
}

export async function getUsers() {
    try {
        const { data: users } = await axios.get(`http://localhost:5001/userlist`);
        return users as IUser[];
    } catch (err) {
        console.log(err);
    }
}
export async function getUser(id: any) {
    try {
        const { data: user } = await axios.get(`http://localhost:5001/users/${id}`);
        return user as IUser;
    } catch (err) {
        console.log(err);
    }
}
// -----------------------MVP 추가 수정 ----------------------
// Award 추가,수정
export async function addAward(data: IAward, id: string) {
    try {
        await axios.post(`/${id}/award`, { ...data, id });
    } catch (err) {
        console.log(err);
    }
}
export async function updateAward(data: IAward, id: string) {
    try {
        await axios.put(`/${id}/award`, { ...data, id });
    } catch (err) {
        console.log(err);
    }
}

// Certificate 추가,수정
export async function addCertificate(data: ICertificate, id: string) {
    try {
        await axios.post(`/${id}/certificate`, { ...data, id });
    } catch (err) {
        console.log(err);
    }
}
export async function updateCertificate(data: ICertificate, id: string) {
    try {
        await axios.put(`/${id}/certificate`, { ...data, id });
    } catch (err) {
        console.log(err);
    }
}

// Education 추가,수정
export async function addEducation(data: IEducation, id: string) {
    try {
        await axios.post(`/${id}/education`, { ...data, id });
    } catch (err) {
        console.log(err);
    }
}
export async function updateEducation(data: IEducation, id: string) {
    try {
        await axios.put(`/${id}/education`, { ...data, id });
    } catch (err) {
        console.log(err);
    }
}
// Project 추가,수정
export async function addProject(data: IProject, id: string) {
    try {
        await axios.post(`/${id}/project`, { ...data, id });
    } catch (err) {
        console.log(err);
    }
}
export async function updateProject(data: IProject, id: string) {
    try {
        await axios.put(`/${id}/project`, { ...data, id });
    } catch (err) {
        console.log(err);
    }
}
