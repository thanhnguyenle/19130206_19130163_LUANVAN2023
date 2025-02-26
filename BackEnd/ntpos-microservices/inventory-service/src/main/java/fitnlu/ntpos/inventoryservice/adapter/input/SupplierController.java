package fitnlu.ntpos.inventoryservice.adapter.input;

import fitnlu.ntpos.inventoryservice.adapter.input.adapter.ChangeSupplierEndpointAdapter;
import fitnlu.ntpos.inventoryservice.adapter.input.adapter.FindSupplierEndpointAdapter;
import fitnlu.ntpos.inventoryservice.adapter.input.dto.*;
import lombok.RequiredArgsConstructor;
import org.checkerframework.checker.units.qual.A;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class SupplierController {
    private final FindSupplierEndpointAdapter findSupplierEndpointAdapter;
    private final ChangeSupplierEndpointAdapter changeSupplierEndpointAdapter;

    //Mutation
    @MutationMapping("createSupplier")
    public SupplierOutput createSupplier(@Argument SupplierInput supplierInput) {
        return changeSupplierEndpointAdapter.createSupplier(supplierInput);
    }
    @MutationMapping("updateSupplier")
    public SupplierOutput updateSupplier(@Argument String id, @Argument SupplierInput supplierInput) {
        return changeSupplierEndpointAdapter.updateSupplier(id, supplierInput);
    }
    @MutationMapping("deleteSupplier")
    public SupplierOutput deleteSupplier(@Argument String id) {
        return changeSupplierEndpointAdapter.deleteSupplier(id);
    }
    @MutationMapping("deleteMaterialFromSupplier")
    public ResultOutput deleteMaterialFromSupplier(@Argument String supplierID,@Argument List<String> materialIDs) {
        return changeSupplierEndpointAdapter.deleteMaterialFromSupplier(supplierID,materialIDs);
    }
    @MutationMapping("addMaterialToSupplier")
    public ResultOutput addMaterialToSupplier(@Argument String supplierID,@Argument List<MaterialSupplierInput> materialSupplierInputs) {
        return changeSupplierEndpointAdapter.addMaterialToSupplier(supplierID,materialSupplierInputs);
    }
    //Query
    @QueryMapping("suppliers")
    public ListSupplierOutput suppliers(){
        return findSupplierEndpointAdapter.findALlSupplier();
    }
    @QueryMapping("supplier")
    public SupplierOutput supplier(@Argument String id){
        return findSupplierEndpointAdapter.findSupplier(id);
    }
    @QueryMapping("filterALlSupplierByMaterialID")
    public ListMaterialSupplierOutput filterALlSupplierByMaterialID(@Argument PagingInput pagingInput,@Argument String materialID,@Argument String  searchType,@Argument String  searchValue,@Argument String  sortType,@Argument String  sortValue){
        return findSupplierEndpointAdapter.filterALlSupplierByMaterialID(pagingInput,materialID,searchType,searchValue,sortType,sortValue);
    }
}
