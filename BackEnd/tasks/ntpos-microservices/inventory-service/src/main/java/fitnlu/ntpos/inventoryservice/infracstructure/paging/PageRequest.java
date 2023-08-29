package fitnlu.ntpos.inventoryservice.infracstructure.paging;

public class PageRequest implements IPaging{
    private Integer page;
    private Integer maxPageItem;

    public PageRequest(Integer page, Integer maxPageItem) {
        this.page = page;
        this.maxPageItem = maxPageItem;
    }

    @Override
    public Integer getPage() {
        return this.page;
    }

    @Override
    public Integer getOffset() {
        if(this.page!=null && this.maxPageItem !=null){
            return (this.page - 1)*this.maxPageItem;
        }
        return null;
    }

    @Override
    public Integer getLimit() {
        return this.maxPageItem;
    }
}
