package fitnlu.ntpos.inventoryservice.adapter.webapi.mapper;

import fitnlu.ntpos.inventoryservice.adapter.webapi.dto.ExcelMaterial;
import fitnlu.ntpos.inventoryservice.domain.model.Material;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;

import java.util.Iterator;


public class ExcelMaterialMapper implements IExcelModelMapper<ExcelMaterial, Material> {
    private static ExcelMaterialMapper instance;
    private ExcelMaterialMapper() {
    }
    public static ExcelMaterialMapper getInstance(){
        if(instance==null){
            instance = new ExcelMaterialMapper();
        }
        return instance;
    }


    @Override
    public ExcelMaterial fromExcelRowToModel(Iterator<Cell> cellsInRow) {
        ExcelMaterial order = ExcelMaterial.builder().build();
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
    public void fromModelToExcelRow(ExcelMaterial template, Row row, int rowInt) {
        row.createCell(0).setCellValue(rowInt);
        row.createCell(1).setCellValue(template.getUserID());
        row.createCell(2).setCellValue(template.getGroup());
        row.createCell(3).setCellValue(template.getOrderDate());
        row.createCell(4).setCellValue(template.getStatus());
        row.createCell(5).setCellValue(template.getNote());
    }

    @Override
    public ExcelMaterial fromModelToExcelModel(Material o) {
        return null;
    }

    @Override
    public Material fromExcelModelToModel(ExcelMaterial excelMaterial) {
        return null;
    }


}
