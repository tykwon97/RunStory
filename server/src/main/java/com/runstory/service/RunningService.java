package com.runstory.service;

import com.runstory.api.request.RunningCrewReqDto;
import com.runstory.api.response.RunningMainResDto;
import com.runstory.api.response.RunningDetailSumDto;
import com.runstory.domain.running.dto.RunningBoardCommentDto;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public interface RunningService {
    // CreatePage
    Long createRunningCrew(RunningCrewReqDto runningCrewReqDto, Long userseq);

    // MainPage
//    ArrayList<HashMap<String, ArrayList<RunningMainResDto>>> selectRunningCrew(float longitude, float latitude);

    // DetailPage
    RunningDetailSumDto findRunningDetail(Long id, Long userseq);
    Long deleteRunningCrew(Long id);
    Long updateRunningCrew(RunningCrewReqDto newRunningCrewReqDto);

    // DetailPage의 여러가지 기능
    Long reservationRunningCrew(Long runningid, Long userseq);
    Long deleteRunningReservation(Long runningid, Long userSeq);


    // Comment
    Long createRunningComment(RunningBoardCommentDto runningBoardCommentDto, Long userseq, Long runninid);
    Long deleteRunningComment(Long commentid);

    // Dibs
    Long createDibsRunningCrew(Long runningid, Long userseq);
    Long deleteDibsRunningCrew(Long runningid, Long userSeq);

    // 나의 페이지
//    List<HashMap<String, List<RunningMainResDto>>> myRunningf(Long userseq);

}
