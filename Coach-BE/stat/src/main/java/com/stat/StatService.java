package com.stat;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StatService {

    private final StatRepository repository;

    public void saveStat(Stat stat) {
        repository.save(stat);
    }

    public List<Stat> findAllStats() {
        return repository.findAll();
    }

    public List<Stat> findAllStatsByMember(Integer memberId) {
        return repository.findAllByMemberId(memberId);
    }
}
