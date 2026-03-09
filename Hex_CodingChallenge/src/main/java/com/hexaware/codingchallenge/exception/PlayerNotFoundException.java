package com.hexaware.codingchallenge.exception;

public class PlayerNotFoundException extends RuntimeException {
    
    public PlayerNotFoundException(String mes) {
        super(mes);
    }
}
