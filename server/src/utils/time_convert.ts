
export function convertHourToMinutes(hour:string):number{
    let [h, m] = hour.split(':').map(Number)
    return  (h * 60) + m
}


export function convertMinutesToHour(minutes:number):string{
    let minutos = Math.floor(minutes / 60);
    let segundos = minutes % 60;
    return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`
}