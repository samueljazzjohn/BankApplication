package com.example.messagingserver;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
public class chatController {
	
    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @CrossOrigin(origins ={"http://localhost:3000","http://samuel-15155:3000/"}, allowedHeaders = "Requestor-Type")
    @MessageMapping("/message")
    @SendTo("/chatroom/public")
    public Message receiveMessage(@Payload Message message) throws InterruptedException{
    	Thread.sleep(500);
    	System.out.println(message.getMessage());
        return message;
    }
    
    @CrossOrigin(origins ={"http://localhost:3000","http://samuel-15155:3000/"}, allowedHeaders = "Requestor-Type")
    @MessageMapping("/staff-message")
    @SendTo("/chatroom/staff")
    public Message receiveMessagestaff(@Payload Message message) throws InterruptedException{
    	Thread.sleep(500);
    	System.out.println(message.getMessage());
        return message;
    }

    @CrossOrigin(origins ={"http://localhost:3000","http://samuel-15155:3000/"}, allowedHeaders = "Requestor-Type")
    @MessageMapping("/private-message")
    public Message recMessage(@Payload Message message) throws InterruptedException{
    	Thread.sleep(500);
    	System.out.println(message.getSenderId());
//    	ObjectMapper obj= new ObjectMapper();
//		Message msg= obj.readValue(message, Message.class);
//    	Message msg=new Message();
//        msg.setSenderName(senderName);
//        msg.setReceiverName(ReceiverName);
//        msg.setMessage(message);
//        msg.setReceiverId(receiverId);
//        msg.setSenderId(senderId);
        simpMessagingTemplate.convertAndSendToUser(message.getSenderId(),"/private",message.getMessage());
//        System.out.println(message.getMessage());
        return message;
    }
}
