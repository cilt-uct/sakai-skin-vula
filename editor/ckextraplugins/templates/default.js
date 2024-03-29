/*
Copyright (c) 2003-2011, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/
CKEDITOR.addTemplates('customtemplates', {imagesPath: CKEDITOR.getUrl(CKEDITOR.basePath.substr(0, CKEDITOR.basePath.indexOf("ckeditor/"))+"../editor/ckextraplugins/" + 'templates/images/'), templates: [
    {
        title:'<span class="fa fa-header template-icon"></span> Lesson Title',
        description:'A lesson header for your page',
        html:'<h1 class="lessontitle"><span class="fa fa-file-text fa-fw"></span> Module X: Enter Title</h1></div><p></p>'
    },
    {
        title:'<span class="fa fa-header template-icon" style="color:#1377ac;"></span> Section Header',
        description:'A section header for your module content or assessments',
        html:'<h2 class="sectionheader"><span class="fa fa-file-text fa-fw"></span>Enter Section Title</h2></div><p></p>'
    },
    {
        title:'<span class="fa fa-comment template-icon" style="color:#90b193;"></span>Lecturer Conversation',
        description:'Text messaged styled box with image on the left.',
        html:'<div class="insight-section"> <ul> <li> <div class="left-insight"><img alt="Instructor speaking" src="/library/image/genericProf.png" /> <p style="background-color:#d9edf7;"> Hi, {{firstname}}! Replace this text and image to create a casual personal message you would like to communicate to your students. It should be no more than a short paragraph or two. An image size of <b>70px x 70px</b> would fit best with this template.</p> </div> </li> </ul> </div><p></p>'
    },
    {
        title:'<span class="fa fa-comments template-icon" style="color:#9bbeff;"></span>Conversation Response',
        description:'Text messaged styled box with image on the right.',
        html:' <div class="insight-section"> <ul> <li> <div class="right-insight"><img alt="Student" src="/library/image/genericProf.png" /> <p style="background-color: rgb(255,239,214);"> Replace this text and maybe the image to create the effect of another side of a conversation or of a student responding to an instructor insight. It should be no more than a short paragraph or two. <b>An image size of 70px x 70px</b> would fit best with this template.</p> </div> </li> </ul> </div><p></p>'
    },
    {
        title:'<span class="fa fa-bullseye fa-fw template-icon" style="color:#005590;"></span>Learning Outcomes',
        description:'Organised list of learning outcomes with icon',
          html:'<h2><span class="fa fa-bullseye fa-fw"></span>Learning Outcomes</h2>  <p style="margin-left:40.0px">After completing this module, you will be able to:</p>  <ol> <li style="margin-left: 40.0px;">Construct learning outcomes using Bloom&#39;s Taxonomy.</li> <li style="margin-left: 40.0px;">Explain why each learning outcome must be measurable.</li> <li style="margin-left: 40.0px;">Revise this list as the course content changes.</li> <li style="margin-left: 40.0px;">State the contact information for E-Learning to get help with learning outcomes.</li> </ol><p></p>'
    },
    {    
        title:'<span class="fa fa-key fa-fw template-icon" style="color:#cc318e;"></span>Key Information',
        description:'List of dates, core readings and any tasks',
        html:'<h2><span class="fa fa-key fa-fw"></span>Key Information</h2><p>Please take note of the following key information below for this module.</p> <table class="table table-bordered table-striped" style="width:auto"><tbody><tr><td><strong>Module dates</strong></td><td>[Insert dates]</td></tr><tr><td><strong>[Estimated time to complete]</strong></td><td>[Indicate estimated time to complete</td></tr><tr><td><strong>Core reading materials</strong></td><td>[Indicate core reading]</td></tr><tr><td><strong>Assignment</strong></td><td>[Specify title of assignment]</td></tr></tbody></table><p></p>'
    },
    {    
        title:'<span class="fa fa-check-square fa-fw template-icon" style="color:#483d8b;"></span>Key Activities',
        description:'Bulleted list of key activities',
        html:'<h2><span class="fa fa-check-square fa-fw"></span>Key Activities</h2><p style="margin-left:40.0px">For this module, complete the following activities:</p><ul style="margin-left:40.0px"><li>[Watch the video on topic X]</li><li>[Read through the articles]&nbsp;</li><li>[Post in the Module X&nbsp;forum]</li><li>[Complete the MCQ quiz]</li><li>[Write a short reflective blog post]</li></ul><p></p>'
     },    
    {
        title:'<span class="fa fa-book template-icon" style="color:#5cb85c;"></span>Reading',
        description:'Instructions for a reading',
        html:'<h3><span class="fa fa-book"></span>&nbsp;Reading Title</h3>  <p><strong>Estimated time:</strong> 30 minutes</p>  <h4>Instructions</h4><ul><li>Read [insert title]&nbsp;</li><li>Give students a purpose and a focus for their reading. For example: You are reading this article for a broad understanding of the context/ for a detailed understanding of the methodology used/ to understand the key concept of x.</li><li>The Lessons tool allows you to link to a reading directly below this text.</li></ul><p></p>'
    },
    {
        title:'<span class="fa fa-play-circle template-icon" style="color:#5bc0de;"></span>Video Lecture',
        description:'Instructions for a video',
        html:'<h3><span class="fa fa-play-circle"></span>&nbsp;Video Title</h3>  <p><strong>Estimated time:</strong> 20 minutes</p>  <h4>Instructions</h4> <ul><li>Watch the following video.</li><li>Contextualise the video for your students, and give them a purpose and focus for their watching. For example: The speaker presents a compelling case for why wind turbines should be abandoned as a primary municipal power source. You will be expected to reference this video in the upcoming assignments.</li><li>Embed or link to your video below this text.</li></ul><p></p>'
    },
    {
        title:'<span class="fa fa-file-text template-icon" style="color:#FF8C00;"></span>Assignment Task',
        description:'Instructions for an assignment',
        html:'<h3><span class="fa fa-file-text"></span>&nbsp;Assignment Title</h3>  <p><strong>Due:</strong> Thursday, 5 March, 5pm <br /> <strong>Estimated time:</strong> 2.5 hours<br /> <strong>Marks:</strong> 100 </p>  <h4>Instructions</h4>  <p>Replace this with appropriate assignment instructions.</p> <ul><li>Detail all expectations including content and format.&nbsp;</li><li>Your goal should be to write instructions so clearly that students do not need to ask you questions.&nbsp;</li><li>You may want to provide a direct link to the Assessment immediately below this block.</li></ul><p></p>'
    },
    {
        title:'<span class="fa fa-comments template-icon" style="color:#455f65;"></span>Discussion Forum Task',
        description:'Instructions for a discussion forum task',
        html:'<h3><span class="fa fa-comments"></span>&nbsp;Discussion Forum</h3>  <p><strong>Initial post due:</strong> Thursday, 5 March, 5pm <br /> <strong>Response post due:</strong> Sunday, July 8<br /> <strong>Estimated time:</strong> 45 minutes<br /> <strong>Marks:</strong> 20 </p>  <h4>Step 1</h4>  <p>Post a response to the following prompt. Your contribution should be complete while staying under 100 words.</p>  <p style="margin-left:40.0px"><strong>Prompt:</strong>&nbsp;All of the &quot;#1 Dad&quot; mugs in the world suddenly change to show the actual ranking of Dads. Project what effect this would have on society.</p><h4>Step 2</h4><p>Respond to [two] classmates&#39; posts by [politely pointing out how their projections may be off-base].</p><p>Replace all this text with the appropriate text for your discussion forum exercise. The Lessons tool allows you to link to a forum topic directly below this text.</p><p></p>'
    },
    {
        title:'<span class="fa fa-lightbulb-o template-icon" style="color:#E3BC2E;"></span>Key Idea',
        description:'Yellow box with lightbulb and key idea text.',
        html:'<div class="alert alert-info"><div style="float:left"><span class="fa fa-3x fa-lightbulb-o"></span></div> <div style="margin-left:35.0px"><strong>Enter a statement that highlights a key idea.</strong></div></div><p></p>'
    },
    {
        title:'<span class="fa fa-exclamation-triangle template-icon" style="color:#a84843;"></span>Warning',
        description:'Red panel box containing a warning message.',
        html:'<div class="panel panel-danger"> <div class="panel-heading"> <h3 class="callout-title"><span class="fa fa-exclamation-triangle"></span> Warning!</h3> </div>  <div class="panel-body">Use this to give your students a very noticeable warning. Don&#39;t overuse these, or your students will stop noticing them. </div> </div><p></p>'
    },
    {
        title:'<span class="fa fa-star template-icon" style="color:#E3BC2E;"></span>Alert with Star',
        description:'Yellow box with a star and text',
        html:'<div class="alert alert-warning"> <div style="float:left"><span class="fa fa-star" style="font-size:26.0px"></span></div>  <div style="margin-left:35.0px"><strong>Replace this with appropriate text to alert your students about something important.</strong></div> </div><p></p>'
    },    
    {
        title:'<span class="fa fa-id-card template-icon" style="color:#3177b5;"></span>Panel style message to students',
        description:'Panel box with photo where you can share a personal message.',
        html:'<style type="text/css">* .panel-insight-speaker { display: block; max-width: 130.0px; max-height: 130.0px; width: auto; height: auto; margin-right: 10.0px; float: left;} *.panel-insight-title { margin: 0 0 0 0; } </style> <div class="panel panel-primary"> <div class="panel-heading" style="background-color: #005590;border-color: #005590;"> <h3 class="panel-insight-title"> Name&#39;s message</h3>  <p>Subtitle</p> </div>  <div class="panel-body"><img alt="Instructors Photo" class="panel-insight-speaker" src="/library/image/genericProf.png" /><span class="fa fa-quote-left"></span> Replace this text, the title, the subtitle, and the picture to create a personal message you would like to communicate to your students. It should be no more than a short paragraph or two. An image size of <b>130px x 130px</b> would fit best with this template.<span class="fa fa-quote-right"></span><span></span></div>  <div class="panel-body"><em>Here&#39;s an extra bit of instruction you can optionally add.</em></div> </div><p></p>'
    },
]});
