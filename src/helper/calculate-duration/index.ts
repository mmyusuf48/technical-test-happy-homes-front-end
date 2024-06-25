
export const CalculateDuration = (startTimeString:string,  endTimeString: string) => {
    const [startHour, startMinute, startSecond] = startTimeString.split(':').map(Number);
    const [endHour, endMinute, endSecond] = endTimeString.split(':').map(Number);
  
    const startTime = new Date();
    startTime.setHours(startHour, startMinute, startSecond);
  
    const endTime = new Date();
    endTime.setHours(endHour, endMinute, endSecond);
  
    const durationInMillis = endTime.getTime() - startTime.getTime();
  
    const hours = Math.floor(durationInMillis / (1000 * 60 * 60));
    const minutes = Math.floor((durationInMillis % (1000 * 60 * 60)) / (1000 * 60));
  
    return `${hours} jam ${minutes} menit`;
  }