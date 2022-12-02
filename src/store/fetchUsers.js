import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { userActions } from "./userSlice";

export const fetchUsers = () => {
  return (dispatch) => {
    const fetchHandler = () => {
      const usersDocRef = query(collection(db, "users"));
      onSnapshot(usersDocRef, (snapShot) => {
        dispatch(
          userActions.setUsers(
            snapShot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
      });
    };
    fetchHandler();
  };
};

export const fetchQuestions = () => {
  return (dispatch) => {
    const fetchHandler = () => {
      const questionsDocRef = query(collection(db, "questions"));
      onSnapshot(questionsDocRef, (snapShot) => {
        dispatch(
          userActions.setQuestions(
            snapShot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
      });
    };
    fetchHandler();
  };
};
