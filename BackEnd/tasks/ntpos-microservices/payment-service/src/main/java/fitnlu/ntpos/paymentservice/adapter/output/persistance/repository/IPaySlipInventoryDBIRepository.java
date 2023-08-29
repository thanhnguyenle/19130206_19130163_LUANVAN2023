package fitnlu.ntpos.paymentservice.adapter.output.persistance.repository;

import fitnlu.ntpos.paymentservice.adapter.output.persistance.entities.PaySlipInventoryEntities;
import fitnlu.ntpos.paymentservice.domain.model.TimeSearch;
import fitnlu.ntpos.paymentservice.infrastructure.paging.IPaging;

import java.util.List;

public interface IPaySlipInventoryDBIRepository {
    List<PaySlipInventoryEntities> findAllPaySlip();
    List<PaySlipInventoryEntities> filterAllPaySlip(IPaging paging, TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue);
    List<PaySlipInventoryEntities> filterAllPaySlip(TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue);
    PaySlipInventoryEntities addPaySlip(PaySlipInventoryEntities paySlipInventoryEntities);

    PaySlipInventoryEntities removePaySlip(String id);

    PaySlipInventoryEntities updatePaySlip(String id, PaySlipInventoryEntities paySlipInventoryEntities);
}
