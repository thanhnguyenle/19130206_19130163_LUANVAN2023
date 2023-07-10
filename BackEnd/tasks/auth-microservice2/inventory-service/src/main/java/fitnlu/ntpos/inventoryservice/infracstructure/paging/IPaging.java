package fitnlu.ntpos.inventoryservice.infracstructure.paging;

public interface IPaging {
    Integer getPage();
    Integer getOffset();
    Integer getLimit();
}
