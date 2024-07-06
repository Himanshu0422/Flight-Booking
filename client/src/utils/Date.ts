import dayjs from "dayjs";

export function getDate(data?: dayjs.Dayjs | Date | string | number): string {
	if (data) {
		return dayjs(data).locale('hi').format('YYYY MMMM DD');
	}
	const today = dayjs(new Date()).locale('hi').format('YYYY MMMM DD');
	
	return today;
}

export function getCurrentTime(): string {
	const currentDate = new Date();

	let hours = currentDate.getHours();
	let minutes = currentDate.getMinutes();

	minutes = minutes < 10 ? 0 + minutes : minutes;
	const time = `${hours}:${minutes}`;

	return time;
}
