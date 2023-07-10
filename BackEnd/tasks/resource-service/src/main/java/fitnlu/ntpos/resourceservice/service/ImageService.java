package fitnlu.ntpos.resourceservice.service;

import fitnlu.ntpos.resourceservice.dto.ImageUploadResponse;
import fitnlu.ntpos.resourceservice.entities.ImageEntities;
import fitnlu.ntpos.resourceservice.model.ImageUtil;
import fitnlu.ntpos.resourceservice.repository.ImageRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ImageService {
    @Autowired
    private ImageRepository imageRepository;
    private final static String IMAGE_URL = "/api/image/";
    public ImageUploadResponse uploadImage(MultipartFile file) throws IOException {
        String id = UUID.randomUUID().toString();
        imageRepository.save(ImageEntities.builder()
                        .id(id)
                        .data(ImageUtil.compressImage(file.getBytes()))
                .build());
        return new ImageUploadResponse(id, IMAGE_URL + id);
    }

    @Transactional
    public ImageEntities getInfoByImageByID(String id) {
        Optional<ImageEntities> dbImage = imageRepository.findById(id);

        return ImageEntities.builder()
                .id(dbImage.get().getId())
                .data(ImageUtil.decompressImage(dbImage.get().getData())).build();

    }
    @Transactional
    public byte[] getImage(String id) {
        Optional<ImageEntities> dbImage = imageRepository.findById(id);
        return ImageUtil.decompressImage(dbImage.get().getData());
    }
}
