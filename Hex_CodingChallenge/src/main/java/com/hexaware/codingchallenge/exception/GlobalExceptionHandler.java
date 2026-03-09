package com.hexaware.codingchallenge.exception;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(PlayerNotFoundException.class)
    public String handleResource(PlayerNotFoundException ex) {
        return ex.getMessage();
    }
}
