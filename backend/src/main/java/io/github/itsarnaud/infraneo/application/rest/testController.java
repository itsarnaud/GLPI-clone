package io.github.itsarnaud.infraneo.application.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/test")
public class testController {

    @RequestMapping("/hello")
    public String hello() {
        return "Hello, World!";
    }

}
