package com.example.immoapp.config;

import com.example.immoapp.repository.UserRepository;
import com.example.immoapp.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public UserDetailsService userDetailsService(UserRepository userRepo) {
        return username -> userRepo
                .findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    // 3) Security filter chain wiring in your JWT filter
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http,
                                           JwtAuthenticationFilter jwtFilter) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        // open these endpoints
                        .requestMatchers("/api/users/login", "/api/users/register", "/api/users/confirm")
                        .permitAll()
                        // protect profile
                        .requestMatchers("/api/users/profile")
                        .authenticated()
                        // everything else open
                        .anyRequest().permitAll()
                )
                // add JWT authentication before username/password filter
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .httpBasic(Customizer.withDefaults())
                .formLogin(form -> form.disable());

        return http.build();
    }
}
