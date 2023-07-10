package fitnlu.ntpos.inventoryservice.adapter.input.adapter;

import fitnlu.ntpos.inventoryservice.adapter.input.dto.*;
import fitnlu.ntpos.inventoryservice.adapter.input.mapper.ImageMapperInput;
import fitnlu.ntpos.inventoryservice.adapter.input.mapper.MaterialMapperInput;
import fitnlu.ntpos.inventoryservice.adapter.input.mapper.MaterialSupplierMapperInput;
import fitnlu.ntpos.inventoryservice.adapter.input.mapper.SupplierMapperInput;
import fitnlu.ntpos.inventoryservice.application.ports.input.IFindMaterialEndpointPort;
import fitnlu.ntpos.inventoryservice.application.usecases.image.IFindAllImageByMaterialIDUseCase;
import fitnlu.ntpos.inventoryservice.application.usecases.material.IFindAllMaterialByProductIDUseCase;
import fitnlu.ntpos.inventoryservice.application.usecases.material.IFindAllMaterialBySupplierIDUseCase;
import fitnlu.ntpos.inventoryservice.application.usecases.material.IFindAllMaterialUseCase;
import fitnlu.ntpos.inventoryservice.application.usecases.material.IFindMaterialUseCase;
import fitnlu.ntpos.inventoryservice.application.usecases.supplier.IFindAllSupplierByMaterialIDUseCase;
import fitnlu.ntpos.inventoryservice.domain.model.Material;
import fitnlu.ntpos.inventoryservice.domain.model.TimeSearch;
import fitnlu.ntpos.inventoryservice.infracstructure.annotations.Adapter;
import fitnlu.ntpos.inventoryservice.infracstructure.paging.IPaging;
import fitnlu.ntpos.inventoryservice.infracstructure.paging.PageRequest;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Adapter
@RequiredArgsConstructor
public class FindMaterialEndpointAdapter implements IFindMaterialEndpointPort {
    private final IFindAllMaterialUseCase findAllMaterialUseCase;
    private final IFindMaterialUseCase findMaterialUseCase;
    private final IFindAllMaterialByProductIDUseCase findAllMaterialByProductIDUseCase;
    private final IFindAllMaterialBySupplierIDUseCase findAllMaterialBySupplierIDUseCase;
    private final IFindAllImageByMaterialIDUseCase findAllImageByMaterialIDUseCase;
    private final IFindAllSupplierByMaterialIDUseCase findAllSupplierByMaterialIDUseCase;

    @Override
    public ListMaterialOutput findAllMaterialByProductID(String productID) {
        List<MaterialOutput> materialOutputs = findAllMaterialByProductIDUseCase.findAllMaterialByProductID(productID).stream().map(material -> {
            MaterialOutput materialOutput = MaterialMapperInput.toDTO(material);
            //material images
            List<MaterialImageOutput> materialImageOutputs = findAllImageByMaterialIDUseCase.findAllImageByMaterialID(material.getId()).stream().map(ImageMapperInput::toDTO).toList();
            materialOutput.setMaterialImageOutputs(materialImageOutputs);

            //material supplier
            List<MaterialSupplierOutput> supplierOutputs = findAllSupplierByMaterialIDUseCase.findALlSupplierByMaterialID(material.getId()).stream().map(MaterialSupplierMapperInput::toDTO).toList();
            materialOutput.setMaterialSupplierOutputs(supplierOutputs);

            //material productID

            return materialOutput;
        }).toList();
        return ListMaterialOutput.builder()
                .materialOutputs(materialOutputs)
                .currentPage(1)
                .totalPage(1)
                .totalPage(materialOutputs.size())
                .build();
    }

    @Override
    public ListMaterialOutput filterAllMaterialByProductID(PagingInput pagingInput, String productID, String searchType, String searchValue, String sortType, String sortValue) {
        IPaging ipaging = pagingInput != null ? new PageRequest(pagingInput.page(), pagingInput.limit()) : null;
        List<Material> materialOutputs = findAllMaterialByProductIDUseCase.filterAllMaterialByProductID(productID, searchType, searchValue, sortType, sortValue);
        int totalItem = materialOutputs.size();
        if (ipaging != null && ipaging.getPage() != null) {
            List<MaterialOutput> materialOutputList = materialOutputs.stream().skip(ipaging.getOffset()).limit(ipaging.getLimit()).map(material -> {
                MaterialOutput materialOutput = MaterialMapperInput.toDTO(material);
                //material images
                List<MaterialImageOutput> materialImageOutputs = findAllImageByMaterialIDUseCase.findAllImageByMaterialID(material.getId()).stream().map(ImageMapperInput::toDTO).toList();
                materialOutput.setMaterialImageOutputs(materialImageOutputs);

                //material supplier
                List<MaterialSupplierOutput> supplierOutputs = findAllSupplierByMaterialIDUseCase.findALlSupplierByMaterialID(material.getId()).stream().map(MaterialSupplierMapperInput::toDTO).toList();
                materialOutput.setMaterialSupplierOutputs(supplierOutputs);

                //material productID

                return materialOutput;
            }).toList();
            int totalPage = totalItem % ipaging.getLimit() == 0 ? totalItem / ipaging.getLimit() : totalItem / ipaging.getLimit() + 1;
            return ListMaterialOutput.builder()
                    .materialOutputs(materialOutputList)
                    .currentPage(ipaging.getPage())
                    .totalPage(totalPage <= 0 ? 1 : totalPage)
                    .totalItem(totalItem)
                    .build();
        }
        return ListMaterialOutput.builder()
                .materialOutputs(materialOutputs.stream().map(material -> {
                    MaterialOutput materialOutput = MaterialMapperInput.toDTO(material);
                    //material images
                    List<MaterialImageOutput> materialImageOutputs = findAllImageByMaterialIDUseCase.findAllImageByMaterialID(material.getId()).stream().map(ImageMapperInput::toDTO).toList();
                    materialOutput.setMaterialImageOutputs(materialImageOutputs);

                    //material supplier
                    List<MaterialSupplierOutput> supplierOutputs = findAllSupplierByMaterialIDUseCase.findALlSupplierByMaterialID(material.getId()).stream().map(MaterialSupplierMapperInput::toDTO).toList();
                    materialOutput.setMaterialSupplierOutputs(supplierOutputs);

                    //material productID

                    return materialOutput;
                }).toList())
                .currentPage(1)
                .totalPage(1)
                .totalItem(totalItem)
                .build();
    }

    @Override
    public ListMaterialOutput findAllMaterialBySupplierID(String supplierID) {
        List<MaterialOutput> materialOutputs = findAllMaterialBySupplierIDUseCase.findAllMaterialBySupplierID(supplierID).stream().map(material -> {
            MaterialOutput materialOutput = MaterialMapperInput.toDTO(material);
            //material images
            List<MaterialImageOutput> materialImageOutputs = findAllImageByMaterialIDUseCase.findAllImageByMaterialID(material.getId()).stream().map(ImageMapperInput::toDTO).toList();
            materialOutput.setMaterialImageOutputs(materialImageOutputs);

            //material supplier
            List<MaterialSupplierOutput> supplierOutputs = findAllSupplierByMaterialIDUseCase.findALlSupplierByMaterialID(material.getId()).stream().map(MaterialSupplierMapperInput::toDTO).toList();
            materialOutput.setMaterialSupplierOutputs(supplierOutputs);

            //material productID

            return materialOutput;
        }).toList();
        return ListMaterialOutput.builder()
                .materialOutputs(materialOutputs)
                .currentPage(1)
                .totalPage(1)
                .totalPage(materialOutputs.size())
                .build();
    }

    @Override
    public ListMaterialOutput filterAllMaterialBySupplierID(PagingInput pagingInput, String supplierID, String searchType, String searchValue, String sortType, String sortValue) {
        IPaging ipaging = pagingInput != null ? new PageRequest(pagingInput.page(), pagingInput.limit()) : null;
        List<Material> materialOutputs = findAllMaterialBySupplierIDUseCase.filterAllMaterialBySupplierID(supplierID, searchType, searchValue, sortType, sortValue);
        int totalItem = materialOutputs.size();
        if (ipaging != null && ipaging.getPage() != null) {
            List<MaterialOutput> materialOutputList = materialOutputs.stream().skip(ipaging.getOffset()).limit(ipaging.getLimit()).map(material -> {
                MaterialOutput materialOutput = MaterialMapperInput.toDTO(material);
                //material images
                List<MaterialImageOutput> materialImageOutputs = findAllImageByMaterialIDUseCase.findAllImageByMaterialID(material.getId()).stream().map(ImageMapperInput::toDTO).toList();
                materialOutput.setMaterialImageOutputs(materialImageOutputs);

                //material supplier
                List<MaterialSupplierOutput> supplierOutputs = findAllSupplierByMaterialIDUseCase.findALlSupplierByMaterialID(material.getId()).stream().map(MaterialSupplierMapperInput::toDTO).toList();
                materialOutput.setMaterialSupplierOutputs(supplierOutputs);

                //material productID

                return materialOutput;
            }).toList();
            int totalPage = totalItem % ipaging.getLimit() == 0 ? totalItem / ipaging.getLimit() : totalItem / ipaging.getLimit() + 1;
            return ListMaterialOutput.builder()
                    .materialOutputs(materialOutputList)
                    .currentPage(ipaging.getPage())
                    .totalPage(totalPage <= 0 ? 1 : totalPage)
                    .totalItem(totalItem)
                    .build();
        }
        return ListMaterialOutput.builder()
                .materialOutputs(materialOutputs.stream().map(material -> {
                    MaterialOutput materialOutput = MaterialMapperInput.toDTO(material);
                    //material images
                    List<MaterialImageOutput> materialImageOutputs = findAllImageByMaterialIDUseCase.findAllImageByMaterialID(material.getId()).stream().map(ImageMapperInput::toDTO).toList();
                    materialOutput.setMaterialImageOutputs(materialImageOutputs);

                    //material supplier
                    List<MaterialSupplierOutput> supplierOutputs = findAllSupplierByMaterialIDUseCase.findALlSupplierByMaterialID(material.getId()).stream().map(MaterialSupplierMapperInput::toDTO).toList();
                    materialOutput.setMaterialSupplierOutputs(supplierOutputs);

                    //material productID

                    return materialOutput;
                }).toList())
                .currentPage(1)
                .totalPage(1)
                .totalItem(totalItem)
                .build();
    }

    @Override
    public ListMaterialOutput findAllMaterial() {
        List<MaterialOutput> materialOutputs = findAllMaterialUseCase.findAllMaterial().stream().map(material -> {
            MaterialOutput materialOutput = MaterialMapperInput.toDTO(material);
            //material images
            List<MaterialImageOutput> materialImageOutputs = findAllImageByMaterialIDUseCase.findAllImageByMaterialID(material.getId()).stream().map(ImageMapperInput::toDTO).toList();
            materialOutput.setMaterialImageOutputs(materialImageOutputs);

            //material supplier
            List<MaterialSupplierOutput> supplierOutputs = findAllSupplierByMaterialIDUseCase.findALlSupplierByMaterialID(material.getId()).stream().map(MaterialSupplierMapperInput::toDTO).toList();
            materialOutput.setMaterialSupplierOutputs(supplierOutputs);

            //material productID

            return materialOutput;
        }).toList();
        return ListMaterialOutput.builder()
                .materialOutputs(materialOutputs)
                .currentPage(1)
                .totalPage(1)
                .totalPage(materialOutputs.size())
                .build();
    }

    @Override
    public ListMaterialOutput filterAllMaterial(PagingInput pagingInput, TimeSearch timeSearch, String searchType, String searchValue, String sortType, String sortValue) {
        List<Material> materialOutputs = findAllMaterialUseCase.filterAllMaterial(timeSearch, searchType, searchValue, sortType, sortValue);
        IPaging ipaging = pagingInput != null ? new PageRequest(pagingInput.page(), pagingInput.limit()) : null;
        int totalItem = materialOutputs.size();
        if (ipaging != null && ipaging.getPage() != null) {
            List<MaterialOutput> materialOutputList = materialOutputs.stream().skip(ipaging.getOffset()).limit(ipaging.getLimit()).map(material -> {
                MaterialOutput materialOutput = MaterialMapperInput.toDTO(material);
                //material images
                List<MaterialImageOutput> materialImageOutputs = findAllImageByMaterialIDUseCase.findAllImageByMaterialID(material.getId()).stream().map(ImageMapperInput::toDTO).toList();
                materialOutput.setMaterialImageOutputs(materialImageOutputs);

                //material supplier
                List<MaterialSupplierOutput> supplierOutputs = findAllSupplierByMaterialIDUseCase.findALlSupplierByMaterialID(material.getId()).stream().map(MaterialSupplierMapperInput::toDTO).toList();
                materialOutput.setMaterialSupplierOutputs(supplierOutputs);

                //material productID

                return materialOutput;
            }).toList();
            int totalPage = totalItem % ipaging.getLimit() == 0 ? totalItem / ipaging.getLimit() : totalItem / ipaging.getLimit() + 1;
            return ListMaterialOutput.builder()
                    .materialOutputs(materialOutputList)
                    .currentPage(ipaging.getPage())
                    .totalPage(totalPage <= 0 ? 1 : totalPage)
                    .totalItem(totalItem)
                    .build();
        }
        return ListMaterialOutput.builder()
                .materialOutputs(materialOutputs.stream().map(material -> {
                    MaterialOutput materialOutput = MaterialMapperInput.toDTO(material);
                    //material images
                    List<MaterialImageOutput> materialImageOutputs = findAllImageByMaterialIDUseCase.findAllImageByMaterialID(material.getId()).stream().map(ImageMapperInput::toDTO).toList();
                    materialOutput.setMaterialImageOutputs(materialImageOutputs);

                    //material supplier
                    List<MaterialSupplierOutput> supplierOutputs = findAllSupplierByMaterialIDUseCase.findALlSupplierByMaterialID(material.getId()).stream().map(MaterialSupplierMapperInput::toDTO).toList();
                    materialOutput.setMaterialSupplierOutputs(supplierOutputs);

                    //material productID

                    return materialOutput;
                }).toList())
                .currentPage(1)
                .totalPage(1)
                .totalItem(totalItem)
                .build();
    }

    @Override
    public MaterialOutput findMaterial(String materialID) {
        MaterialOutput materialOutput = MaterialMapperInput.toDTO(findMaterialUseCase.findMaterial(materialID));
        //material images
        List<MaterialImageOutput> materialImageOutputs = findAllImageByMaterialIDUseCase.findAllImageByMaterialID(materialID).stream().map(ImageMapperInput::toDTO).toList();
        materialOutput.setMaterialImageOutputs(materialImageOutputs);
        //material supplier
        List<MaterialSupplierOutput> supplierOutputs = findAllSupplierByMaterialIDUseCase.findALlSupplierByMaterialID(materialID).stream().map(MaterialSupplierMapperInput::toDTO).toList();
        materialOutput.setMaterialSupplierOutputs(supplierOutputs);
        //material productID

        return materialOutput;
    }
}
