package fitnlu.ntpos.paymentservice.adapter.output.persistance.repository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
@RequiredArgsConstructor
public class ReceiptOrderRepository implements IPaySlipOrderDBIRepository {

}
