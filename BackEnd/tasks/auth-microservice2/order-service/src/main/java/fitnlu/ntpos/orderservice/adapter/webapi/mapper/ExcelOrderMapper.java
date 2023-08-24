package fitnlu.ntpos.orderservice.adapter.webapi.mapper;

import fitnlu.ntpos.orderservice.adapter.webapi.dto.ExcelOrder;
import fitnlu.ntpos.orderservice.domain.model.Order;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;

import java.util.Iterator;

public class ExcelOrderMapper implements IExcelModelMapper<ExcelOrder, Order> {
    private static ExcelOrderMapper instance;
    private ExcelOrderMapper() {
    }

    public static ExcelOrderMapper getInstance(){
        if(instance==null){
            instance = new ExcelOrderMapper();
        }
        return instance;
    }


    @Override
    public ExcelOrder fromExcelRowToModel(Iterator<Cell> cellsInRow) {
        ExcelOrder order = ExcelOrder.builder().build();
        int cellIdx = 0;
        while (cellsInRow.hasNext()) {
            Cell currentCell = cellsInRow.next();
            switch (cellIdx) {
                case 0 -> order.setId("");
                case 1 -> order.setUserID(getCellStringType(currentCell));
                case 2 -> order.setGroup(getCellStringType(currentCell));
                case 3 -> order.setOrderDate(getCellLongType(currentCell));
                case 4 -> order.setStatus(getCellStringType(currentCell));
                case 5 -> order.setNote(getCellStringType(currentCell));
                default -> {
                }
            }
            cellIdx++;
        }
        return order;
    }

    private String getCellStringType(Cell cell){
        if(cell.getCellType() == CellType.STRING){
            return cell.getStringCellValue();
        }else if (cell.getCellType() == CellType.NUMERIC){
            return String.valueOf(cell.getNumericCellValue());
        }
        return "";
    }
    private long getCellLongType(Cell cell){
        if(cell.getCellType() == CellType.STRING){
            return Long.parseLong(cell.getStringCellValue());
        }else if (cell.getCellType() == CellType.NUMERIC){
            return Math.round(cell.getNumericCellValue());
        }
        return 0L;
    }

    @Override
    public void fromModelToExcelRow(ExcelOrder template, Row row, int rowInt) {
        row.createCell(0).setCellValue(rowInt);
        row.createCell(1).setCellValue(template.getUserID());
        row.createCell(2).setCellValue(template.getGroup());
        row.createCell(3).setCellValue(template.getOrderDate());
        row.createCell(4).setCellValue(template.getStatus());
        row.createCell(5).setCellValue(template.getNote());
    }

    @Override
    public ExcelOrder fromModelToExcelModel(Order o) {
        return ExcelOrder.builder()
                .id(o.getId())
                .userID(o.getUserID())
                .orderDate(o.getOrderDate())
                .note(o.getNote())
                .group(o.getGroup())
                .status(o.getStatus())
                .build();
    }

    @Override
    public Order fromExcelModelToModel(ExcelOrder o) {
        return Order.builder()
                .id(o.getId())
                .userID(o.getUserID())
                .orderDate(o.getOrderDate())
                .note(o.getNote())
                .group(o.getGroup())
                .status(o.getStatus())
                .build();
    }

}
