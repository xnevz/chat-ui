export function getTime(unixDate: number) {
    const date = new Date(unixDate * 1000);
    const hours = date.getHours() % 12;
    const IsAM = date.getHours() < 12;
    return `${hours}:${date.getMinutes()} ${IsAM ? 'AM' : 'PM'}`;
}

export const DOT = '•';