package fitnlu.ntpos.productservice.adapter.webapi.util;

import fitnlu.ntpos.productservice.adapter.webapi.constant.CustomCellStyle;
import org.apache.poi.ss.usermodel.*;

import java.util.Map;

public class StylesGenerator {
    private static StylesGenerator instance;

    private StylesGenerator() {
    }

    public static StylesGenerator getInstance(){
        if(instance==null){
            return new StylesGenerator();
        }
        return instance;
    }

    public Map<CustomCellStyle, CellStyle> prepareStyles(Workbook wb) {
        Font boldArial = createBoldArialFont(wb);
        Font redBoldArial = createRedBoldArialFont(wb);

        CellStyle rightAlignedStyle = createRightAlignedStyle(wb);
        CellStyle greyCenteredBoldArialWithBorderStyle =
                createGreyCenteredBoldArialWithBorderStyle(wb, boldArial);
        CellStyle redBoldArialWithBorderStyle =
                createRedBoldArialWithBorderStyle(wb, redBoldArial);
        CellStyle rightAlignedDateFormatStyle =
                createRightAlignedDateFormatStyle(wb);

        return Map.of(
                CustomCellStyle.RIGHT_ALIGNED , rightAlignedStyle,
                CustomCellStyle.GREY_CENTERED_BOLD_ARIAL_WITH_BORDER , greyCenteredBoldArialWithBorderStyle,
                CustomCellStyle.RED_BOLD_ARIAL_WITH_BORDER , redBoldArialWithBorderStyle,
                CustomCellStyle.RIGHT_ALIGNED_DATE_FORMAT , rightAlignedDateFormatStyle
        );
    }
    private Font createBoldArialFont(Workbook wb){
        Font font = wb.createFont();
        font.setFontName("Arial");
        font.setBold(true);
        return font;
    }
    private Font createRedBoldArialFont(Workbook wb) {
        Font font = wb.createFont();
        font.setFontName("Arial");
        font.setBold(true);
        font.setColor(IndexedColors.RED.index);
        return font;
    }
    private CellStyle createRightAlignedStyle(Workbook wb)  {
        CellStyle style = wb.createCellStyle();
        style.setAlignment(HorizontalAlignment.RIGHT);
        return style;
    }

    private CellStyle createBorderedStyle(Workbook wb) {
        BorderStyle thin = BorderStyle.THIN;
        short black = IndexedColors.BLACK.getIndex();
        CellStyle style = wb.createCellStyle();
        style.setBorderRight(thin);
        style.setRightBorderColor(black);
        style.setBorderBottom(thin);
        style.setBottomBorderColor(black);
        style.setBorderLeft(thin);
        style.setLeftBorderColor(black);
        style.setBorderTop(thin);
        style.setTopBorderColor(black);
        return style;
    }

    private CellStyle createGreyCenteredBoldArialWithBorderStyle(Workbook wb,Font boldArial)  {
        CellStyle style = createBorderedStyle(wb);
        style.setAlignment(HorizontalAlignment.CENTER);
        style.setFont(boldArial);
        style.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex()) ;
        style.setFillPattern( FillPatternType.SOLID_FOREGROUND);
        return style;
    }

    private CellStyle createRedBoldArialWithBorderStyle(Workbook wb,Font redBoldArial) {
        CellStyle style = createBorderedStyle(wb);
        style.setFont(redBoldArial);
        return style;
    }

    private CellStyle createRightAlignedDateFormatStyle(Workbook wb) {
        CellStyle style = wb.createCellStyle();
        style.setAlignment(HorizontalAlignment.RIGHT);
        style.setDataFormat((short) 14);
        return style;
    }
}
