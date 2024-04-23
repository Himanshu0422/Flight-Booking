import dayjs from "dayjs";

export function getDate(data) {
    if(data){
        return dayjs(data).locale('hi').format('YYYY MMMM DD');
    }
    const today = dayjs(new Date()).locale('hi').format('YYYY MMMM DD');
    return today;
}

export function getCurrentTime() {
    const currentDate = new Date();

    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();

    minutes = minutes < 10 ? '0' + minutes : minutes;
    const time = `${hours}:${minutes}`;

    return time
}