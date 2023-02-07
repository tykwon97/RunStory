package com.runstory.domain.feed.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.runstory.domain.feed.entity.Feed;
import com.runstory.domain.feed.entity.FeedComment;
import com.runstory.domain.feed.entity.FeedRecomment;
import com.runstory.domain.user.entity.User;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
public class FeedCommentDto {
    private Long feedCommentId;
    private Long feedId;
    private Long userId;
    private String content;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime regdate;
    private List<FeedRecommentDto> feedRecomments = new ArrayList<>();

    public FeedCommentDto(FeedComment comment) {
        this.feedCommentId = comment.getFeedCommentId();
        this.feedId = comment.getFeed().getFeedId();
        this.userId = comment.getUser().getUserSeq();
        this.content = comment.getContent();
        this.regdate = comment.getRegdate();
        for (FeedRecomment feedRecomment : comment.getFeedRecomments()){
            FeedRecommentDto feedRecommentDto = new FeedRecommentDto(feedRecomment);
            this.feedRecomments.add(feedRecommentDto);
        }
    }
}