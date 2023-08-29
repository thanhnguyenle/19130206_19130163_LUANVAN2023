package fitnlu.ntpos.paymentservice.adapter.webapi;

import fitnlu.ntpos.paymentservice.adapter.webapi.dto.ExcelPaySlipOrder;
import fitnlu.ntpos.paymentservice.adapter.webapi.dto.ResponseMessage;
import fitnlu.ntpos.paymentservice.adapter.webapi.excel_service.ExcelPaySlipOrderService;
import fitnlu.ntpos.paymentservice.adapter.webapi.mapper.ExcelPaySlipOrderMapper;
import fitnlu.ntpos.paymentservice.adapter.webapi.mapper.IExcelModelMapper;
import fitnlu.ntpos.paymentservice.application.usecases.paySlipOrder.IAddPaySlipUseCase;
import fitnlu.ntpos.paymentservice.application.usecases.paySlipOrder.IFindPaySlipUseCase;
import fitnlu.ntpos.paymentservice.domain.model.PaySlip;
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
@RequestMapping("/payment-service/paySlipOrder/excel")
public class ExcelPaySlipOrderController {
    @Autowired
    IFindPaySlipUseCase iFindPaySlipUseCase  ;
    @Autowired
    ExcelPaySlipOrderService excelMaterialService;
    @Autowired
    IAddPaySlipUseCase iAddPaySlipUseCase;

    @Autowired(required = false)
    IExcelModelMapper<ExcelPaySlipOrder, PaySlip> iExcelModelMapper = ExcelPaySlipOrderMapper.getInstance();
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file) {
        String message = "";

        if (excelMaterialService.hasExcelFormat(file)) {
            try {
               List<ExcelPaySlipOrder> excelOrders =excelMaterialService.importExcelFileToOrders(file.getInputStream());
                boolean check = iAddPaySlipUseCase.addBatchPaySlip(excelOrders.stream().map(iExcelModelMapper::fromExcelModelToModel).toList());
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
        List<ExcelPaySlipOrder> excelOrders = iFindPaySlipUseCase.findAllPaySlip().stream().map(iExcelModelMapper::fromModelToExcelModel).toList();
        InputStreamResource file = new InputStreamResource(excelMaterialService.exportOrdersToExcelFile(excelOrders));
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
                .body(file);
    }
    @GetMapping("/download_template")
    public ResponseEntity<Resource> getDownloadFile() {
        String filename = "tutorials.xlsx";
        List<ExcelPaySlipOrder> excelOrders = Collections.emptyList();
        InputStreamResource file = new InputStreamResource(excelMaterialService.exportOrdersToExcelFile(excelOrders));
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
                .body(file);
    }

}
