package fitnlu.ntpos.inventoryservice.adapter.output.persistance.repository;

import fitnlu.ntpos.inventoryservice.adapter.output.persistance.entities.MaterialEntities;
import fitnlu.ntpos.inventoryservice.adapter.output.persistance.entities.MaterialImageEntities;
import fitnlu.ntpos.inventoryservice.domain.model.DateTime;
import fitnlu.ntpos.inventoryservice.domain.model.MaterialSetupDefault;
import fitnlu.ntpos.inventoryservice.domain.model.TimeSearch;
import fitnlu.ntpos.inventoryservice.infracstructure.paging.IPaging;
import lombok.Builder;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.statement.PreparedBatch;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Repository
@Transactional
@RequiredArgsConstructor
public class MaterialSetupDefaultRepository implements IMaterialSetupDefaultDBIRepository {
    private static final String GET_LIST = "select * from `material_default_setup`";
    private static final String CREATE = "INSERT INTO `material_default_setup` VALUES (:id, :materialID, :unit, :quantity, :status, :description)";
    private static final String DELETE = "DELETE FROM `material_default_setup` WHERE id = :id";
    private static final String DELETE_ALL = "DELETE FROM `material_default_setup`";
    private static final String GET_ITEM_BYMATERIALID = "SELECT * FROM `material_default_setup` WHERE materialID = :materialID";
    private static final String UPDATE = "UPDATE `material_default_setup` SET materialID=:materialID, unit=:unit, quantity=:quantity, status=:status,description=:description WHERE id=:id";

    @NonNull
    private final Jdbi jdbi;

    @Override
    public List<MaterialSetupDefault> findAllMaterialDefault() {
        return jdbi.withHandle(handle -> handle.createQuery(GET_LIST)
                .mapToBean(MaterialSetupDefault.class)
                .list());
    }

    @Override
    public boolean deleteMaterialDefault(String materialId) {
        jdbi.withHandle(handle -> handle.createUpdate(DELETE)
                  .bind("id", materialId)
                  .execute());
        return true;
    }

    @Override
    public boolean deleteAllMaterialDefault() {
        jdbi.withHandle(handle -> handle.createUpdate(DELETE_ALL)
                 .execute());
        return true;
    }

    @Override
    public boolean addMaterialDefault(MaterialSetupDefault materialSetupDefault) {
        String id = UUID.randomUUID().toString();
        return jdbi.withHandle(handle -> handle.createUpdate(CREATE)
                 .bind("id", id)
                 .bind("materialID", materialSetupDefault.getMaterialId())
                 .bind("unit", materialSetupDefault.getUnit())
                 .bind("quantity", materialSetupDefault.getQuantity())
                 .bind("status", materialSetupDefault.getStatus())
                 .bind("description", materialSetupDefault.getDescription())
                 .execute() > 0);
    }

    @Override
    public boolean addBatchMaterialDefault(List<MaterialSetupDefault> materialSetupDefault) {
        return jdbi.withHandle(handle -> {
            PreparedBatch preparedBatch = handle.prepareBatch(CREATE);
            materialSetupDefault.forEach(material -> {

                String id = UUID.randomUUID().toString();
                System.out.println("ID: "+id);
                preparedBatch
                        .bind("id", id)
                        .bind("materialID", material.getMaterialId())
                        .bind("unit", material.getUnit())
                        .bind("quantity", material.getQuantity())
                        .bind("status", material.getStatus())
                        .bind("description", material.getDescription())
                        .add();
            });
            return preparedBatch.execute().length > 0;
        });
    }

    @Override
    public boolean updateMaterialDefault(String materialId, MaterialSetupDefault materialSetupDefault) {
        return jdbi.withHandle(handle -> handle.createUpdate(UPDATE)
                 .bind("id", materialId)
                 .bind("materialID", materialSetupDefault.getMaterialId())
                 .bind("unit", materialSetupDefault.getUnit())
                 .bind("quantity", materialSetupDefault.getQuantity())
                 .bind("status", materialSetupDefault.getStatus())
                 .bind("description", materialSetupDefault.getDescription())
                 .execute() > 0);
    }

    @Override
    public boolean updateBatchMaterialDefault(List<MaterialSetupDefault> materialSetupDefault) {
        System.out.println("Hello");
        return false;
    }

    @Override
    public MaterialSetupDefault findMaterialDefaultByMaterialID(String materialID) {
       return jdbi.withHandle(handle -> {
           List<MaterialSetupDefault> result = handle.createQuery(GET_ITEM_BYMATERIALID)
               .bind("materialID",materialID)
                .mapToBean(MaterialSetupDefault.class)
                .list();
           if(result==null||result.isEmpty()){
               return null;
           }else{
               return result.get(0);
           }
       }
       );
    }

    @Override
    public List<MaterialSetupDefault> findAllMaterialDefaultNotRepeat() {
        return null;
    }
}
