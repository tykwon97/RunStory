package com.runstory.domain.running.dto;

import com.runstory.domain.user.dto.UserDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RunningUserDto {
    private Long userId;
    private UserDto userDto;
    private RunningDto runningDto;
}