package fitnlu.ntpos.productservice.adapter.webapi;

import fitnlu.ntpos.productservice.adapter.webapi.dto.ExcelProduct;
import fitnlu.ntpos.productservice.adapter.webapi.dto.ResponseMessage;
import fitnlu.ntpos.productservice.adapter.webapi.excel_service.ExcelProductService;
import fitnlu.ntpos.productservice.adapter.webapi.mapper.ExcelProductMapper;
import fitnlu.ntpos.productservice.adapter.webapi.mapper.IExcelModelMapper;
import fitnlu.ntpos.productservice.application.usecases.product.IAddBatchProductUseCase;
import fitnlu.ntpos.productservice.application.usecases.product.IFindAllProductUseCase;
import fitnlu.ntpos.productservice.domain.model.Product;
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
@RequestMapping("/product-service/product/excel")
public class ExcelMaterialController {
    @Autowired
    IFindAllProductUseCase findAllProductUseCasee  ;
    @Autowired
    ExcelProductService excelProductService;
    @Autowired
    IAddBatchProductUseCase iAddBatchProductUseCase;

    @Autowired(required = false)
    IExcelModelMapper<ExcelProduct, Product> iExcelModelMapper = ExcelProductMapper.getInstance();
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file) {
        String message = "";

        if (excelProductService.hasExcelFormat(file)) {
            try {
               List<ExcelProduct> excelOrders =excelProductService.importExcelFileToOrders(file.getInputStream());
                boolean check = iAddBatchProductUseCase.addBatchProduct(excelOrders.stream().map(iExcelModelMapper::fromExcelModelToModel).toList());
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
        List<ExcelProduct> excelOrders = findAllProductUseCasee.findAllProduct().stream().map(iExcelModelMapper::fromModelToExcelModel).toList();
        InputStreamResource file = new InputStreamResource(excelProductService.exportOrdersToExcelFile(excelOrders));
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
                .body(file);
    }
    @GetMapping("/download_template")
    public ResponseEntity<Resource> getDownloadFile() {
        String filename = "tutorials.xlsx";
        List<ExcelProduct> excelOrders = Collections.emptyList();
        InputStreamResource file = new InputStreamResource(excelProductService.exportOrdersToExcelFile(excelOrders));
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
                .body(file);
    }

}
