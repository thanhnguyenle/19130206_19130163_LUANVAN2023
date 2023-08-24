package fitnlu.ntpos.paymentservice.infrastructure.paging;

public interface IPaging {
    Integer getPage();
    Integer getOffset();
    Integer getLimit();
}
