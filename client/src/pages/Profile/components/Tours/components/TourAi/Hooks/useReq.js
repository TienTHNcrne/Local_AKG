/** @format */

// useReq.js
import axios from "axios";
import { useTour } from "../Desktop/Contexts/useTour";

export default function useSendReq() {
    const { days, budget, startPlace, lovePlaces, setChatPresent, setLoading } =
        useTour();

    const sendRequest = async () => {
       
    };

    return sendRequest;
}
