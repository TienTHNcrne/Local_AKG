/** @format */

// useReq.js
import axios from 'axios';
import { useTour } from '../Desktop/Contexts/useTour';

export default function useSendReq() {
    const { days, budget, startPlace, lovePlaces, setChatPresent, setLoading } =
        useTour();

    const sendRequest = async () => {
        const userId = localStorage.getItem('userid');

        let prompt = '';
        if (!lovePlaces || lovePlaces.length === 0) {
            prompt = 'Tạo tôi 1 hành trình du lịch An Giang. ';
        } else {
            prompt = 'Tôi muốn đi du lịch các địa điểm: ';
            lovePlaces.forEach(p => {
                prompt += p.name.split(',')[0] + ' ';
            });
        }

        prompt += `| Số ngày: ${days} ngày | Ngân sách: ${budget} triệu đồng | Xuất phát từ: ${startPlace}`;

        try {
            setLoading(true);
            const res = await axios.post(
                `${import.meta.env.VITE_BE_URL}/v1/api/tour`,
                { prompt },
                { headers: { UserId: userId } }
            );
            console.log(res.data);
            setChatPresent(prev => [
                ...prev,
                { role: 'assistant', text: res.data, isNew: true },
            ]);
        } catch (err) {
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    return sendRequest;
}
