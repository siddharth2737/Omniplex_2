import React, { useState } from "react";
import styles from "./Auth.module.css";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Modal, ModalContent } from "@nextui-org/modal";
import { useDispatch } from "react-redux";
import { setAuthState, setUserDetailsState } from "@/store/authSlice";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import Spinner from "../Spinner/Spinner";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const Auth = (props: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAuth = async () => {
    setLoading(true);
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      await setDoc(userRef, {
        userDetails: {
          email: user.email,
          name: user.displayName,
          profilePic: user.photoURL,
          createdAt: serverTimestamp(),
        },
      });

      dispatch(setAuthState(true));
      dispatch(
        setUserDetailsState({
          uid: user.uid,
          name: user.displayName ?? "",
          email: user.email ?? "",
          profilePic: user.photoURL ?? "",
        })
      );
      props.onClose();
      setLoading(false);
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
      setLoading(false);
    }
  };

  const handleEmailAuth = async () => {
    setLoading(true);
    const auth = getAuth();
    try {
      if (isRegister) {
        const result = await createUserWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );
        await setDoc(doc(db, "users", result.user.uid), {
          userDetails: {
            name: form.name,
            email: form.email,
            createdAt: serverTimestamp(),
          },
        });
      } else {
        await signInWithEmailAndPassword(auth, form.email, form.password);
      }
      dispatch(setAuthState(true));
      props.onClose();
    } catch (error) {
      console.error("Auth Error:", error);
    }
    setLoading(false);
  };

  return (
    <Modal
      size={"lg"}
      radius="md"
      shadow="sm"
      backdrop={"blur"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      placement="bottom-center"
    >
      <ModalContent>
        <div className={styles.modal}>
          <div className={styles.titleContainer}>
            <div className={styles.title}>
              {isRegister ? "Register" : "Login"}
            </div>
            
          </div>
          <div className={styles.container}>
            <form className={styles.form}>
              {isRegister && (
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              )}
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleInputChange}
                className={styles.input}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleInputChange}
                className={styles.input}
              />
              <div
                className={styles.button}
                onClick={handleEmailAuth}
              >
                {loading ? <Spinner /> : isRegister ? "Register" : "Login"}
              </div>
            </form>
            <div className={styles.toggle}>
              <span>
                {isRegister
                  ? "Already have an account?"
                  : "Don't have an account?"}
              </span>
              <button
                className={styles.link}
                onClick={() => setIsRegister(!isRegister)}
              >
                {isRegister ? "Login" : "Register"}
              </button>
            </div>
            <div className={styles.divider} style={{textAlign:'center'}}>OR</div>
            <div
              className={styles.button}
              onClick={handleAuth}
            >
              <Image
                src={"/svgs/Google.svg"}
                alt={"Google"}
                width={24}
                height={24}
              />
              Continue with Google
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default Auth;
