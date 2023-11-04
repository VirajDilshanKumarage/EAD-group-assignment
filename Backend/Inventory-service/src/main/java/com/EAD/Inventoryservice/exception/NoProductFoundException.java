package com.EAD.Inventoryservice.exception;

public class NoProductFoundException extends Exception {

    private static final long serialVersionUID = 1l;
    public NoProductFoundException(String message){
        super(message);
    }
}
