package fitnlu.ntpos.productservice.adapter.webapi.mapper;
import fitnlu.ntpos.productservice.adapter.webapi.dto.ExcelProduct;
import fitnlu.ntpos.productservice.domain.model.Product;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
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
                case 1 -> order.setName(getCellStringType(currentCell));
                case 2 -> order.setDescription(getCellStringType(currentCell));
                case 3 -> order.setQuantity(getCellIntType(currentCell));
                case 4 -> order.setPrice(getCellDoubleType(currentCell));
                case 5 -> order.setUnit(getCellStringType(currentCell));
                case 6 -> order.setStatus(getCellStringType(currentCell));
                case 7 -> order.setCreatedAt(getCellLongType(currentCell));
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
        row.createCell(1).setCellValue(template.getName());
        row.createCell(2).setCellValue(template.getDescription());
        row.createCell(3).setCellValue(template.getQuantity());
        row.createCell(4).setCellValue(template.getPrice());
        row.createCell(5).setCellValue(template.getUnit());
        row.createCell(6).setCellValue(template.getStatus());
        row.createCell(7).setCellValue(template.getCreatedAt());
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

    private int getCellIntType(Cell cell){
        if(cell.getCellType() == CellType.STRING){
            return Integer.parseInt(cell.getStringCellValue());
        }else if (cell.getCellType() == CellType.NUMERIC){
            return Double.valueOf(cell.getNumericCellValue()).intValue();
        }
        return 0;
    }

    private double getCellDoubleType(Cell cell){
        if(cell.getCellType() == CellType.STRING){
            return Double.parseDouble(cell.getStringCellValue());
        }else if (cell.getCellType() == CellType.NUMERIC){
            return cell.getNumericCellValue();
        }
        return 0;
    }

    @Override
    public ExcelProduct fromModelToExcelModel(Product o) {
        return ExcelProduct.builder()
                .id(o.getId())
                .name(o.getName())
                .description(o.getDescription())
                .quantity(o.getQuantity())
                .price(o.getPrice())
                .unit(o.getUnit())
                .status(o.getStatus())
                .createdAt(o.getCreatedAt())
                .build();
    }

    @Override
    public Product fromExcelModelToModel(ExcelProduct o) {
        return Product.builder()
                .id(o.getId())
                .name(o.getName())
                .description(o.getDescription())
                .quantity(o.getQuantity())
                .price(o.getPrice())
                .unit(o.getUnit())
                .status(o.getStatus())
                .createdAt(o.getCreatedAt())
                .build();
    }


}
