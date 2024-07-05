package io.github.agathaLindemberg.rest.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginRequest {
    public String login;
    public String senha;
}
