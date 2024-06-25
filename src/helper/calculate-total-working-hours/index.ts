
interface Kegiatan {
    id: number;
    start_time: string;
    end_time: string;
  }
  
  export const CalculateTotalWorkingHours = (kegiatans: Kegiatan[]): string => {
    let totalJam = 0;
    let totalMenit = 0;
    let totalDetik = 0;
  
    kegiatans.forEach((kegiatan) => {
      const [startHour, startMinute, startSecond] = kegiatan.start_time.split(':').map(Number);
      const [endHour, endMinute, endSecond] = kegiatan.end_time.split(':').map(Number);
  
      const durasiDetik = (endHour * 3600 + endMinute * 60 + endSecond) - (startHour * 3600 + startMinute * 60 + startSecond);
  
      totalJam += Math.floor(durasiDetik / 3600);
      totalMenit += Math.floor((durasiDetik % 3600) / 60);
      totalDetik += durasiDetik % 60;
    });
  
    totalMenit += Math.floor(totalDetik / 60);
    totalDetik %= 60;
    totalJam += Math.floor(totalMenit / 60);
    totalMenit %= 60;
  
    const totalJamKerja = `${totalJam} jam ${totalMenit} menit`;
  
    return totalJamKerja;
  };
  