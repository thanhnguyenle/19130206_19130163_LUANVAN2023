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
    private int day;
    private int month;
    private int year;
    private int hour;
    private int minute;
    private int second;
}
