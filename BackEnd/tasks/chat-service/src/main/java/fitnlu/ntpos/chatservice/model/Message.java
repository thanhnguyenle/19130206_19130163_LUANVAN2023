package fitnlu.ntpos.chatservice.model;

import lombok.Builder;
import lombok.Data;

public class Message {
    private String message;
    private String sender;
    private String timestamp;

    public Message() {
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
    public String toString() {
        return "Message{" +
                "sender='" + sender + '\'' +
                ", content='" + message + '\'' +
                ", timestamp='" + timestamp + '\'' +
                '}';
    }
}
