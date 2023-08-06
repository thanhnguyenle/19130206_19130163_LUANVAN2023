package fitnlu.ntpos.paymentservice.adapter.output.persistance.adapter;

import fitnlu.ntpos.paymentservice.adapter.output.persistance.mapper.PaySlipOrderMapperOutput;
import fitnlu.ntpos.paymentservice.adapter.output.persistance.mapper.ReceiptOrderMapperOutput;
import fitnlu.ntpos.paymentservice.adapter.output.persistance.repository.IPaySlipOrderDBIRepository;
import fitnlu.ntpos.paymentservice.adapter.output.persistance.repository.IReceiptOrderDBIRepository;
import fitnlu.ntpos.paymentservice.application.ports.output.IReadPaySlipOrderPort;
import fitnlu.ntpos.paymentservice.application.ports.output.IReadReceiptOrderPort;
import fitnlu.ntpos.paymentservice.domain.model.PaySlip;
import fitnlu.ntpos.paymentservice.domain.model.Receipt;
import fitnlu.ntpos.paymentservice.domain.model.TimeSearch;
import fitnlu.ntpos.paymentservice.infrastructure.annotations.Adapter;
import fitnlu.ntpos.paymentservice.infrastructure.paging.IPaging;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class ReadPaySlipOrderAdapter implements IReadPaySlipOrderPort {
    private final IPaySlipOrderDBIRepository iReceiptOrderDBIRepository;

    @Override
    public List<PaySlip> findAllPaySlip() {
        return iReceiptOrderDBIRepository.findAllPaySlip().stream().map(PaySlipOrderMapperOutput::toDomain).toList();
    }

    @Override
    public List<PaySlip> filterAllPaySlip(IPaging paging, TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue) {
        return iReceiptOrderDBIRepository.filterAllPaySlip(paging, timeSearch, searchType, searchValue, sortType, sortValue).stream().map(PaySlipOrderMapperOutput::toDomain).toList();
    }

    @Override
    public List<PaySlip> filterAllPaySlip(TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue) {
        return iReceiptOrderDBIRepository.filterAllPaySlip(timeSearch, searchType, searchValue, sortType, sortValue).stream().map(PaySlipOrderMapperOutput::toDomain).toList();
    }
}
