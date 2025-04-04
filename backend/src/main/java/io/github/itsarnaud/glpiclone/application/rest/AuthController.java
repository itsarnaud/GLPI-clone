package io.github.itsarnaud.glpiclone.application.rest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @RequestMapping("/login")
    public String login() {
        return "Login endpoint";
    }

    @RequestMapping("/register")
    public String register() {
        return "Register endpoint";
    }

}
