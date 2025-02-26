package fitnlu.ntpos.paymentservice.adapter.webapi.excel_service;

import fitnlu.ntpos.paymentservice.adapter.webapi.dto.ExcelPaySlipOrder;
import fitnlu.ntpos.paymentservice.adapter.webapi.mapper.ExcelPaySlipOrderMapper;
import fitnlu.ntpos.paymentservice.adapter.webapi.util.AbsExcelHelper;
import fitnlu.ntpos.paymentservice.adapter.webapi.util.StylesGenerator;
import fitnlu.ntpos.paymentservice.domain.model.PaySlip;
import org.springframework.stereotype.Service;

@Service
public class ExcelPaySlipOrderService extends AbsExcelHelper<ExcelPaySlipOrder, PaySlip> {
    public ExcelPaySlipOrderService() {
        super(StylesGenerator.getInstance(), ExcelPaySlipOrderMapper.getInstance());
    }

    @Override
    public String getSheetName() {
        return "PaySlipOrder";
    }

    @Override
    public String[] getHeaders() {
        return new String[]{"ID", "UserID", "Group", "Order Date", "Status", "Note"};
    }
}
