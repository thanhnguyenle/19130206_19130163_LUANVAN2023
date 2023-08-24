package fitnlu.ntpos.inventoryservice.adapter.webapi.excel_service;

import fitnlu.ntpos.inventoryservice.adapter.webapi.dto.ExcelMaterial;
import fitnlu.ntpos.inventoryservice.adapter.webapi.mapper.ExcelMaterialMapper;
import fitnlu.ntpos.inventoryservice.adapter.webapi.util.AbsExcelHelper;
import fitnlu.ntpos.inventoryservice.adapter.webapi.util.StylesGenerator;
import fitnlu.ntpos.inventoryservice.domain.model.Material;
import org.springframework.stereotype.Service;

@Service
public class ExcelMaterialService extends AbsExcelHelper<ExcelMaterial, Material> {
    public ExcelMaterialService() {
        super(StylesGenerator.getInstance(), ExcelMaterialMapper.getInstance());
    }

    @Override
    public String getSheetName() {
        return "Order";
    }

    @Override
    public String[] getHeaders() {
        return new String[]{"ID", "UserID", "Group", "Order Date", "Status", "Note"};
    }
}
