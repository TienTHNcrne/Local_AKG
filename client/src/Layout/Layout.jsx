/** @format */

import TravelerHeader from "../components/Header/TravelerHeader/TravelerHeader";
import BusinessHeader from "../components/Header/BusinessHeader/BusinessHeader";
import Footer from "../components/Footer/Footer";
import styles from "./Layout.module.scss";
import AI from "../components/AI/AI";
import { useAuth } from "../Contexts/Auth/Auth";
export default function Before_Login({ children }) {
    const { user } = useAuth();
    console.log("Current role in Layout:", localStorage.getItem("role"));
    return (
        <div className={styles.wrapper}>
            {user.role === "business" ? <BusinessHeader /> : <TravelerHeader />}
            <div className={styles.extra}>
                <AI />
            </div>
            <div className={styles.content}>{children}</div>
            <Footer className={styles.footer} />
        </div>
    );
}
