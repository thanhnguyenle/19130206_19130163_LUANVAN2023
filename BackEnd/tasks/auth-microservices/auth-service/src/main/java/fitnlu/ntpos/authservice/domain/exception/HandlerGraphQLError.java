package fitnlu.ntpos.authservice.domain.exception;

import graphql.ErrorClassification;
import graphql.GraphQLError;
import graphql.language.SourceLocation;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@AllArgsConstructor
@Getter
@Setter
public class HandlerOtherError extends RuntimeException implements GraphQLError {
    private String message;
    private String statusCode;
    private String status;

    @Override
    public String getLocalizedMessage() {
        return message;
    }

    @Override
    public Map<String, Object> getExtensions() {
        Map<String, Object> extensions = GraphQLError.super.getExtensions();
        extensions.put("status", status);
        extensions.put("statusCode", statusCode);
        extensions.put("message", message);
        return extensions;
    }

    @Override
    public List<SourceLocation> getLocations() {
        return null;
    }

    @Override
    public ErrorClassification getErrorType() {
        return null;
    }

}
