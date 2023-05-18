package fitnlu.ntpos.userservice.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.Date;

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

    public static TimeSearch getTimeSearch(long timestamp) {
        long today_start =(System.currentTimeMillis() / 86400000) * 86400000;
        if (timestamp >= today_start) {
            return TimeSearch.TODAY;
        }
        if (timestamp >= today_start - 86400000L) {
            return TimeSearch.YESTERDAY;
        }
        if (timestamp >= today_start - 86400000L * 7) {
            return TimeSearch.THIS_WEEK;
        }
        if (timestamp >= today_start - 86400000L * 14) {
            return TimeSearch.LAST_WEEK;
        }
        if (timestamp >= today_start - 86400000L * 30) {
            return TimeSearch.THIS_MONTH;
        }
        if (timestamp >= today_start - 86400000L * 60) {
            return TimeSearch.LAST_MONTH;
        }
        if (timestamp >= today_start - 86400000L * 365) {
            return TimeSearch.THIS_YEAR;
        }
        if (timestamp >= today_start - 86400000L * 730) {
            return TimeSearch.LAST_YEAR;
        }
        return TimeSearch.ALL_TIME;
    }

}
