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
public class HandlerGraphQLError extends RuntimeException implements GraphQLError {
    private String message;
    private String statusCode;
    private String status;

    @Override
    public String getMessage() {
        return "["+statusCode+":"+status+"] -> "+message;
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
