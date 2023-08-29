package fitnlu.ntpos.notificationservice.constants;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class GetPropertiesBean {
    private final String bootstrapServer ;

    @Autowired
    public GetPropertiesBean(@Value("${spring.kafka.bootstrap-servers}") String bootstrapServers){
        this.bootstrapServer = bootstrapServers;
        System.out.println(bootstrapServers);
    }

    public String getBootstrapServer() {
        return bootstrapServer;
    }
}
