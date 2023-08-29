package fitnlu.ntpos.paymentservice.adapter.output.persistance.repository;

import fitnlu.ntpos.paymentservice.adapter.output.persistance.entities.PaySlipOrderEntities;
import fitnlu.ntpos.paymentservice.domain.model.PaySlip;
import fitnlu.ntpos.paymentservice.domain.model.TimeSearch;
import fitnlu.ntpos.paymentservice.infrastructure.paging.IPaging;

import java.util.List;

public interface IPaySlipOrderDBIRepository {
    List<PaySlipOrderEntities> findAllPaySlip();
    List<PaySlipOrderEntities> filterAllPaySlip(IPaging paging, TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue);
    List<PaySlipOrderEntities> filterAllPaySlip(TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue);
    PaySlipOrderEntities addPaySlip(PaySlipOrderEntities paySlipOrderEntities);

    PaySlipOrderEntities removePaySlip(String id);

    PaySlipOrderEntities updatePaySlip(String id, PaySlipOrderEntities paySlipOrderEntities);

    boolean addBatchPaySlip(List<PaySlipOrderEntities> toList);
}
