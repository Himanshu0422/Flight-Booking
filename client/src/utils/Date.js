import dayjs from "dayjs";

export default function getTodayDate() {
    const today = dayjs(new Date()).locale('hi').format('YYYY MMMM DD');
    return today;
}