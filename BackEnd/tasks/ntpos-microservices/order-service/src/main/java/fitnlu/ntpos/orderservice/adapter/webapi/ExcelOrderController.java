package fitnlu.ntpos.orderservice.adapter.webapi;

import fitnlu.ntpos.orderservice.adapter.webapi.dto.ExcelOrder;
import fitnlu.ntpos.orderservice.adapter.webapi.dto.ResponseMessage;
import fitnlu.ntpos.orderservice.adapter.webapi.excel_service.ExcelOrderService;
import fitnlu.ntpos.orderservice.adapter.webapi.mapper.ExcelOrderMapper;
import fitnlu.ntpos.orderservice.adapter.webapi.mapper.IExcelModelMapper;
import fitnlu.ntpos.orderservice.application.usecases.order.ICreateOrderUseCase;
import fitnlu.ntpos.orderservice.application.usecases.order.IFindAllOrderUseCase;
import fitnlu.ntpos.orderservice.domain.model.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.core.io.Resource;

import java.util.Collections;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/order-service/order/excel")
public class ExcelOrderController {
    @Autowired
    IFindAllOrderUseCase findAllOrderUseCase  ;
    @Autowired
    ExcelOrderService excelOrderService;
    @Autowired
    ICreateOrderUseCase iCreateOrderUseCase;

    @Autowired(required = false)
    IExcelModelMapper<ExcelOrder, Order> iExcelModelMapper = ExcelOrderMapper.getInstance();
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file) {
        String message = "";

        if (excelOrderService.hasExcelFormat(file)) {
            try {
               List<ExcelOrder> excelOrders =excelOrderService.importExcelFileToOrders(file.getInputStream());
                boolean check = iCreateOrderUseCase.createBatchOrders(excelOrders.stream().map(iExcelModelMapper::fromExcelModelToModel).toList());
                if(!check) throw new RuntimeException("Error save to database!");

                message = "Uploaded the file successfully: " + file.getOriginalFilename();
                return ResponseEntity.status(HttpStatus.OK).body(new ResponseMessage(message));
            } catch (Exception e) {
                e.printStackTrace();
                message = "Could not upload the file: " + file.getOriginalFilename() + "!";
                return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ResponseMessage(message));
            }
        }
        message = "Please upload an excel file!";
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ResponseMessage(message));
    }
    @GetMapping("/download")
    public ResponseEntity<Resource> getFile() {
        String filename = "tutorials.xlsx";
        List<ExcelOrder> excelOrders = findAllOrderUseCase.findAllOrder().stream().map(iExcelModelMapper::fromModelToExcelModel).toList();
        InputStreamResource file = new InputStreamResource(excelOrderService.exportOrdersToExcelFile(excelOrders));
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
                .body(file);
    }
    @GetMapping("/download_template")
    public ResponseEntity<Resource> getDownloadFile() {
        String filename = "tutorials.xlsx";
        List<ExcelOrder> excelOrders = Collections.emptyList();
        InputStreamResource file = new InputStreamResource(excelOrderService.exportOrdersToExcelFile(excelOrders));
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
                .body(file);
    }

}
