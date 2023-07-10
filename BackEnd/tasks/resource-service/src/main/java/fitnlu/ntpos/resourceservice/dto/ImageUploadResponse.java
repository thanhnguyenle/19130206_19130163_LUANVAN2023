package fitnlu.ntpos.resourceservice.dto;

public class ImageUploadResponse {
    private String id;
    private String url;

    public ImageUploadResponse() {
    }

    public ImageUploadResponse(String id, String url) {
        this.id = id;
        this.url = url;
    }

    public String getId() {
        return this.id;
    }

        public String getUrl() {
            return this.url;
        }

}
