package fitnlu.ntpos.orderservice.domain.model;

import java.util.List;

public class Order {
    private String id;
    private String userID;
    private int numberOfPeople;
    private String group;
    private String orderDate;
    private List<OrderLineItem> orderLineItems;
    private String status;
    private String note;
    private List<Table> table;
}
