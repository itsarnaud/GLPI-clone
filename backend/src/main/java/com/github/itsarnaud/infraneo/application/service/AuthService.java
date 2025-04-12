package com.github.itsarnaud.infraneo.application.service;

import com.github.itsarnaud.infraneo.application.dto.UserDto;
import com.github.itsarnaud.infraneo.application.mapper.UserMapper;
import com.github.itsarnaud.infraneo.domain.port.in.UserDomainPort;
import com.github.itsarnaud.infraneo.domain.service.UserDomainService;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserDomainPort userDomainService;

    public AuthService(UserDomainService userDomainService) {
        this.userDomainService = userDomainService;
    }

    public String registerUser(UserDto userDto) {
        return userDomainService.registerUser(UserMapper.toEntity(userDto));
    }

    public String loginUser(UserDto userDto) {
        return userDomainService.loginUser(UserMapper.toEntity(userDto));
    }
}
