package fitnlu.ntpos.userservice.infrastructure.paging;

public interface IPaging {
    Integer getPage();
    Integer getOffset();
    Integer getLimit();
}
