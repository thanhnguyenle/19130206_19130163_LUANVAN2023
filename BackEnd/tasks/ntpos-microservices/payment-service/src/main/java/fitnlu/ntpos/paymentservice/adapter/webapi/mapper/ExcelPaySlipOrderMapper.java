package fitnlu.ntpos.paymentservice.adapter.webapi.mapper;

import fitnlu.ntpos.paymentservice.adapter.webapi.dto.ExcelPaySlipOrder;
import fitnlu.ntpos.paymentservice.domain.model.PaySlip;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;

import java.util.Iterator;


public class ExcelPaySlipOrderMapper implements IExcelModelMapper<ExcelPaySlipOrder, PaySlip> {
    private static ExcelPaySlipOrderMapper instance;
    private ExcelPaySlipOrderMapper() {
    }
    public static ExcelPaySlipOrderMapper getInstance(){
        if(instance==null){
            instance = new ExcelPaySlipOrderMapper();
        }
        return instance;
    }


    @Override
    public ExcelPaySlipOrder fromExcelRowToModel(Iterator<Cell> cellsInRow) {
        ExcelPaySlipOrder order = ExcelPaySlipOrder.builder().build();
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
    public void fromModelToExcelRow(ExcelPaySlipOrder template, Row row, int rowInt) {
        row.createCell(0).setCellValue(rowInt);
        row.createCell(1).setCellValue(template.getUserID());
        row.createCell(2).setCellValue(template.getGroup());
        row.createCell(3).setCellValue(template.getOrderDate());
        row.createCell(4).setCellValue(template.getStatus());
        row.createCell(5).setCellValue(template.getNote());
    }

    @Override
    public ExcelPaySlipOrder fromModelToExcelModel(PaySlip o) {
        return null;
    }

    @Override
    public PaySlip fromExcelModelToModel(ExcelPaySlipOrder excelMaterial) {
        return null;
    }


}
