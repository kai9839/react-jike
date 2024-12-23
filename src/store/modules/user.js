import { createSlice } from "@reduxjs/toolkit";
import { http } from "@/utils";

const userSlice = createSlice({
  name: "user",
  // 数据状态
  initialState: {
    userInfo: {},
    token: localStorage.getItem('token') || '',
  },
  // 同步修改方法
  reducers: {
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem('token', action.payload)
    },
  },
});

// 解构出actionCreater
const { setUserInfo, setToken } = userSlice.actions;

// 获取reducer函数
const userReducer = userSlice.reducer;

const fetchLogin = (loginForm) => {
  return async (dispatch) => {
    const res = await http.post("/authorizations", loginForm);

    // 1.保存token
    dispatch(setToken(res.data.token));
    localStorage.setItem("token", res.data.token);
    
  };
};

const fetchUserInfo = () => {
  return async (dispatch) => {
    const res = await http.get("/user/profile");
    dispatch(setUserInfo(res.data));
    localStorage.setItem("userInfo", JSON.stringify(res.data))
  };
};

const clearUserInfo = () => {
  return async (dispatch) => {
    dispatch(setUserInfo({}));
    dispatch(setToken(""));
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo")
  };
};

export { fetchLogin, fetchUserInfo, clearUserInfo }

export default userReducer;
