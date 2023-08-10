package fitnlu.ntpos.orderservice.adapter.webapi.util;

import fitnlu.ntpos.orderservice.adapter.webapi.constant.CustomCellStyle;
import fitnlu.ntpos.orderservice.adapter.webapi.mapper.IExcelModelMapper;
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
import java.util.*;
public abstract class AbsExcelHelper<T, O> {
    public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    public abstract String getSheetName();
    public abstract String[] getHeaders();
    @Autowired(required=false)
    private final StylesGenerator stylesGenerator;
    @Autowired(required=false)
    private final IExcelModelMapper<T, O> iExcelModelMapper;

    public AbsExcelHelper(StylesGenerator stylesGenerator, IExcelModelMapper<T, O> iExcelModelMapper) {
        this.stylesGenerator = stylesGenerator;
        this.iExcelModelMapper = iExcelModelMapper;
    }

    public boolean hasExcelFormat(MultipartFile file) {

        if (!TYPE.equals(file.getContentType())) {
            return false;
        }

        return true;
    }

    public List<T> importExcelFileToOrders(InputStream is) {
        try {
            Workbook workbook = new XSSFWorkbook(is);

            Sheet sheet = workbook.getSheet(getSheetName());
            Iterator<Row> rows = sheet.iterator();

            List<T> templates = new ArrayList<>();

            int rowNumber = 0;
            while (rows.hasNext()) {
                Row currentRow = rows.next();

                // skip header
                if (rowNumber == 0) {
                    rowNumber++;
                    continue;
                }
                Iterator<Cell> cellsInRow = currentRow.iterator();
                T template = iExcelModelMapper.fromExcelRowToModel(cellsInRow);
                templates.add(template);
            }
            workbook.close();
            return templates;
        } catch (IOException e) {
            throw new RuntimeException("fail to parse Excel file: " + e.getMessage());
        }
    }

    public ByteArrayInputStream exportOrdersToExcelFile(List<T> templates) {

        try (Workbook workbook = new XSSFWorkbook();
             ByteArrayOutputStream out = new ByteArrayOutputStream();) {
             Sheet sheet = workbook.createSheet(getSheetName());

            Map<CustomCellStyle, CellStyle> styles = stylesGenerator.prepareStyles(workbook);
            setColumnsWidth(sheet);

            // Header
            createHeaderRow(sheet,styles);

            int rowIdx = 1;
            for (T template : templates) {
                Row row = sheet.createRow(rowIdx++);
                iExcelModelMapper.fromModelToExcelRow(template, row, rowIdx);
            }
            workbook.write(out);
            return new ByteArrayInputStream(out.toByteArray());
        } catch (IOException e) {
            throw new RuntimeException("fail to import data to Excel file: " + e.getMessage());
        }
    }
    private void setColumnsWidth(Sheet sheet) {
        sheet.setColumnWidth(0, 256 * 5);

        for (int columnIndex = 1; columnIndex < getHeaders().length+1; columnIndex++) {
            sheet.setColumnWidth(columnIndex, 256 * 15);
        }
    }

    private void createHeaderRow(Sheet sheet, Map<CustomCellStyle, CellStyle> styles) {
        Row headerRow = sheet.createRow(0);

        for (int col = 0; col < getHeaders().length; col++) {
            Cell cell = headerRow.createCell(col);
            cell.setCellValue(getHeaders()[col]);
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
