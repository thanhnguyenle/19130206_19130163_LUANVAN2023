package fitnlu.ntpos.inventoryservice.adapter.output.persistance.repository;

import fitnlu.ntpos.inventoryservice.adapter.output.persistance.entities.MaterialEntities;
import fitnlu.ntpos.inventoryservice.adapter.output.persistance.entities.MaterialImageEntities;
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
public class MaterialRepository implements IMaterialDBIRepository {
    private static final String GET_LIST = "select * from `material`";
    private static final String CREATE = "INSERT INTO `material` VALUES (:id, :name, :price, :unit,:quantity,:status,:description,:expiredDate,:manufacturerDate)";
    private static final String DELETE = "DELETE FROM `material` WHERE id = :id";
    private static final String GET_ITEM_BYID = "SELECT * FROM `material` WHERE id = :id";
    private static final String UPDATE = "UPDATE `material` SET name=:name, price=:price, unit=:unit, quantity=:quantity, status=:status,description=:description,expiredDate=:expiredDate,manufacturerDate=:manufacturerDate WHERE id=:id";
    private static final String GET_MATERIAL_BY_PRODUCT_ID = "SELECT * FROM `material` WHERE id IN (SELECT materialID FROM `material_product` WHERE productID = :productID)";
    private static final String GET_MATERIAL_BY_SUPPLIER_ID = "SELECT * FROM `material` WHERE id IN (SELECT supplierID FROM `material_supplier` WHERE supplierID = :supplierID)";
    private static final String CREATE_IMAGE = "INSERT INTO `image` VALUES (:id,:url,:description,:materialID)";
    private static final String DELETE_IMAGE_BY_MATERIALID = "DELETE FROM `image` WHERE materialID = :materialID";
    private static final String DELETE_IMAGE_BY_ID = "DELETE FROM `image` WHERE id = :id";
    private static final String UPDATE_QUANTITY = "UPDATE `material` SET quantity=:quantity WHERE id=:id";

    @NonNull
    private final Jdbi jdbi;

    @Override
    public List<MaterialEntities> findAllMaterialByProductID(String productID) {
        return jdbi.withHandle(handle -> handle.createQuery(GET_MATERIAL_BY_PRODUCT_ID)
                .bind("productID", productID)
                .mapToBean(MaterialEntities.class)
                .list());
    }

    @Override
    public List<MaterialEntities> filterAllMaterialByProductID(IPaging paging, String productID, String searchType, String searchValue, String sortType, String sortValue) {
        List<MaterialEntities> materialEntities = filterAllMaterialByProductID(productID, searchType, searchValue, sortType, sortValue);
        if(paging == null)
            return materialEntities;
        return materialEntities.stream().skip(paging.getOffset()).limit(paging.getLimit()).toList();
    }

    @Override
    public List<MaterialEntities> filterAllMaterialByProductID(String productID, String searchType, String searchValue, String sortType, String sortValue) {
        StringBuilder query = new StringBuilder(GET_LIST);
        boolean haveProductID = false;
        if(productID != null && !productID.isEmpty()){
            query.append(" WHERE id IN (SELECT materialID FROM `material_product` WHERE productID = ").append(productID).append(")");
            haveProductID = true;
        }
        if(searchType != null && !searchType.isEmpty()){
            if(haveProductID){
                query.append(" AND ");
            }else{
                query.append(" WHERE ");
            }
            query.append(searchType).append(" LIKE %").append(searchValue).append("%");
        }
        if(sortType != null && !sortType.isEmpty()){
            query.append(" ORDER BY ").append(sortType).append(" ").append(sortValue);
        }
        return jdbi.withHandle(handle -> handle.createQuery(query.toString())
                .mapToBean(MaterialEntities.class)
                .list());
    }

    @Override
    public List<MaterialEntities> findAllMaterialBySupplierID(String supplierID) {
        return jdbi.withHandle(handle -> handle.createQuery(GET_MATERIAL_BY_SUPPLIER_ID)
                .bind("supplierID", supplierID)
                .mapToBean(MaterialEntities.class)
                .list());
    }

    @Override
    public List<MaterialEntities> filterAllMaterialBySupplierID(IPaging paging, String supplierID, String searchType, String searchValue, String sortType, String sortValue) {
        List<MaterialEntities> materialEntities = filterAllMaterialBySupplierID(supplierID, searchType, searchValue, sortType, sortValue);
        if(paging == null)
            return materialEntities;
        return materialEntities.stream().skip(paging.getOffset()).limit(paging.getLimit()).toList();
    }

    @Override
    public List<MaterialEntities> filterAllMaterialBySupplierID(String supplierID, String searchType, String searchValue, String sortType, String sortValue) {
        StringBuilder query = new StringBuilder(GET_LIST);
        boolean haveSupplierID = false;
        if(supplierID != null && !supplierID.isEmpty()){
            query.append(" WHERE id IN (SELECT materialID FROM `material_supplier` WHERE supplierID = '").append(supplierID).append("')");
            haveSupplierID = true;
        }
        if(searchType != null && !searchType.isEmpty()){
            if(haveSupplierID){
                query.append(" AND ");
            }else{
                query.append(" WHERE ");
            }
            query.append(searchType).append(" LIKE '%").append(searchValue).append("%'");
        }
        if(sortType != null && !sortType.isEmpty()){
            query.append(" ORDER BY ").append(sortType).append(" ").append(sortValue);
        }
        return jdbi.withHandle(handle -> handle.createQuery(query.toString())
                .mapToBean(MaterialEntities.class)
                .list());
    }

    @Override
    public List<MaterialEntities> findAllMaterial() {
        return jdbi.withHandle(handle -> handle.createQuery(GET_LIST)
                .mapToBean(MaterialEntities.class)
                .list());
    }

    @Override
    public List<MaterialEntities> filterAllMaterial(IPaging paging,TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue) {
        List<MaterialEntities> materialEntities = filterAllMaterial(timeSearch, searchType, searchValue, sortType, sortValue);
        if(paging == null)
            return materialEntities;
        return materialEntities.stream().skip(paging.getOffset()).limit(paging.getLimit()).toList();
    }

    @Override
    public List<MaterialEntities> filterAllMaterial(TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue) {
        StringBuilder query = new StringBuilder(GET_LIST);
        boolean haveTimeSearch = false;
        if(timeSearch !=null ){
            TimeSearchCompute timeSearchCompute = getTimeSearchCompute(timeSearch);
            query.append(" WHERE ").append("manufacturerDate BETWEEN ").append(timeSearchCompute.startTime).append(" AND ").append(timeSearchCompute.endTime);
            haveTimeSearch = true;
        }
        if(searchType != null && !searchType.isEmpty()){
            if(haveTimeSearch){
                query.append(" AND ");
            }else{
                query.append(" WHERE ");
            }
           query.append(searchType).append(" LIKE '%").append(searchValue).append("%'");
        }
        if(sortType != null && !sortType.isEmpty()){
            query.append(" ORDER BY ").append(sortType).append(" ").append(sortValue);
        }
        return jdbi.withHandle(handle -> handle.createQuery(query.toString())
                .mapToBean(MaterialEntities.class)
                .list());
    }

    @Override
    public MaterialEntities findMaterial(String materialID) {
        return jdbi.withHandle(handle -> handle.createQuery(GET_ITEM_BYID)
                .bind("id", materialID)
                .mapToBean(MaterialEntities.class)
                .one());
    }

    @Override
    public MaterialEntities createMaterial(MaterialEntities materialEntities) {
        String id = UUID.randomUUID().toString();
        return jdbi.withHandle(handle -> {
            handle.createUpdate(CREATE)
                    .bind("id", id)
                    .bind("name", materialEntities.getName())
                    .bind("price", materialEntities.getPrice())
                    .bind("unit", materialEntities.getUnit())
                    .bind("quantity", materialEntities.getQuantity())
                    .bind("status", materialEntities.getStatus())
                    .bind("description", materialEntities.getDescription())
                    .bind("expiredDate", materialEntities.getExpiredDate())
                    .bind("manufacturerDate", materialEntities.getManufacturerDate())
                    .execute();
            materialEntities.setId(id);
            return materialEntities;
        });
    }

    @Override
    public MaterialEntities updateMaterial(String id, MaterialEntities materialEntities) {
        return jdbi.withHandle(handle -> {
            handle.createUpdate(UPDATE)
                    .bind("id", id)
                    .bind("name", materialEntities.getName())
                    .bind("price", materialEntities.getPrice())
                    .bind("unit", materialEntities.getUnit())
                    .bind("quantity", materialEntities.getQuantity())
                    .bind("status", materialEntities.getStatus())
                    .bind("description", materialEntities.getDescription())
                    .bind("expiredDate", materialEntities.getExpiredDate())
                    .bind("manufacturerDate", materialEntities.getManufacturerDate())
                    .execute();
            materialEntities.setId(id);
            return materialEntities;
        });
    }

    @Override
    public MaterialEntities deleteMaterial(String id) {
        return jdbi.withHandle(handle -> {
            handle.createUpdate(DELETE)
                    .bind("id", id)
                    .execute();
            return MaterialEntities.builder()
                    .id(id)
                    .build();
        });
    }

    @Override
    public boolean addBatchMaterial(List<MaterialEntities> materialEntities) {
        return jdbi.withHandle(handle -> {
            PreparedBatch preparedBatch = handle.prepareBatch(CREATE);
            materialEntities.forEach(material -> {
                String id = UUID.randomUUID().toString();
                preparedBatch
                        .bind("id", id)
                        .bind("name", material.getName())
                        .bind("price", material.getPrice())
                        .bind("unit", material.getUnit())
                        .bind("quantity", material.getQuantity())
                        .bind("status", material.getStatus())
                        .bind("description", material.getDescription())
                        .bind("expiredDate", material.getExpiredDate())
                        .bind("manufacturerDate", material.getManufacturerDate())
                        .add();
            });
            return preparedBatch.execute().length > 0;
        });

    }

    @Override
    public boolean deleteBatchMaterial(List<String> materialIDs) {
        return jdbi.withHandle(handle -> {
            PreparedBatch preparedBatch = handle.prepareBatch(DELETE);
            materialIDs.forEach(id -> {
                preparedBatch
                        .bind("id", id)
                        .add();
            });
            return preparedBatch.execute().length > 0;
        });
    }

    @Override
    public boolean addBatchImageToMaterial(String materialID, List<MaterialImageEntities> imageIDs) {
        return jdbi.withHandle(handle -> {
            PreparedBatch preparedBatch = handle.prepareBatch(CREATE_IMAGE);
            imageIDs.forEach(image -> {
                String id = UUID.randomUUID().toString();
                preparedBatch
                        .bind("id", id)
                        .bind("url", image.getUrl())
                        .bind("description", image.getDescription())
                        .bind("materialID", materialID)
                        .add();
            });
            return preparedBatch.execute().length > 0;
        });
    }

    @Override
    public boolean deleteBatchImageFromMaterial(List<String> imageIDs) {
        return jdbi.withHandle(handle -> {
            PreparedBatch preparedBatch = handle.prepareBatch(DELETE_IMAGE_BY_ID);
            imageIDs.forEach(id -> {
                preparedBatch
                        .bind("id", id)
                        .add();
            });
            return preparedBatch.execute().length > 0;
        });
    }

    @Override
    public boolean deleteAllImageByMaterialID(String materialID) {
        return jdbi.withHandle(handle -> {
            handle.createUpdate(DELETE_IMAGE_BY_MATERIALID)
                    .bind("materialID", materialID)
                    .execute();
            return true;
        });
    }

    @Override
    public boolean updateQuantityMaterial(String id, int quantity) {
        return jdbi.withHandle(handle -> {
            handle.createUpdate(UPDATE_QUANTITY)
                    .bind("id", id)
                    .bind("quantity", quantity)
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
