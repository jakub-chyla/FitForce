package com.coach;

import com.coach.stats.weight.repository.WeightRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@DataJpaTest
class WeightRepositoryTest {

    @Autowired
    WeightRepository weightRepository;

    @Test
    void should_find_stat_by_id() {
        //given
        Stat stat = new Stat();
        stat.setWeight("aa");

        //when
        weightRepository.save(stat);
        Stat savedStat = weightRepository.findById(stat.getId()).orElseThrow();

        //then
        assertEquals(stat.getId(), savedStat.getId());
        assertEquals(stat.getWeight(), savedStat.getWeight());
    }

    @Test
    void should_find_all_stats() {
        //given
        Stat stat = new Stat();
        stat.setWeight("aa");

        //when
        weightRepository.save(stat);
        Stat savedStat = weightRepository.findById(stat.getId()).orElseThrow();

        //then
        assertEquals(stat.getId(), savedStat.getId());
        assertEquals(stat.getWeight(), savedStat.getWeight());

    }
    @Test
    void should_find_members_by_name() {
        //given
        Stat stat1 = new Stat();
        stat1.setWeight("aa");
        stat1.setMemberId(1);

        Stat stat2 = new Stat();
        stat2.setWeight("bb");
        stat2.setMemberId(2);

        //when
        weightRepository.save(stat1);
        List<Stat> savedMembers = weightRepository.findAllByMemberId(stat1.getId());

        //then
        assertEquals(stat1.getWeight(), savedMembers.get(0).getWeight());
    }
}