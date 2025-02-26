package fitnlu.ntpos.orderservice.infracstructure.paging;

public interface IPaging {
    Integer getPage();
    Integer getOffset();
    Integer getLimit();
}
