package fitnlu.ntpos.paymentservice.adapter.output.persistance.repository;
import fitnlu.ntpos.paymentservice.adapter.output.persistance.entities.PaySlipInventoryEntities;
import fitnlu.ntpos.paymentservice.adapter.output.persistance.entities.PaySlipOrderEntities;
import fitnlu.ntpos.paymentservice.adapter.output.persistance.entities.ReceiptInventoryEntities;
import fitnlu.ntpos.paymentservice.adapter.output.persistance.entities.ReceiptOrderEntities;
import fitnlu.ntpos.paymentservice.domain.model.DateTime;
import fitnlu.ntpos.paymentservice.domain.model.TimeSearch;
import fitnlu.ntpos.paymentservice.infrastructure.paging.IPaging;
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
public class ReceiptInventoryRepository implements IReceiptInventoryDBIRepository {
    private static final String GET_LIST = "select * from `receiptInventory`";
    private static final String CREATE = "INSERT INTO `receiptInventory` VALUES (:id, :materialID, :total, :totalReceive,:totalReturn,:description,:paymentType,:accountSend,:accountReceive,:status,:createdAt)";
    private static final String DELETE = "DELETE FROM `receiptInventory` WHERE id = :id";
    private static final String UPDATE = "UPDATE `receiptInventory` SET materialID=:materialID, total=:total, totalReceive=:totalReceive, totalReturn=:totalReturn, description=:description,paymentType=:paymentType,accountSend=:accountSend,accountReceive=:accountReceive, status=:status WHERE id=:id";
    @NonNull
    private final Jdbi jdbi;

    @Override
    public List<ReceiptInventoryEntities> findReceipts() {
        return jdbi.withHandle(handle -> handle.createQuery(GET_LIST).mapToBean(ReceiptInventoryEntities.class).list());
    }

    @Override
    public List<ReceiptInventoryEntities> filterReceipts(IPaging paging, TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue) {
        List<ReceiptInventoryEntities> paySlipInventoryEntities = filterReceipts(timeSearch, searchType, searchValue, sortType, sortValue);
        if(paging !=null){
            return paySlipInventoryEntities.stream().skip(paging.getOffset()).limit(paging.getLimit()).toList();
        }
        return paySlipInventoryEntities;
    }

    @Override
    public List<ReceiptInventoryEntities> filterReceipts(TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue) {
        StringBuilder query = new StringBuilder(GET_LIST);
        boolean hasTimeSearch = false;
        if(timeSearch != null){
            hasTimeSearch = true;
            PaySlipInventoryRepository.TimeSearchCompute timeSearchCompute = getTimeSearchCompute(timeSearch);
            query.append(" WHERE createdAt BETWEEN '").append(timeSearchCompute.startTime).append("' AND '").append(timeSearchCompute.endTime).append("'");
        }
        if(searchType != null && !searchType.isEmpty() && searchValue != null && !searchValue.isEmpty()){
            if(hasTimeSearch){
                query.append(" AND ");
            }else{
                query.append(" WHERE ");
            }
            query.append(searchType).append(" LIKE '%").append(searchValue).append("%'");
        }
        if(sortType != null && !sortType.isEmpty() && sortValue != null && !sortValue.isEmpty()){
            query.append(" ORDER BY ").append(sortType).append(" ").append(sortValue);
        }
        return jdbi.withHandle(handle -> handle.createQuery(query.toString())
                .mapToBean(ReceiptInventoryEntities.class)
                .list());
    }

    @Override
    public ReceiptInventoryEntities addReceipt(ReceiptInventoryEntities receiptInventoryEntities) {
        String id = UUID.randomUUID().toString();
        return jdbi.withHandle(handle -> {
            handle.createUpdate(CREATE)
                    .bind("id", id)
                    .bind("materialID", receiptInventoryEntities.getMaterialID())
                    .bind("total", receiptInventoryEntities.getTotal())
                    .bind("totalReceive", receiptInventoryEntities.getTotalReceive())
                    .bind("totalReturn", receiptInventoryEntities.getTotalReturn())
                    .bind("description", receiptInventoryEntities.getDescription())
                    .bind("paymentType", receiptInventoryEntities.getPaymentType())
                    .bind("accountSend", receiptInventoryEntities.getAccountSend())
                    .bind("accountReceive", receiptInventoryEntities.getAccountReceive())
                    .bind("status", receiptInventoryEntities.getStatus())
                    .bind("createdAt",System.currentTimeMillis()/1000)
                    .execute();
            receiptInventoryEntities.setId(id);
            return receiptInventoryEntities;
        });
    }

    @Override
    public ReceiptInventoryEntities removeReceipt(String id) {
        return jdbi.withHandle(handle -> {
            handle.createUpdate(DELETE)
                    .bind("id", id)
                    .execute();
            return ReceiptInventoryEntities.builder()
                    .id(id)
                    .build();
        });
    }

    @Override
    public ReceiptInventoryEntities updateReceipt(String id, ReceiptInventoryEntities receiptInventoryEntities) {
        return jdbi.withHandle(handle -> {
            handle.createUpdate(UPDATE)
                    .bind("id", id)
                    .bind("materialID", receiptInventoryEntities.getMaterialID())
                    .bind("total", receiptInventoryEntities.getTotal())
                    .bind("totalReceive", receiptInventoryEntities.getTotalReceive())
                    .bind("totalReturn", receiptInventoryEntities.getTotalReturn())
                    .bind("description", receiptInventoryEntities.getDescription())
                    .bind("paymentType", receiptInventoryEntities.getPaymentType())
                    .bind("accountSend", receiptInventoryEntities.getAccountSend())
                    .bind("accountReceive", receiptInventoryEntities.getAccountReceive())
                    .bind("status", receiptInventoryEntities.getStatus())
                    .execute();
            receiptInventoryEntities.setId(id);
            return receiptInventoryEntities;
        });
    }

    @Builder
    static
    class TimeSearchCompute {
        long startTime;
        long endTime;
    }
    public PaySlipInventoryRepository.TimeSearchCompute getTimeSearchCompute(TimeSearch timeSearch) {
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
        return PaySlipInventoryRepository.TimeSearchCompute.builder()
                .startTime(finalStartTime)
                .endTime(finalEndTime)
                .build();
    }
}
