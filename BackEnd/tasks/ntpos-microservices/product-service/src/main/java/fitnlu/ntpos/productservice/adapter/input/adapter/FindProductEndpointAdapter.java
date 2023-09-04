package fitnlu.ntpos.productservice.adapter.input.adapter;

import fitnlu.ntpos.grpcproto.OrderRequest;
import fitnlu.ntpos.productservice.adapter.gRPCInput.OrderGrpcServerService;
import fitnlu.ntpos.productservice.adapter.input.dto.*;
import fitnlu.ntpos.productservice.adapter.input.mapper.CategoryMapperInput;
import fitnlu.ntpos.productservice.adapter.input.mapper.ImageMapperInput;
import fitnlu.ntpos.productservice.adapter.input.mapper.ProductMapperInput;
import fitnlu.ntpos.productservice.application.ports.input.IFindImageEndpointPort;
import fitnlu.ntpos.productservice.application.ports.input.IFindProductEndpointPort;
import fitnlu.ntpos.productservice.application.usecases.category.IFilterCategoryUseCase;
import fitnlu.ntpos.productservice.application.usecases.category.IFindCategoryByProductIDUseCase;
import fitnlu.ntpos.productservice.application.usecases.image.IFindImageByProductIDUseCase;
import fitnlu.ntpos.productservice.application.usecases.product.*;
import fitnlu.ntpos.productservice.domain.model.Product;
import fitnlu.ntpos.productservice.domain.model.TimeSearch;
import fitnlu.ntpos.productservice.infrastructure.annotations.Adapter;
import fitnlu.ntpos.productservice.infrastructure.paging.IPaging;
import fitnlu.ntpos.productservice.infrastructure.paging.PageRequest;
import lombok.RequiredArgsConstructor;

import java.util.Comparator;
import java.util.List;

@Adapter
@RequiredArgsConstructor
public class FindProductEndpointAdapter implements IFindProductEndpointPort {
    private final IFindProductUseCase findProductUseCase;
    private final IFindAllProductUseCase findAllProductUseCase;
    private final IFilterProductsUseCase filterProductsUseCase;
    private final ITotalProductUseCase totalProductUseCase;
    private final IFindImageByProductIDUseCase findImageByProductIDUseCase;
    private final IFindCategoryByProductIDUseCase findCategoryByProductIDUseCase;
    private final IFilterProductByTime iFilterProductByTime;
    private final OrderGrpcServerService orderGrpcServerService;


    @Override
    public ListProductOutput filterProduct(PagingInput pagingInput, String categoryID, String searchType, String searchValue, String sortType, String sortValue) {
        IPaging paging = pagingInput!=null?new PageRequest(pagingInput.page(),pagingInput.limit()):null;
        List<Product> products = filterProductsUseCase.filterProduct(categoryID,searchType,searchValue,sortType,sortValue);
        int totalItem = products.size();
        if(paging!=null && paging.getPage()!=null){
            List<ProductOutput> productsOutputs = products.stream().skip(paging.getOffset()).limit(paging.getLimit()).map(product ->{
                ProductOutput productOutput = ProductMapperInput.toDTO(product);

                //get category of products
                List<CategoryOutput> categoryOutputs = findCategoryByProductIDUseCase.findCategoryByProduct(product.getId()).stream().map(CategoryMapperInput::toDTO).toList();
                productOutput.setCategories(categoryOutputs);

                //get image of products
                List<ProductImageOutput> imageOutputs = findImageByProductIDUseCase.findImageByProduct(product.getId()).stream().map(ImageMapperInput::toDomain).toList();
                productOutput.setImages(imageOutputs);
                return productOutput;
            }).toList();
            int totalPage = totalItem%paging.getLimit()==0?totalItem/paging.getLimit():totalItem/paging.getLimit()+1;
            return ListProductOutput.builder()
                    .products(productsOutputs)
                    .currentPage(paging.getPage())
                    .totalPage(totalPage<=0?1:totalPage)
                    .totalItem(totalItem)
                    .build();
        }else{
            return ListProductOutput.builder()
                    .products(products.stream().map(product -> {
                        ProductOutput productOutput = ProductMapperInput.toDTO(product);

                        //get category of products
                        List<CategoryOutput> categoryOutputs = findCategoryByProductIDUseCase.findCategoryByProduct(product.getId()).stream().map(CategoryMapperInput::toDTO).toList();
                        productOutput.setCategories(categoryOutputs);

                        //get image of products
                        List<ProductImageOutput> imageOutputs = findImageByProductIDUseCase.findImageByProduct(product.getId()).stream().map(ImageMapperInput::toDomain).toList();
                        productOutput.setImages(imageOutputs);
                        return productOutput;
                    }).toList())
                    .currentPage(1)
                    .totalPage(1)
                    .totalItem(products.size())
                    .build();
        }
    }

    @Override
    public List<ProductOutput> findAllProduct() {

       return findAllProductUseCase.findAllProduct().stream().map(product -> {
            ProductOutput productOutput = ProductMapperInput.toDTO(product);

            //get category of products
            List<CategoryOutput> categoryOutputs = findCategoryByProductIDUseCase.findCategoryByProduct(product.getId()).stream().map(CategoryMapperInput::toDTO).toList();
            productOutput.setCategories(categoryOutputs);

            //get image of products
           List<ProductImageOutput> productImageOutputs = findImageByProductIDUseCase.findImageByProduct(product.getId()).stream().map(ImageMapperInput::toDomain).toList();
            productOutput.setImages(productImageOutputs);
            return productOutput;
        }).toList();
    }

    @Override
    public ProductOutput findProductById(String id) {
        ProductOutput productOutput = ProductMapperInput.toDTO(findProductUseCase.findProductById(id));
        //get category of products
        List<CategoryOutput> categoryOutputs = findCategoryByProductIDUseCase.findCategoryByProduct(id).stream().map(CategoryMapperInput::toDTO).toList();
        productOutput.setCategories(categoryOutputs);

        //get image of products
        List<ProductImageOutput> productImageOutputs = findImageByProductIDUseCase.findImageByProduct(id).stream().map(ImageMapperInput::toDomain).toList();
        productOutput.setImages(productImageOutputs);
        return productOutput;
    }

    @Override
    public int getTotalItem() {
        return totalProductUseCase.getTotalItem();
    }

    @Override
    public ListProductOutput filterProductByTime(PagingInput paging, TimeSearch timeSearch) {
        IPaging ipaging = paging != null ? new PageRequest(paging.page(), paging.limit()) : null;
        List<Product> products = iFilterProductByTime.filterProductByTime(timeSearch);
        int totalItem = products.size();
        if (ipaging != null && ipaging.getPage() != null) {
            List<ProductOutput> productOutputs = products.stream().skip(ipaging.getOffset()).limit(ipaging.getLimit()).map(product -> {
                ProductOutput productOutput = ProductMapperInput.toDTO(product);

                //get category of products
                List<CategoryOutput> categoryOutputs = findCategoryByProductIDUseCase.findCategoryByProduct(product.getId()).stream().map(CategoryMapperInput::toDTO).toList();
                productOutput.setCategories(categoryOutputs);

                //get image of products
                List<ProductImageOutput> productImageOutputs = findImageByProductIDUseCase.findImageByProduct(product.getId()).stream().map(ImageMapperInput::toDomain).toList();
                productOutput.setImages(productImageOutputs);
                return productOutput;
            }).toList();
            int totalPage = totalItem % ipaging.getLimit() == 0 ? totalItem / ipaging.getLimit() : totalItem / ipaging.getLimit() + 1;
            return ListProductOutput.builder()
                    .products(productOutputs)
                    .currentPage(ipaging.getPage())
                    .totalPage(totalPage <= 0 ? 1 : totalPage)
                    .totalItem(totalItem)
                    .build();
        } else {
            return ListProductOutput.builder()
                    .products(products.stream().map(product ->{
                        ProductOutput productOutput = ProductMapperInput.toDTO(product);

                        //get category of products
                        List<CategoryOutput> categoryOutputs = findCategoryByProductIDUseCase.findCategoryByProduct(product.getId()).stream().map(CategoryMapperInput::toDTO).toList();
                        productOutput.setCategories(categoryOutputs);

                        //get image of products
                        List<ProductImageOutput> productImageOutputs = findImageByProductIDUseCase.findImageByProduct(product.getId()).stream().map(ImageMapperInput::toDomain).toList();
                        productOutput.setImages(productImageOutputs);
                        return productOutput;
                    }).toList())
                    .currentPage(1)
                    .totalPage(1)
                    .totalItem(products.size())
                    .build();
        }
    }

    @Override
    public ListOrderProductOutput filterProductPercentByTime(PagingInput paging, fitnlu.ntpos.grpcproto.TimeSearch timeSearch, String sortType, String sortValue) {
        List<Product> products = findAllProductUseCase.findAllProduct();
        List<OrderProductOutput>  orderProductOutputs= null;
        if(timeSearch==null){
            orderProductOutputs =  orderGrpcServerService.getProductOrderPercent(products.stream().map(productOutput -> OrderRequest.newBuilder()
                    .setTimestamp(fitnlu.ntpos.grpcproto.TimeSearch.ALL_TIME)
                    .setProductID(productOutput.getId()).build()).toList()).stream().sorted((o1, o2) -> {
                if(sortType!=null&&sortType.equals("ASC")){
                    return (int)(o1.getPercent()-o2.getPercent());
                }else {
                    return (int)(o2.getPercent()-o1.getPercent());
                }
            }).toList();
        }else
            orderProductOutputs = orderGrpcServerService.getProductOrderPercent(products.stream().map(productOutput -> OrderRequest.newBuilder()
                .setTimestamp(timeSearch)
                .setProductID(productOutput.getId()).build()).toList()).stream().sorted((o1, o2) ->  {
                if(sortType!=null&&sortType.equals("ASC")){
                    return (int)(o1.getPercent()-o2.getPercent());
                }else {
                    return (int)(o2.getPercent()-o1.getPercent());
                }}).toList();
        IPaging ipaging = paging != null ? new PageRequest(paging.page(), paging.limit()) : null;
        int totalItem = orderProductOutputs.size();
        if (ipaging != null && ipaging.getPage() != null) {
            int totalPage = totalItem % ipaging.getLimit() == 0 ? totalItem / ipaging.getLimit() : totalItem / ipaging.getLimit() + 1;
            return ListOrderProductOutput.builder()
                    .orderProductOutputs(orderProductOutputs.stream().skip(ipaging.getOffset()).limit(ipaging.getLimit()).toList())
                    .currentPage(ipaging.getPage())
                    .totalPage(totalPage <= 0 ? 1 : totalPage)
                    .totalItem(totalItem)
                    .build();
        }else {
            return ListOrderProductOutput.builder()
                    .orderProductOutputs(orderProductOutputs.stream().toList())
                    .currentPage(1)
                    .totalPage(1)
                    .totalItem(orderProductOutputs.size())
                    .build();
        }
    }
}
