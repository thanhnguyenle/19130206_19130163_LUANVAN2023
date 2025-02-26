package fitnlu.ntpos.inventoryservice.adapter.input;

import fitnlu.ntpos.inventoryservice.adapter.input.adapter.ChangeMaterialReturnEndpointAdapter;
import fitnlu.ntpos.inventoryservice.adapter.input.adapter.FindMaterialReturnEndpointAdapter;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.*;
import lombok.RequiredArgsConstructor;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MaterialReturnController {
    private final ChangeMaterialReturnEndpointAdapter changeMaterialReturnEndpointAdapter;
    private final FindMaterialReturnEndpointAdapter findMaterialReturnEndpointAdapter;
    //Mutation
    @MutationMapping("createMaterialReturn")
    public MaterialReturnOutput createMaterialReturn(@Argument MaterialReturnInput materialReturnInput) {
        return changeMaterialReturnEndpointAdapter.createMaterialReturn(materialReturnInput);
    }
    @MutationMapping("updateMaterialReturn")
    public MaterialReturnOutput updateMaterialReturn(@Argument String id, @Argument MaterialReturnInput materialReturnInput) {
        return changeMaterialReturnEndpointAdapter.updateMaterialReturn(id, materialReturnInput);
    }
    @MutationMapping("deleteMaterialReturn")
    public MaterialReturnOutput deleteMaterialReturn(@Argument String id) {
        return changeMaterialReturnEndpointAdapter.deleteMaterialReturn(id);
    }

    //Query
    @QueryMapping("materialReturns")
    public ListMaterialReturnOutput materialReturns(){
        return findMaterialReturnEndpointAdapter.findAllMaterialReturn();
    }
    @QueryMapping("materialReturn")
    public MaterialReturnOutput materialReturn(@Argument String id){
        return findMaterialReturnEndpointAdapter.findMaterialReturn(id);
    }
    @QueryMapping("filterAllMaterialReturn")
    public ListMaterialReturnOutput filterAllMaterialReturn(@Argument PagingInput pagingInput, @Argument String  searchType,@Argument String  searchValue,@Argument String  sortType,@Argument String  sortValue){
        return findMaterialReturnEndpointAdapter.filterAllMaterialReturn(pagingInput,searchType,searchValue,sortType,sortValue);
    }
}
