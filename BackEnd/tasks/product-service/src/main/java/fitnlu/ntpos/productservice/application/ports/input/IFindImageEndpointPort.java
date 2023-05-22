package fitnlu.ntpos.productservice.application.ports.input;

import fitnlu.ntpos.productservice.adapter.input.dto.CategoryInput;
import fitnlu.ntpos.productservice.adapter.input.dto.ProductImageOutput;
import fitnlu.ntpos.productservice.adapter.input.dto.ResultOutput;

import java.util.List;

public interface IFindImageEndpointPort {
   List<ProductImageOutput> findImageByProductID(String productID);
}
