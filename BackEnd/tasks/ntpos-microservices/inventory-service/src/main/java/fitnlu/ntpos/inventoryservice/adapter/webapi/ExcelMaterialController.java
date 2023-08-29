package fitnlu.ntpos.inventoryservice.adapter.webapi;


import fitnlu.ntpos.inventoryservice.adapter.webapi.dto.ExcelMaterial;
import fitnlu.ntpos.inventoryservice.adapter.webapi.dto.ResponseMessage;
import fitnlu.ntpos.inventoryservice.adapter.webapi.excel_service.ExcelMaterialService;
import fitnlu.ntpos.inventoryservice.adapter.webapi.mapper.ExcelMaterialMapper;
import fitnlu.ntpos.inventoryservice.adapter.webapi.mapper.IExcelModelMapper;
import fitnlu.ntpos.inventoryservice.application.usecases.material.IAddBatchMaterialUseCase;
import fitnlu.ntpos.inventoryservice.application.usecases.material.IFindAllMaterialUseCase;
import fitnlu.ntpos.inventoryservice.domain.model.Material;
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
@RequestMapping("/inventory-service/excel")
public class ExcelMaterialController {
    @Autowired
    IFindAllMaterialUseCase findAllMaterialUseCase  ;
    @Autowired
    ExcelMaterialService excelMaterialService;
    @Autowired
    IAddBatchMaterialUseCase iAddBatchMaterialUseCase;

    @Autowired(required = false)
    IExcelModelMapper<ExcelMaterial, Material> iExcelModelMapper = ExcelMaterialMapper.getInstance();
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ResponseMessage> uploadFile(@RequestParam("file") MultipartFile file) {
        String message = "";

        if (excelMaterialService.hasExcelFormat(file)) {
            try {
               List<ExcelMaterial> excelOrders =excelMaterialService.importExcelFileToOrders(file.getInputStream());
                boolean check = iAddBatchMaterialUseCase.addBatchMaterial(excelOrders.stream().map(iExcelModelMapper::fromExcelModelToModel).toList());
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
        List<ExcelMaterial> excelOrders = findAllMaterialUseCase.findAllMaterial().stream().map(iExcelModelMapper::fromModelToExcelModel).toList();
        InputStreamResource file = new InputStreamResource(excelMaterialService.exportOrdersToExcelFile(excelOrders));
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
                .body(file);
    }
    @GetMapping("/download_template")
    public ResponseEntity<Resource> getDownloadFile() {
        String filename = "tutorials.xlsx";
        List<ExcelMaterial> excelOrders = Collections.emptyList();
        InputStreamResource file = new InputStreamResource(excelMaterialService.exportOrdersToExcelFile(excelOrders));
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + filename)
                .contentType(MediaType.parseMediaType("application/vnd.ms-excel"))
                .body(file);
    }

}
