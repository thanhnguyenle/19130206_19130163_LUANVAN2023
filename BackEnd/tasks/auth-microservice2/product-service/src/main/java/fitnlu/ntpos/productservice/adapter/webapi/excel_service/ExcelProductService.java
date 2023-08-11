package fitnlu.ntpos.productservice.adapter.webapi.excel_service;

import fitnlu.ntpos.productservice.adapter.webapi.dto.ExcelProduct;
import fitnlu.ntpos.productservice.adapter.webapi.mapper.ExcelProductMapper;
import fitnlu.ntpos.productservice.adapter.webapi.util.AbsExcelHelper;
import fitnlu.ntpos.productservice.adapter.webapi.util.StylesGenerator;
import fitnlu.ntpos.productservice.domain.model.Product;
import org.springframework.stereotype.Service;

@Service
public class ExcelProductService extends AbsExcelHelper<ExcelProduct, Product> {
    public ExcelProductService() {
        super(StylesGenerator.getInstance(), ExcelProductMapper.getInstance());
    }

    @Override
    public String getSheetName() {
        return "Product";
    }

    @Override
    public String[] getHeaders() {
        return new String[]{"ID", "Name", "Description", "Quantity", "Price", "UNIT", "Status", "Created At"};
    }
}
