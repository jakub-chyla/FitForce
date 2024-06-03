package com.coach;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

class StatServiceTest {

    @InjectMocks
    private StatService statService;

    @Mock
    public StatRepository statRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void should_save_stat() {
        //given
        Stat stat = new Stat();
        stat.setFirstname("John");
        stat.setLastname("Rambo");
        stat.setEmail("test@gmail.com");
        stat.setMemberId(1);

        Stat savedMember = new Stat();
        savedMember.setFirstname("John");
        savedMember.setLastname("Rambo");
        savedMember.setEmail("test@gmail.com");
        savedMember.setMemberId(1);

        //mock the calls
        when(statRepository.save(stat)).thenReturn(savedMember);

        //when
        Stat response = statService.saveStat(stat);

        //then
        assertEquals(stat.getId(), response.getId());
        assertEquals(stat.getFirstname(), response.getFirstname());
        assertEquals(stat.getLastname(), response.getLastname());
        assertEquals(stat.getEmail(), response.getEmail());
        assertEquals(stat.getId(), response.getId());
    }

    @Test
    void should_find_all_stats() {
        //given
        List<Stat> stats = new ArrayList<>();

        Stat stat1 = new Stat();
        stat1.setFirstname("John");
        stat1.setLastname("Rambo");
        stat1.setEmail("lohn@gmail.com");
        stat1.setMemberId(1);

        Stat stat2 = new Stat();
        stat2.setFirstname("Nick");
        stat2.setLastname("Papa");
        stat2.setEmail("nick@gmail.com");
        stat2.setMemberId(2);

        stats.add(stat1);
        stats.add(stat2);

        List<Stat> savedStats = new ArrayList<>();

        Stat savedStat1 = new Stat();
        savedStat1.setFirstname("John");
        savedStat1.setLastname("Rambo");
        savedStat1.setEmail("lohn@gmail.com");
        savedStat1.setMemberId(1);

        Stat savedStat2 = new Stat();
        savedStat2.setFirstname("Nick");
        savedStat2.setLastname("Papa");
        savedStat2.setEmail("nick@gmail.com");
        savedStat2.setMemberId(2);

        savedStats.add(savedStat1);
        savedStats.add(savedStat2);

        //mock the calls
        when(statRepository.findAll()).thenReturn(savedStats);

        //when
        List<Stat> response = statService.findAllStats();

        //then
        assertEquals(stats.get(0).getId(), response.get(0).getId());
        assertEquals(stats.get(0).getFirstname(), response.get(0).getFirstname());
        assertEquals(stats.get(0).getLastname(), response.get(0).getLastname());
        assertEquals(stats.get(0).getEmail(), response.get(0).getEmail());
        assertEquals(stats.get(0).getMemberId(), response.get(0).getMemberId());
        assertEquals(stats.get(1).getId(), response.get(1).getId());
        assertEquals(stats.get(1).getFirstname(), response.get(1).getFirstname());
        assertEquals(stats.get(1).getLastname(), response.get(1).getLastname());
        assertEquals(stats.get(1).getEmail(), response.get(1).getEmail());
        assertEquals(stats.get(1).getMemberId(), response.get(1).getMemberId());

    }

    @Test
    @Disabled
    void findAllStatsByMember() {
    }
}