/* khing's desktop: static text swap for other languages.
 *
 * How it works: the page is written in english. Each language below is a plain table of
 * "english text -> translated text". Switching language walks the page, swaps any text (and
 * aria-label / title / placeholder / alt) that has a translation, and remembers the original so
 * english can be restored. A MutationObserver translates text the page adds later (the little
 * guy's speech bubbles, guestbook status lines, vote counts).
 *
 * To add a language: copy the `ko` block, translate the right-hand sides, add it to I18N and
 * LANG_NAMES. To revert the whole feature: delete this file, the <script src="i18n.js"> line in
 * index.html and the "Noto Sans KR" part of the Google Fonts link.
 *
 * Not translated on purpose: guestbook notes written by visitors, and the devlog's version notes.
 */
(function () {
  'use strict';

  var LANG_NAMES = { en: 'English', ko: '한국어' };

  var I18N = {
    ko: {
      title: 'khing의 데스크톱',
      /* exact text -> translation */
      t: {
        /* gate (kept in case the password is switched back on) */
        "khing's room": 'khing의 방', 'knock knock 🚪': '똑똑 🚪', "what's the password?": '비밀번호가 뭐예요?', 'come in': '들어가기',
        /* home */
        'home': '홈', 'hi!': '안녕!', "i'm khing": '나는 khing', 'welcome to my safe space:)': '나의 아늑한 공간에 온 걸 환영해요 :)',
        'about': '소개', 'siblings': '형제자매', 'links': '링크', 'vote now!': '지금 투표!', 'work': '작업', 'contact': '연락', 'devlog': '개발 일지',
        'psst. try clicking the little guy in the corner →': '쉿. 구석에 있는 작은 친구를 눌러 보세요 →',
        'welcome!': '환영해요!',
        /* about */
        'Could it be are you also in possession of the all-seeing eye?!': '혹시 당신도 만물을 꿰뚫어 보는 눈을 가지고 계신가요?!',
        'from davao city, philippines': '필리핀 다바오 시 출신',
        'now living & working in phnom penh, cambodia': '지금은 캄보디아 프놈펜에서 살며 일하고 있어요',
        'things i like:': '내가 좋아하는 것:',
        'education': '학력', 'Bachelor of Science in Computer Science': '컴퓨터공학 학사', '(Graduated Cum Laude 2025)': '(2025년 우등 졸업)',
        'language proficiency': '언어 능력',
        /* siblings */
        'my favorite people in the world 💜': '세상에서 제일 좋아하는 사람들 💜',
        /* links */
        'coming soon': '곧 공개', 'COMING SOON': '곧 공개', 'merch': '굿즈',
        'clicking any of the links will open a new tab!': '링크를 누르면 새 탭에서 열려요!',
        /* work */
        'tools': '도구', 'development': '개발',
        'the full launch': '정식 오픈',
        'a custom domain for this site, plus more updates and a few surprises. stay tuned!': '이 사이트의 전용 도메인과 더 많은 업데이트, 그리고 깜짝 선물도 준비 중이에요. 기대해 주세요!',
        '🗳 vote on the domain': '🗳 도메인 투표하기',
        'a little hamster project': '작은 햄스터 프로젝트',
        "something cozy i'm still working on. more soon!": '아직 만들고 있는 아늑한 무언가예요. 곧 더 알려드릴게요!',
        /* vote */
        'vote': '투표', 'pick my domain!': '내 도메인을 골라 주세요!',
        'the full launch is getting a custom address. choose your favorite, or suggest one of your own. one vote each :)': '정식 오픈에 쓸 전용 주소가 생겨요. 마음에 드는 걸 고르거나 직접 제안해 주세요. 한 사람당 한 표예요 :)',
        'suggest another': '다른 도메인 제안하기', 'suggest': '제안하기',
        'you already voted from this browser, thanks!': '이 브라우저에서 이미 투표했어요. 고마워요!',
        'thanks for voting! ♥': '투표해 주셔서 감사해요! ♥', 'sending your vote…': '투표를 보내는 중…',
        "that doesn't look like a domain. try something like khing.dev": '도메인처럼 보이지 않아요. khing.dev 같은 형식으로 입력해 보세요',
        /* guestbook */
        'guestbook': '방명록', "leave a little note! it'll be dated and everything :)": '작은 메모를 남겨 주세요! 날짜도 함께 기록돼요 :)',
        '✎ write a note': '✎ 메모 쓰기', 'cancel': '취소', 'note color': '메모 색상', 'sticker': '스티커', '+ photo': '+ 사진', 'remove': '삭제', 'sign it': '남기기', 'reply': '답글',
        "couldn't load notes right now :(": '지금은 메모를 불러올 수 없어요 :(', 'no notes yet. be the first!': '아직 메모가 없어요. 첫 번째가 되어 보세요!',
        'play song · spotify': '노래 재생 · spotify', 'play song · youtube': '노래 재생 · youtube',
        'that needs to be an image :)': '이미지 파일이어야 해요 :)', "couldn't read that photo, try another?": '사진을 읽을 수 없어요. 다른 사진으로 해 볼까요?',
        "couldn't send that heart right now :(": '지금은 하트를 보낼 수 없어요 :(', 'easy there! wait a few seconds :)': '잠깐만요! 몇 초만 기다려 주세요 :)',
        "that doesn't look like a spotify or youtube song link :(": 'spotify나 youtube 노래 링크가 아닌 것 같아요 :(',
        'signing...': '남기는 중...', 'thanks for stopping by! ♥': '들러 주셔서 감사해요! ♥', 'saved on this device only (demo mode)': '이 기기에만 저장됐어요 (데모 모드)',
        "oops, that didn't save. try again?": '앗, 저장되지 않았어요. 다시 해 볼까요?', 'demo mode: notes only show on this device': '데모 모드: 메모는 이 기기에서만 보여요',
        /* devlog (only the window chrome, the version notes stay english) */
        "everything i've added to this site, newest first.": '이 사이트에 추가한 모든 것, 최신순.', 'last updated nov 2, 2026': '마지막 업데이트: 2026년 11월 2일',
        /* contact */
        'yayy mail!': '야호, 메일이다!',
        "wanna chat, collab, or just say hi? the easiest way to reach me is email. i'd love to hear from you :)": '이야기하거나, 협업하거나, 그냥 인사하고 싶으세요? 가장 쉬운 방법은 이메일이에요. 연락 기다릴게요 :)',
        'email me at:': '이메일 주소:', 'or press the button below to open your mail app.': '아니면 아래 버튼을 눌러 메일 앱을 열어 보세요.', 'send me an email!': '이메일 보내기!',
        /* the little guy */
        'good morning! ☀️': '좋은 아침! ☀️', 'good afternoon! 👋': '좋은 오후! 👋', 'good evening! 🌆': '좋은 저녁! 🌆', "it's late… go get some sleep 😴": '늦었어요… 이제 자러 가요 😴',
        'hi!! 👋': '안녕!! 👋', 'ooh! you found me!': '오! 나를 찾았네!', 'heh. nice site, right?': '헤헷. 사이트 멋지지?', "I'm the Supreme Leader!": '내가 최고 지도자다!',
        'thanks for visiting ;)': '놀러 와 줘서 고마워 ;)', 'zzz… five more minutes': 'zzz… 5분만 더…', 'psst… check out the work window': '쉿… 작업 창도 구경해 봐',
        'hey!! 💢': '야!! 💢', 'stop poking me!': '그만 찔러!', 'i said STOP 😠': '그만하라고 했잖아 😠', 'that. is. enough!!': '이. 제. 그. 만!!', 'rude!! 💢💢': '무례해!! 💢💢', 'GRRR 😤': '으르렁 😤',
        "you shouldn't have done that.": '그러지 말았어야지.', 'i see you.': '너 보인다.', 'ehehehe…': '에헤헤헤…', 'keep clicking. i dare you.': '계속 눌러 봐. 어디 해 봐.', 'why are you still here 🙂': '아직도 여기 있어? 🙂',
        '…did i scare you? sorry 🥺': '…놀랐어? 미안 🥺', "hmph… i'm calm. i'm calm.": '흥… 나 침착해. 침착해.',
        'oh no… he blew up 💀': '으악… 폭발했어 💀', 'a purple fanta could bring him back…': '보라색 환타라면 되살릴 수 있을지도…', "…he's gone 💀": '…떠나버렸어 💀',
        'something fizzy hides in the moonlight 🌙': '달빛 속에 톡 쏘는 무언가가 숨어 있어 🌙', 'have you looked up at night?': '밤하늘을 올려다봤어?',
        'a purple fanta! 🍇 take it to the coffin': '보라색 환타다! 🍇 관으로 가져가 봐', "I'M ALIVE?! 💜 purple fanta, my favorite!": '나 살아났어?! 💜 보라색 환타, 내 최애!',
        'goodnight… 🌙': '잘 자… 🌙', 'link coming soon ✨': '링크는 곧 공개돼요 ✨',
        'merry christmas! 🎄': '메리 크리스마스! 🎄', "happy valentine's! 💖": '해피 발렌타인! 💖', "it's khing's birthday! 🎂": 'khing의 생일이에요! 🎂', 'spring is here 🌸': '봄이 왔어요 🌸',
        /* aria-label / title / alt / placeholder */
        'switch to dark mode': '다크 모드로 전환', 'switch to light mode': '라이트 모드로 전환', 'light / dark': '라이트 / 다크',
        'password': '비밀번호', 'close': '닫기', 'main': '메인', 'vote for the domain now': '지금 도메인 투표하기',
        'close about': '소개 닫기', 'khing smiling in a red patterned shirt': 'khing이 빨간 무늬 셔츠를 입고 웃고 있어요', 'education list': '학력 목록',
        'close siblings': '형제자매 닫기', 'close links': '링크 닫기', 'close work': '작업 닫기',
        'a little browser window with a globe and a coming soon label': '지구본과 "곧 공개" 라벨이 있는 작은 브라우저 창',
        'a cute hamster wearing a hard hat and working on a laptop, with an in development label': '안전모를 쓰고 노트북으로 일하는 귀여운 햄스터, 개발 중 라벨',
        'vote on the domain': '도메인 투표', 'close vote': '투표 닫기', 'e.g. khing.dev': '예: khing.dev',
        'close guestbook': '방명록 닫기', 'cancel reply': '답글 취소', 'your name': '이름', 'your note (200 chars max)': '메모 (최대 200자)',
        'none': '없음', 'pink': '분홍', 'peach': '복숭아', 'butter': '버터', 'mint': '민트', 'sky': '하늘', 'lilac': '라일락',
        'heart': '하트', 'star': '별', 'flower': '꽃', 'frog': '개구리', 'coffee': '커피', 'film': '필름', 'moon': '달', 'sparkle': '반짝임',
        'photo preview': '사진 미리보기', 'song link (optional)': '노래 링크 (선택)', '♪ song link, spotify or youtube (optional)': '♪ 노래 링크, spotify 또는 youtube (선택)',
        'close devlog': '개발 일지 닫기', 'close contact': '연락 닫기', 'the little guy holding a letter': '편지를 든 작은 친구', 'the moon': '달',
        "visit khing's room": 'khing의 방 방문하기', 'open guestbook': '방명록 열기', 'play music': '음악 재생', 'mute music': '음악 끄기', 'music on / off': '음악 켜기 / 끄기',
        'say hi to the little guy': '작은 친구에게 인사하기', 'a coffin with a skull on it': '해골이 그려진 관'
      },
      /* patterns with a number or an unknown tail */
      rx: [
        [/^(\d+) votes? · (\d+)%$/, '$1표 · $2%'],
        [/^voting isn't open just yet\. check back soon!(.*)$/, '아직 투표가 열리지 않았어요. 곧 다시 확인해 주세요!$1'],
        [/^(you hearted this note|heart this note), (\d+) hearts?$/, function (m, a, n) { return (a === 'heart this note' ? '이 메모에 하트 보내기' : '이 메모에 하트를 보냈어요') + ', 하트 ' + n + '개'; }]
      ],
      /* whole elements that mix text and inline tags (tagged data-i18n="key" in index.html) */
      h: {
        intro: '안녕하세요! 저는 <span class="hl">촬영감독</span>이자 <span class="hl">웹 개발자</span>인 khing이에요.',
        like1: '<span class="hl">형제자매</span>와 함께 시간 보내기',
        like2: '<span class="hl">하나님</span>과 함께하는 나의 걸음과 믿음',
        like3: '<span class="hl">보라색</span> 환타',
        speak: '저는 <span class="text-violet-500">영어</span>와 <span class="text-violet-500">필리핀어(타갈로그어)</span>를 해요.',
        hello: '인사하고 싶으세요? <button class="link" data-open="contact">연락</button>에서 메시지를 보내 주세요 :)'
      }
    }
  };

  var ATTRS = ['aria-label', 'title', 'placeholder', 'alt'];
  var SKIP = 'script,style,noscript,textarea,.gb-note b,.gb-note p,#win-devlog .dl-timeline,#win-devlog .dl-timeline *';
  var SKIP_ATTR = '.gb-note b,.gb-note p,#win-devlog .dl-timeline,#win-devlog .dl-timeline *';
  var lang = 'en';
  var origText = new WeakMap(); // text node -> original english
  var origAttr = new WeakMap(); // element -> { attr: english }
  var origHtml = new WeakMap(); // element -> original innerHTML
  var origTitle = document.title;
  var mo = null;

  function dict() { return I18N[lang]; }

  function tr(s) {
    var d = dict(); if (!d) return null;
    var key = s.replace(/\s+/g, ' ').trim();
    if (!key) return null;
    if (Object.prototype.hasOwnProperty.call(d.t, key)) return d.t[key];
    for (var i = 0; i < d.rx.length; i++) {
      if (d.rx[i][0].test(key)) return key.replace(d.rx[i][0], d.rx[i][1]);
    }
    return null;
  }

  function skipped(el, sel) { return !el || (el.closest && el.closest(sel || SKIP)); }

  function doText(node) {
    var p = node.parentElement;
    if (!p || skipped(p)) return;
    if (p.closest('[data-i18n]')) return;
    var cur = node.nodeValue, out = tr(cur);
    if (out === null) return;
    if (!origText.has(node)) origText.set(node, cur);
    var lead = cur.match(/^\s*/)[0], trail = cur.match(/\s*$/)[0];
    node.nodeValue = lead + out + trail;
  }

  function doAttrs(el) {
    if (!el.getAttribute || skipped(el, SKIP_ATTR)) return;
    for (var i = 0; i < ATTRS.length; i++) {
      var a = ATTRS[i], v = el.getAttribute(a);
      if (!v) continue;
      var out = tr(v);
      if (out === null) continue;
      var o = origAttr.get(el); if (!o) { o = {}; origAttr.set(el, o); }
      o[a] = v;
      el.setAttribute(a, out);
    }
  }

  function doHtml(el) {
    var d = dict(); if (!d) return;
    var key = el.getAttribute('data-i18n');
    if (!d.h[key]) return;
    if (!origHtml.has(el)) origHtml.set(el, el.innerHTML);
    el.innerHTML = d.h[key];
  }

  function walk(root) {
    if (root.nodeType === 3) { doText(root); return; }
    if (root.nodeType !== 1) return;
    if (root.hasAttribute('data-i18n')) doHtml(root);
    var els = root.querySelectorAll ? root.querySelectorAll('[data-i18n]') : [];
    for (var i = 0; i < els.length; i++) doHtml(els[i]);
    doAttrs(root);
    var all = root.querySelectorAll ? root.querySelectorAll('[aria-label],[title],[placeholder],[alt]') : [];
    for (var j = 0; j < all.length; j++) doAttrs(all[j]);
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), n;
    while ((n = w.nextNode())) doText(n);
  }

  function restore() {
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT), n, list = [];
    while ((n = w.nextNode())) list.push(n);
    list.forEach(function (t) { if (origText.has(t)) { t.nodeValue = origText.get(t); origText.delete(t); } });
    document.querySelectorAll('[data-i18n]').forEach(function (el) { if (origHtml.has(el)) { el.innerHTML = origHtml.get(el); origHtml.delete(el); } });
    document.querySelectorAll('[aria-label],[title],[placeholder],[alt]').forEach(function (el) {
      var o = origAttr.get(el); if (!o) return;
      Object.keys(o).forEach(function (a) { el.setAttribute(a, o[a]); });
      origAttr.delete(el);
    });
    document.title = origTitle;
  }

  function startObserver() {
    if (!mo) {
      mo = new MutationObserver(function (recs) {
        if (lang === 'en') return;
        mo.disconnect();
        recs.forEach(function (r) {
          if (r.type === 'childList') { r.addedNodes.forEach(function (n) { walk(n); }); }
          else if (r.type === 'characterData') { doText(r.target); }
          else if (r.type === 'attributes') { doAttrs(r.target); }
        });
        mo.observe(document.body, OBS);
      });
    }
    mo.observe(document.body, OBS);
  }
  var OBS = { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTRS };

  function setLang(next, save) {
    if (next !== 'en' && !I18N[next]) next = 'en';
    if (mo) mo.disconnect();
    if (lang !== 'en') restore();
    lang = next;
    document.documentElement.lang = next;
    if (next !== 'en') {
      origTitle = document.title;
      walk(document.body);
      if (dict().title) document.title = dict().title;
      startObserver();
    }
    if (save) { try { localStorage.setItem('lang', next); } catch (e) {} }
    syncButton();
  }

  /* ---------- the language picker ---------- */
  var btn, menu;
  function syncButton() {
    if (!btn) return;
    btn.querySelector('.lg-code').textContent = lang === 'en' ? 'EN' : lang.toUpperCase();
    [].forEach.call(menu.children, function (b) { b.setAttribute('aria-checked', b.dataset.lang === lang ? 'true' : 'false'); });
  }
  function buildPicker() {
    var css = document.createElement('style');
    css.textContent =
      '.lang-wrap{position:fixed;z-index:9999;left:4.1rem;top:.9rem}@media(min-width:640px){.lang-wrap{left:5.6rem;top:1.4rem}}' +
      '.lang-btn{display:flex;align-items:center;gap:.35rem;height:2.25rem;padding:0 .75rem;border-radius:999px;border:2px solid #4b3f72;background:#fff;color:#4b3f72;font:700 .75rem "Space Mono",ui-monospace,monospace;cursor:pointer;box-shadow:0 2px 0 rgba(75,63,114,.25);transition:transform .15s}' +
      '.lang-btn:hover{transform:scale(1.05)}.lang-btn svg{width:1rem;height:1rem}' +
      '.lang-menu{position:absolute;left:0;top:2.7rem;min-width:8rem;padding:.3rem;border-radius:14px;border:2px solid #4b3f72;background:#fff;box-shadow:0 4px 0 rgba(75,63,114,.25);display:none}' +
      '.lang-wrap.open .lang-menu{display:block}' +
      '.lang-menu button{display:block;width:100%;text-align:left;padding:.45rem .7rem;border:0;border-radius:9px;background:none;color:#4b3f72;font:700 .8rem "Space Mono","Noto Sans KR",ui-monospace,monospace;cursor:pointer}' +
      '.lang-menu button:hover{background:#ece3ff}.lang-menu button[aria-checked="true"]:before{content:"✓ "}' +
      'html.dark .lang-btn,html.dark .lang-menu{background:#2b2350;color:#efe8ff;border-color:#9d8bee}html.dark .lang-menu button{color:#efe8ff}html.dark .lang-menu button:hover{background:#3c3160}' +
      'html[lang="ko"] body,html[lang="ko"] button,html[lang="ko"] input,html[lang="ko"] textarea{font-family:Quicksand,"Noto Sans KR",ui-sans-serif,system-ui,sans-serif}' +
      'html[lang="ko"] .font-mono,html[lang="ko"] .win-bar,html[lang="ko"] .gb-btn,html[lang="ko"] .soon{font-family:"Space Mono","Noto Sans KR",ui-monospace,monospace}' +
      'html[lang="ko"] body{word-break:keep-all}';
    document.head.appendChild(css);
    var wrap = document.createElement('div'); wrap.className = 'lang-wrap';
    btn = document.createElement('button'); btn.type = 'button'; btn.className = 'lang-btn';
    btn.setAttribute('aria-haspopup', 'true'); btn.setAttribute('aria-label', 'language'); btn.title = 'language';
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/></svg><span class="lg-code">EN</span>';
    menu = document.createElement('div'); menu.className = 'lang-menu'; menu.setAttribute('role', 'menu');
    Object.keys(LANG_NAMES).forEach(function (code) {
      if (code !== 'en' && !I18N[code]) return;
      var b = document.createElement('button'); b.type = 'button'; b.setAttribute('role', 'menuitemradio'); b.dataset.lang = code; b.textContent = LANG_NAMES[code];
      b.addEventListener('click', function () { setLang(code, true); wrap.classList.remove('open'); });
      menu.appendChild(b);
    });
    btn.addEventListener('click', function (e) { e.stopPropagation(); wrap.classList.toggle('open'); });
    document.addEventListener('click', function () { wrap.classList.remove('open'); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') wrap.classList.remove('open'); });
    wrap.appendChild(btn); wrap.appendChild(menu); document.body.appendChild(wrap);
  }

  function init() {
    buildPicker();
    var saved = 'en';
    try { saved = localStorage.getItem('lang') || 'en'; } catch (e) {}
    setLang(saved, false);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  window.setSiteLang = function (l) { setLang(l, true); };
})();
