package fitnlu.ntpos.inventoryservice.adapter.input;

import fitnlu.ntpos.inventoryservice.adapter.input.adapter.ChangeMaterialEndpointAdapter;
import fitnlu.ntpos.inventoryservice.adapter.input.adapter.FindMaterialEndpointAdapter;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.ListMaterialOutput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialInput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.MaterialOutput;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.PagingInput;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MaterialReturnController {
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
    @QueryMapping("filterAllMaterialBySupplierID")
    public ListMaterialOutput filterAllMaterialBySupplierID(@Argument PagingInput pagingInput,@Argument String supplierID,@Argument String  searchType,@Argument String  searchValue,@Argument String  sortType,@Argument String  sortValue){
        return findMaterialEndpointAdapter.filterAllMaterialBySupplierID(pagingInput,supplierID,searchType,searchValue,sortType,sortValue);
    }
}
