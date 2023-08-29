package fitnlu.ntpos.productservice.infrastructure.paging;

public interface IPaging {
    Integer getPage();
    Integer getOffset();
    Integer getLimit();
}
