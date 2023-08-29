package fitnlu.ntpos.orderservice.adapter.webapi.excel_service;

import fitnlu.ntpos.orderservice.adapter.webapi.dto.ExcelOrder;
import fitnlu.ntpos.orderservice.adapter.webapi.mapper.ExcelOrderMapper;
import fitnlu.ntpos.orderservice.adapter.webapi.mapper.IExcelModelMapper;
import fitnlu.ntpos.orderservice.adapter.webapi.util.AbsExcelHelper;
import fitnlu.ntpos.orderservice.adapter.webapi.util.StylesGenerator;
import fitnlu.ntpos.orderservice.domain.model.Order;
import org.springframework.stereotype.Service;

@Service
public class ExcelOrderService extends AbsExcelHelper<ExcelOrder,Order> {
    public ExcelOrderService() {
        super(StylesGenerator.getInstance(),ExcelOrderMapper.getInstance());
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
