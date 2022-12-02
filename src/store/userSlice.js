import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    currentUser: {},
    isAuthenticated: false,
    questions: [],
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setCurrentUser: (state) => {
      state.currentUser = state.users[0];
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    logUserIn: (state, action) => {
      const { loginEmail, loginPassword } = action.payload;
      const result = state.users.find((user) => user.data.email === loginEmail);
      if (result) {
        if (result.data.password === loginPassword) {
          console.log("correct password");
          state.currentUser = result;
          state.isAuthenticated = true;
        } else {
          alert("Incorrect Password");
        }
      } else {
        alert("No Email Found");
      }
    },
    logUserOut: (state) => {
      state.currentUser = {};
      state.isAuthenticated = false;
    },
    sortQuestions: (state) => {
      state.questions[0].data.questions.reverse();
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
