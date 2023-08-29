package fitnlu.ntpos.productservice.application.ports.input;

import fitnlu.ntpos.productservice.adapter.input.dto.ListProductOutput;
import fitnlu.ntpos.productservice.adapter.input.dto.PagingInput;
import fitnlu.ntpos.productservice.adapter.input.dto.ProductOutput;
import fitnlu.ntpos.productservice.domain.model.Product;
import fitnlu.ntpos.productservice.domain.model.TimeSearch;
import fitnlu.ntpos.productservice.infrastructure.paging.IPaging;

import java.util.List;

public interface IFindProductEndpointPort {
     ListProductOutput filterProduct(PagingInput paging, String categoryID, String searchType, String searchValue, String sortType, String sortValue) ;
     List<ProductOutput> findAllProduct();
     ProductOutput findProductById(String id) ;
     int getTotalItem();
    ListProductOutput filterProductByTime(PagingInput paging, TimeSearch timeSearch);

}
