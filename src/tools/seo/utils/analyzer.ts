import type { AnalysisInput, AnalysisResult, ScoreDimension, ScoreLevel } from '../types';

// ============================================================
// WORD LISTS — easily extensible for OpenAI API integration
// ============================================================

const POWER_WORDS = [
  'amazing','incredible','unbelievable','shocking','secret','exclusive','free','guaranteed',
  'ultimate','essential','proven','instant','powerful','simple','life-changing','game-changer',
  'breakthrough','revolutionary','mind-blowing','stunning','epic','insane','legendary','must-have',
  'bestseller','award-winning','limited','new','results','easy','fast','effective',
  '惊艳','震撼','免费','独家','终极','必备','颠覆','革命','不可思议','神器','秒杀','爆款'
];

const CTA_VERBS = [
  'click','buy','shop','get','try','sign up','subscribe','download','join','start',
  'learn','discover','claim','grab','save','register','order','book','reserve','follow',
  'share','comment','like','tag','visit','check out','see','watch',
  '点击','购买','试试','订阅','下载','加入','开始','领取','抢购','关注','分享','评论',
  '点赞','查看','立即','马上'
];

const URGENCY_WORDS = [
  'now','today','limited','hurry','last chance','before it\'s gone','don\'t miss',
  'ending soon','only','exclusive','time-sensitive','act now',
  '现在','今天','限时','赶紧','最后机会','错过','立即','马上','仅限'
];

const HOOK_STARTERS = ['why','how','what','when','where','who','the reason','the secret','if you'];
const NUMBER_PATTERN = /\d+\s*(ways|tips|steps|reasons|tricks|secrets|hacks|things|signs|reasons|hacks|ideas|个|种|招|步|点)/i;

const EMOJI_LIST = ['😍','🔥','💥','❤️','🎉','🚀','💯','✨','👏','😱','🤯','🙌','💪','😎','🤩','💡','📢','👇','🛒','🎁'];

// Platform tone expectations
const PLATFORM_TONE: Record<string, { emojiExpected: number; slangExpected: number; formalityExpected: number }> = {
  tiktok: { emojiExpected: 80, slangExpected: 70, formalityExpected: 20 },
  instagram: { emojiExpected: 75, slangExpected: 50, formalityExpected: 40 },
  facebook: { emojiExpected: 60, slangExpected: 40, formalityExpected: 50 },
  linkedin: { emojiExpected: 20, slangExpected: 10, formalityExpected: 90 },
  twitter: { emojiExpected: 50, slangExpected: 40, formalityExpected: 50 },
  general: { emojiExpected: 40, slangExpected: 30, formalityExpected: 60 },
};

// ============================================================
// ANALYSIS FUNCTIONS — replace with OpenAI for smarter analysis
// ============================================================

function analyzeAppeal(text: string): { score: number; details: string[] } {
  const details: string[] = [];
  let score = 40; // base score
  const lower = text.toLowerCase();

  // Check for hook starters
  const hasHook = HOOK_STARTERS.some(s => lower.startsWith(s));
  if (hasHook) { score += 15; details.push('✅ Opens with a curiosity hook'); }
  else details.push('💡 Add a hook (Why/How/What) in the opening');

  // Check for numbers/lists
  if (NUMBER_PATTERN.test(text)) { score += 10; details.push('✅ Uses numbered list format'); }
  else details.push('💡 Try numbered formats like "3 ways to..."');

  // Check for power words
  const powerCount = POWER_WORDS.filter(w => lower.includes(w)).length;
  if (powerCount >= 3) { score += 15; details.push('✅ Strong use of power words'); }
  else if (powerCount >= 1) { score += 8; details.push('✅ Contains power words'); }
  else details.push('💡 Add emotional/power words (amazing, secret, ultimate)');

  // Check for emojis
  const emojiCount = EMOJI_LIST.filter(e => text.includes(e)).length;
  if (emojiCount >= 2) { score += 10; details.push('✅ Effective emoji usage'); }
  else if (emojiCount === 1) { score += 5; }
  else details.push('💡 Add 1-2 relevant emojis for visual appeal');

  // Check for personal pronouns
  if (/\\b(you|your|i|my|we|our)\\b/i.test(text)) { score += 10; details.push('✅ Uses personal pronouns (you/your/I)'); }
  else details.push('💡 Add personal pronouns to build connection');

  // Curiosity gap
  if (lower.includes('you won\'t believe') || lower.includes('wait till') || lower.includes('what happens when')
    || text.includes('...') || lower.includes('the truth') || lower.includes('secret')) {
    score += 10; details.push('✅ Creates curiosity gap');
  }

  return { score: Math.min(score, 100), details };
}

function analyzeTone(text: string, platform: string): { score: number; details: string[] } {
  const details: string[] = [];
  let score = 50;
  const tone = PLATFORM_TONE[platform] || PLATFORM_TONE.general;

  // Emoji density check
  const emojiCount = EMOJI_LIST.filter(e => text.includes(e)).length;
  const wordCount = text.split(/\\s+/).length || 1;
  const emojiDensity = (emojiCount / wordCount) * 100;

  if (platform === 'tiktok' || platform === 'instagram') {
    if (emojiDensity > 5) { score += 15; details.push('✅ Good emoji density for ' + platform); }
    else { score += 5; details.push('💡 Add more emojis for ' + platform); }
  } else if (platform === 'linkedin') {
    if (emojiCount <= 1) { score += 15; details.push('✅ Professional tone — minimal emojis'); }
    else { score -= 10; details.push('💡 Reduce emojis for LinkedIn\'s professional tone'); }
  } else {
    if (emojiCount >= 1 && emojiCount <= 3) { score += 10; details.push('✅ Balanced emoji usage'); }
  }

  // Check for sentence variety — length mix
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const shortSentences = sentences.filter(s => s.split(/\\s+/).length <= 5).length;
  const longSentences = sentences.filter(s => s.split(/\\s+/).length >= 12).length;

  if (shortSentences > 0 && longSentences > 0) {
    score += 10; details.push('✅ Good sentence length variety');
  } else {
    details.push('💡 Mix short punchy sentences with longer descriptive ones');
  }

  // Hook at the very start
  const firstLine = text.split(/\\n/)[0].trim();
  if (firstLine.length > 0 && firstLine.length < 60) {
    score += 10; details.push('✅ Strong opening line');
  } else {
    details.push('💡 Keep the first line under 60 chars for maximum impact');
  }

  // Length appropriateness
  if (platform === 'tiktok' && wordCount > 50) {
    score -= 10; details.push('💡 TikTok copy works best under 50 words');
  } else if (platform === 'tiktok' && wordCount <= 50) {
    score += 10;
  }
  if (platform === 'linkedin' && wordCount < 50) {
    score -= 5; details.push('💡 LinkedIn posts benefit from more depth (100+ words)');
  }

  return { score: Math.max(0, Math.min(score, 100)), details };
}

function analyzeKeywords(text: string): { score: number; details: string[] } {
  const details: string[] = [];
  let score = 40;
  const lower = text.toLowerCase();
  const words = lower.split(/\\s+/).filter(w => w.length > 2);
  const totalLen = text.length;

  if (totalLen === 0) return { score: 0, details: ['No content to analyze'] };

  // Detect likely keywords (longer/meaningful words)
  const freq: Record<string, number> = {};
  words.forEach(w => { freq[w] = (freq[w] || 0) + 1; });

  const meaningfulWords = Object.entries(freq)
    .filter(([w, c]) => w.length > 3 && c >= 1 && !['this','that','with','from','have','been','were','what','when','your','will','more','some','them','than','about','also','just','very','well','even','over'].includes(w))
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(e => e[0]);

  if (meaningfulWords.length >= 3) {
    score += 15; details.push('✅ Clear topic keywords detected: #' + meaningfulWords.slice(0, 3).join(', #'));
  } else {
    details.push('💡 Focus on 2-3 core topic keywords');
  }

  // Check keyword placement: beginning, middle, end
  const third = Math.floor(totalLen / 3);
  const start = text.slice(0, third).toLowerCase();
  const mid = text.slice(third, 2 * third).toLowerCase();
  const end = text.slice(2 * third).toLowerCase();

  // If we have keywords, check their placement
  if (meaningfulWords.length > 0) {
    const kw = meaningfulWords[0];
    const inStart = start.includes(kw);
    const inMid = mid.includes(kw);
    const inEnd = end.includes(kw);
    const placements = [inStart, inMid, inEnd].filter(Boolean).length;

    if (placements >= 3) { score += 15; details.push('✅ Keywords well-distributed throughout copy'); }
    else if (placements >= 2) { score += 8; details.push('✅ Keywords appear in multiple sections'); }
    else { details.push('💡 Spread key terms across beginning, middle, and end'); }
  }

  // Avoid keyword stuffing
  if (Object.values(freq).some(c => c > words.length * 0.15)) {
    score -= 10; details.push('⚠️ Possible keyword stuffing — reduce repetition');
  }

  // Hashtag usage check
  const hashtagCount = (text.match(/#[\\w]+/g) || []).length;
  if (hashtagCount > 0 && hashtagCount <= 5) {
    score += 10; details.push('✅ ' + hashtagCount + ' hashtags — good density');
  } else if (hashtagCount > 5) {
    score -= 5; details.push('💡 Too many hashtags — stick to 3-5');
  } else {
    details.push('💡 Add 3-5 relevant hashtags');
  }

  return { score: Math.min(score, 100), details };
}

function analyzeCTA(text: string): { score: number; details: string[] } {
  const details: string[] = [];
  let score = 30;
  const lower = text.toLowerCase();

  // Check for action verbs
  const ctaFound = CTA_VERBS.filter(v => lower.includes(v));
  if (ctaFound.length >= 2) {
    score += 20; details.push('✅ Strong CTA with action verbs: "' + ctaFound.slice(0, 3).join(', ') + '"');
  } else if (ctaFound.length === 1) {
    score += 10; details.push('✅ Contains a CTA verb: "' + ctaFound[0] + '"');
  } else {
    details.push('💡 Add a clear call-to-action (click, buy, subscribe, share)');
  }

  // Urgency
  const urgencyFound = URGENCY_WORDS.filter(u => lower.includes(u));
  if (urgencyFound.length >= 1) {
    score += 15; details.push('✅ Creates urgency with: "' + urgencyFound[0] + '"');
  } else {
    details.push('💡 Add urgency words (now, limited, today, exclusive)');
  }

  // Clarity of ask — what should they DO?
  const specificAsk = /(click|tap|swipe)\s*(the\s*)?(link|button|up|bio)/i.test(text)
    || /(follow|subscribe|like|share|comment|save|tag)/i.test(lower)
    || /(link|link in bio|link in comment)/i.test(lower);
  if (specificAsk) {
    score += 15; details.push('✅ Clear specific action for the audience');
  } else {
    details.push('💡 Tell the audience exactly what to do (link in bio, double tap, etc.)');
  }

  // Value proposition near CTA
  if (/free|save|get|access|learn|discover|exclusive|bonus|discount|offer/i.test(lower)) {
    score += 10; details.push('✅ Clear value proposition');
  } else {
    details.push('💡 Highlight what the audience gains');
  }

  // Placement — CTA at the end
  const lastSentence = text.split(/[.!?\n]+/).filter(s => s.trim()).pop()?.toLowerCase() || '';
  if (ctaFound.some(v => lastSentence.includes(v))) {
    score += 10; details.push('✅ CTA is placed at the end — ideal position');
  }

  return { score: Math.min(score, 100), details };
}

// ============================================================
// HASHTAG GENERATION
// ============================================================

const HASHTAG_DB: Record<string, string[]> = {
  tech: ['TechTrends','AI','Innovation','Digital','FutureTech'],
  health: ['HealthTips','Wellness','Fitness','SelfCare','HealthyLiving'],
  beauty: ['BeautyTips','Skincare','Makeup','GlowUp','SelfCare'],
  food: ['Foodie','Delicious','Recipe','Yummy','HomeCooking'],
  fashion: ['FashionStyle','OOTD','StreetStyle','Trendy','Wardrobe'],
  travel: ['TravelGram','Wanderlust','Adventure','Explore','VacationMode'],
  business: ['Entrepreneur','BusinessTips','Success','Marketing','Growth'],
  education: ['LearnOnTikTok','Education','Knowledge','StudyTips','GrowthMindset'],
  finance: ['MoneyTips','Finance','Investing','Wealth','Savings'],
  fitness: ['FitnessMotivation','Workout','GymLife','GetFit','Transformation'],
};

function detectTopics(text: string): string[] {
  const lower = text.toLowerCase();
  const topics: string[] = [];
  const topicMap: Record<string, string[]> = {
    tech: ['tech','ai','app','digital','software','computer','code','startup','saas','data','programming'],
    health: ['health','wellness','doctor','medical','healthy','nutrition','vitamin','mental'],
    beauty: ['beauty','skincare','makeup','cosmetic','hair','nail','glow','face'],
    food: ['food','recipe','cook','bake','delicious','tasty','restaurant','cuisine','kitchen','meal','yummy'],
    fashion: ['fashion','style','outfit','wear','trendy','wardrobe','ootd','dress'],
    travel: ['travel','vacation','trip','adventure','explore','wander','beach','hotel','flight'],
    business: ['business','entrepreneur','startup','marketing','sales','revenue','growth','brand','founder','ceo'],
    education: ['learn','study','course','class','education','school','university','training','skill'],
    finance: ['money','finance','invest','saving','budget','wealth','crypto','stock','passive income'],
    fitness: ['fitness','workout','gym','exercise','training','muscle','yoga','cardio','weight loss'],
  };
  for (const [topic, kws] of Object.entries(topicMap)) {
    if (kws.some(kw => lower.includes(kw))) topics.push(topic);
  }
  return topics.length > 0 ? topics : ['general'];
}

function generateHashtags(text: string, count: number = 5): string[] {
  const topics = detectTopics(text);
  const tags: string[] = [];
  const seen = new Set<string>();

  // Extract words that could be hashtags
  const words = text.split(/\\s+/).filter(w => w.length > 3 && !/^[#@]/.test(w));
  const meaningful = words.filter(w => !['this','that','with','from','have','been','were','what','when','your','will','more','some','them','than','about','also','just','very','well','even','over','been','into','after'].includes(w.toLowerCase()));

  // Add topic-based hashtags
  for (const topic of topics) {
    const pool = HASHTAG_DB[topic] || HASHTAG_DB.general;
    for (const tag of pool) {
      if (!seen.has(tag) && tags.length < count) {
        tags.push(tag);
        seen.add(tag);
      }
    }
  }

  // Add content-specific hashtags
  for (const w of meaningful) {
    if (tags.length >= count) break;
    const tag = w.replace(/[^a-zA-Z0-9\u4e00-\u9fff]/g, '');
    if (tag.length >= 3 && !seen.has(tag)) {
      tags.push(tag.charAt(0).toUpperCase() + tag.slice(1));
      seen.add(tag);
    }
  }

  // Add general viral tags if needed
  const viralFallbacks = ['Viral','Trending','FYP','ForYou','MustSee','ContentCreator','SocialMedia','GoViral'];
  for (const tag of viralFallbacks) {
    if (tags.length >= count) break;
    if (!seen.has(tag)) { tags.push(tag); seen.add(tag); }
  }

  return tags.slice(0, count);
}

// ============================================================
// OPTIMIZED COPY GENERATION
// ============================================================

function generateOptimizedCopy(text: string, platform: string): string {
  let copy = text.trim();
  if (!copy) return '';

  // === Analyze the original content ===
  const lines = copy.split('\n');
  const firstLine = lines[0].trim();
  const restLines = lines.slice(1).filter(l => l.trim());
  const lower = copy.toLowerCase();
  const words = lower.split(/\s+/).filter(w => w.length > 2);
  const wordCount = words.length;
  const sentences = copy.split(/[.!?]+/).filter(s => s.trim());
  const hasHook = HOOK_STARTERS.some(s => lower.trimStart().startsWith(s));
  const hasNumber = /\d+\s*(ways|tips|steps|reasons|secrets|hacks|tricks|things|signs|ideas|个|种|招|步|点)/i.test(copy);
  const hasQuestion = copy.includes('?');
  const hasEmoji = /[\u{1F300}-\u{1FAFF}]/u.test(copy);
  const hasUrgency = URGENCY_WORDS.some(u => lower.includes(u));
  const hasCTA = CTA_VERBS.some(v => lower.includes(v));
  const topics = detectTopics(copy);

  const optimizedLines: string[] = [];
  const platformEmoji: Record<string, string> = { tiktok: '🔥', instagram: '✨', facebook: '💡', linkedin: '📊', twitter: '🚀', general: '💡' };
  const pEmoji = platformEmoji[platform] || '💡';

  // === Step 1: Improve the opening hook ===
  let improvedFirst = firstLine;
  if (!hasHook && !hasEmoji) {
    // Prepend a platform-appropriate emoji opener
    const hookPrefixes: Record<string, string[]> = {
      tiktok: ['🔥 The secret to ', '💥 Stop scrolling if ', '😱 I can\'t believe '],
      instagram: ['✨ The ultimate guide to ', '💫 Everything you need to know about ', '👀 PSA: '],
      facebook: ['💡 I just discovered ', '🤔 Think about this: ', '📌 Save this for later: '],
      linkedin: ['📊 The data says: ', '💡 Key insight: ', '📈 Here\'s what I\'ve learned about '],
      twitter: ['🚀 Hot take: ', '💡 Quick thread on ', '🧵 A thought on '],
      general: ['💡 Did you know? ', '🔥 The truth about ', '✨ Everything changes when '],
    };
    const prefixes = hookPrefixes[platform] || hookPrefixes.general;
    // Only add a hook prefix if the first line is short enough
    if (firstLine.length < 80) {
      improvedFirst = prefixes[0] + firstLine[0].toLowerCase() + firstLine.slice(1);
    }
  } else if (!hasEmoji && hasHook) {
    // Already has a hook, just add emoji
    improvedFirst = `${pEmoji} ${firstLine}`;
  }

  // Detect the main topic to write smarter CTAs
  const topicMap: Record<string, { topic: string; ctas: string[]; emojis: string[] }> = {
    tech: { topic: 'tech', ctas: ['Try it out and share your thoughts! 💻', 'Tag a dev who needs this 🛠️', 'What\'s your go-to tool for this? 👇'], emojis: ['💻', '🛠️', '⚡', '📱', '🤖'] },
    health: { topic: 'health', ctas: ['Start your wellness journey today! 🌿', 'Drop a 🫶 if you agree!', 'Your body will thank you 🙏'], emojis: ['🌿', '💪', '🧠', '🫶', '🌱'] },
    beauty: { topic: 'beauty', ctas: ['Tag a friend who needs this glow-up ✨', 'Your skin will thank you! 💕', 'Try this and thank me later 💋'], emojis: ['✨', '💕', '💋', '🌸', '🧴'] },
    food: { topic: 'food', ctas: ['Save this recipe! 📌', 'Tag someone who needs to try this 🍽️', 'Rate this from 1-10 in the comments! ⬇️'], emojis: ['🍽️', '👨‍🍳', '😋', '🥘', '📌'] },
    fashion: { topic: 'fashion', ctas: ['Drop a 🔥 if you\'d wear this!', 'Where would you rock this look? 👇', 'Save for outfit inspo 📌'], emojis: ['👗', '🔥', '👟', '👜', '✨'] },
    travel: { topic: 'travel', ctas: ['Add this to your bucket list! ✈️', 'Where\'s your next adventure? 🌍', 'Share your travel tip below 👇'], emojis: ['🌍', '✈️', '🏝️', '🗺️', '📸'] },
    business: { topic: 'business', ctas: ['What\'s your take on this? 💼', 'Save this for strategy inspo 📌', 'Share with a fellow entrepreneur 🚀'], emojis: ['💼', '📈', '🚀', '💡', '📊'] },
    education: { topic: 'education', ctas: ['Save this for later study 📌', 'Tag a student who needs this 📚', 'What did I miss? Add below 👇'], emojis: ['📚', '🎓', '✏️', '💡', '📖'] },
    fitness: { topic: 'fitness', ctas: ['Try this in your next workout! 💪', 'Tag your gym buddy 🏋️', 'Consistency is key — start today! 🔑'], emojis: ['💪', '🏋️', '🔥', '🎯', '⚡'] },
  };

  // Pick best topic match
  let topicInfo = topicMap.general || { topic: 'general', ctas: ['Share this with someone who needs it! 💬', 'Save for later 📌', 'Drop your thoughts below 👇'], emojis: ['💬', '📌', '✨', '🔥', '💡'] };
  for (const t of topics) {
    if (topicMap[t]) { topicInfo = topicMap[t]; break; }
  }

  // === Step 2: Structure optimization ===
  optimizedLines.push(improvedFirst);

  const bodyLines = restLines.length > 0 ? restLines : sentences.filter(s => s.trim() !== firstLine.trim());

  if (bodyLines.length > 0) {
    // Join body, then break into platform-appropriate lengths
    let body = bodyLines.join(' ');
    // Clean up excessive whitespace
    body = body.replace(/\s+/g, ' ').trim();

    // Platform-specific formatting
    if ((platform === 'tiktok' || platform === 'instagram') && body.length > 60) {
      // Break into short punchy segments for social platforms
      const segments = body.split(/[.!?]+/).filter(s => s.trim());
      if (segments.length >= 2) {
        segments.forEach((seg, i) => {
          const trimmed = seg.trim();
          if (trimmed) {
            // Add a relevant emoji to each segment for visual breaks
            const emojiIdx = Math.min(i, topicInfo.emojis.length - 1);
            optimizedLines.push(`${topicInfo.emojis[emojiIdx]} ${trimmed}`);
          }
        });
      } else {
        optimizedLines.push(body);
      }
    } else if (platform === 'linkedin' && bodyLines.length >= 2) {
      // Keep professional but improve readability with line breaks
      optimizedLines.push('');
      bodyLines.forEach(l => optimizedLines.push(l));
    } else {
      optimizedLines.push(body);
    }
  }

  // === Step 3: Add engagement question if none present ===
  if (!hasQuestion) {
    const questions: Record<string, string[]> = {
      tech: ['What tool would you add to this list? 💻', 'Have you tried this approach? Share below!'],
      health: ['What\'s your #1 health tip? 🫶', 'Have you incorporated this into your routine?'],
      beauty: ['What\'s your holy grail product? 💕', 'Would you try this? Let me know!'],
      food: ['Would you eat this? Rate 1-10! 🍽️', 'What\'s your favorite twist on this recipe?'],
      fashion: ['How would you style this? 👇', 'Would you wear this? 🔥 or ⛔?'],
      travel: ['Where should I go next? 🌍', 'What\'s your dream destination? ✈️'],
      business: ['What\'s your experience with this? 💼', 'Would you add anything to this?'],
      education: ['What\'s the #1 thing you learned? 📚', 'Did this help? Share your thoughts!'],
      fitness: ['What\'s your go-to exercise? 💪', 'How do you stay motivated? 🔥'],
      general: ['What do you think? Drop a comment 👇', 'Agree or disagree? Let me know!', 'Save this for later and share! 📌'],
    };
    const qList = questions[topicInfo.topic] || questions.general;
    if (platform === 'linkedin') {
      optimizedLines.push('');
      optimizedLines.push(qList[0]);
    } else {
      optimizedLines.push('');
      optimizedLines.push(qList[0]);
    }
  }

  // === Step 4: Content-aware CTA ===
  if (!hasCTA) {
    const ctaPick = topicInfo.ctas[Math.floor(Math.random() * topicInfo.ctas.length)];
    optimizedLines.push('');
    optimizedLines.push(ctaPick);
  } else if (!hasUrgency) {
    // Enhance existing CTA with urgency
    const lastIdx = optimizedLines.length - 1;
    const lastLineText = optimizedLines[lastIdx];
    const urgencySuffix: Record<string, string> = {
      tiktok: ' 🔥 Don\'t sleep on this!',
      instagram: ' ✨ Save for later!',
      facebook: ' 👇 Don\'t miss out!',
      linkedin: ' Start today and see the difference.',
      twitter: ' 🔁 RT if you agree!',
      general: ' Don\'t wait — start now!',
    };
    optimizedLines[lastIdx] = lastLineText + (urgencySuffix[platform] || urgencySuffix.general);
  }

  // === Step 5: Hashtag line ===
  const generatedTags = generateHashtags(copy, 4);
  if (generatedTags.length > 0) {
    optimizedLines.push('');
    optimizedLines.push(generatedTags.map(t => '#' + t).join(' '));
  }

  return optimizedLines.join('\n');
}

// ============================================================
// MAIN ANALYSIS FUNCTION
// ============================================================

export function analyzeContent(input: AnalysisInput): AnalysisResult {
  const { text, targetPlatform } = input;

  if (!text.trim()) {
    return {
      overallScore: 0,
      dimensions: [],
      tips: ['Paste your content to get started'],
      hashtags: [],
      optimizedCopy: '',
    };
  }

  // Run all analyses
  const appeal = analyzeAppeal(text);
  const tone = analyzeTone(text, targetPlatform);
  const keywords = analyzeKeywords(text);
  const cta = analyzeCTA(text);

  const dimensions: ScoreDimension[] = [
    { label: 'appeal', score: appeal.score, weight: 0.30, details: appeal.details },
    { label: 'tone', score: tone.score, weight: 0.20, details: tone.details },
    { label: 'keywords', score: keywords.score, weight: 0.25, details: keywords.details },
    { label: 'cta', score: cta.score, weight: 0.25, details: cta.details },
  ];

  // Weighted overall score
  const overallScore = Math.round(
    dimensions.reduce((sum, d) => sum + d.score * d.weight, 0)
  );

  // Collect all tips (low-scoring details)
  const tips: string[] = [];
  dimensions.forEach(d => {
    d.details.forEach(det => {
      if (det.startsWith('💡')) tips.push(det.replace('💡 ', ''));
    });
  });

  // Generate hashtags
  const hashtags = generateHashtags(text, 5);

  // Generate optimized copy
  const optimizedCopy = generateOptimizedCopy(text, targetPlatform);

  return { overallScore, dimensions, tips: tips.slice(0, 6), hashtags, optimizedCopy };
}

export function getScoreLevel(score: number): ScoreLevel {
  if (score < 40) return 'poor';
  if (score < 65) return 'fair';
  if (score < 85) return 'good';
  return 'excellent';
}

export function getPlatforms() {
  return ['tiktok','instagram','facebook','linkedin','twitter','general'];
}

