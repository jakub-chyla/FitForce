package com.stat.config;

import org.flywaydb.core.Flyway;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FlywayConfig {

    @Autowired
    private Flyway flyway;

    @Bean
    public CommandLineRunner flywayCleanMigrate() {
        return args -> {
            flyway.clean();
            flyway.migrate();
        };
    }
}