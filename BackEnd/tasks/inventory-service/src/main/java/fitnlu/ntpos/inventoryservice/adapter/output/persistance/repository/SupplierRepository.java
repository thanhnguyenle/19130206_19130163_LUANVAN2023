package fitnlu.ntpos.inventoryservice.adapter.output.persistance.repository;

import fitnlu.ntpos.inventoryservice.adapter.output.persistance.entities.MaterialEntities;
import fitnlu.ntpos.inventoryservice.adapter.output.persistance.entities.MaterialSupplierEntities;
import fitnlu.ntpos.inventoryservice.adapter.output.persistance.entities.SupplierEntities;
import fitnlu.ntpos.inventoryservice.domain.model.DateTime;
import fitnlu.ntpos.inventoryservice.domain.model.TimeSearch;
import fitnlu.ntpos.inventoryservice.infracstructure.paging.IPaging;
import lombok.Builder;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.jdbi.v3.core.Jdbi;
import org.jdbi.v3.core.statement.PreparedBatch;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Repository
@Transactional
@RequiredArgsConstructor
public class SupplierRepository implements ISupplierDBIRepository {
    private static final String GET_LIST = "select * from `supplier`";
    private static final String CREATE = "INSERT INTO `supplier` VALUES (:id, :name, :address, :phone,:email,:website,:status,:description)";
    private static final String DELETE = "DELETE FROM `supplier` WHERE id = :id";
    private static final String GET_ITEM_BYID = "SELECT * FROM `supplier` WHERE id = :id";
    private static final String UPDATE = "UPDATE `supplier` SET name=:name,address=:address,phone=:phone,email=:email,website=:website,status=:status,description=:description WHERE id=:id";
    private static final String GET_LIST_BY_MATERIAL_ID = "SELECT * FROM `material_supplier` WHERE materialID = :materialID";
    private static final String ADD_MATERIAL_TO_SUPPLIER = "INSERT INTO `material_supplier` VALUES (:materialID, :supplierID,:supplyDate,:status,:description)";
    private static final String DELETE_MATERIAL_FROM_SUPPLIER = "DELETE FROM `material_supplier` WHERE materialID = :materialID AND supplierID = :supplierID";
    private static final String DELETE_ALL_MATERIAL_FROM_SUPPLIER = "DELETE FROM `material_supplier` WHERE supplierID = :supplierID";
    @NonNull
    private final Jdbi jdbi;

    @Override
    public List<MaterialSupplierEntities> findALlSupplierByMaterialID(String materialID) {
        return jdbi.withHandle(handle -> handle.createQuery(GET_LIST_BY_MATERIAL_ID)
                .bind("materialID", materialID)
                .mapToBean(MaterialSupplierEntities.class)
                .list());
    }

    @Override
    public List<MaterialSupplierEntities> filterALlSupplierByMaterialID(IPaging paging, String materialID, String searchType, String searchValue, String sortType, String sortValue) {
        List<MaterialSupplierEntities> supplierEntities = filterALlSupplierByMaterialID(materialID, searchType, searchValue, sortType, sortValue);
        if(paging != null) {
            return supplierEntities.stream().skip(paging.getOffset()).limit(paging.getLimit()).toList();
        }else {
            return supplierEntities;
        }
    }

    @Override
    public List<MaterialSupplierEntities> filterALlSupplierByMaterialID(String materialID, String searchType, String searchValue, String sortType, String sortValue) {
       System.out.println("materialID: " + materialID);
        StringBuilder query = new StringBuilder(GET_LIST_BY_MATERIAL_ID);
       if(searchType != null && !searchType.isEmpty() && searchValue != null && !searchValue.isEmpty()) {
             query.append(" AND ");
             query.append(searchType).append(" LIKE ").append("'%").append(searchValue).append("%'");
         }
            if(sortType != null && !sortType.isEmpty() && sortValue != null && !sortValue.isEmpty()) {
                query.append(" ORDER BY ").append(sortType).append(" ").append(sortValue);
            }
        return jdbi.withHandle(handle -> handle.createQuery(query.toString())
                .bind("materialID", materialID)
                .mapToBean(MaterialSupplierEntities.class)
                .list());

    }

    @Override
    public List<SupplierEntities> findALlSupplier() {
        return jdbi.withHandle(handle -> handle.createQuery(GET_LIST)
                .mapToBean(SupplierEntities.class)
                .list());
    }

    @Override
    public List<SupplierEntities> filterALlSupplier(IPaging paging, String searchType, String searchValue, String sortType, String sortValue) {
        List<SupplierEntities> supplierEntities = filterALlSupplier(searchType, searchValue, sortType, sortValue);
        if(paging != null) {
            return supplierEntities.stream().skip(paging.getOffset()).limit(paging.getLimit()).toList();
        }
        return supplierEntities;
    }

    @Override
    public List<SupplierEntities> filterALlSupplier(String searchType, String searchValue, String sortType, String sortValue) {
        StringBuilder query = new StringBuilder(GET_LIST);
        if(searchType != null && !searchType.isEmpty() && searchValue != null && !searchValue.isEmpty()) {
            query.append(" WHERE ").append(searchType).append(" LIKE ").append("'%").append(searchValue).append("%'");
        }
        if(sortType != null && !sortType.isEmpty() && sortValue != null && !sortValue.isEmpty()) {
            query.append(" ORDER BY ").append(sortType).append(" ").append(sortValue);
        }
        return jdbi.withHandle(handle -> handle.createQuery(query.toString())
                .mapToBean(SupplierEntities.class)
                .list());
    }

    @Override
    public SupplierEntities findSupplier(String id) {
        return jdbi.withHandle(handle -> handle.createQuery(GET_ITEM_BYID)
                .bind("id", id)
                .mapToBean(SupplierEntities.class).one());
    }

    @Override
    public SupplierEntities createSupplier(SupplierEntities supplierEntities) {
        String id = UUID.randomUUID().toString();
        return jdbi.withHandle(handle -> {
          handle.createUpdate(CREATE)
                  .bind("id", id)
                  .bind("name", supplierEntities.getName())
                  .bind("address", supplierEntities.getAddress())
                  .bind("phone", supplierEntities.getPhone())
                  .bind("email", supplierEntities.getEmail())
                  .bind("website", supplierEntities.getWebsite())
                  .bind("status", supplierEntities.getStatus())
                  .bind("description", supplierEntities.getDescription())
                  .execute();
          supplierEntities.setId(id);
            return supplierEntities;
        });
    }

    @Override
    public SupplierEntities updateSupplier(String id, SupplierEntities supplierEntities) {
        return jdbi.withHandle(handle -> {
            handle.createUpdate(UPDATE)
                    .bind("id", id)
                    .bind("name", supplierEntities.getName())
                    .bind("address", supplierEntities.getAddress())
                    .bind("phone", supplierEntities.getPhone())
                    .bind("email", supplierEntities.getEmail())
                    .bind("website", supplierEntities.getWebsite())
                    .bind("status", supplierEntities.getStatus())
                    .bind("description", supplierEntities.getDescription())
                    .execute();
            supplierEntities.setId(id);
            return supplierEntities;
        });
    }

    @Override
    public SupplierEntities deleteSupplier(String id) {
        return jdbi.withHandle(handle -> {
            handle.createUpdate(DELETE)
                    .bind("id", id)
                    .execute();
            return SupplierEntities.builder()
                    .id(id)
                    .build();
        });
    }

    @Override
    public boolean addMaterialToSupplier(String supplierID, List<MaterialSupplierEntities> materialSupplierEntities) {
        return jdbi.withHandle(handle -> {
            PreparedBatch preparedBatch = handle.prepareBatch(ADD_MATERIAL_TO_SUPPLIER);
            materialSupplierEntities.forEach(materialSupplier -> {
                    preparedBatch
                        .bind("supplierID", supplierID)
                        .bind("materialID", materialSupplier.getMaterialID())
                        .bind("status", materialSupplier.getStatus())
                        .bind("description", materialSupplier.getDescription())
                        .bind("supplyDate", materialSupplier.getSupplyDate())
                        .add();
            });
            return preparedBatch.execute().length > 0;
        });
    }

    @Override
    public boolean deleteMaterialFromSupplier(String supplierID, List<String> materialIDs) {
        return jdbi.withHandle(handle -> {
            PreparedBatch preparedBatch = handle.prepareBatch(DELETE_MATERIAL_FROM_SUPPLIER);
            materialIDs.forEach(materialID -> {
                preparedBatch
                        .bind("supplierID", supplierID)
                        .bind("materialID", materialID)
                        .add();
            });
            return preparedBatch.execute().length > 0;
        });
    }

    @Override
    public boolean deleteALlMaterialFromSupplier(String supplierID) {
        return jdbi.withHandle(handle -> {
            handle.createUpdate(DELETE_ALL_MATERIAL_FROM_SUPPLIER)
                    .bind("supplierID", supplierID)
                    .execute();
            return true;
        });
    }

    @Builder
    static
    class TimeSearchCompute {
         long startTime;
         long endTime;
    }
    public TimeSearchCompute getTimeSearchCompute(TimeSearch timeSearch) {
        DateTime dateTime = DateTime.builder().build();
        long currentTime = System.currentTimeMillis();
        dateTime.updateTime(currentTime);
        long startTime = currentTime;
        long endTime = currentTime;
        if(timeSearch == TimeSearch.ALL_TIME) {
            startTime = 0;
        }else if(timeSearch == TimeSearch.TODAY){
            startTime = (currentTime / 86400000) * 86400000;
        }else if(timeSearch == TimeSearch.YESTERDAY){
            startTime = (currentTime / 86400000) * 86400000 - 86400*1000;
            endTime = (currentTime / 86400000) * 86400000;
        }else if(timeSearch == TimeSearch.THIS_WEEK){
            startTime = dateTime.getStartWeek();
        }else if (timeSearch == TimeSearch.LAST_WEEK){
            startTime = dateTime.getEndWeek();
            endTime = dateTime.getStartWeek();
        }else if (timeSearch == TimeSearch.THIS_MONTH) {
            startTime = dateTime.getStartMonth();
        }else if (timeSearch == TimeSearch.LAST_MONTH) {
            startTime = dateTime.getEndMonth();
            endTime = dateTime.getStartMonth();
        }else if (timeSearch == TimeSearch.THIS_YEAR) {
            startTime = dateTime.getStartYear();
        }else if (timeSearch == TimeSearch.LAST_YEAR) {
            startTime = dateTime.getEndYear();
            endTime = dateTime.getStartYear();
        }
        long finalStartTime = startTime/1000;
        long finalEndTime = endTime/1000;
        return TimeSearchCompute.builder()
                .startTime(finalStartTime)
                .endTime(finalEndTime)
                .build();
    }
}
