package fitnlu.ntpos.authservice.adapter.output.keycloak.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.Date;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DateTimeKeycloak {
    private int day;
    private int month;
    private int year;
    private int hour;
    private int minute;
    private int second;
    public void format(String date) {
        String[] dateArr = date.split("\\s+");
        String[] dateArr01 = dateArr[0].split("/");
        String[] dateArr02 = dateArr[1].split(":");
        this.day = Integer.parseInt(dateArr01[0]);
        this.month = Integer.parseInt(dateArr01[1]);
        this.year = Integer.parseInt(dateArr01[2]);
        this.hour = Integer.parseInt(dateArr02[0]);
        this.minute = Integer.parseInt(dateArr02[1]);
        this.second = Integer.parseInt(dateArr02[2]);
    }
    public void format(long date) {
        Date dateTime = new Date(date);
        Format format = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss");
        format(format.format(dateTime));
    }
}
