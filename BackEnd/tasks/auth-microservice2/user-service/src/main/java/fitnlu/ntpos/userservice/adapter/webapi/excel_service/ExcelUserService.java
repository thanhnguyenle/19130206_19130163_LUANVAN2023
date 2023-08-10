package fitnlu.ntpos.userservice.adapter.webapi.excel_service;

import fitnlu.ntpos.userservice.adapter.webapi.dto.ExcelUser;
import fitnlu.ntpos.userservice.adapter.webapi.mapper.ExcelUserMapper;
import fitnlu.ntpos.userservice.adapter.webapi.util.AbsExcelHelper;
import fitnlu.ntpos.userservice.adapter.webapi.util.StylesGenerator;
import fitnlu.ntpos.userservice.domain.model.User;
import org.springframework.stereotype.Service;

@Service
public class ExcelUserService extends AbsExcelHelper<ExcelUser, User> {
    public ExcelUserService() {
        super(StylesGenerator.getInstance(), ExcelUserMapper.getInstance());
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
