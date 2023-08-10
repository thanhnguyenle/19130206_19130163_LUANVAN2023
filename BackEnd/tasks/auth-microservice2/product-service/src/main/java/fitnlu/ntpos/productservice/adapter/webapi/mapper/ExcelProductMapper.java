package fitnlu.ntpos.productservice.adapter.webapi.mapper;
import fitnlu.ntpos.productservice.adapter.webapi.dto.ExcelProduct;
import fitnlu.ntpos.productservice.domain.model.Product;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;

import java.util.Iterator;


public class ExcelProductMapper implements IExcelModelMapper<ExcelProduct, Product> {
    private static ExcelProductMapper instance;
    private ExcelProductMapper() {
    }
    public static ExcelProductMapper getInstance(){
        if(instance==null){
            instance = new ExcelProductMapper();
        }
        return instance;
    }


    @Override
    public ExcelProduct fromExcelRowToModel(Iterator<Cell> cellsInRow) {
        ExcelProduct order = ExcelProduct.builder().build();
        int cellIdx = 0;
        while (cellsInRow.hasNext()) {
            Cell currentCell = cellsInRow.next();
            switch (cellIdx) {
                case 0 -> order.setId("");
                case 1 -> order.setUserID(currentCell.getStringCellValue());
                case 2 -> order.setGroup(currentCell.getStringCellValue());
                case 3 -> order.setOrderDate(Math.round(currentCell.getNumericCellValue()));
                case 4 -> order.setStatus(currentCell.getStringCellValue());
                case 5 -> order.setNote(currentCell.getStringCellValue());
                default -> {
                }
            }
            cellIdx++;
        }
        return order;
    }

    @Override
    public void fromModelToExcelRow(ExcelProduct template, Row row, int rowInt) {
        row.createCell(0).setCellValue(rowInt);
        row.createCell(1).setCellValue(template.getUserID());
        row.createCell(2).setCellValue(template.getGroup());
        row.createCell(3).setCellValue(template.getOrderDate());
        row.createCell(4).setCellValue(template.getStatus());
        row.createCell(5).setCellValue(template.getNote());
    }

    @Override
    public ExcelProduct fromModelToExcelModel(Product o) {
        return null;
    }

    @Override
    public Product fromExcelModelToModel(ExcelProduct excelMaterial) {
        return null;
    }


}
