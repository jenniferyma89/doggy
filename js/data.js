(function () {
  const DIMENSIONS = [
    'extroversion',
    'family',
    'energy',
    'curiosity',
    'independence',
    'sensitivity',
    'order',
    'healing'
  ];

  const QUESTION_SET = [
    {
      id: 'q1',
      category: '社交场景',
      prompt: '到了一个全是陌生人的聚会，你通常会怎么做？',
      options: [
        { label: '先找熟人坐在一角，慢慢融入，不想太热闹', scores: { extroversion: 15, family: 18, energy: 10, curiosity: 14, independence: 28, sensitivity: 22, order: 16, healing: 20 } },
        { label: '认识人很快，先打招呼再自然聊起来', scores: { extroversion: 42, family: 16, energy: 24, curiosity: 18, independence: 10, sensitivity: 12, order: 10, healing: 18 } },
        { label: '会主动带动气氛，主持节奏和玩笑', scores: { extroversion: 55, family: 14, energy: 38, curiosity: 20, independence: 8, sensitivity: 14, order: 10, healing: 22 } },
        { label: '站在边缘观察人群，等别人来找我', scores: { extroversion: 20, family: 12, energy: 12, curiosity: 16, independence: 32, sensitivity: 24, order: 18, healing: 14 } }
      ]
    },
    {
      id: 'q2',
      category: '周末安排',
      prompt: '周末突然空出一天，你更愿意怎样安排？',
      options: [
        { label: '睡到自然醒，宅在家里看剧和刷手机', scores: { extroversion: 8, family: 20, energy: 8, curiosity: 14, independence: 36, sensitivity: 28, order: 22, healing: 26 } },
        { label: '和朋友约个走走，出去吃喝散步', scores: { extroversion: 46, family: 26, energy: 26, curiosity: 18, independence: 10, sensitivity: 16, order: 12, healing: 22 } },
        { label: '挑一个新地方探险，走到哪算哪', scores: { extroversion: 32, family: 14, energy: 44, curiosity: 52, independence: 26, sensitivity: 12, order: 12, healing: 18 } },
        { label: '先做计划，再按清单完成任务和收尾', scores: { extroversion: 12, family: 18, energy: 18, curiosity: 12, independence: 18, sensitivity: 20, order: 58, healing: 14 } }
      ]
    },
    {
      id: 'q3',
      category: '情绪支持',
      prompt: '朋友半夜向你倾诉烦恼，你的第一反应是什么？',
      options: [
        { label: '先认真听，少说话多安抚，给对方抱抱', scores: { extroversion: 20, family: 40, energy: 16, curiosity: 10, independence: 8, sensitivity: 44, order: 16, healing: 58 } },
        { label: '先分析原因，想办法怎么解决问题', scores: { extroversion: 18, family: 20, energy: 20, curiosity: 34, independence: 20, sensitivity: 16, order: 42, healing: 16 } },
        { label: '马上陪他出去散步，换个环境再聊', scores: { extroversion: 34, family: 28, energy: 38, curiosity: 28, independence: 12, sensitivity: 30, order: 12, healing: 36 } },
        { label: '先给空间，别打扰，等对方自己缓过来', scores: { extroversion: 12, family: 18, energy: 10, curiosity: 18, independence: 42, sensitivity: 26, order: 22, healing: 14 } }
      ]
    },
    {
      id: 'q4',
      category: '临时变化',
      prompt: '原定计划临时取消时，你会有什么感受？',
      options: [
        { label: '有点失落，但转念就想安排更舒服的替代方案', scores: { extroversion: 28, family: 22, energy: 30, curiosity: 40, independence: 18, sensitivity: 34, order: 26, healing: 34 } },
        { label: '心里会有点不舒服，但不会太在意', scores: { extroversion: 18, family: 16, energy: 16, curiosity: 14, independence: 22, sensitivity: 38, order: 18, healing: 18 } },
        { label: '觉得“啊，太可惜了”，立刻想找下一个好点子', scores: { extroversion: 36, family: 20, energy: 40, curiosity: 46, independence: 16, sensitivity: 26, order: 18, healing: 20 } },
        { label: '反而松一口气，省下时间可以放空自己', scores: { extroversion: 12, family: 18, energy: 12, curiosity: 22, independence: 46, sensitivity: 30, order: 28, healing: 22 } }
      ]
    },
    {
      id: 'q5',
      category: '团队合作',
      prompt: '朋友们想一起决定一个活动，大家想法分歧时，你会怎样？',
      options: [
        { label: '听大家讲完，试着把大家的需求都揉在一起', scores: { extroversion: 24, family: 38, energy: 18, curiosity: 20, independence: 12, sensitivity: 30, order: 30, healing: 38 } },
        { label: '直接提出自己最想去的方案，给大家一个方向', scores: { extroversion: 44, family: 18, energy: 30, curiosity: 22, independence: 22, sensitivity: 12, order: 26, healing: 18 } },
        { label: '会先统计每个人的意见，再协调大家', scores: { extroversion: 26, family: 20, energy: 22, curiosity: 18, independence: 20, sensitivity: 18, order: 52, healing: 22 } },
        { label: '我通常挺在最边上看热闹，不急着做决定', scores: { extroversion: 16, family: 12, energy: 12, curiosity: 18, independence: 34, sensitivity: 26, order: 20, healing: 14 } }
      ]
    },
    {
      id: 'q6',
      category: '生活方式',
      prompt: '如果可以选择一种旅行方式，你更想要？',
      options: [
        { label: '有安排、有住宿、有清单的成熟路线', scores: { extroversion: 14, family: 20, energy: 18, curiosity: 18, independence: 20, sensitivity: 16, order: 72, healing: 16 } },
        { label: '跟朋友一起打卡好吃好玩的地方', scores: { extroversion: 50, family: 26, energy: 32, curiosity: 28, independence: 12, sensitivity: 20, order: 16, healing: 30 } },
        { label: '临时决定出发，沿路看风景一直走', scores: { extroversion: 24, family: 14, energy: 50, curiosity: 62, independence: 42, sensitivity: 14, order: 12, healing: 20 } },
        { label: '找个安静地方住几天，放慢脚步', scores: { extroversion: 10, family: 24, energy: 8, curiosity: 18, independence: 38, sensitivity: 46, order: 28, healing: 44 } }
      ]
    },
    {
      id: 'q7',
      category: '环境偏好',
      prompt: '突然被安排去一个很吵很挤的空间，你的第一反应是什么？',
      options: [
        { label: '我会很快融进去，聊起来就没事了', scores: { extroversion: 42, family: 18, energy: 38, curiosity: 26, independence: 8, sensitivity: 14, order: 10, healing: 24 } },
        { label: '会有点累，但我会找一个角落等它过去', scores: { extroversion: 18, family: 16, energy: 18, curiosity: 18, independence: 24, sensitivity: 58, order: 20, healing: 24 } },
        { label: '我会想办法找出口、换位置或者走开', scores: { extroversion: 16, family: 18, energy: 20, curiosity: 26, independence: 38, sensitivity: 46, order: 22, healing: 18 } },
        { label: '尽量和人互动，让气氛更轻松一点', scores: { extroversion: 54, family: 24, energy: 38, curiosity: 22, independence: 8, sensitivity: 12, order: 12, healing: 28 } }
      ]
    },
    {
      id: 'q8',
      category: '工作和生活',
      prompt: '一天结束后，你最想要的是？',
      options: [
        { label: '和人一起聊聊天，卸下精神负担', scores: { extroversion: 48, family: 38, energy: 22, curiosity: 12, independence: 10, sensitivity: 26, order: 12, healing: 54 } },
        { label: '完成一件小任务，给自己一个成就感', scores: { extroversion: 14, family: 18, energy: 28, curiosity: 22, independence: 24, sensitivity: 12, order: 56, healing: 16 } },
        { label: '动一动，出去散步、跑步或者逛逛', scores: { extroversion: 22, family: 14, energy: 56, curiosity: 40, independence: 26, sensitivity: 14, order: 16, healing: 24 } },
        { label: '安静地待着，不被打扰地恢复状态', scores: { extroversion: 8, family: 20, energy: 10, curiosity: 14, independence: 50, sensitivity: 40, order: 26, healing: 32 } }
      ]
    },
    {
      id: 'q9',
      category: '礼物偏好',
      prompt: '朋友送你一份小惊喜，你最在意的是？',
      options: [
        { label: '礼物很贴心，能让人感受到被照顾', scores: { extroversion: 14, family: 50, energy: 16, curiosity: 12, independence: 10, sensitivity: 30, order: 14, healing: 60 } },
        { label: '它是不是有趣、有惊喜、会让人开心', scores: { extroversion: 32, family: 28, energy: 40, curiosity: 42, independence: 18, sensitivity: 20, order: 12, healing: 32 } },
        { label: '它是否实用，能真正解决什么问题', scores: { extroversion: 10, family: 20, energy: 22, curiosity: 18, independence: 28, sensitivity: 10, order: 54, healing: 16 } },
        { label: '礼物风格和我喜好是否契合', scores: { extroversion: 18, family: 18, energy: 14, curiosity: 28, independence: 26, sensitivity: 36, order: 34, healing: 20 } }
      ]
    },
    {
      id: 'q10',
      category: '家庭和关系',
      prompt: '当你突然需要帮忙时，最想得到的支持是？',
      options: [
        { label: '有人愿意陪我一起承担烦恼', scores: { extroversion: 30, family: 52, energy: 22, curiosity: 12, independence: 14, sensitivity: 36, order: 16, healing: 52 } },
        { label: '有人给我具体方案，我就能立刻行动', scores: { extroversion: 20, family: 18, energy: 24, curiosity: 28, independence: 18, sensitivity: 12, order: 58, healing: 18 } },
        { label: '有人允许我自由处理，不强迫我表达', scores: { extroversion: 10, family: 18, energy: 12, curiosity: 18, independence: 52, sensitivity: 28, order: 24, healing: 16 } },
        { label: '有人带我散步或换个环境，让心情好起来', scores: { extroversion: 32, family: 22, energy: 42, curiosity: 26, independence: 16, sensitivity: 34, order: 18, healing: 42 } }
      ]
    },
    {
      id: 'q11',
      category: '习惯偏好',
      prompt: '你更喜欢哪一种日常节奏？',
      options: [
        { label: '早睡早起，有规律地过日子', scores: { extroversion: 10, family: 24, energy: 12, curiosity: 12, independence: 18, sensitivity: 20, order: 68, healing: 16 } },
        { label: '随性一点，想做什么就做什么', scores: { extroversion: 24, family: 18, energy: 34, curiosity: 44, independence: 40, sensitivity: 14, order: 12, healing: 18 } },
        { label: '中间穿插各种小惊喜和冲动安排', scores: { extroversion: 38, family: 20, energy: 52, curiosity: 62, independence: 22, sensitivity: 18, order: 14, healing: 22 } },
        { label: '偏安静规律，不想太多计划打断生活', scores: { extroversion: 8, family: 22, energy: 10, curiosity: 16, independence: 32, sensitivity: 36, order: 30, healing: 32 } }
      ]
    },
    {
      id: 'q12',
      category: '表达方式',
      prompt: '当你心情不好时，通常会怎么处理？',
      options: [
        { label: '先跟可信的人说，说完就舒服很多', scores: { extroversion: 34, family: 46, energy: 18, curiosity: 14, independence: 10, sensitivity: 52, order: 12, healing: 58 } },
        { label: '把它写下来，整理逻辑，再慢慢接受', scores: { extroversion: 12, family: 16, energy: 14, curiosity: 20, independence: 30, sensitivity: 34, order: 52, healing: 22 } },
        { label: '打起精神去做点能让自己动起来的事', scores: { extroversion: 20, family: 16, energy: 56, curiosity: 28, independence: 26, sensitivity: 22, order: 18, healing: 30 } },
        { label: '我想一个人待着，外界信息会更吵', scores: { extroversion: 6, family: 18, energy: 8, curiosity: 16, independence: 58, sensitivity: 40, order: 26, healing: 20 } }
      ]
    },
    {
      id: 'q13',
      category: '日常节奏',
      prompt: '到了一个新环境，你会先做什么？',
      options: [
        { label: '先和大家打个招呼，建立熟悉感', scores: { extroversion: 48, family: 30, energy: 28, curiosity: 20, independence: 8, sensitivity: 16, order: 10, healing: 32 } },
        { label: '先观察一下环境和人群，找到自己舒服的角落', scores: { extroversion: 18, family: 18, energy: 18, curiosity: 24, independence: 38, sensitivity: 34, order: 26, healing: 18 } },
        { label: '先去探索、试探、看哪里有好玩的东西', scores: { extroversion: 26, family: 14, energy: 42, curiosity: 58, independence: 24, sensitivity: 16, order: 12, healing: 18 } },
        { label: '先确认规则和流程，知道怎么做才稳', scores: { extroversion: 12, family: 20, energy: 16, curiosity: 16, independence: 16, sensitivity: 12, order: 62, healing: 18 } }
      ]
    },
    {
      id: 'q14',
      category: '日程规划',
      prompt: '你收到一份新任务，通常会怎么开始？',
      options: [
        { label: '先想谁能一起做，团队分工会更轻松', scores: { extroversion: 38, family: 40, energy: 24, curiosity: 14, independence: 12, sensitivity: 24, order: 20, healing: 34 } },
        { label: '先拆清楚步骤，用清单推进', scores: { extroversion: 12, family: 18, energy: 18, curiosity: 16, independence: 18, sensitivity: 12, order: 70, healing: 16 } },
        { label: '先试做一小步，看结果再调整', scores: { extroversion: 26, family: 14, energy: 34, curiosity: 52, independence: 32, sensitivity: 18, order: 24, healing: 24 } },
        { label: '先想这个任务会不会打扰我，现在的状态适不适合做', scores: { extroversion: 8, family: 20, energy: 10, curiosity: 18, independence: 42, sensitivity: 54, order: 30, healing: 28 } }
      ]
    },
    {
      id: 'q15',
      category: '压力反应',
      prompt: '当工作或生活突然变紧时，你会更偏向？',
      options: [
        { label: '立刻联系朋友或家人，找人支持', scores: { extroversion: 42, family: 54, energy: 20, curiosity: 12, independence: 8, sensitivity: 38, order: 14, healing: 58 } },
        { label: '先列出最重要的事情，按优先级处理', scores: { extroversion: 12, family: 18, energy: 24, curiosity: 20, independence: 18, sensitivity: 12, order: 64, healing: 16 } },
        { label: '先动起来，不停地跑，直到事情明朗', scores: { extroversion: 26, family: 18, energy: 62, curiosity: 32, independence: 20, sensitivity: 18, order: 20, healing: 24 } },
        { label: '想一个人消化，再决定接下来怎么做', scores: { extroversion: 6, family: 18, energy: 10, curiosity: 22, independence: 58, sensitivity: 46, order: 30, healing: 20 } }
      ]
    },
    {
      id: 'q16',
      category: '兴趣偏好',
      prompt: '在空闲时间里，你更容易被什么吸引？',
      options: [
        { label: '有趣的人和温暖的互动', scores: { extroversion: 50, family: 38, energy: 30, curiosity: 20, independence: 8, sensitivity: 20, order: 10, healing: 52 } },
        { label: '能成长、能学新东西的内容', scores: { extroversion: 18, family: 18, energy: 22, curiosity: 66, independence: 24, sensitivity: 16, order: 22, healing: 18 } },
        { label: '能让自己动起来的运动和挑选', scores: { extroversion: 24, family: 14, energy: 62, curiosity: 42, independence: 24, sensitivity: 12, order: 16, healing: 20 } },
        { label: '安静、舒服、可重复的节奏', scores: { extroversion: 8, family: 20, energy: 10, curiosity: 18, independence: 46, sensitivity: 38, order: 32, healing: 30 } }
      ]
    },
    {
      id: 'q17',
      category: '约会或陪伴',
      prompt: '如果和喜欢的人一起度过一个周末，你更希望？',
      options: [
        { label: '一起吃好吃的、去城市里走走、聊天', scores: { extroversion: 50, family: 44, energy: 36, curiosity: 28, independence: 8, sensitivity: 26, order: 12, healing: 44 } },
        { label: '一起完成一个小计划，比如旅行或挑战', scores: { extroversion: 32, family: 18, energy: 50, curiosity: 54, independence: 22, sensitivity: 14, order: 18, healing: 20 } },
        { label: '一起做点有仪式感的小事，温柔地陪伴', scores: { extroversion: 18, family: 52, energy: 18, curiosity: 18, independence: 12, sensitivity: 42, order: 20, healing: 62 } },
        { label: '一起有点自己的空间，舒服得很自然', scores: { extroversion: 12, family: 22, energy: 12, curiosity: 18, independence: 46, sensitivity: 28, order: 26, healing: 26 } }
      ]
    },
    {
      id: 'q18',
      category: '创意与好奇',
      prompt: '你听到一个新鲜想法时，通常会怎么想？',
      options: [
        { label: '我想立刻试试，感受会不会有意思', scores: { extroversion: 28, family: 18, energy: 44, curiosity: 58, independence: 28, sensitivity: 14, order: 18, healing: 20 } },
        { label: '我会先想它跟我有什么关系，我能不能参与', scores: { extroversion: 18, family: 28, energy: 20, curiosity: 40, independence: 20, sensitivity: 22, order: 28, healing: 24 } },
        { label: '如果能和朋友一起做会更有意思', scores: { extroversion: 40, family: 34, energy: 32, curiosity: 26, independence: 10, sensitivity: 18, order: 12, healing: 24 } },
        { label: '我需要先想清楚规则和风险，再决定', scores: { extroversion: 12, family: 18, energy: 18, curiosity: 20, independence: 18, sensitivity: 10, order: 60, healing: 14 } }
      ]
    },
    {
      id: 'q19',
      category: '生活整理',
      prompt: '你最容易忍不住整理的是？',
      options: [
        { label: '收纳和空间，想让一切都舒服一点', scores: { extroversion: 10, family: 30, energy: 14, curiosity: 18, independence: 20, sensitivity: 30, order: 72, healing: 30 } },
        { label: '自己的日程和待办，想把每件事安排妥', scores: { extroversion: 10, family: 18, energy: 18, curiosity: 16, independence: 18, sensitivity: 16, order: 80, healing: 12 } },
        { label: '随手清理杂物，把“累”都清掉', scores: { extroversion: 18, family: 16, energy: 32, curiosity: 32, independence: 34, sensitivity: 32, order: 52, healing: 26 } },
        { label: '我通常不太想整理，宁愿让它自然发生', scores: { extroversion: 16, family: 14, energy: 12, curiosity: 22, independence: 48, sensitivity: 28, order: 18, healing: 18 } }
      ]
    },
    {
      id: 'q20',
      category: '偶遇和交际',
      prompt: '你在路上偶遇熟人，通常会怎样回应？',
      options: [
        { label: '热情打招呼，聊两句就很开心', scores: { extroversion: 58, family: 28, energy: 36, curiosity: 20, independence: 8, sensitivity: 14, order: 10, healing: 28 } },
        { label: '会停下来聊一会儿，看看对方需要什么', scores: { extroversion: 26, family: 48, energy: 18, curiosity: 12, independence: 12, sensitivity: 26, order: 14, healing: 48 } },
        { label: '我会先看看是否需要打断对方自己忙', scores: { extroversion: 12, family: 18, energy: 12, curiosity: 18, independence: 42, sensitivity: 24, order: 22, healing: 18 } },
        { label: '会礼貌打招呼，但不想长时间站着聊', scores: { extroversion: 20, family: 18, energy: 18, curiosity: 18, independence: 30, sensitivity: 24, order: 26, healing: 14 } }
      ]
    },
    {
      id: 'q21',
      category: '社交压力',
      prompt: '如果必须在一大群人中发言，你最可能？',
      options: [
        { label: '会想先准备好观点，表达得清楚而自然', scores: { extroversion: 26, family: 18, energy: 22, curiosity: 24, independence: 24, sensitivity: 16, order: 60, healing: 20 } },
        { label: '很快就兴奋起来，想把想法讲给大家听', scores: { extroversion: 62, family: 20, energy: 44, curiosity: 20, independence: 10, sensitivity: 12, order: 14, healing: 22 } },
        { label: '会先观察大家的反应，等一些起点后再说', scores: { extroversion: 18, family: 18, energy: 16, curiosity: 18, independence: 30, sensitivity: 28, order: 26, healing: 18 } },
        { label: '我会尽量把话说得简短，不想成为焦点', scores: { extroversion: 8, family: 14, energy: 12, curiosity: 12, independence: 46, sensitivity: 30, order: 28, healing: 16 } }
      ]
    },
    {
      id: 'q22',
      category: '休息方式',
      prompt: '你最想在疲惫后做什么？',
      options: [
        { label: '和喜欢的人一起放松，不想一个人扛着', scores: { extroversion: 40, family: 58, energy: 18, curiosity: 12, independence: 8, sensitivity: 38, order: 12, healing: 60 } },
        { label: '走走路、出门散步，换个环境', scores: { extroversion: 22, family: 24, energy: 48, curiosity: 30, independence: 22, sensitivity: 26, order: 16, healing: 36 } },
        { label: '躺下刷刷东西，完全不思考', scores: { extroversion: 8, family: 16, energy: 8, curiosity: 12, independence: 52, sensitivity: 44, order: 24, healing: 30 } },
        { label: '想办法把事情处理干净，心里才会舒服', scores: { extroversion: 14, family: 18, energy: 20, curiosity: 18, independence: 22, sensitivity: 12, order: 64, healing: 12 } }
      ]
    },
    {
      id: 'q23',
      category: '亲密关系',
      prompt: '在亲密关系里，你更想要的互动是什么？',
      options: [
        { label: '经常沟通、经常在一起、很具体地关心', scores: { extroversion: 32, family: 60, energy: 24, curiosity: 18, independence: 10, sensitivity: 36, order: 18, healing: 64 } },
        { label: '有共同的爱好和冒险，生活也很有趣', scores: { extroversion: 30, family: 22, energy: 46, curiosity: 54, independence: 18, sensitivity: 14, order: 18, healing: 20 } },
        { label: '我更想要稳定可靠和彼此信任', scores: { extroversion: 16, family: 36, energy: 20, curiosity: 18, independence: 22, sensitivity: 22, order: 54, healing: 30 } },
        { label: '陪伴不需要太多话，但要懂我很多', scores: { extroversion: 12, family: 24, energy: 12, curiosity: 18, independence: 44, sensitivity: 42, order: 26, healing: 34 } }
      ]
    },
    {
      id: 'q24',
      category: '最终归纳',
      prompt: '如果要给自己一个“最像的狗系标签”，你会怎么选？',
      options: [
        { label: '热情陪伴，喜欢被需要', scores: { extroversion: 40, family: 62, energy: 24, curiosity: 16, independence: 10, sensitivity: 34, order: 18, healing: 70 } },
        { label: '聪明行动，喜欢计划和目标', scores: { extroversion: 20, family: 20, energy: 30, curiosity: 48, independence: 26, sensitivity: 12, order: 70, healing: 18 } },
        { label: '自由自在，愿意往前跑', scores: { extroversion: 30, family: 16, energy: 62, curiosity: 60, independence: 46, sensitivity: 16, order: 14, healing: 20 } },
        { label: '安静又敏感，自己舒服最重要', scores: { extroversion: 8, family: 22, energy: 10, curiosity: 18, independence: 52, sensitivity: 62, order: 28, healing: 30 } }
      ]
    }
  ];

  const RESULT_SET = [
    {
      id: 'golden-retriever',
      name: '金毛',
      title: '热情治愈型',
      summary: '像温暖的太阳，天然会让人放松',
      keywords: ['温暖', '治愈', '可靠', '社交', '耐心'],
      story: '你在群体里很容易成“情绪安定器”，不需要轰轰烈烈，但总能让人觉得被照顾。你不是最会制造惊喜的人，却一定是最核心的安心感。',
      strengths: ['很会在关系里提供安全感', '容易接住他人的情绪', '拥有稳稳的陪伴力'],
      weaknesses: ['容易忽略自己的情绪', '在别人需求太多时会疲惫', '有时需要提醒自己先照顾自己'],
      social: '你更喜欢轻松自然的陪伴：一起逛街、聊八卦、在生活里互相照顾。你不是那种高压型的人，但大多数人都愿意靠近你。',
      love: '恋爱里，你偏“稳定而温柔”的表达方式。你可能不会一上来就轰轰烈烈，但对方会慢慢感受到，你的爱很扎实、很温柔、很不容易消失。',
      matching: ['拉布拉多', '萨摩耶', '比熊'],
      advice: '记得把“照顾别人”也留给自己一点空白。你不需要每个人都能被你治愈，偶尔也要让自己被照顾。',
      emoji: '🐕',
      vector: { extroversion: 72, family: 88, energy: 60, curiosity: 58, independence: 46, sensitivity: 72, order: 60, healing: 92 }
    },
    {
      id: 'border-collie',
      name: '边境牧羊犬',
      title: '聪明规划型',
      summary: '你的脑子永远在规划下一步，且总能先看到细节',
      keywords: ['聪明', '敏锐', '理性', '执行', '稳定'],
      story: '你像一只在生活地图上提前画线的狗：总能把模糊的事变成清晰的步骤。你不需要别人一遍遍提醒，因为你本来就会把事情推着推进。',
      strengths: ['善于拆解复杂问题', '喜欢高效、清晰的节奏', '能够带动团队朝目标前进'],
      weaknesses: ['对混乱很敏感', '有时过度追求完美', '容易忽略自己“慢一点”的需要'],
      social: '你更喜欢有目的的相处：一起制定计划、一起完成一件事、一起有目标地过日子。你并不排斥热闹，但你最舒服的是“能有方向”的连接。',
      love: '恋爱时，你倾向于“真实靠谱”而不是轰烈。你希望对方能一起成长、一起执行、一起解决现实问题。',
      matching: ['德牧', '贵宾犬', '杜宾犬'],
      advice: '把效率和细节也留给情绪。世界不需要每一件事都被安排得最完美，偶尔放慢脚步，也会更容易享受。',
      emoji: '🐶',
      vector: { extroversion: 54, family: 58, energy: 50, curiosity: 72, independence: 60, sensitivity: 42, order: 88, healing: 32 }
    },
    {
      id: 'shiba-inu',
      name: '柴犬',
      title: '独立傲娇型',
      summary: '你有自己的边界，而且不喜欢被忽悠',
      keywords: ['独立', '强气', '清醒', '理智', '有主见'],
      story: '你不是不需要别人，只是只会在“我认可的人”面前放下防备。你有很强的自主感，喜欢安静、有秩序、知道自己在做什么的生活。',
      strengths: ['很有边界感', '看问题清晰', '有超强的自我认知'],
      weaknesses: ['有时看起来不太亲近', '难以接受被逼着表达', '容易把防御当成成熟'],
      social: '你不排斥社交，但更像在“选择你信任的那一小群人”里展开。你更容易建立深度关系，而不是泛泛而谈。',
      love: '恋爱里，你一旦认可一个人，就会很认真，但你也需要被尊重和理解。你不想被过度控制，也不愿意空泛地热情。',
      matching: ['杜宾犬', '哈士奇', '德牧'],
      advice: '你不需要总把“独立”当成最理想的状态。适度打开一点，也许会让你更容易被深爱。',
      emoji: '🐾',
      vector: { extroversion: 36, family: 46, energy: 38, curiosity: 40, independence: 88, sensitivity: 58, order: 64, healing: 28 }
    },
    {
      id: 'samoyed',
      name: '萨摩耶',
      title: '快乐气氛组',
      summary: '你是那种一进房间就让空气变轻的狗',
      keywords: ['阳光', '热闹', '友善', '轻松', '感染力'],
      story: '你天生会让人放松，哪怕只是坐在旁边，也会让人觉得多了一点温度。你不一定最会解决复杂问题，但你最大的能力，是让人重新想笑。',
      strengths: ['高情绪感染力', '容易让场面不尴尬', '很会带动快乐氛围'],
      weaknesses: ['偶尔忽略自己的状态', '容易被不理智的情绪带走', '没那么习惯长时间沉静'],
      social: '你喜欢在热闹里和人相处，靠近你的人通常会觉得“活着真的挺好”。你适合和能一起开开心心过日子的人在一起。',
      love: '恋爱里，你通常会很热情、很会制造浪漫，也很善于让对方舒服。但你也需要对方知道，很多时候你只是想被认真看见。',
      matching: ['金毛', '比熊', '拉布拉多'],
      advice: '有时候，安静的快乐也同样值得拥有。别总用笑容来掩盖自己需要休息的时候。',
      emoji: '☀️',
      vector: { extroversion: 82, family: 64, energy: 78, curiosity: 52, independence: 30, sensitivity: 46, order: 36, healing: 74 }
    },
    {
      id: 'husky',
      name: '哈士奇',
      title: '自由冒险型',
      summary: '你天生不喜欢被束缚，喜欢的大概是“风和未知”',
      keywords: ['自由', '冒险', '活跃', '轻盈', '叛逆'],
      story: '你不想被规则困住，甚至连思路都有点向外跑。你更喜欢过“能动、能走、能开拓”的生活，而不是被塞进一条固定路线里。',
      strengths: ['适应力强', '有冒险精神', '很会给生活加一点新鲜感'],
      weaknesses: ['容易忽略细节和安排', '不喜欢被限制', '对高压和久坐不太耐受'],
      social: '你更爱开放、灵活、充满变化的相处节奏。你不适合和过于控制情绪的人待在一起，越自由越舒服。',
      love: '恋爱里，你不需要过度黏合，但需要对方理解你向往自由的本能。你不讨厌深情，讨厌的是被困住。',
      matching: ['柴犬', '柯基', '萨摩耶'],
      advice: '自由很重要，但有时候“方向感”也会让你活得更长久。给自己的生活留一点边界，才会更稳。',
      emoji: '🌬️',
      vector: { extroversion: 66, family: 42, energy: 84, curiosity: 80, independence: 84, sensitivity: 42, order: 22, healing: 24 }
    },
    {
      id: 'corgi',
      name: '柯基',
      title: '活力行动派',
      summary: '你不是慢慢想，而是先动起来，行动比语言更真实',
      keywords: ['行动派', '热爱挑战', '有趣', '冲劲', '开朗'],
      story: '你对生活的感受不靠理论，而靠脚步和动作。你更愿意试试、做做、冲一冲，而不是坐下来反复琢磨一件事。',
      strengths: ['行动力强', '很有感染力和爆发力', '很难被无聊困住'],
      weaknesses: ['容易忽略后续收尾', '会把“冲动”当成“热爱”', '可能需要更多停下来想一想'],
      social: '你最舒服的关系，是那种一起冒险、一起玩乐、一起快速推进的连接。你不一定喜欢长篇大论，但你会有人一起行动。',
      love: '恋爱里，你不喜欢含糊。你更喜欢对方跟你一起跑、一起做、有一种“在一起就有能量”的感觉。',
      matching: ['哈士奇', '萨摩耶', '金毛'],
      advice: '让冲动和想法留在生活里，也留一份眼睛照看自己。别忘了停下来享受结果。',
      emoji: '🏃',
      vector: { extroversion: 76, family: 54, energy: 90, curiosity: 72, independence: 36, sensitivity: 34, order: 28, healing: 26 }
    },
    {
      id: 'labrador',
      name: '拉布拉多',
      title: '可靠陪伴型',
      summary: '你不是最浮夸的那种热闹，但你非常值得信赖',
      keywords: ['可靠', '陪伴', '稳重', '真诚', '友善'],
      story: '你的魅力在于你很难让人失望。你可能不大爱表达戏剧感，但你会真的在关键时刻出现，给人一种“安全”的感觉。',
      strengths: ['很稳定', '容易成为真实支柱', '可以陪别人走过不舒服的时间'],
      weaknesses: ['容易让自己一直为别人收着', '对不确定的关系不够敏感', '会把自己当成“默认负责的人”'],
      social: '你更喜欢真诚、平稳、有节奏的相处方式。你是那种关系不会轰轰烈烈，但能长期陪伴的人。',
      love: '恋爱里，你的爱不是花哨，而是可靠，甚至有一点刻板而扎实。对方越需要你，你越会认真站在那边。',
      matching: ['金毛', '比熊', '萨摩耶'],
      advice: '你不需要总在别人需要时把自己放在前面。看着自己的限制，也值得被认真对待。',
      emoji: '🤝',
      vector: { extroversion: 58, family: 80, energy: 52, curiosity: 46, independence: 40, sensitivity: 56, order: 64, healing: 76 }
    },
    {
      id: 'german-shepherd',
      name: '德国牧羊犬',
      title: '坚定守护型',
      summary: '你有一种“我会守住边界”的力量，让人心安',
      keywords: ['守护', '坚定', '责任', '稳', '有信念'],
      story: '你在关系里的成熟感很强，往往不是最会讨好别人，而是最懂得什么应该守住、什么不能妥协。你有独立的判断，也有很强的责任感。',
      strengths: ['责任感强', '很有边界和原则', '面对困难时会挺身而出'],
      weaknesses: ['看起来可能有点严肃', '不喜欢自己被误解', '容易把压力压在自己身上'],
      social: '你更适合真诚可靠、没那么浮夸的人。你不追逐热闹，而是重视“能不能一起扛住事情”。',
      love: '恋爱里，你不是那种甜到发疯的类型，而是愿意真正守住关系的人。你需要被理解，也需要对方明白你的原则和边界。',
      matching: ['边境牧羊犬', '杜宾犬', '柴犬'],
      advice: '守护很重要，但也要允许自己被照顾。你不是所有的责任都必须一个人扛。',
      emoji: '🛡️',
      vector: { extroversion: 46, family: 62, energy: 48, curiosity: 54, independence: 74, sensitivity: 46, order: 86, healing: 20 }
    },
    {
      id: 'poodle',
      name: '贵宾犬',
      title: '精致敏锐型',
      summary: '你对细节很有感觉，甚至会比别人更早察觉变化',
      keywords: ['细致', '敏锐', '聪明', '优雅', '观察力'],
      story: '你有一种很微妙的判断力：你看得见别人没说出来的东西，也更能在复杂的环境里找到自己的节奏。你通常不爱混乱，喜欢把感受和细节处理得清楚。',
      strengths: ['很会观察人和环境', '适应力很强', '有很强的自我修正能力'],
      weaknesses: ['容易过度思考', '在关系里会过度敏感', '可能会把细节看得比感受更重要'],
      social: '你更喜欢有质量的交流，而不是无意义的很多人。你一定会记住那些“很重要但没说出口的东西”。',
      love: '恋爱时，你可能不爱大张旗鼓，但会很细致地照顾对方的感受；你也需要对方有同样的细腻和诚意。',
      matching: ['边境牧羊犬', '德牧', '比熊'],
      advice: '注意别让过度敏锐变成过度消耗。有时候，最好的理解不是“知道所有细节”，而是“愿意先放下想法”。',
      emoji: '✨',
      vector: { extroversion: 50, family: 52, energy: 42, curiosity: 74, independence: 62, sensitivity: 74, order: 76, healing: 42 }
    },
    {
      id: 'bichon-frise',
      name: '比熊',
      title: '柔软依恋型',
      summary: '你最擅长把生活变成一个舒服的窝，谁都愿意靠近',
      keywords: ['柔软', '亲密', '爱撒娇', '温柔', '依恋'],
      story: '你不是没有边界，而是你很懂得“舒适感”是什么。你喜欢亲密、喜欢被需要、喜欢在关系里有轻微的黏糊感。你不一定最强势，却很容易被人记住。',
      strengths: ['很会营造亲密氛围', '容易让人感到放松', '很会表达爱和关心'],
      weaknesses: ['容易在关系里过度付出', '可能把“被需要”当成安全感', '一旦关系不稳定会很难适应'],
      social: '你适合温柔、有节奏、能陪你慢慢建立感觉的人。你喜欢被真正看见，而不是被当成一口气就能消耗掉的人。',
      love: '恋爱里，你的表达通常很真诚，也很需要对方持续回应。你不是爱得不理性，而是你很需要被温柔对待。',
      matching: ['金毛', '萨摩耶', '拉布拉多'],
      advice: '关心别人很好，但也要把“被关心”当成一个必需品，而不只是你给出的东西。',
      emoji: '🧸',
      vector: { extroversion: 62, family: 86, energy: 42, curiosity: 44, independence: 32, sensitivity: 80, order: 52, healing: 84 }
    },
    {
      id: 'doberman',
      name: '杜宾犬',
      title: '冷静目标型',
      summary: '你不爱浪费情绪，通常都会把精力放在更重要的事情上',
      keywords: ['目标感', '冷静', '理性', '成熟', '稳健'],
      story: '你看起来可能很直率，但你其实很会过滤信息。你倾向于把有限的精力用在真正重要的事情上，速度快、判断清楚、反应不乱。',
      strengths: ['对关键问题很敏锐', '能保持冷静', '做事有计划和边界'],
      weaknesses: ['可能看起来比较沉', '不喜欢无意义的消耗', '在情绪表达上不一定丰富'],
      social: '你更偏好高质量关系，而不是很多“表面互动”。你尊重能力、清晰、真诚的人，也会非常珍惜彼此的边界。',
      love: '恋爱里，你看重稳定与忠诚，而不是不停制造热闹。你不是不浪漫，只是你想要的是能在现实里稳住的人。',
      matching: ['德牧', '柴犬', '边境牧羊犬'],
      advice: '你不必总把感受压得太深。被理解和被认真对待，也会让你更像自己。',
      emoji: '🎯',
      vector: { extroversion: 40, family: 52, energy: 50, curiosity: 56, independence: 76, sensitivity: 42, order: 82, healing: 18 }
    },
    {
      id: 'pug',
      name: '巴哥犬',
      title: '松弛生活家',
      summary: '你不是不想努力，你只是更喜欢把人生过成舒服的模样',
      keywords: ['放松', '享受', '温和', '低压力', '自在'],
      story: '你很懂得“舒服比拼命更重要”。你不一定觉得自己必须走得特别快，只要生活在一个舒服、稳定、有爱的人里，你就会很满足。',
      strengths: ['很会放松和享受', '温和且容易相处', '在高压力环境里能给人安定感'],
      weaknesses: ['容易回避让自己不舒服的事', '可能比别人更依赖舒适感', '有时需要挑战自己一点点'],
      social: '你更容易在轻松和亲密的关系里成长。你不必参与所有人的热闹，只要相处舒服，温度就足够了。',
      love: '恋爱里，你喜欢那种不需要过于剧烈、但始终舒服、稳定、轻松的陪伴。你不是不认真，而��你更享受“过得舒服”的爱。',
      matching: ['金毛', '拉布拉多', '比熊'],
      advice: '舒适很重要，但不代表不该让自己走一点更远的路。偶尔给日常一点挑战，也会更有意思。',
      emoji: '😴',
      vector: { extroversion: 46, family: 74, energy: 36, curiosity: 36, independence: 34, sensitivity: 62, order: 48, healing: 70 }
    }
  ];

  const META = {
    dimensions: DIMENSIONS,
    questions: QUESTION_SET,
    results: RESULT_SET
  };

  window.DogTiData = META;
})();
