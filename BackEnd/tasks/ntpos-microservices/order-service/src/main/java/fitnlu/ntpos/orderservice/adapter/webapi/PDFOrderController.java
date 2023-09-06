package fitnlu.ntpos.orderservice.adapter.webapi;

import com.itextpdf.text.DocumentException;
import fitnlu.ntpos.orderservice.adapter.webapi.dto.ExcelOrder;
import fitnlu.ntpos.orderservice.adapter.webapi.dto.ResponseMessage;
import fitnlu.ntpos.orderservice.adapter.webapi.excel_service.ExcelOrderService;
import fitnlu.ntpos.orderservice.adapter.webapi.excel_service.PDFGender;
import fitnlu.ntpos.orderservice.adapter.webapi.mapper.ExcelOrderMapper;
import fitnlu.ntpos.orderservice.adapter.webapi.mapper.IExcelModelMapper;
import fitnlu.ntpos.orderservice.application.usecases.order.ICreateOrderUseCase;
import fitnlu.ntpos.orderservice.application.usecases.order.IFindAllOrderUseCase;
import fitnlu.ntpos.orderservice.domain.model.Order;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/order-service/pdf")
public class PDFOrderController {
    @Autowired
    IFindAllOrderUseCase findAllOrderUseCase  ;
    @Autowired
    ExcelOrderService excelOrderService;
    @Autowired
    ICreateOrderUseCase iCreateOrderUseCase;

    @Autowired(required = false)
    IExcelModelMapper<ExcelOrder, Order> iExcelModelMapper = ExcelOrderMapper.getInstance();

    @GetMapping("/download")
    public void getFile(HttpServletResponse response) throws DocumentException, IOException {
        response.setContentType("application/pdf");
        DateFormat dateFormat = new SimpleDateFormat("YYYY-MM-DD:HH:MM:SS");
        String currentDateTime = dateFormat.format(new Date());
        String headerkey = "Content-Disposition";
        String headervalue = "attachment; filename=pdf_" + currentDateTime + ".pdf";
        response.setHeader(headerkey, headervalue);
        String filename = "tutorials.pdf";
        PDFGender generator = new PDFGender();
//        InputStreamResource file = new InputStreamResource(excelOrderService.exportOrdersToExcelFile(excelOrders));
        generator.generate(response);
//        return ResponseEntity.ok()
//                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
//                .contentType(MediaType.parseMediaType("application/pdf"))
//                .body(file);
    }

}
