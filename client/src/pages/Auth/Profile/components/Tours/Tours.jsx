/** @format */
import React, { useState, useEffect } from "react";
import styles from "./Tours.module.scss";
import axios from "axios";
import { FaEdit, FaTimes } from "react-icons/fa";
import { IoAddCircleSharp } from "react-icons/io5";
import ReactMarkdown from "react-markdown";
import TourAi from "./components/TourAi/TourAi";
import Contents from "./components/Contents/contents";
import { useAuth } from "../../../../../Contexts/Auth/Auth";

export default function Tours({ className }) {
    const [plans, setPlans] = useState([]);
    const [show, setShow] = useState(false);
    const [hide, setHide] = useState(false);
    const [id, setId] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [newName, setNewName] = useState("");
    const { userId } = useAuth();

    useEffect(() => {
        fetchPlans();
    }, [userId]);

    const fetchPlans = () => {
        axios
            .post(`${import.meta.env.VITE_BE_URL}/v1/api/plan/GetAll`, {
                UserId: userId,
            })
            .then((res) => setPlans(res.data))
            .catch((err) => console.error(err.message));
    };

    const handleRename = (planId, currentName) => {
        setEditingId(planId);
        setNewName(currentName);
    };

    const saveRename = async (id) => {
        try {
            axios
                .put(`${import.meta.env.VITE_BE_URL}/v1/api/plan/update`, {
                    id: id,
                    name: newName,
                    UserId: localStorage.getItem("userid"),
                })
                .then(() => window.location.reload())
                .catch((err) => console.error(err.response?.data || err));
            setEditingId(null);
            fetchPlans();
        } catch (error) {
            console.error("Error renaming plan:", error);
        }
    };

    console.log(plans);
    const cancelRename = () => {
        setEditingId(null);
        setNewName("");
    };

    return (
        <div className={className}>
            {hide && <TourAi setHide={setHide} />}
            {show && (
                <Contents
                    name={plans[id]?.name}
                    details={plans[id]?.details}
                    setShow={setShow}
                />
            )}
            <div className={styles.container}>
                <div className={styles.header}>
                    <h3>Hành trình của bạn</h3>
                    <div className={styles.actions}>
                        <button
                            onClick={() => setHide(true)}
                            className={styles.addButton}
                            aria-label="Add new plan"
                        >
                            <IoAddCircleSharp />
                            <span>Thêm chuyến du lịch mới </span>
                        </button>
                    </div>
                </div>

                {plans.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p>No plans yet. Create your first travel plan!</p>
                    </div>
                ) : (
                    <div className={styles.plans}>
                        {plans.map((plan, index) => (
                            <div className={styles.plan} key={plan.id || index}>
                                <div className={styles.planHeader}>
                                    {editingId === (plan.id || index) ? (
                                        <div className={styles.editControls}>
                                            <input
                                                type="text"
                                                value={newName}
                                                onChange={(e) =>
                                                    setNewName(e.target.value)
                                                }
                                                className={styles.nameInput}
                                                autoFocus
                                            />
                                            <button
                                                onClick={() =>
                                                    saveRename(plan._id)
                                                }
                                                className={styles.saveButton}
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={cancelRename}
                                                className={styles.cancelButton}
                                            >
                                                <FaTimes />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className={styles.title}>
                                            <h3
                                                onClick={() => {
                                                    setShow(true);
                                                    setId(index);
                                                }}
                                                className={styles.planTitle}
                                            >
                                                {plan.name}
                                            </h3>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRename(
                                                        plan.id || index,
                                                        plan.name,
                                                    );
                                                }}
                                                className={styles.editButton}
                                                aria-label="Rename plan"
                                            >
                                                <FaEdit />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div
                                    onClick={() => {
                                        setShow(true);
                                        setId(index);
                                    }}
                                    className={styles.planContent}
                                >
                                    <ReactMarkdown>
                                        {plan.details}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
