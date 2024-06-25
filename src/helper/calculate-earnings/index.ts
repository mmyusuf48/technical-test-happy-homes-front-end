import { kegiatanData } from "@/feature/daftar-kegiatan/types";

const calculateDuration = (startTime: string, endTime: string): number => {
    const [startHour, startMinute, startSecond] = startTime.split(':').map(Number);
    const [endHour, endMinute, endSecond] = endTime.split(':').map(Number);

    const startDate = new Date();
    startDate.setHours(startHour, startMinute, startSecond);

    const endDate = new Date();
    endDate.setHours(endHour, endMinute, endSecond);

    const durationInMilliseconds = endDate.getTime() - startDate.getTime();
    const durationInHours = durationInMilliseconds / (1000 * 60 * 60);

    return durationInHours;
};

const CalculateEarnings = (kegiatan: kegiatanData): number => {
    const duration = calculateDuration(kegiatan.start_time, kegiatan.end_time);
    const userRate = kegiatan.user_rate;

    const regularHours = Math.min(duration, 8);
    const overtimeHours = Math.max(duration - 8, 0);

    const regularEarnings = regularHours * userRate;
    const overtimeEarnings = (overtimeHours * userRate) * 1.3; // 30% overtime rate

    return regularEarnings + overtimeEarnings;
};

export { CalculateEarnings };