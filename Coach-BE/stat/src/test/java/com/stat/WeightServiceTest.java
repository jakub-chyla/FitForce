package com.stat;

import com.stat.stats.weight.repository.WeightRepository;
import com.stat.stats.weight.service.WeightService;
import org.junit.jupiter.api.BeforeEach;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.junit.jupiter.api.Assertions.assertEquals;

class WeightServiceTest {

    @InjectMocks
    private WeightService weightService;

    @Mock
    public WeightRepository weightRepository;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

//    @Test
//    void should_save_stat() {
//        //given
//        Stat stat = new Stat();
//        stat.setWeight("John");
//        stat.setMemberId(1);
//
//        Stat savedMember = new Stat();
//        savedMember.setWeight("John");
//        savedMember.setMemberId(1);
//
//        //mock the calls
//        when(weightRepository.save(stat)).thenReturn(savedMember);
//
//        //when
//        Stat response = weightService.saveStat(stat);
//
//        //then
//        assertEquals(stat.getId(), response.getId());
//        assertEquals(stat.getWeight(), response.getWeight());
//        assertEquals(stat.getId(), response.getId());
//    }
//
//    @Test
//    void should_find_all_stats() {
//        //given
//        List<Stat> stats = new ArrayList<>();
//
//        Stat stat1 = new Stat();
//        stat1.setWeight("John");
//        stat1.setMemberId(1);
//
//        Stat stat2 = new Stat();
//        stat2.setWeight("Nick");
//        stat2.setMemberId(2);
//
//        stats.add(stat1);
//        stats.add(stat2);
//
//        List<Stat> savedStats = new ArrayList<>();
//
//        Stat savedStat1 = new Stat();
//        savedStat1.setWeight("John");
//        savedStat1.setMemberId(1);
//
//        Stat savedStat2 = new Stat();
//        savedStat2.setWeight("Nick");
//        savedStat2.setMemberId(2);
//
//        savedStats.add(savedStat1);
//        savedStats.add(savedStat2);
//
//        //mock the calls
//        when(weightRepository.findAll()).thenReturn(savedStats);
//
//        //when
//        List<Stat> response = weightService.findAllStats();
//
//        //then
//        assertEquals(stats.get(0).getId(), response.get(0).getId());
//        assertEquals(stats.get(0).getWeight(), response.get(0).getWeight());
//        assertEquals(stats.get(0).getMemberId(), response.get(0).getMemberId());
//        assertEquals(stats.get(1).getId(), response.get(1).getId());
//        assertEquals(stats.get(1).getWeight(), response.get(1).getWeight());
//        assertEquals(stats.get(1).getMemberId(), response.get(1).getMemberId());
//
//    }
//
//    @Test
//    void should_find_all_stats_by_Member() {
//        //given
//        Stat stat = new Stat();
//        stat.setWeight("John");
//        stat.setMemberId(1);
//
//        List<Stat> savedStats = new ArrayList<>();
//
//        Stat savedStat = new Stat();
//        savedStat.setWeight("John");
//        savedStat.setMemberId(1);
//        savedStats.add(savedStat);
//
//        //mock the calls
//        when(weightRepository.findAllByMemberId(savedStat.getId())).thenReturn(savedStats);
//
//        //when
//        List<Stat> response = weightService.findAllStatsByMember(stat.getId());
//
//        //then
//        assertEquals(stat.getWeight(), response.get(0).getWeight());
//    }
}