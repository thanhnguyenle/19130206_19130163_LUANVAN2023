package fitnlu.ntpos.userservice.adapter.webapi.mapper;

import fitnlu.ntpos.userservice.adapter.webapi.dto.ExcelUser;
import fitnlu.ntpos.userservice.domain.model.User;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;

import java.util.Iterator;


public class ExcelUserMapper implements IExcelModelMapper<ExcelUser, User> {
    private static ExcelUserMapper instance;
    private ExcelUserMapper() {
    }
    public static ExcelUserMapper getInstance(){
        if(instance==null){
            instance = new ExcelUserMapper();
        }
        return instance;
    }


    @Override
    public ExcelUser fromExcelRowToModel(Iterator<Cell> cellsInRow) {
        ExcelUser order = ExcelUser.builder().build();
        int cellIdx = 0;
        while (cellsInRow.hasNext()) {
            Cell currentCell = cellsInRow.next();
            switch (cellIdx) {
                case 0 -> order.setId("");
                case 1 -> order.setName(currentCell.getStringCellValue());
                case 2 -> order.setUsername(currentCell.getStringCellValue());
                case 3 -> order.setEmail(currentCell.getStringCellValue());
                case 4 -> order.setPhoneNumber(currentCell.getStringCellValue());
                case 5 -> order.setAddress(currentCell.getStringCellValue());
                case 6 -> order.setAvatar(currentCell.getStringCellValue());
                case 7 -> order.setRegisteredAt(System.currentTimeMillis()/1000);
                default -> {
                }
            }
            cellIdx++;
        }
        return order;
    }

    @Override
    public void fromModelToExcelRow(ExcelUser template, Row row, int rowInt) {
        row.createCell(0).setCellValue(rowInt);
        row.createCell(1).setCellValue(template.getName());
        row.createCell(2).setCellValue(template.getUsername());
        row.createCell(3).setCellValue(template.getEmail());
        row.createCell(4).setCellValue(template.getPhoneNumber());
        row.createCell(5).setCellValue(template.getAddress());
        row.createCell(6).setCellValue(template.getAvatar());
        row.createCell(7).setCellValue(template.getRegisteredAt());
    }

    @Override
    public ExcelUser fromModelToExcelModel(User o) {
        return ExcelUser.builder()
                .id(o.getId())
                .name(o.getName())
                .username(o.getUsername())
                .email(o.getEmail())
                .phoneNumber(o.getPhoneNumber())
                .address(o.getAddress())
                .avatar(o.getAvatar())
                .registeredAt(o.getRegisteredAt())
                .build();
    }

    @Override
    public User fromExcelModelToModel(ExcelUser o) {
        return User.builder()
                .id(o.getId())
                .name(o.getName())
                .username(o.getUsername())
                .password("12345678")
                .email(o.getEmail())
                .phoneNumber(o.getPhoneNumber())
                .address(o.getAddress())
                .avatar(o.getAvatar())
                .registeredAt(o.getRegisteredAt())
                .build();
    }


}
