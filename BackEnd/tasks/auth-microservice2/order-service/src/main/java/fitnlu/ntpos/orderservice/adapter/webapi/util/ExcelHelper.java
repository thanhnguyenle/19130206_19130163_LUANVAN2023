package fitnlu.ntpos.orderservice.adapter.webapi.util;

import com.example.demo.entities.Actor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

@Component
public class ExcelHelper {
    public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    static String[] HEADERs = { "Id", "LastName", "FirstName" };
    static String SHEET = "Actor";
    @Autowired
    StylesGenerator stylesGenerator;
    public static boolean hasExcelFormat(MultipartFile file) {

        if (!TYPE.equals(file.getContentType())) {
            return false;
        }

        return true;
    }

    public List<Actor> excelToTutorials(InputStream is) {
        try {
            Workbook workbook = new XSSFWorkbook(is);

            Sheet sheet = workbook.getSheet(SHEET);
            Iterator<Row> rows = sheet.iterator();

            List<Actor> tutorials = new ArrayList<Actor>();

            int rowNumber = 0;
            while (rows.hasNext()) {
                Row currentRow = rows.next();

                // skip header
                if (rowNumber == 0) {
                    rowNumber++;
                    continue;
                }

                Iterator<Cell> cellsInRow = currentRow.iterator();

                Actor tutorial = new Actor();

                int cellIdx = 0;
                while (cellsInRow.hasNext()) {
                    Cell currentCell = cellsInRow.next();

                    switch (cellIdx) {
                        case 0:
                            tutorial.setActor_id((int) currentCell.getNumericCellValue());
                            break;

                        case 1:
                            tutorial.setLast_name(currentCell.getStringCellValue());
                            break;

                        case 2:
                            tutorial.setFirst_name(currentCell.getStringCellValue());
                            break;
                        default:
                            break;
                    }

                    cellIdx++;
                }

                tutorials.add(tutorial);
            }

            workbook.close();

            return tutorials;
        } catch (IOException e) {
            throw new RuntimeException("fail to parse Excel file: " + e.getMessage());
        }
    }

    public ByteArrayInputStream tutorialsToExcel(List<Actor> tutorials) {

        try (Workbook workbook = new XSSFWorkbook();
             ByteArrayOutputStream out = new ByteArrayOutputStream();) {
             Sheet sheet = workbook.createSheet(SHEET);

            Map<CustomCellStyle, CellStyle> styles = stylesGenerator.prepareStyles(workbook);
            setColumnsWidth(sheet);

            // Header
            createHeaderRow(sheet,styles);

            int rowIdx = 1;
            for (Actor tutorial : tutorials) {
                Row row = sheet.createRow(rowIdx++);

                row.createCell(0).setCellValue(tutorial.getActor_id());
                row.createCell(1).setCellValue(tutorial.getLast_name());
                row.createCell(2).setCellValue(tutorial.getFirst_name());
            }

            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        } catch (IOException e) {
            throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
        }
    }
    private void setColumnsWidth(Sheet sheet) {
        sheet.setColumnWidth(0, 256 * 5);

        for (int columnIndex = 1; columnIndex < HEADERs.length+1; columnIndex++) {
            sheet.setColumnWidth(columnIndex, 256 * 15);
        }
    }

    private void createHeaderRow(Sheet sheet, Map<CustomCellStyle, CellStyle> styles) {
        Row headerRow = sheet.createRow(0);

        for (int col = 0; col < HEADERs.length; col++) {
            Cell cell = headerRow.createCell(col);
            cell.setCellValue(HEADERs[col]);
            cell.setCellStyle(styles.get(CustomCellStyle.GREY_CENTERED_BOLD_ARIAL_WITH_BORDER));
        }
    }

    private void createRowLabelCell(Row row, Map<CustomCellStyle, CellStyle> styles, String label) {
        Cell rowLabel = row.createCell(0);
        rowLabel.setCellValue(label);
        rowLabel.setCellStyle(styles.get(CustomCellStyle.RED_BOLD_ARIAL_WITH_BORDER));
    }

    private void createStringsRow(Sheet sheet, Map<CustomCellStyle, CellStyle> styles) {
        Row row = sheet.createRow(1);
        createRowLabelCell(row, styles, "Strings row");

        for (int columnNumber = 1; columnNumber < 5; columnNumber++) {
            Cell cell = row.createCell(columnNumber);

            cell.setCellValue("String " + columnNumber);
            cell.setCellStyle(styles.get(CustomCellStyle.RIGHT_ALIGNED));
        }
    }

    private void createDoublesRow(Sheet sheet, Map<CustomCellStyle, CellStyle> styles) {
        Row row = sheet.createRow(2);
        createRowLabelCell(row, styles, "Doubles row");

        for (int columnNumber = 1; columnNumber < 5; columnNumber++) {
            Cell cell = row.createCell(columnNumber);

            cell.setCellValue(new BigDecimal(columnNumber + ".99").doubleValue());
            cell.setCellStyle(styles.get(CustomCellStyle.RIGHT_ALIGNED));
        }
    }

    private void createDatesRow(Sheet sheet, Map<CustomCellStyle, CellStyle> styles) {
        Row row = sheet.createRow(3);
        createRowLabelCell(row, styles, "Dates row");

        for (int columnNumber = 1; columnNumber < 5; columnNumber++) {
            Cell cell = row.createCell(columnNumber);

            cell.setCellValue(LocalDate.now());
            cell.setCellStyle(styles.get(CustomCellStyle.RIGHT_ALIGNED_DATE_FORMAT));
        }
    }
}
