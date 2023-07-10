package fitnlu.ntpos.inventoryservice.adapter.output.persistance.repository;

import fitnlu.ntpos.inventoryservice.adapter.output.persistance.entities.MaterialReturnEntities;
import fitnlu.ntpos.inventoryservice.domain.model.DateTime;
import fitnlu.ntpos.inventoryservice.domain.model.TimeSearch;
import fitnlu.ntpos.inventoryservice.infracstructure.paging.IPaging;
import lombok.Builder;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.jdbi.v3.core.Jdbi;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Repository
@Transactional
@RequiredArgsConstructor
public class MaterialReturnRepository implements IMaterialReturnDBIRepository{
    private static final String GET_LIST = "select * from `materialReturn`";
    private static final String CREATE = "INSERT INTO `materialReturn` VALUES (:id, :materialID, :price, :unit,:quantity,:status,:description,:returnDate)";
    private static final String DELETE = "DELETE FROM `materialReturn` WHERE id = :id";
    private static final String GET_ITEM_BYID = "SELECT * FROM `materialReturn` WHERE id = :id";
    private static final String UPDATE = "UPDATE `materialReturn` SET materialID=:materialID, price=:price, unit=:unit, quantity=:quantity, status=:status,description=:description,returnDate=:returnDate WHERE id=:id";

    @NonNull
    private final Jdbi jdbi;

    @Override
    public List<MaterialReturnEntities> findAllMaterialReturn() {
        return jdbi.withHandle(handle -> handle.createQuery(GET_LIST)
                .mapToBean(MaterialReturnEntities.class)
                .list());
    }

    @Override
    public List<MaterialReturnEntities> filterAllMaterialReturn(IPaging paging, String searchType, String searchValue, String sortType, String sortValue) {
       List<MaterialReturnEntities> materialEntities = filterAllMaterialReturn(searchType, searchValue, sortType, sortValue);
       if(paging != null){
           return materialEntities.stream()
                   .skip(paging.getOffset())
                   .limit(paging.getLimit())
                   .toList();
       }else{
           return materialEntities;
       }
    }

    @Override
    public List<MaterialReturnEntities> filterAllMaterialReturn(String searchType, String searchValue, String sortType, String sortValue) {
        StringBuilder query = new StringBuilder(GET_LIST);
        if (searchType != null && !searchType.isEmpty() && searchValue != null && !searchValue.isEmpty()) {
            query.append(" WHERE ").append(searchType).append(" LIKE '%").append(searchValue).append("%'");
        }
        if (sortType != null && !sortType.isEmpty() && sortValue != null && !sortValue.isEmpty()) {
            query.append(" ORDER BY ").append(sortType).append(" ").append(sortValue);
        }
        return jdbi.withHandle(handle -> handle.createQuery(query.toString())
                .mapToBean(MaterialReturnEntities.class)
                .list());
    }

    @Override
    public MaterialReturnEntities findMaterialReturn(String materialID) {
        return jdbi.withHandle(handle -> handle.createQuery(GET_ITEM_BYID)
                .bind("id", materialID)
                .mapToBean(MaterialReturnEntities.class)
                .one());
    }

    @Override
    public MaterialReturnEntities createMaterialReturn(MaterialReturnEntities materialReturnEntities) {
        String id = UUID.randomUUID().toString();
        return jdbi.withHandle(handle -> {
            handle.createUpdate(CREATE)
                    .bind("id",id)
                    .bind("materialID", materialReturnEntities.getMaterialID())
                    .bind("price", materialReturnEntities.getPrice())
                    .bind("unit", materialReturnEntities.getUnit())
                    .bind("quantity", materialReturnEntities.getQuantity())
                    .bind("status", materialReturnEntities.getStatus())
                    .bind("description", materialReturnEntities.getDescription())
                    .bind("returnDate", materialReturnEntities.getReturnDate())
                    .execute();
            materialReturnEntities.setId(id);
            return materialReturnEntities;
        });
    }

    @Override
    public MaterialReturnEntities deleteMaterialReturn(String id) {
        jdbi.withHandle(handle -> handle.createUpdate(DELETE)
                .bind("id", id)
                .execute());
        return MaterialReturnEntities.builder()
                .id(id)
                .build();
    }

    @Override
    public MaterialReturnEntities updateMaterialReturn(String id, MaterialReturnEntities materialReturnEntities) {
        return jdbi.withHandle(handle -> {
            handle.createUpdate(UPDATE)
                    .bind("id",id)
                    .bind("materialID", materialReturnEntities.getMaterialID())
                    .bind("price", materialReturnEntities.getPrice())
                    .bind("unit", materialReturnEntities.getUnit())
                    .bind("quantity", materialReturnEntities.getQuantity())
                    .bind("status", materialReturnEntities.getStatus())
                    .bind("description", materialReturnEntities.getDescription())
                    .bind("returnDate", materialReturnEntities.getReturnDate())
                    .execute();
            materialReturnEntities.setId(id);
            return materialReturnEntities;
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
