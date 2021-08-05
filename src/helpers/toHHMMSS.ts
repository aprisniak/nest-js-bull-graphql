export const toHHMMSS = (number: number) => {
    const sec_num = number;
    let hours: string   = String(Math.floor(sec_num / 3600));
    let minutes: string = String(Math.floor((sec_num - Number(hours) * 3600) / 60));
    let seconds: string = String(sec_num - Number(hours) * 3600 - Number(minutes) * 60);

    if (Number(hours) < 10) {
        hours   = `0${hours}`;
    }
    if (Number(minutes) < 10) {
        minutes = `0${minutes}`;
    }
    if (Number(seconds) < 10) {
        seconds = `0${seconds}`;
    }

    return {
        hours,
        minutes,
        seconds,
    };
};
