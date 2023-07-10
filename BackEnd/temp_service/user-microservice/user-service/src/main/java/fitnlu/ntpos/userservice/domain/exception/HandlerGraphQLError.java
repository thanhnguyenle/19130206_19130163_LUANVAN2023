package fitnlu.ntpos.userservice.domain.exception;

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
    private String statusCode;
    private String status;

    @Override
    public String getMessage() {
//        400	Indicates that the request is invalid, usually related with the validation of the payload
//        401	Indicates that clients should provide authorization or the provided authorization is invalid
//        403	Indicates that the authorization provided by the client is not enough to access the resource
//        404	Indicates that the requested resource does not exist
//        405	Indicates that the method chosen by the client to access a resource is not supported
//        409	Indicates that the resource the client is trying to create already exists or some conflict when processing the request
//        415	Indicates that the requested media type is not supported
        if(statusCode.equals("400")){
            return "["+statusCode+":"+status+"] -> "+"Request is invalid, usually related with the validation of the payload";
        }else if(statusCode.equals("401")){
            return "["+statusCode+":"+status+"] -> "+"Clients should provide authorization or the provided authorization is invalid";
        }else if(statusCode.equals("403")){
            return "["+statusCode+":"+status+"] -> "+"Authorization provided by the client is not enough to access the resource";
        }else if(statusCode.equals("404")){
            return "["+statusCode+":"+status+"] -> "+"Requested resource does not exist";
        }else if(statusCode.equals("405")){
            return "["+statusCode+":"+status+"] -> "+"Method chosen by the client to access a resource is not supported";
        }else if(statusCode.equals("409")){
            return "["+statusCode+":"+status+"] -> "+"Resource the client is trying to create already exists or some conflict when processing the request";
        }else if(statusCode.equals("415")){
            return "["+statusCode+":"+status+"] -> "+"Requested media type is not supported";
        }else{
            return "["+statusCode+":"+status+"] -> "+"Unknown error";
        }
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
