package io.github.itsarnaud.infraneo.application.mapper;

import io.github.itsarnaud.infraneo.application.dto.UserDto;
import io.github.itsarnaud.infraneo.domain.entity.User;

public class UserMapper {

    public static UserDto toDto(User user) {
        return UserDto.builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .password(user.getPassword())
                .build();
    }

    public static User toEntity(UserDto userDto) {
        return User.builder()
                .username(userDto.getUsername())
                .email(userDto.getEmail())
                .password(userDto.getPassword())
                .build();
    }

}
