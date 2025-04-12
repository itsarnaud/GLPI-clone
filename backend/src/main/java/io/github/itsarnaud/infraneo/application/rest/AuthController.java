package io.github.itsarnaud.infraneo.application.rest;

import io.github.itsarnaud.infraneo.application.dto.UserDto;
import io.github.itsarnaud.infraneo.application.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @RequestMapping("/login")
    public String login(@RequestBody UserDto userDto) {
        String token = authService.loginUser(userDto);
        return ResponseEntity.ok(token).toString();
    }

    @RequestMapping("/register")
    public String register(@RequestBody UserDto userDto) {
        String token = authService.registerUser(userDto);
        return ResponseEntity.ok(token).toString();
    }

}
