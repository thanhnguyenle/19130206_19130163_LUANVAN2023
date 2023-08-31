package fitnlu.ntpos.inventoryservice.adapter.input;

import fitnlu.ntpos.inventoryservice.adapter.input.adapter.ChangeMaterialDefaultEndpointAdapter;
import fitnlu.ntpos.inventoryservice.adapter.input.adapter.ChangeMaterialEndpointAdapter;
import fitnlu.ntpos.inventoryservice.adapter.input.adapter.FindMaterialDefaultEndpointAdapter;
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
public class MaterialSetupDefaultController {
    private final ChangeMaterialDefaultEndpointAdapter changeMaterialEndpointAdapter;
    private final FindMaterialDefaultEndpointAdapter findMaterialEndpointAdapter;
    //Mutation
    @MutationMapping("updateMaterialDefault")
    public ResultOutput updateMaterialDefault(@Argument List<MaterialSetupDefaultInput> materialSetupDefaultInputs) {
        return changeMaterialEndpointAdapter.updateBatchMaterialDefault( materialSetupDefaultInputs);
    }

    //Query
    @QueryMapping("materialSetupDefault")
    public List<MaterialSetupDefaultOutput> materialSetupDefault() {
        return findMaterialEndpointAdapter.findAllMaterialDefault();
    }
}
