package fitnlu.ntpos.paymentservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.paymentservice.adapter.output.persistance.mapper.PaySlipInventoryMapperOutput;
import fitnlu.ntpos.paymentservice.adapter.output.persistance.mapper.PaySlipOrderMapperOutput;
import fitnlu.ntpos.paymentservice.adapter.output.persistance.repository.IPaySlipInventoryDBIRepository;
import fitnlu.ntpos.paymentservice.adapter.output.persistance.repository.IPaySlipOrderDBIRepository;
import fitnlu.ntpos.paymentservice.application.ports.output.IReadPaySlipInventoryPort;
import fitnlu.ntpos.paymentservice.application.ports.output.IReadPaySlipOrderPort;
import fitnlu.ntpos.paymentservice.application.ports.output.IReadReceiptInventoryPort;
import fitnlu.ntpos.paymentservice.domain.model.PaySlip;
import fitnlu.ntpos.paymentservice.domain.model.Receipt;
import fitnlu.ntpos.paymentservice.domain.model.TimeSearch;
import fitnlu.ntpos.paymentservice.infrastructure.annotations.Adapter;
import fitnlu.ntpos.paymentservice.infrastructure.paging.IPaging;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class ReadPaySlipInventoryAdapter implements IReadPaySlipInventoryPort {
    private final IPaySlipInventoryDBIRepository iPaySlipInventoryDBIRepository;


    @Override
    public List<PaySlip> findAllPaySlip() {
        return iPaySlipInventoryDBIRepository.findAllPaySlip().stream().map(PaySlipInventoryMapperOutput::toDomain).toList();
    }

    @Override
    public List<PaySlip> filterAllPaySlip(IPaging paging, TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue) {
        return iPaySlipInventoryDBIRepository.filterAllPaySlip(paging, timeSearch, searchType, searchValue, sortType, sortValue).stream().map(PaySlipInventoryMapperOutput::toDomain).toList();
    }

    @Override
    public List<PaySlip> filterAllPaySlip(TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue) {
        return iPaySlipInventoryDBIRepository.filterAllPaySlip(timeSearch, searchType, searchValue, sortType, sortValue).stream().map(PaySlipInventoryMapperOutput::toDomain).toList();
    }
}
