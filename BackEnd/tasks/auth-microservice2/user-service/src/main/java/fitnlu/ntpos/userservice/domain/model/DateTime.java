package fitnlu.ntpos.userservice.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.security.Timestamp;
import java.text.DateFormat;
import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DateTime {
    private long timestamp;

    public String toString() {
        Date date = new Date(timestamp);
        Format format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        return format.format(date);
    }

    public static DateTime now() {
        return DateTime.builder().timestamp(System.currentTimeMillis()).build();
    }

    public static DateTime fromString(String str) {
        try {
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            Date date = formatter.parse(str);
            return DateTime.builder().timestamp(date.getTime()).build();
        } catch (Exception e) {
            return null;
        }
    }

    public static DateTime fromLong(long timestamp) {
        return DateTime.builder().timestamp(timestamp).build();
    }

    static class DateTimeSub {
         int year;
         int month;
         int day;
         int hour;
         int minute;
         int second;
        public DateTimeSub(long timestamp) {
            updateDateTime(timestamp);
        }
        public void updateDateTime(long timestamp){
            try {
                DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
                String str = format.format(timestamp);
                String[] dateSeparate = str.split(" ");
                String[] dateStr = dateSeparate[0].split("-");
                this.year = Integer.parseInt(dateStr[0]);
                this.month = Integer.parseInt(dateStr[1]);
                this.day = Integer.parseInt(dateStr[2]);
                String[] timeStr = dateSeparate[1].split(":");
                this.hour = Integer.parseInt(timeStr[0]);
                this.minute = Integer.parseInt(timeStr[1]);
                this.second = Integer.parseInt(timeStr[2]);
            }catch (Exception e){
                e.printStackTrace();
            }
        }
        public long makeTimestamp(int year, int month, int day, int hour, int minute,
                                              int second, int millisecond) {
            Calendar cal = new GregorianCalendar();
            cal.set(Calendar.YEAR, year);
            cal.set(Calendar.MONTH, month - 1);
            cal.set(Calendar.DATE, day);
            cal.set(Calendar.HOUR_OF_DAY, hour);
            cal.set(Calendar.MINUTE, minute);
            cal.set(Calendar.SECOND, second);
            cal.set(Calendar.MILLISECOND, millisecond);
            // now convert GregorianCalendar object to Timestamp object
            return cal.getTimeInMillis();
        }
        public long getTimestamp() {
            return makeTimestamp(this.year, this.month, this.day, this.hour, this.minute, this.second, 0);//            return (this.year * 365L + this.month * 30L + this.day) * 86400000L + (this.hour * 24L+ this.minute * 60L + this.second);
        }

        public long getStartTimeStampThisWeek(long todayTimeStamp){
            long numberOfWeek = todayTimeStamp / (60*60*24*7*1000);
            long startWeek = numberOfWeek * (60*60*24*7*1000);
            updateDateTime(startWeek);
            this.day -=3; // first day is 01/01/1970 (thursday)
             return getTimestamp();
        }
        public long getStartTimeStampThisMonth(long todayTimeStamp){
            updateDateTime(todayTimeStamp);
            this.day = 1;
            return getTimestamp();
        }
        public long getStartTimeStampThisYear(long todayTimeStamp){
            updateDateTime(todayTimeStamp);
            this.day = 1;
            this.month = 1;
            return getTimestamp();
        }
    }

    public static boolean checkTimeSearch(TimeSearch timeSearch, long timestamp) {
        long currentTimeStamp = System.currentTimeMillis();
        long todayTimeStamp =(currentTimeStamp / 86400000) * 86400000;
        DateTimeSub dateTimeSub = new DateTimeSub(timestamp);
        // start week
        long startWeek = dateTimeSub.getStartTimeStampThisWeek(todayTimeStamp);
        // start month
        long startMonth = dateTimeSub.getStartTimeStampThisMonth(todayTimeStamp);
        // start year
        long startYear = dateTimeSub.getStartTimeStampThisYear(todayTimeStamp);
        if (timeSearch == TimeSearch.ALL_TIME) {
            return true;
        }else if (timeSearch == TimeSearch.TODAY && timestamp >= todayTimeStamp) {
            return true;
        }else if (timeSearch == TimeSearch.YESTERDAY && timestamp >= todayTimeStamp - 86400000L && timestamp< todayTimeStamp) {
            return true;
        }else if (timeSearch == TimeSearch.THIS_WEEK && timestamp >= startWeek) {
            return true;
        }else if (timeSearch == TimeSearch.LAST_WEEK && timestamp >= startWeek - 86400000L * 7 && timestamp < startWeek){
            return true;
        }else if (timeSearch == TimeSearch.THIS_MONTH && timestamp >= startMonth) {
            return true;
        }else if (timeSearch == TimeSearch.LAST_MONTH && timestamp >= startMonth - 86400000L * 30 && timestamp < startMonth){
            return true;
        }else if (timeSearch == TimeSearch.THIS_YEAR && timestamp >= startYear) {
            return true;
        }else return timeSearch == TimeSearch.LAST_YEAR && timestamp >= startYear - 86400000L * 365 && timestamp < startYear;
    }

    }
