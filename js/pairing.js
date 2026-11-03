(function () {
  const pairings = {
    'golden-retriever': { bestMatchId: 'shiba-inu', bestMatchReason: '温暖拥抱独立边界，亲近也给彼此留空间', bestFriendId: 'labrador', bestFriendReason: '两个可靠陪伴派，日常互相接住、一起靠谱' },
    'border-collie': { bestMatchId: 'pug', bestMatchReason: '计划遇上松弛，帮彼此找到效率与喘息的平衡', bestFriendId: 'doberman', bestFriendReason: '目标清晰的行动搭档，合作时少绕弯、很省心' },
    'shiba-inu': { bestMatchId: 'golden-retriever', bestMatchReason: '热情融化一点防备，独立也让亲密更从容', bestFriendId: 'husky', bestFriendReason: '都珍惜自由和边界，不必黏在一起也玩得来' },
    samoyed: { bestMatchId: 'doberman', bestMatchReason: '明亮热情配上冷静稳重，一个点火一个掌舵', bestFriendId: 'corgi', bestFriendReason: '快乐气氛组遇上行动派，出门玩从不缺节目' },
    husky: { bestMatchId: 'shiba-inu', bestMatchReason: '自由冒险配上清醒边界，彼此欣赏也不互相管束', bestFriendId: 'corgi', bestFriendReason: '想到就出发的玩伴组合，能量和点子都管够' },
    corgi: { bestMatchId: 'border-collie', bestMatchReason: '冲劲遇到规划，行动有人接力，目标也不容易跑偏', bestFriendId: 'samoyed', bestFriendReason: '一个负责开跑，一个负责开心，普通周末也热闹' },
    labrador: { bestMatchId: 'poodle', bestMatchReason: '踏实照顾搭配细腻观察，温柔和理解都不缺席', bestFriendId: 'golden-retriever', bestFriendReason: '双倍可靠与治愈，低落时有人陪、开心时有人分享' },
    'german-shepherd': { bestMatchId: 'bichon-frise', bestMatchReason: '坚定守护遇上柔软回应，强大的人也有安心靠岸处', bestFriendId: 'border-collie', bestFriendReason: '责任感加执行力，默契做事也会记得彼此的辛苦' },
    poodle: { bestMatchId: 'corgi', bestMatchReason: '敏锐思考配上热烈行动，灵感终于有机会落地', bestFriendId: 'shiba-inu', bestFriendReason: '观察细腻又尊重边界，安静相处也能心领神会' },
    'bichon-frise': { bestMatchId: 'husky', bestMatchReason: '黏糊温柔遇上自由灵魂，亲密里也能一起长见识', bestFriendId: 'pug', bestFriendReason: '舒服陪伴不必费力，窝着聊天也能把日子过甜' },
    doberman: { bestMatchId: 'samoyed', bestMatchReason: '冷静目标感配上灿烂热情，生活多一点轻松的惊喜', bestFriendId: 'german-shepherd', bestFriendReason: '都讲原则又值得托付，关键时刻能并肩扛事' },
    pug: { bestMatchId: 'shiba-inu', bestMatchReason: '松弛 × 独立，一个不催，一个不黏', bestFriendId: 'bichon-frise', bestFriendReason: '舒服陪伴，日常小事也能一起开心' }
  };

  const results = window.DogTiData && Array.isArray(window.DogTiData.results) ? window.DogTiData.results : [];
  const resultById = new Map(results.map((result) => [result.id, result]));

  results.forEach((result) => {
    if (typeof result.love === 'string') {
      result.love = result.love.replace(/而\uFFFD+你/g, '而是你').replace(/\uFFFD+/g, '');
    }

    const pairing = pairings[result.id];
    if (!pairing || !resultById.has(pairing.bestMatchId) || !resultById.has(pairing.bestFriendId) ||
      pairing.bestMatchId === result.id || pairing.bestFriendId === result.id || pairing.bestMatchId === pairing.bestFriendId) {
      return;
    }
    result.pairing = pairing;
  });

  function buildResultSummary(result) {
    const pairing = result && result.pairing;
    const match = pairing && resultById.get(pairing.bestMatchId);
    const friend = pairing && resultById.get(pairing.bestFriendId);
    const link = window.DogTiShare.buildResultLink(result.id);
    if (!match || !friend) {
      return `${result.name}：${result.summary}｜我在 DogTi 测出是「${result.title}」。${link}`;
    }
    return `${result.name}：${result.summary}｜我在 DogTi 测出是「${result.title}」。最佳配对：${match.name} · ${match.title}；最佳友伴：${friend.name} · ${friend.title}。来测测看：${link}`;
  }

  function renderPairing() {
    const resultId = new URLSearchParams(window.location.search).get('result');
    const result = resultById.get(resultId);
    const keywords = document.getElementById('result-keywords');
    const dimensionPanel = document.querySelector('#share-card .dimension-panel');
    if (!result || !result.pairing || !keywords || !dimensionPanel) return;

    const match = resultById.get(result.pairing.bestMatchId);
    const friend = resultById.get(result.pairing.bestFriendId);
    if (!match || !friend) return;

    let panel = document.getElementById('pairing-panel');
    if (!panel) {
      panel = document.createElement('section');
      panel.id = 'pairing-panel';
      panel.className = 'pairing-panel';
      keywords.insertAdjacentElement('afterend', panel);
    }

    panel.innerHTML = '';
    const heading = document.createElement('h2');
    heading.className = 'pairing-heading';
    heading.textContent = '你的专属小狗搭子';
    panel.appendChild(heading);

    [
      { label: '最佳配对小狗', dog: match, reason: result.pairing.bestMatchReason },
      { label: '最佳友伴小狗', dog: friend, reason: result.pairing.bestFriendReason }
    ].forEach((item) => {
      const card = document.createElement('div');
      card.className = 'pairing-card';
      const label = document.createElement('span');
      label.className = 'pairing-label';
      label.textContent = item.label;
      const name = document.createElement('strong');
      name.className = 'pairing-name';
      name.textContent = `${item.dog.name} · ${item.dog.title}`;
      const reason = document.createElement('span');
      reason.className = 'pairing-reason';
      reason.textContent = item.reason;
      card.append(label, name, reason);
      panel.appendChild(card);
    });

    const playful = document.createElement('p');
    playful.className = 'pairing-playful';
    playful.textContent = `${result.name}小狗大军 +1 (ﾉ◕ヮ◕)ﾉ`;
    panel.appendChild(playful);
  }

  function handleShareClick(event) {
    const button = event.target.closest('#share-native, #copy-text');
    if (!button) return;
    const resultId = new URLSearchParams(window.location.search).get('result');
    const result = resultById.get(resultId);
    if (!result) return;

    event.preventDefault();
    event.stopImmediatePropagation();
    const summary = buildResultSummary(result);
    if (button.id === 'copy-text') {
      window.DogTiShare.copyText(summary).then(() => window.DogTiShare.showToast('结果文案已复制'));
      return;
    }

    if (navigator.share) {
      navigator.share({ title: 'DogTi｜测测你是什么小狗', text: summary, url: window.DogTiShare.buildResultLink(result.id) })
        .catch(() => window.DogTiShare.copyText(summary).then(() => window.DogTiShare.showToast('结果文案已复制')));
    } else {
      window.DogTiShare.copyText(summary).then(() => window.DogTiShare.showToast('结果文案已复制'));
    }
  }

  if (window.DogTiShare) {
    window.DogTiShare.getResultSummary = buildResultSummary;
  }
  document.addEventListener('click', handleShareClick, true);

  const resultContainer = document.getElementById('result');
  if (resultContainer) {
    new MutationObserver(renderPairing).observe(resultContainer, { childList: true, subtree: true });
  }
  document.addEventListener('DOMContentLoaded', renderPairing);
  window.addEventListener('popstate', renderPairing);
  renderPairing();
})();
