package fitnlu.ntpos.paymentservice.adapter.input;

import fitnlu.ntpos.inventoryservice.adapter.input.adapter.ChangeMaterialEndpointAdapter;
import fitnlu.ntpos.inventoryservice.adapter.input.adapter.FindMaterialEndpointAdapter;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.*;
import fitnlu.ntpos.inventoryservice.domain.model.TimeSearch;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MaterialController {
    private final ChangeMaterialEndpointAdapter changeMaterialEndpointAdapter;
    private final FindMaterialEndpointAdapter findMaterialEndpointAdapter;
    //Mutation
    @MutationMapping("createMaterial")
    public MaterialOutput createMaterial(@Argument MaterialInput materialInput) {
        return changeMaterialEndpointAdapter.createMaterial(materialInput);
    }
    @MutationMapping("updateMaterial")
    public MaterialOutput updateMaterial(@Argument String id, @Argument MaterialInput materialInput) {
        return changeMaterialEndpointAdapter.updateMaterial(id, materialInput);
    }
    @MutationMapping("deleteMaterial")
    public MaterialOutput deleteMaterial(@Argument String id) {
        return changeMaterialEndpointAdapter.deleteMaterial(id);
    }
    @MutationMapping("createBatchMaterial")
    public ResultOutput createBatchMaterial(@Argument List<MaterialInput> materialInputs) {
        return changeMaterialEndpointAdapter.addBatchMaterial(materialInputs);
    }
    @MutationMapping("deleteBatchMaterial")
    public ResultOutput deleteBatchMaterial(@Argument List<String> materialIDs) {
        return changeMaterialEndpointAdapter.deleteBatchMaterial(materialIDs);
    }
    @MutationMapping("addBatchImageToMaterial")
    public ResultOutput addBatchImageToMaterial(@Argument String materialID,@Argument List<MaterialImageInput> imageInputs) {
        return changeMaterialEndpointAdapter.addBatchImageToMaterial(materialID,imageInputs);
    }
    @MutationMapping("deleteBatchImageFromMaterial")
    public ResultOutput deleteBatchImageFromMaterial(@Argument List<String> imageIDs) {
        return changeMaterialEndpointAdapter.deleteBatchImageFromMaterial(imageIDs);
    }

    //Query
    @QueryMapping("materials")
    public ListMaterialOutput materials(){
        return findMaterialEndpointAdapter.findAllMaterial();
    }
    @QueryMapping("material")
    public MaterialOutput material(@Argument String id){
        return findMaterialEndpointAdapter.findMaterial(id);
    }
    @QueryMapping("filterAllMaterialByProductID")
    public ListMaterialOutput filterAllMaterialByProductID(@Argument PagingInput pagingInput,@Argument String productID,@Argument String  searchType,@Argument String  searchValue,@Argument String  sortType,@Argument String  sortValue){
        return findMaterialEndpointAdapter.filterAllMaterialByProductID(pagingInput,productID,searchType,searchValue,sortType,sortValue);
    }
    @QueryMapping("filterAllMaterial")
    public ListMaterialOutput filterAllMaterial(@Argument PagingInput pagingInput, @Argument TimeSearch timeSearch, @Argument String  searchType, @Argument String  searchValue, @Argument String  sortType, @Argument String  sortValue){
        return findMaterialEndpointAdapter.filterAllMaterial(pagingInput,timeSearch,searchType,searchValue,sortType,sortValue);
    }
    @QueryMapping("filterAllMaterialBySupplierID")
    public ListMaterialOutput filterAllMaterialBySupplierID(@Argument PagingInput pagingInput,@Argument String supplierID,@Argument String  searchType,@Argument String  searchValue,@Argument String  sortType,@Argument String  sortValue){
        return findMaterialEndpointAdapter.filterAllMaterialBySupplierID(pagingInput,supplierID,searchType,searchValue,sortType,sortValue);
    }
}
