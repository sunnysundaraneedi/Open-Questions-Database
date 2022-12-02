import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase/firebase";
import Profile from "../Profile/Profile";
import "./Profiles.css";

const Profiles = () => {
  const { profileID } = useParams();
  console.log(profileID);

  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // Current User

  useEffect(() => {
    const user = async () => {
      const docRef = doc(db, "users", profileID);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setUser(docSnap.data());
        setIsLoading(false);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    };
    user();
  }, [profileID]);
  console.log(user);
  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <div className="profile_container">
      <Profile user={user} />
    </div>
  );
};

export default Profiles;
