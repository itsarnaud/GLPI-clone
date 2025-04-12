package io.github.itsarnaud.infraneo.infrastructure.web.config;

import io.github.itsarnaud.infraneo.infrastructure.security.Interceptor.JwtAuthorizationInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    private final JwtAuthorizationInterceptor jwtAuthorizationInterceptor;

    public WebConfig(JwtAuthorizationInterceptor jwtAuthorizationFilter) {
        this.jwtAuthorizationInterceptor = jwtAuthorizationFilter;
    }


    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(jwtAuthorizationInterceptor).excludePathPatterns("/api/public/**", "/api/auth/**");
    }


}
