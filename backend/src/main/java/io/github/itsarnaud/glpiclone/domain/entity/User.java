package io.github.itsarnaud.glpiclone.domain.entity;


import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Setter
@Getter
@Builder
public class User {
    private String id;
    private String username;
    private String password;
    private String email;
    private List<String> roles;
}
