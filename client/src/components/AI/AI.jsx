/* global process */
import { useState } from "react";
import axios from "axios";
import styles from "./AI.module.scss";
import { useEffect } from "react";
import { IoSend } from "react-icons/io5";
export default function Ai() {
    const URL = import.meta.env.VITE_BE_URL;
    const [hide, setHide] = useState(false);
    const [rep, setRep] = useState("");
    const [content, setContent] = useState("");
    const [save, setSave] = useState([]);
    const submit = () => {
        setSave((prev) => [...prev, { role: "user", text: content }]);
        axios
            .post(
                `${URL}/v1/api/ai`,
                { prompt: content },
                {
                    headers: {
                        userId: localStorage.getItem("userid"),
                    },
                }
            )
            .then((res) => {
                const data = res.data.choices[0].message.content;
                console.log("check ai", res);
                setRep(data);
                setSave((prev) => [...prev, { role: "assistant", text: data }]);
                setContent("");
                console.log(save);
            })
            .catch((err) => {
                console.error(err);
            });
    };
    //
    useEffect(() => {
        console.log("first effect");
        axios
            .post(`${URL}v1/api/historicAI`, {
                userId: localStorage.getItem("userid"),
            })
            .then((res) => setSave(res.data))
            .catch((err) => console.error("Lỗi API:", err));
    }, []);
    return (
        <div className={styles.container}>
            {hide ? (
                <div className={styles.chatbot}>
                    <div className={styles.head}>
                        {/*icon */}
                        <h3>chatbot name</h3>
                        <button
                            onClick={() => {
                                setHide(!hide);
                            }}
                        >
                            x
                        </button>
                    </div>
                    <div className={styles.content}>
                        {save.map((value, id) => (
                            <div key={id} className={styles[value.role]}>
                                <p>{value.text}</p>
                            </div>
                        ))}
                    </div>
                    {/*INPUT */}
                    <div className={styles.input}>
                        <input
                            type="text"
                            placeholder="you can write ......"
                            value={content || ""}
                            onChange={(e) => {
                                setContent(e.target.value);
                                console.log(content);
                            }}
                        />
                        <button type="submit" onClick={submit}>
                            <IoSend />{" "}
                        </button>
                    </div>
                </div>
            ) : (
                <button
                    onClick={() => {
                        setHide(!hide);
                    }}
                >
                    Chat LGBT
                </button>
            )}
        </div>
    );
}
