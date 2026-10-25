const gradeSelect = document.querySelector("#grade-select");
const subjectSelect = document.querySelector("#subject-select");
const sixthGradeMathLevelField = document.querySelector("#sixth-grade-math-level-field");
const sixthGradeMathLevelSelect = document.querySelector("#sixth-grade-math-level");
let renderedSixthGradeMathLevel = sixthGradeMathLevelSelect.value;
const yamaguchiPrepNote = document.querySelector("#yamaguchi-prep-note");
const middleThirdEnglishLevelField = document.querySelector("#middle-third-english-level-field");
const middleThirdEnglishLevelSelect = document.querySelector("#middle-third-english-level");
const unitOptions = document.querySelector("#unit-options");
const unitFieldLegend = document.querySelector("#unit-field-legend");
const unitSelectAllButton = document.querySelector("#unit-select-all");
const questionCountInput = document.querySelector("#question-count");
const subjectGrid = document.querySelector("#subject-grid");
const quizDialog = document.querySelector("#quiz-dialog");
const quizTitle = document.querySelector("#quiz-title");
const quizOptions = document.querySelector("#quiz-options");
const quizCount = document.querySelector("#quiz-count");
const quizSubject = document.querySelector("#quiz-subject");
const quizFeedback = document.querySelector("#quiz-feedback");
const quizNext = document.querySelector("#quiz-next");
const quizProgressFill = document.querySelector("#quiz-progress-fill");
const writtenResponse = document.querySelector("#written-response");

const subjectsByStage = {
  elementary: [
    { id: "math", name: "算数", description: "計算や図形にチャレンジ", icon: "🔢", color: "math" },
    { id: "japanese", name: "国語", description: "ことばと文章を学ぼう", icon: "📖", color: "japanese" },
    { id: "life", name: "生活", description: "身近な人や自然を知ろう", icon: "🌱", color: "science" },
    { id: "science", name: "理科", description: "ふしぎを見つけよう", icon: "🔬", color: "science" },
    { id: "social", name: "社会", description: "くらしや地図を知ろう", icon: "🗺️", color: "social" },
    { id: "english", name: "英語", description: "身近な英語にふれよう", icon: "🔤", color: "english" },
  ],
  middle: [
    { id: "math", name: "数学", description: "考える力をのばそう", icon: "📐", color: "math" },
    { id: "japanese", name: "国語", description: "読解とことばを学ぼう", icon: "📖", color: "japanese" },
    { id: "english", name: "英語", description: "単語と表現を身につけよう", icon: "🔤", color: "english" },
    { id: "science", name: "理科", description: "自然のしくみを学ぼう", icon: "🔬", color: "science" },
    { id: "social", name: "社会", description: "歴史や地理を学ぼう", icon: "🗺️", color: "social" },
  ],
  high: [
    { id: "math", name: "数学", description: "数学の考え方を深めよう", icon: "📐", color: "math" },
    { id: "english", name: "英語", description: "語彙と文法を身につけよう", icon: "🔤", color: "english" },
    { id: "physics", name: "物理", description: "公式の使い方を練習しよう", icon: "⚛️", color: "physics" },
    { id: "japanese", name: "国語", description: "文章の読解にチャレンジ", icon: "📖", color: "japanese" },
    { id: "science", name: "化学", description: "化学の基本を確認しよう", icon: "🧪", color: "science" },
  ],
};

const subjectsByGrade = {
  小1: ["math", "japanese", "life"],
  小2: ["math", "japanese", "life"],
  小3: ["math", "japanese", "science", "social"],
  小4: ["math", "japanese", "science", "social"],
  小5: ["math", "japanese", "science", "social", "english"],
  小6: ["math", "japanese", "science", "social", "english"],
  中1: ["math", "japanese", "english", "science", "social"],
  中2: ["math", "japanese", "english", "science", "social"],
  中3: ["math", "japanese", "english", "science", "social"],
  高1: ["math", "japanese", "english", "physics", "science"],
  高2: ["math", "japanese", "english", "physics", "science"],
  高3: ["math", "japanese", "english", "physics", "science"],
};

const questions = {
  elementary: {
    math: [
      { unit: "わり算", prompt: "36 ÷ 4 はいくつ？", options: ["8", "9", "10", "12"], answer: 1, explanation: "4 × 9 = 36 だから、36 ÷ 4 = 9 だね。" },
      { unit: "長方形と正方形", prompt: "1辺が5cmの正方形のまわりの長さは？", options: ["10cm", "15cm", "20cm", "25cm"], answer: 2, explanation: "正方形は4辺が同じ長さ。5 × 4 = 20cmだよ。" },
      { unit: "小数のたし算", prompt: "0.7 + 0.8 はいくつ？", options: ["1.3", "1.4", "1.5", "1.6"], answer: 2, explanation: "小数点の位置をそろえて計算すると、0.7 + 0.8 = 1.5。" },
      { unit: "小数のかけ算", prompt: "1.2 × 3 はいくつ？", options: ["0.36", "3.6", "4.2", "36"], answer: 1, explanation: "12 × 3 = 36をもとにすると、小数点を1けたもどして3.6だよ。" },
    ],
    japanese: [
      { unit: "反対の意味の言葉", prompt: "「美しい」の反対の意味に近い言葉はどれ？", options: ["きれい", "うつくしい", "みにくい", "あざやか"], answer: 2, explanation: "「みにくい」は「美しい」と反対の意味を表す言葉だよ。" },
      { unit: "主語と述語", prompt: "「鳥が空を飛ぶ。」の主語はどれ？", options: ["鳥が", "空を", "飛ぶ", "空"], answer: 0, explanation: "「だれが・何が」にあたる「鳥が」が主語だね。" },
      { unit: "ていねいな言い方", prompt: "「走る」をていねいな言い方にすると？", options: ["走った", "走ります", "走ろう", "走れば"], answer: 1, explanation: "「走ります」は「走る」をていねいにした言い方だよ。" },
    ],
    science: [
      { unit: "植物のはたらき", prompt: "植物が日光を受けて、葉で養分をつくるはたらきは？", options: ["呼吸", "発芽", "光合成", "蒸発"], answer: 2, explanation: "植物は日光を使って、葉で養分をつくる。これを光合成というよ。" },
      { unit: "水のすがた", prompt: "水がこおり始める温度は何度？", options: ["0℃", "10℃", "50℃", "100℃"], answer: 0, explanation: "水はふつう、0℃でこおり始めるよ。" },
      { unit: "磁石のせいしつ", prompt: "磁石に引きつけられるものはどれ？", options: ["木のつくえ", "鉄のくぎ", "紙のノート", "ガラスのコップ"], answer: 1, explanation: "鉄は磁石に引きつけられる金属だよ。" },
    ],
    social: [
      { unit: "都道府県", prompt: "日本の都道府県の数はいくつ？", options: ["43", "45", "47", "50"], answer: 2, explanation: "日本には1都1道2府43県、合わせて47の都道府県があるよ。" },
      { unit: "地図の見方", prompt: "地図で、ふつう上の方が表す方角は？", options: ["東", "西", "南", "北"], answer: 3, explanation: "地図は上が北、下が南を表すことが多いよ。" },
      { unit: "日本の地形", prompt: "日本でいちばん高い山はどれ？", options: ["北岳", "富士山", "奥穂高岳", "槍ヶ岳"], answer: 1, explanation: "富士山は標高3,776mで、日本でいちばん高い山だよ。" },
    ],
    life: [
      { unit: "安全な登下校", prompt: "通学路を歩くとき、安全のために気をつけることは？", options: ["左右をたしかめて歩く", "車道の真ん中を歩く", "信号を見ない", "走って道路をわたる"], answer: 0, explanation: "道路をわたるときは左右をたしかめ、安全を確認しよう。" },
      { unit: "植物のせわ", prompt: "植物を育てるとき、土がかわいていたら何をする？", options: ["水をあげる", "土をける", "葉をとる", "箱にしまう"], answer: 0, explanation: "植物が育つように、土の様子を見て水をあげよう。" },
      { unit: "学校の道具", prompt: "学校で使った道具を次の人も使えるようにするには？", options: ["もとの場所に片づける", "床に置く", "持ち帰る", "かくす"], answer: 0, explanation: "道具をもとの場所に片づけると、みんなが使いやすいね。" },
    ],
    english: [
      { unit: "身近なものの英語", prompt: "「りんご」を表す英語はどれ？", options: ["apple", "book", "dog", "blue"], answer: 0, explanation: "appleは「りんご」という意味だよ。" },
      { unit: "あいさつ", prompt: "「こんにちは」とあいさつするときに使う英語は？", options: ["Hello.", "Good night.", "Thank you.", "Goodbye."], answer: 0, explanation: "Helloは、出会ったときのあいさつだよ。" },
      { unit: "be動詞", prompt: "「私はユキです」を表す英文は？", options: ["I am Yuki.", "I is Yuki.", "You am Yuki.", "I are Yuki."], answer: 0, explanation: "主語がIのときはbe動詞amを使うよ。" },
    ],
  },
  middle: {
    math: [
      { unit: "方程式", prompt: "方程式 3x + 5 = 20 の x はいくつ？", options: ["3", "5", "8", "15"], answer: 1, explanation: "両辺から5を引いて3x=15。両辺を3で割るとx=5だよ。" },
      { unit: "円の面積", prompt: "半径3cmの円の面積は？（円周率はπ）", options: ["3π cm²", "6π cm²", "9π cm²", "12π cm²"], answer: 2, explanation: "円の面積は半径×半径×π。3×3×π=9π cm²だよ。" },
      { unit: "確率", prompt: "サイコロを1回振るとき、偶数が出る確率は？", options: ["1/6", "1/3", "1/2", "2/3"], answer: 2, explanation: "偶数は2・4・6の3つ。全部で6通りだから3/6=1/2だよ。" },
    ],
    japanese: [
      { unit: "接続語", prompt: "「しかし」は、文と文をどのようにつなぐ接続語？", options: ["理由", "逆接", "例示", "追加"], answer: 1, explanation: "「しかし」は、前の内容と反対の内容をつなぐ逆接の接続語だよ。" },
      { unit: "古典の読み", prompt: "「古典」の読み方はどれ？", options: ["こてん", "ふるてん", "こでん", "ふるのり"], answer: 0, explanation: "「古典」は「こてん」と読むよ。" },
      { unit: "比喩表現", prompt: "「彼はまるで太陽のように明るい」は何の表現？", options: ["擬人法", "比喩（直喩）", "倒置法", "反復法"], answer: 1, explanation: "「まるで〜のように」とたとえているので、直喩だね。" },
    ],
    english: [
      { unit: "一般動詞", prompt: "「私は毎日テニスをします」を表す英文は？", options: ["I play tennis every day.", "I plays tennis every day.", "I am play tennis every day.", "I playing tennis every day."], answer: 0, explanation: "主語がIの現在形では動詞はplay。every dayは「毎日」だよ。" },
      { unit: "場所を表す単語", prompt: "「図書館」を意味する英単語はどれ？", options: ["museum", "library", "station", "kitchen"], answer: 1, explanation: "libraryは「図書館」という意味だよ。" },
      { unit: "現在進行形", prompt: "They (　) watching a movie now. に入る語は？", options: ["is", "am", "are", "be"], answer: 2, explanation: "主語がTheyなので、be動詞はare。現在進行形はare watchingだよ。" },
    ],
    science: [
      { unit: "電流", prompt: "電流の単位はどれ？", options: ["ボルト（V）", "アンペア（A）", "オーム（Ω）", "ワット（W）"], answer: 1, explanation: "電流の単位はアンペア（A）。電圧はボルト、抵抗はオームだよ。" },
      { unit: "水溶液の性質", prompt: "酸性の水溶液に青色リトマス紙をつけると？", options: ["赤色になる", "青色のまま", "白色になる", "緑色になる"], answer: 0, explanation: "酸性の水溶液に青色リトマス紙をつけると赤色に変わるよ。" },
      { unit: "地球と太陽", prompt: "地球が太陽のまわりを1周するのにかかる時間は？", options: ["約1日", "約1か月", "約1年", "約10年"], answer: 2, explanation: "地球は約1年かけて太陽のまわりを1周するよ。" },
    ],
    social: [
      { unit: "日本国憲法", prompt: "日本国憲法が施行された年は？", options: ["1889年", "1945年", "1947年", "1952年"], answer: 2, explanation: "日本国憲法は1946年に公布され、1947年5月3日に施行されたよ。" },
      { unit: "世界の気候", prompt: "赤道に近い地域に広がる気候帯は？", options: ["寒帯", "温帯", "乾燥帯", "熱帯"], answer: 3, explanation: "赤道付近は一年を通して気温が高く、熱帯に分類されるよ。" },
      { unit: "日本の政治", prompt: "日本の国会をつくる2つの議院は？", options: ["上院と下院", "衆議院と参議院", "国民院と政府院", "県議会と市議会"], answer: 1, explanation: "日本の国会は、衆議院と参議院の二院制だよ。" },
    ],
  },
  high: {
    math: [
      { unit: "微分", prompt: "関数 y = 2x² を x で微分すると？", options: ["2x", "4x", "x²", "4x²"], answer: 1, explanation: "べき乗の微分より、(2x²)' = 2 × 2x = 4xだよ。" },
      { unit: "対数", prompt: "log₂ 8 の値は？", options: ["2", "3", "4", "8"], answer: 1, explanation: "2³=8なので、log₂ 8=3だよ。" },
      { unit: "等差数列", prompt: "初項2、公差3の等差数列の第5項は？", options: ["11", "12", "14", "17"], answer: 2, explanation: "第5項は2 + (5−1)×3 = 14だよ。" },
    ],
    english: [
      { unit: "現在完了", prompt: "空欄に入る語は？ I have lived here (　) 2020.", options: ["for", "since", "during", "by"], answer: 1, explanation: "sinceは「〜以来」。2020のような始まった時点と使うよ。" },
      { unit: "環境に関する語彙", prompt: "「環境」を意味する英単語はどれ？", options: ["environment", "government", "development", "movement"], answer: 0, explanation: "environmentは「環境」という意味だよ。" },
      { unit: "受け身", prompt: "The book (　) by many students. に入る語は？", options: ["read", "reads", "is read", "is reading"], answer: 2, explanation: "「本が読まれる」という受け身の文なので、is readが入るよ。" },
    ],
    physics: [
      { unit: "運動方程式", prompt: "質量2kgの物体に、加速度3m/s²を生じさせる力は？", options: ["1.5N", "5N", "6N", "9N"], answer: 2, explanation: "運動方程式 F=ma より、2×3=6Nだよ。" },
      { unit: "オームの法則", prompt: "電圧12V、抵抗4Ωの回路に流れる電流は？", options: ["0.3A", "3A", "8A", "48A"], answer: 1, explanation: "オームの法則 I=V/R より、12÷4=3Aだよ。" },
      { unit: "波の性質", prompt: "波の速さを表す式はどれ？（振動数f、波長λ）", options: ["v = fλ", "v = f/λ", "v = λ/f", "v = f + λ"], answer: 0, explanation: "波の速さは、振動数×波長で v=fλ と表せるよ。" },
    ],
    japanese: [
      { unit: "語彙と意味", prompt: "「杞憂」の意味として正しいものは？", options: ["思いがけない幸運", "必要のない心配", "強い決意", "昔の思い出"], answer: 1, explanation: "杞憂は、心配する必要のないことをあれこれ心配することだよ。" },
      { unit: "比喩表現", prompt: "「山のように積まれた本」は何の表現？", options: ["直喩", "隠喩", "擬人法", "倒置法"], answer: 0, explanation: "「山のように」と「ように」を使ってたとえる直喩だよ。" },
      { unit: "文章の要旨", prompt: "文章の中で、筆者の主張を支える具体例の役割は？", options: ["主張を分かりやすくする", "題名を説明する", "段落数を増やす", "結論を隠す"], answer: 0, explanation: "具体例は、主張の内容を読者に分かりやすく伝える助けになるよ。" },
    ],
    science: [
      { unit: "水の化学式", prompt: "水の化学式はどれ？", options: ["CO₂", "O₂", "H₂O", "NaCl"], answer: 2, explanation: "水は水素原子2つと酸素原子1つからできていて、化学式はH₂Oだよ。" },
      { unit: "原子のつくり", prompt: "原子核を構成する粒子の組み合わせは？", options: ["陽子と中性子", "陽子と電子", "電子と中性子", "電子だけ"], answer: 0, explanation: "原子核は、正の電荷をもつ陽子と電荷をもたない中性子からできているよ。" },
      { unit: "中和", prompt: "酸と塩基が反応して水と塩ができる反応は？", options: ["酸化", "中和", "分解", "重合"], answer: 1, explanation: "酸と塩基が反応して互いの性質を打ち消し、水と塩を生じる反応を中和というよ。" },
    ],
  },
};

const gradeQuestion = (unit, prompt, options, answer, explanation) => ({
  unit, prompt, options, answer, explanation,
});

const gradeQuestions = {
  小1: {
    math: gradeQuestion("10までのかず", "どんぐりが7こあります。3こもらうと、ぜんぶで何こ？", ["9こ", "10こ", "11こ", "12こ"], 1, "7に3をたすと10だよ。"),
    japanese: gradeQuestion("ひらがな", "「ねこ」の最初の文字はどれ？", ["ぬ", "ね", "の", "れ"], 1, "「ねこ」は「ね」から始まることばだよ。"),
    life: gradeQuestion("学校のくらし", "学校で本を借りたり読んだりする場所は？", ["理科室", "図書室", "校庭", "保健室"], 1, "本を読む場所は図書室だね。"),
  },
  小2: {
    math: gradeQuestion("かけ算", "おさらが4まいあり、りんごがそれぞれ3こずつあります。りんごは何こ？", ["7こ", "12こ", "14こ", "43こ"], 1, "3こずつ4つ分なので、3×4=12こだよ。"),
    japanese: gradeQuestion("主語と述語", "「犬が公園を走る。」の述語はどれ？", ["犬が", "公園を", "走る", "公園"], 2, "「どうする」にあたる「走る」が述語だよ。"),
    life: gradeQuestion("生きもののようす", "チューリップの花がさく季節は？", ["春", "夏", "秋", "冬"], 0, "チューリップは春に花がさくよ。"),
  },
  小3: {
    math: gradeQuestion("わり算", "24このあめを6人で同じ数ずつ分けると、1人分は？", ["3こ", "4こ", "5こ", "6こ"], 1, "24÷6=4で、1人分は4こだよ。"),
    japanese: gradeQuestion("段落", "文章を内容のまとまりごとに分けたものを何という？", ["段落", "句点", "主語", "題名"], 0, "文章のまとまりを段落というよ。"),
    science: gradeQuestion("植物の育ち", "ホウセンカの種が発芽するために必要なものは？", ["水", "砂糖", "日光だけ", "肥料だけ"], 0, "種は発芽するときに水が必要だよ。"),
    social: gradeQuestion("地図記号", "地図で、寺を表す記号はどれ？", ["卍", "〒", "♨", "◎"], 0, "地図では「卍」が寺を表す記号だよ。"),
  },
  小4: {
    math: gradeQuestion("小数のわり算", "3.6÷4はいくつ？", ["0.09", "0.9", "9", "14.4"], 1, "36÷4=9をもとにすると、3.6÷4=0.9だよ。"),
    japanese: gradeQuestion("漢字の組み立て", "「休」は「人」と何を組み合わせた漢字？", ["木", "日", "口", "山"], 0, "「休」は人が木のそばで休む様子からできた漢字だよ。"),
    science: gradeQuestion("電気のはたらき", "乾電池2個を直列につなぐと、1個のときより豆電球はどうなる？", ["明るくなる", "暗くなる", "必ず消える", "変わらない"], 0, "直列につなぐと回路に加わる電圧が大きくなり、明るくなるよ。"),
    social: gradeQuestion("都道府県", "日本でいちばん北にある都道府県は？", ["青森県", "北海道", "岩手県", "秋田県"], 1, "日本の最北にある都道府県は北海道だよ。"),
  },
  小5: {
    math: gradeQuestion("異分母の分数", "1/2 + 1/3 はいくつ？", ["2/5", "5/6", "1/6", "1"], 1, "分母を6にそろえると3/6+2/6=5/6だよ。"),
    japanese: gradeQuestion("敬語", "「先生が言う」を敬語で表すと？", ["先生がおっしゃる", "先生が申す", "先生がうかがう", "先生がいただく"], 0, "相手を敬う言い方は「おっしゃる」だよ。"),
    science: gradeQuestion("植物の発芽と成長", "植物が発芽したあと、よく成長するために必要なものは？", ["水・空気・適した温度", "砂糖・塩", "暗さだけ", "土だけ"], 0, "発芽には水・空気・適した温度が必要だよ。"),
    social: gradeQuestion("日本の農業", "日本で、あたたかい地域を中心にさかんな米づくりは？", ["稲作", "酪農", "養蚕", "林業"], 0, "米を育てる農業を稲作というよ。"),
    english: gradeQuestion("身近な英語", "「私はサッカーが好きです」に合う英文は？", ["I like soccer.", "I likes soccer.", "I am soccer.", "I liking soccer."], 0, "主語がIのときは動詞の原形likeを使うよ。"),
  },
  小6: {
    math: gradeQuestion("分数のかけ算", "2/3 × 3/4 はいくつ？", ["1/2", "5/7", "6/7", "1"], 0, "分子どうし、分母どうしをかけると6/12=1/2だよ。"),
    japanese: gradeQuestion("漢字の成り立ち", "「森林」の「森」は、何という成り立ちの漢字？", ["象形文字", "会意文字", "形声文字", "仮名"], 1, "「木」を三つ組み合わせて意味を表す会意文字だよ。"),
    science: gradeQuestion("水よう液の性質", "青色リトマス紙を赤色に変える水よう液は？", ["酸性", "中性", "アルカリ性", "純水"], 0, "酸性の水よう液は青色リトマス紙を赤色に変えるよ。"),
    social: gradeQuestion("日本の歴史", "聖徳太子が定めたとされる、役人の心構えを示したものは？", ["十七条の憲法", "大宝律令", "武家諸法度", "五箇条の御誓文"], 0, "聖徳太子は十七条の憲法を定めたとされているよ。"),
    english: gradeQuestion("過去のこと", "「私は昨日、図書館へ行きました」に合う英文は？", ["I go to the library yesterday.", "I went to the library yesterday.", "I am going yesterday.", "I goes yesterday."], 1, "yesterdayがあるので、goの過去形wentを使うよ。"),
  },
  中1: {
    math: gradeQuestion("正負の数", "−3 + 8 はいくつ？", ["−11", "−5", "5", "11"], 2, "−3から正の向きに8進むと5だよ。"),
    japanese: gradeQuestion("文の成分", "「妹が本を読む。」の主語はどれ？", ["妹が", "本を", "読む", "本"], 0, "「だれが」にあたる「妹が」が主語だよ。"),
    english: gradeQuestion("一般動詞", "空欄に入る語は？ I (　) music every day.", ["likes", "like", "am like", "liking"], 1, "主語がIの現在形では動詞の原形likeを使うよ。"),
    science: gradeQuestion("植物の分類", "種子をつくらず、胞子でふえる植物は？", ["アブラナ", "ゼニゴケ", "マツ", "エンドウ"], 1, "ゼニゴケは胞子でふえるコケ植物だよ。"),
    social: gradeQuestion("世界の地域構成", "赤道が通る大陸はどれ？", ["南アメリカ大陸", "ヨーロッパ大陸", "南極大陸", "オーストラリア大陸"], 0, "赤道は南アメリカ大陸を通っているよ。"),
  },
  中2: {
    math: gradeQuestion("連立方程式", "x+y=7、x−y=1 のとき、xはいくつ？", ["3", "4", "6", "7"], 1, "2つの式を足すと2x=8なので、x=4だよ。"),
    japanese: gradeQuestion("用言の活用", "「走った」のもとの形（終止形）はどれ？", ["走る", "走り", "走れ", "走ろう"], 0, "「走った」のもとの形は「走る」だよ。"),
    english: gradeQuestion("不定詞", "「私は本を読むために図書館へ行った」に合う表現は？", ["to read a book", "read a book", "reading a book", "reads a book"], 0, "目的「〜するために」は to + 動詞の原形で表せるよ。"),
    science: gradeQuestion("化学変化", "鉄と硫黄を加熱してできる物質は？", ["硫化鉄", "酸化鉄", "水", "塩化鉄"], 0, "鉄と硫黄が化合して硫化鉄ができるよ。"),
    social: gradeQuestion("日本の気候", "冬に日本海側で雪が多くなる主な理由は？", ["季節風が日本海で水蒸気を含むため", "赤道に近いため", "海流がないため", "台風が毎日来るため"], 0, "冬の季節風が日本海で水蒸気を含み、山地に雪を降らせるよ。"),
  },
  中3: {
    math: gradeQuestion("平方根", "√49 の値は？", ["−7", "7", "14", "49"], 1, "2乗すると49になる正の数は7だよ。"),
    japanese: gradeQuestion("慣用句", "「頭を抱える」の意味はどれ？", ["悩む", "喜ぶ", "眠る", "急ぐ"], 0, "「頭を抱える」は、困って悩むことを表すよ。"),
    english: gradeQuestion("現在完了", "空欄に入る語は？ I have (　) this book for two years.", ["have", "had", "has", "having"], 1, "have + 過去分詞で継続を表し、haveの過去分詞はhadだよ。"),
    science: gradeQuestion("遺伝", "親の形質が子に伝わることを何という？", ["遺伝", "蒸留", "分解", "発酵"], 0, "親から子へ形質が伝わることを遺伝というよ。"),
    social: gradeQuestion("公民・基本的人権", "日本国憲法で、すべての人に保障される権利を何という？", ["基本的人権", "参政権だけ", "納税の義務", "裁判員制度"], 0, "日本国憲法は基本的人権を保障しているよ。"),
  },
  高1: {
    math: gradeQuestion("数学I・二次関数", "y=x²−4x+3 の軸は？", ["x=−2", "x=−1", "x=2", "x=4"], 2, "平方完成すると y=(x−2)²−1。軸はx=2だよ。"),
    japanese: gradeQuestion("現代文・論理展開", "筆者の主張を見つけるとき、まず注目するものは？", ["結論を示す表現", "段落の文字数", "漢字の画数", "句読点の数"], 0, "「つまり」「したがって」など結論を示す表現が手がかりになるよ。"),
    english: gradeQuestion("英語コミュニケーションI・時制", "空欄に入る語は？ She (　) to school every day.", ["go", "goes", "going", "gone"], 1, "三人称単数の主語Sheには、現在形の動詞にsをつけるよ。"),
    physics: gradeQuestion("物理基礎・速度", "100mを20秒で進んだときの平均の速さは？", ["2m/s", "5m/s", "20m/s", "2000m/s"], 1, "平均の速さは距離÷時間。100÷20=5m/sだよ。"),
    science: gradeQuestion("化学基礎・物質量", "水H₂O 1分子に含まれる水素原子は何個？", ["1個", "2個", "3個", "4個"], 1, "化学式H₂Oの下付きの2は水素原子が2個という意味だよ。"),
  },
  高2: {
    math: gradeQuestion("数学II・微分", "f(x)=x²+3x の導関数は？", ["x+3", "2x+3", "2x", "x²+3"], 1, "x²を微分すると2x、3xを微分すると3だよ。"),
    japanese: gradeQuestion("古典・助動詞", "古文の助動詞「む」が表す意味として代表的なものは？", ["推量・意志", "完了だけ", "打消だけ", "受身だけ"], 0, "「む」は文脈により推量や意志などを表すよ。"),
    english: gradeQuestion("英語・関係代名詞", "空欄に入る語は？ The book (　) I bought is interesting.", ["who", "which", "where", "when"], 1, "先行詞が物なので、関係代名詞whichを使えるよ。"),
    physics: gradeQuestion("物理・運動方程式", "質量3kgの物体に2m/s²の加速度を与える力は？", ["1.5N", "5N", "6N", "9N"], 2, "F=maより、3×2=6Nだよ。"),
    science: gradeQuestion("化学・酸と塩基", "水溶液中で水素イオンを生じる物質は？", ["酸", "塩基", "金属", "中性物質"], 0, "酸は水溶液中で水素イオンを生じる物質だよ。"),
  },
  高3: {
    math: gradeQuestion("数学III・積分", "∫₀¹ 2x dx の値は？", ["0", "1", "2", "4"], 1, "[x²]₀¹=1−0=1だよ。"),
    japanese: gradeQuestion("現代文・要旨", "文章の要旨をまとめるときに大切なことは？", ["中心となる主張と理由を押さえる", "例だけを並べる", "本文をそのまま全部写す", "題名だけを書く"], 0, "要旨では、中心となる主張とそれを支える理由を整理するよ。"),
    english: gradeQuestion("英語・仮定法", "空欄に入る語は？ If I (　) rich, I would travel the world.", ["am", "were", "will be", "have been"], 1, "現在の事実に反する仮定では、be動詞にwereを使う形が基本だよ。"),
    physics: gradeQuestion("物理・エネルギー保存", "摩擦や空気抵抗を無視するとき、力学的エネルギーはどうなる？", ["保存される", "必ず0になる", "常に増える", "熱だけになる"], 0, "保存力だけがはたらくとき、力学的エネルギーは保存されるよ。"),
    science: gradeQuestion("化学・酸化還元", "電子を失う変化を何という？", ["酸化", "還元", "中和", "電離"], 0, "電子を失う変化を酸化、受け取る変化を還元というよ。"),
  },
};

const middleThirdEnglishBanks = {
  standard: [
    gradeQuestion("現在形・過去形", "My brother (　) soccer after school every day.", ["play", "plays", "played", "playing"], 1, "主語が三人称単数で、every dayがある現在の習慣なのでplaysを使うよ。"),
    gradeQuestion("現在形・過去形", "We (　) our grandparents last Sunday.", ["visit", "visits", "visited", "visiting"], 2, "last Sundayは過去を表すので、visitの過去形visitedを使うよ。"),
    gradeQuestion("進行形・未来表現", "Look! The children (　) a snowman in the park.", ["make", "makes", "are making", "made"], 2, "Look!から今していることを表す現在進行形are makingが適切だよ。"),
    gradeQuestion("助動詞", "You (　) wear a helmet when you ride this bike. It is a rule.", ["must", "may", "would", "could"], 0, "規則として「〜しなければならない」を表すmustが適切だよ。"),
    gradeQuestion("不定詞・動名詞", "Riku went to the library (　) a book about space.", ["borrow", "borrowing", "to borrow", "borrowed"], 2, "図書館へ行った目的を表すto不定詞to borrowを使うよ。"),
    gradeQuestion("比較", "This is (　) picture of the three.", ["beautiful", "more beautiful", "the most beautiful", "most beautifully"], 2, "三つの中で最も美しいという最上級なのでthe most beautifulだよ。"),
    gradeQuestion("受け身・分詞", "These cookies (　) by my mother yesterday.", ["made", "were made", "are making", "make"], 1, "クッキーは「作られた」ので受け身。yesterdayに合わせwere madeだよ。"),
    gradeQuestion("関係代名詞", "The boy (　) is talking with Ms. Sato is my cousin.", ["which", "where", "who", "when"], 2, "先行詞が人で、後ろで主語の働きをする関係代名詞whoを使うよ。"),
    gradeQuestion("現在完了", "I have known Emi (　) we were in elementary school.", ["for", "since", "during", "at"], 1, "we were in elementary schoolは始まった時点なのでsinceを使うよ。"),
    gradeQuestion("接続詞・節", "I stayed home (　) it was raining heavily.", ["but", "because", "or", "if"], 1, "雨が激しかったことが家にいた理由なのでbecauseが適切だよ。"),
    gradeQuestion("文型・間接疑問文", "Do you know (　) the post office is?", ["where", "where is", "what", "what is"], 0, "間接疑問文は疑問詞の後ろを主語＋動詞の語順にするのでwhere the post office isだよ。"),
    gradeQuestion("語彙・表現", "A: I have a headache. B: You should (　) some rest.", ["take", "make", "do", "give"], 0, "take a restで「ひと休みする」という表現だよ。"),
    gradeQuestion("語彙・表現", "The train leaves at 8:15. We should get to the (　) before then.", ["station", "kitchen", "library", "hospital"], 0, "電車に乗るため、出発時刻までにstation（駅）へ行く必要があるよ。"),
    gradeQuestion("読解・情報検索", "次の案内を読んで答えなさい。\\nThe town library is open from 9:00 a.m. to 6:00 p.m. on weekdays. On Saturday, it closes at 4:00 p.m. It is closed every Sunday.\\n土曜日の閉館時刻は？", ["9:00 a.m.", "4:00 p.m.", "6:00 p.m.", "Sunday"], 1, "案内にOn Saturday, it closes at 4:00 p.m.とあるよ。"),
    gradeQuestion("読解・要旨", "次の英文を読んで答えなさい。\\nMaki wanted to get to school earlier. She prepared her bag at night and checked the bus time before going to bed. In the morning, she did not have to look for her books. She arrived at school ten minutes earlier than before.\\nMakiが早く登校できるようになった理由は？", ["She moved to a new town.", "She prepared for the morning the night before.", "She took a different class.", "She stopped riding the bus."], 1, "前の晩にかばんとバスの時刻を準備したことが、朝の時間短縮につながったよ。"),
  ],
  application: [
    gradeQuestion("時制・文脈", "次の会話の空欄に入る語を選びなさい。\\nA: Why are you carrying an umbrella?\\nB: The weather report says it (　) rain this afternoon.", ["will", "was", "has", "does"], 0, "天気予報が午後のことを伝えているので、未来を表すwillが適切だよ。"),
    gradeQuestion("現在完了", "Mina started learning French three years ago and still studies it. Which sentence is correct?", ["Mina studied French for three years.", "Mina has studied French for three years.", "Mina is studying French since three years.", "Mina studies French three years ago."], 1, "3年前に始まり今も続いているので、現在完了形has studiedを使うよ。"),
    gradeQuestion("不定詞・動名詞", "次の文の意味に合う語を選びなさい。\\nTaro enjoys (　) photos of birds, so he goes to the park every weekend.", ["take", "to take", "taking", "took"], 2, "enjoyの後ろには動名詞を置くのでtakingが正しいよ。"),
    gradeQuestion("比較", "Three students ran the race. Yumi was faster than Ken, and Ken was faster than Aya. Who was the fastest?", ["Aya", "Ken", "Yumi", "We cannot tell."], 2, "YumiはKenより速く、KenはAyaより速いので、最も速いのはYumiだよ。"),
    gradeQuestion("受け身・分詞", "The signs (　) near the entrance are written in three languages.", ["put", "putting", "were put", "are putting"], 0, "signsを後ろから説明する過去分詞put（置かれた）が適切だよ。"),
    gradeQuestion("関係代名詞", "次の二文を一文にしたものを選びなさい。\\nI have a friend. She can speak Korean.", ["I have a friend which can speak Korean.", "I have a friend who can speak Korean.", "I have a friend where can speak Korean.", "I have a friend when can speak Korean."], 1, "人を先行詞として主語の働きをする関係代名詞whoでつなぐよ。"),
    gradeQuestion("仮定法", "「もし私が鳥なら、あなたと一緒に空を飛ぶのに」に合う英文は？", ["If I am a bird, I will fly with you.", "If I were a bird, I would fly with you.", "If I was a bird, I fly with you.", "If I will be a bird, I would fly with you."], 1, "現在の事実に反する仮定はIf＋過去形, would＋動詞の原形で表すよ。"),
    gradeQuestion("接続詞・節", "A: I think this plan will work. B: (　), we need more time to prepare.", ["For example", "However", "Because", "First"], 1, "前の賛成意見に対して別の問題点を述べるのでHoweverが適切だよ。"),
    gradeQuestion("語彙・場面", "A: Excuse me. How can I get to the city museum? B: (　) at the next corner, and you will see it on your left.", ["Turn left", "Take off", "Put away", "Look after"], 0, "道案内で「次の角を左に曲がって」はTurn leftだよ。"),
    gradeQuestion("会話・意図", "A: I have too many things to carry. B: (　) A: Yes, please. Thank you.", ["Would you like me to help you?", "Why did you buy them?", "How long have you had them?", "Can you carry me?"], 0, "荷物が多い相手への申し出に、Would you like me to help you?が自然だよ。"),
    gradeQuestion("読解・理由", "次の英文を読んで答えなさい。\\nA school gardening club planted flowers near the entrance. At first, the students watered them every morning. After a week of rain, some leaves turned yellow. Their teacher asked them to check the soil before watering. The leaves improved when the students watered the plants only when the soil was dry.\\n教師の助言の後、葉の状態がよくなった理由は？", ["The students moved all the flowers indoors.", "They checked the soil and avoided watering it when it was already wet.", "They stopped observing the plants.", "The teacher replaced the flowers with new ones."], 1, "土がぬれているときに水をやりすぎないよう、状態を見て水やりを調整したからだよ。"),
    gradeQuestion("読解・会話", "次の会話を読んで答えなさい。\\nA: We can make a poster or give a short presentation about saving water.\\nB: Some people may not stop to read a poster.\\nC: A presentation lets us explain our ideas, but we need something people can take home.\\nA: Let's give a short talk and hand out a small checklist.\\nB: Good idea. People can listen first and use the checklist later.\\n二人が選んだ方法は？", ["A poster only.", "A talk with a checklist to take home.", "A long video without any explanation.", "Canceling the activity."], 1, "発表で説明し、後から使えるチェックリストを渡す方法を選んだよ。"),
    gradeQuestion("語彙・文脈", "次の英文の空欄に入る語を選びなさい。\\nThe outdoor concert was canceled because of the storm. The organizers will (　) the ticket money to everyone.", ["return", "borrow", "spend", "hide"], 0, "公演中止後にチケット代を返す文脈なのでreturnが適切だよ。"),
    gradeQuestion("読解・情報照合", "次の案内を読んで答えなさい。\\nThe science museum opens at 10:00. The planetarium show starts at 11:30 and lasts 40 minutes. Visitors must get a numbered ticket at the entrance before the show.\\n10時に入館した人が、上映を見るために先にしなければならないことは？", ["Buy lunch in the museum.", "Get a numbered ticket at the entrance.", "Leave the museum at 11:30.", "Wait until the show ends."], 1, "上映前に入口で整理券を受け取る必要があると書かれているよ。"),
  ],
  entrance: [
    gradeQuestion("受験文法・時制", "文脈に合うよう、空欄に入る語を選びなさい。\\nWhen I arrived at the gym, the other students (　) for the tournament. They had started before I came.", ["prepare", "were preparing", "have prepared", "will prepare"], 1, "到着した時点で準備中だった過去の動作なのでwere preparingが適切だよ。"),
    gradeQuestion("受験文法・現在完了", "次の会話の空欄に入る語を選びなさい。\\nA: Have you ever visited Nara?\\nB: Yes. I (　) there twice, and I want to go again.", ["went", "have been", "was going", "will be"], 1, "経験を表す現在完了形have beenが会話に合うよ。"),
    gradeQuestion("受験文法・接続詞", "文の流れに合う接続詞を選びなさい。\\nThe first plan was inexpensive, (　) it did not meet the needs of older visitors. The group chose a more accessible plan.", ["so", "but", "because", "or"], 1, "安価である一方で課題があったという逆接なのでbutが適切だよ。"),
    gradeQuestion("受験文法・関係代名詞", "次の英文の意味に合う語を選びなさい。\\nThe book (　) our teacher recommended helped me understand the problem.", ["who", "where", "which", "when"], 2, "先行詞が物のThe bookなので、目的格のwhichが適切だよ。"),
    gradeQuestion("受験文法・仮定法", "空欄に入る語の組み合わせを選びなさい。\\nIf our town (　) a larger library, more students (　) there after school.", ["has / study", "had / would study", "will have / studied", "having / would studied"], 1, "現在の事実に反する仮定なのでIf＋過去形, would＋動詞の原形を使うよ。"),
    gradeQuestion("受験語彙・表現", "次の会話で、相手の提案を受け入れる返答として最も自然なものは？\\nA: Why don't we ask local people before making the map?\\nB: (　)", ["That sounds like a good idea.", "I have never made a map yesterday.", "The map is under the table.", "No, I didn't ask you."], 0, "提案に賛成する自然な返答はThat sounds like a good idea.だよ。"),
    gradeQuestion("受験読解・複数情報", "次の英文を読んで答えなさい。\\nA student group wanted to make the route to school safer. They asked students to mark places where they felt unsafe. Many marks were near a crossing hidden by parked cars. The group also watched the crossing for three mornings and saw that drivers often stopped after reaching the line. They proposed moving the parking space away from the corner and repainting the crossing lines.\\n提案の根拠として英文に示されている情報の組み合わせは？", ["Students' reports and the group's observations of drivers.", "A map from another town and a weather report.", "The number of buses and the cost of school lunches.", "Teachers' opinions only."], 0, "生徒の危険箇所の報告と、グループが実際に見た車の停止位置が根拠だよ。"),
    gradeQuestion("受験読解・要旨", "次の英文を読んで、内容に最も合うものを選びなさい。\\nFor a long time, our class measured the temperature outside at noon. We thought the school garden was too hot for some plants. Then we measured the temperature near the ground in the morning and afternoon. We found that the ground was cooler in the morning, even on warm days. We changed the time of watering and learned that one measurement does not always show the whole situation.\\nこの英文の要点は？", ["A single measurement may not give enough information to understand a situation.", "Plants grow only when the temperature is high at noon.", "The class stopped taking care of the garden.", "Watering plants in the afternoon is always best."], 0, "測る時間や場所を変えて調べた結果、一度の測定だけでは全体を理解できないと学んだよ。"),
    gradeQuestion("受験読解・会話", "次の会話を読んで答えなさい。\\nA: We need to choose a topic for our presentation about local culture.\\nB: The summer festival is popular, but many groups have already introduced it.\\nC: We could talk to people who make traditional paper. Their work is less familiar to students.\\nA: We should also explain how the paper is used today, not only how it was made in the past.\\nB: Then our presentation can connect the history with people's lives now.\\n発表の題材と説明の方針として最も適切なものは？", ["The summer festival, focusing only on its schedule.", "Traditional paper, connecting its history with its present use.", "Modern sports, without interviewing anyone.", "School rules, comparing different classes."], 1, "伝統紙を取り上げ、歴史と現在の暮らしでの使われ方を結びつけて説明するよ。"),
    gradeQuestion("受験読解・情報検索", "次の案内を読んで答えなさい。\\nThe community center will hold a workshop on Sunday. Registration starts at 1:00 p.m. The first activity begins at 1:30. Participants should bring a notebook. The building is a five-minute walk from Midori Station.\\n1時20分に駅に着いた参加者が、活動に間に合うためにすることは？", ["Walk to the center and bring a notebook.", "Wait at the station until 1:30.", "Register after the workshop ends.", "Take a bus for five minutes from the center."], 0, "駅から徒歩5分で、活動前の受付に間に合うよう会場へ向かい、ノートを持参するよ。"),
    gradeQuestion("受験読解・推論", "次の英文を読んで答えなさい。\\nA shop gave customers a small discount if they brought a reusable bag. The number of customers using reusable bags increased. However, the amount of plastic packaging did not change. The shop owner asked the staff to watch how products were packed and learned that many items were still placed in separate plastic bags.\\n次に見直すべきこととして最も適切なものは？", ["How staff package items and whether extra plastic bags are needed.", "Whether customers should stop bringing reusable bags.", "How to make the discount smaller.", "Whether the shop should sell fewer products."], 0, "マイバッグ利用は増えても包装プラスチックが減らないため、商品ごとの包装方法を見直す必要があるよ。"),
    gradeQuestion("受験読解・理由", "次の英文を読んで答えなさい。\\nA school announced that students could borrow tablets for a project. Some students said they could not use them at home because their internet connections were slow. The teacher changed the plan: students could download the materials at school and work offline. More students completed the project on time.\\n計画を変更したことで提出できた生徒が増えた理由は？", ["Students could work with downloaded materials without relying on a fast home connection.", "The project was canceled for students without tablets.", "The teacher gave every student a new internet connection.", "Students no longer needed to finish the project."], 0, "学校で資料をダウンロードし、家庭の速い通信環境に頼らず作業できたからだよ。"),
    gradeQuestion("受験文法・語法", "空欄に入る語を選びなさい。\\nThe guide showed us (　) to reach the old temple from the station.", ["what", "how", "whose", "which"], 1, "how to reachで「どのように寺へ行くか」を表すよ。"),
  ],
};

const middleEnglishGrammarUnits = [
  ["基本文型・疑問文・否定文", 10],
  ["現在形・過去形", 10],
  ["進行形・未来表現", 9],
  ["現在完了・現在完了進行形", 12],
  ["助動詞", 10],
  ["不定詞", 10],
  ["動名詞", 8],
  ["比較", 8],
  ["受け身", 8],
  ["現在分詞・過去分詞", 8],
  ["関係代名詞", 10],
  ["代名詞", 8],
  ["前置詞", 8],
  ["接続詞・節", 10],
  ["文型・間接疑問文・that節", 10],
  ["仮定法", 11],
];

function englishQuestion(unit, prompt, answer, distractors, explanation) {
  return {
    unit,
    prompt,
    options: [answer, ...distractors],
    answer: 0,
    explanation,
  };
}

function makeEnglishGrammarQuestions(level) {
  const pastVerbs = [
    ["Mika", "go", "went", "goes", "going", "to the museum"], ["Ken", "see", "saw", "sees", "seeing", "a rainbow"],
    ["Yui", "buy", "bought", "buys", "buying", "a new notebook"], ["Ryo", "write", "wrote", "writes", "writing", "a letter"],
    ["Emma", "take", "took", "takes", "taking", "some pictures"], ["Daichi", "find", "found", "finds", "finding", "his keys"],
    ["Hana", "make", "made", "makes", "making", "a birthday card"], ["Leo", "come", "came", "comes", "coming", "to school early"],
    ["Aoi", "eat", "ate", "eats", "eating", "lunch with her friends"], ["Tom", "give", "gave", "gives", "giving", "his seat to an old man"],
  ];
  const presentProgressive = [
    ["Mika", "is", "reading a map"], ["Ken", "is", "practicing the piano"],
    ["The students", "are", "cleaning the classroom"], ["Yui", "is", "writing a report"],
    ["The children", "are", "waiting for the bus"], ["Ryo", "is", "taking pictures"],
    ["Emma", "is", "cooking dinner"], ["My friends", "are", "looking for a book"],
    ["Daichi", "is", "talking with a teacher"],
  ];
  const futurePlans = [
    ["Mika", "is going to", "visit the art museum"],
    ["Daichi and his friends", "are going to", "play in the final game"],
    ["Hana", "is going to", "make a cake for her mother"],
  ];
  const perfectCues = [
    ["I (　) Kyoto three times.", "have visited", ["visited", "visit", "will visit"]],
    ["She (　) here since 2020.", "has lived", ["lived", "lives", "will live"]],
    ["They (　) the project already.", "have already finished", ["already finished", "finish already", "will finish"]],
    ["He (　) that movie yet.", "has not seen", ["did not see", "has not saw", "will not see"]],
    ["We (　) our coach for five years.", "have known", ["knew", "know", "will know"]],
    ["Mina (　) her room.", "has just cleaned", ["just cleaned", "has just clean", "will clean"]],
    ["Have you ever (　) sushi?", "tried", ["try", "ate", "been"]],
    ["The rain (　) since this morning.", "has been falling", ["fell", "is falling", "will fall"]],
    ["The boys (　) for two hours.", "have been practicing", ["practiced", "are practicing", "will practice"]],
    ["I (　) the news yet.", "have not heard", ["did not hear", "do not hear", "will not hear"]],
    ["Our team (　) the game twice.", "has won", ["won", "wins", "will win"]],
    ["Riku (　) English since he was ten.", "has studied", ["studied", "studies", "will study"]],
  ];
  const modalRows = [
    ["It is a school rule. You (　) wear indoor shoes in the building.", "must", ["may", "would", "could"], "規則なので義務を表すmustが適切だよ。"],
    ["The sign says this area is for staff only. Visitors (　) enter here.", "must not", ["do not have to", "may", "should"], "立ち入り禁止なのでmust not（〜してはいけない）だよ。"],
    ["A: I cannot reach the top shelf. B: (　) I get that box for you?", "Shall", ["Must", "Did", "Have"], "相手への申し出はShall I ...?で表せるよ。"],
    ["You look tired. You (　) go to bed earlier tonight.", "should", ["may not", "would not", "cannot"], "助言を表すshouldが適切だよ。"],
    ["(　) I use your dictionary for a minute? I will return it soon.", "May", ["Must", "Would", "Should"], "許可を求めるMay I ...?が使えるよ。"],
    ["When my grandfather was young, he (　) run five kilometers easily.", "could", ["must", "may", "should"], "過去の能力はcouldで表せるよ。"],
    ["We (　) bring lunch tomorrow because the school will provide it.", "do not have to", ["must not", "cannot", "should not"], "必要がないことはdo not have toで表すよ。"],
    ["A: The door is heavy. B: (　) you help me open it?", "Could", ["Must", "Shall", "Need"], "丁寧に依頼するCould you ...?が自然だよ。"],
    ["You (　) see a doctor if the pain continues.", "should", ["may", "would", "must not"], "状態が続く場合の助言なのでshouldが適切だよ。"],
    ["It is possible that the meeting (　) start a little late.", "may", ["must not", "has to", "should not"], "可能性を表すmayが文脈に合うよ。"],
  ];
  const infinitiveRows = [
    ["I went to the station (　) my friend.", "to meet", ["meeting", "met", "meets"], "駅へ行った目的はto＋動詞の原形で表すよ。"],
    ["We have many things (　) before the school festival.", "to do", ["doing", "did", "does"], "thingsを後ろから説明する形容詞的用法のto doだよ。"],
    ["It is important (　) enough water in summer.", "to drink", ["drinking", "drank", "drinks"], "It is＋形容詞＋to doで「〜することは…だ」と表すよ。"],
    ["Aya was glad (　) her old friend again.", "to see", ["seeing", "saw", "sees"], "感情の理由はto不定詞で表せるよ。"],
    ["My brother wants (　) a science teacher in the future.", "to become", ["becoming", "became", "becomes"], "wantの後ろにはto不定詞を置くよ。"],
    ["I do not know how (　) this computer.", "to use", ["using", "used", "uses"], "how to＋動詞の原形で「使い方」を表すよ。"],
    ["She saved money (　) a new bicycle.", "to buy", ["buying", "bought", "buys"], "お金をためた目的を表すto buyが適切だよ。"],
    ["He needs a chair (　) on.", "to sit", ["sitting", "sat", "sits"], "a chairを説明するto sit onの形だよ。"],
    ["I have something important (　) you.", "to tell", ["telling", "told", "tells"], "somethingを説明するto tellが適切だよ。"],
    ["The children went outside (　) the stars.", "to see", ["seeing", "saw", "seen"], "外へ出た目的を表すto seeが適切だよ。"],
  ];
  const gerundRows = [
    ["We enjoyed (　) the traditional dance at the festival.", "watching", ["to watch", "watch", "watched"], "enjoyの後ろには動名詞を置くよ。"],
    ["(　) every day helps me remember new words.", "Reading", ["Read", "To reading", "Reads"], "文の主語になる動名詞Readingが適切だよ。"],
    ["My sister finished (　) her science report before dinner.", "writing", ["to write", "write", "wrote"], "finishの後ろには動名詞を置くよ。"],
    ["He is interested in (　) old buildings.", "visiting", ["visit", "to visit", "visited"], "前置詞inの後ろは動名詞visitingだよ。"],
    ["They stopped (　) when the teacher entered the room.", "talking", ["to talk", "talk", "talked"], "会話をやめたのでstopの後ろに動名詞を置くよ。"],
    ["My father is good at (　) delicious bread.", "making", ["make", "to make", "made"], "前置詞atの後ろは動名詞makingだよ。"],
    ["Would you mind (　) the window? It is a little cold.", "closing", ["close", "to close", "closed"], "mindの後ろには動名詞を置くよ。"],
    ["(　) in a quiet place is helpful when I study.", "Working", ["Work", "To working", "Works"], "文の主語には動名詞Workingを使えるよ。"],
  ];
  const comparisonRows = [
    ["This road is (　) than the one near the station.", "wider", ["widest", "more wide", "wide"], "thanがあるので比較級widerを使うよ。"],
    ["Of the four bags, this one is (　).", "the lightest", ["lighter", "light", "most light"], "四つの中で最も軽いので最上級the lightestだよ。"],
    ["My new desk is as (　) as my old one.", "large", ["larger", "largest", "more large"], "as ... asの間には形容詞の原級を置くよ。"],
    ["This question is (　) difficult than the last one.", "less", ["least", "little", "the less"], "「前の問題ほど難しくない」はless difficult thanで表せるよ。"],
    ["A train is usually (　) than a bus.", "faster", ["fastest", "fast", "more fast"], "thanを使って速さを比べるので比較級fasterだよ。"],
    ["Who speaks English (　) in your group?", "the most clearly", ["more clearly", "most clear", "the clearest"], "グループ内で最も明瞭に話す人をたずねる副詞の最上級だよ。"],
    ["This book is (　) interesting than that one.", "more", ["most", "much", "many"], "interestingの比較級はmore interestingだよ。"],
    ["My bag is twice as (　) as yours.", "heavy", ["heavier", "heaviest", "more heavy"], "twice as ... asの形では形容詞の原級を使うよ。"],
  ];
  const passiveRows = [
    ["This bridge (　) in 1985.", "was built", ["built", "is building", "has build"], "橋は建てられた側なので受け身の過去形was builtだよ。"],
    ["English (　) in many countries.", "is spoken", ["speaks", "spoke", "is speaking"], "Englishを主語にした現在の受け身is spokenだよ。"],
    ["The classroom (　) every afternoon by the students.", "is cleaned", ["cleans", "cleaned", "is cleaning"], "教室は掃除されるので現在の受け身is cleanedだよ。"],
    ["A new library (　) near the station next year.", "will be built", ["will build", "built", "is building"], "未来の受け身はwill be＋過去分詞だよ。"],
    ["These pictures (　) by my aunt last month.", "were taken", ["took", "are taking", "was taken"], "picturesは複数で、先月撮られたのでwere takenだよ。"],
    ["This song is (　) by people around the world.", "loved", ["love", "loving", "loves"], "isの後ろに過去分詞lovedを置いて受け身を作るよ。"],
    ["The old building (　) carefully by the workers now.", "is being repaired", ["repairs", "repaired", "has repair"], "今修理されている最中なので現在進行形の受け身だよ。"],
    ["The letters (　) yesterday, so they will arrive soon.", "were sent", ["sent", "are sending", "was sent"], "lettersは複数で、昨日送られたのでwere sentだよ。"],
  ];
  const participleRows = [
    ["The girl (　) the guitar is my sister.", "playing", ["played", "plays", "to play"], "女の子がギターを弾いているので現在分詞playingで説明するよ。"],
    ["This is a cake (　) by my grandmother.", "made", ["making", "makes", "to make"], "ケーキは作られたものなので過去分詞madeで説明するよ。"],
    ["Look at the bird (　) over the sea.", "flying", ["flown", "flies", "to fly"], "鳥が飛んでいるので現在分詞flyingを使うよ。"],
    ["The language (　) in this area is different from ours.", "spoken", ["speaking", "speaks", "to speak"], "その地域で話される言語なので過去分詞spokenだよ。"],
    ["The man (　) near the window is our new coach.", "standing", ["stood", "stands", "to stand"], "窓の近くに立っている人なので現在分詞standingだよ。"],
    ["I found a wallet (　) on the train.", "left", ["leaving", "leaves", "to leave"], "電車に置き忘れられた財布なので過去分詞leftだよ。"],
    ["The students (　) in the library are preparing for a test.", "studying", ["studied", "study", "to study"], "図書館で勉強している生徒なので現在分詞studyingだよ。"],
    ["We visited a temple (　) more than 500 years ago.", "built", ["building", "builds", "to build"], "500年以上前に建てられた寺なので過去分詞builtだよ。"],
  ];
  const relativeRows = [
    ["The woman (　) teaches us science is from Canada.", "who", ["which", "where", "when"], "人を説明する主格の関係代名詞whoだよ。"],
    ["This is the camera (　) my brother bought yesterday.", "which", ["who", "where", "when"], "物を説明する目的格の関係代名詞whichだよ。"],
    ["I know a boy (　) can speak three languages.", "who", ["which", "where", "whose"], "人を説明し、後ろで主語になるwhoが適切だよ。"],
    ["The park (　) we played soccer is near the river.", "where", ["who", "which", "when"], "場所を説明する関係副詞whereが適切だよ。"],
    ["Do you remember the day (　) we first met?", "when", ["where", "who", "which"], "時を表すthe dayを説明するwhenを使うよ。"],
    ["The book (　) is on the desk belongs to Mai.", "which", ["who", "where", "whose"], "物を説明して後ろで主語になるwhichだよ。"],
    ["This is the restaurant (　) serves delicious curry.", "that", ["who", "where", "when"], "物・場所を先行詞とする主格のthatが使えるよ。"],
    ["The song (　) we heard at the concert was beautiful.", "which", ["who", "where", "whose"], "songは物なので目的格whichが適切だよ。"],
    ["She has a friend (　) father is a doctor.", "whose", ["who", "which", "where"], "「その友達の父親」という所有を表すwhoseだよ。"],
    ["The house (　) stands on the hill is very old.", "that", ["where", "when", "whose"], "houseを説明する主格の関係代名詞thatが使えるよ。"],
  ];
  const pronounRows = [
    ["This notebook is (　). I wrote my name on it.", "mine", ["my", "me", "I"], "名詞を伴わず「私のもの」と言うのでmineだよ。"],
    ["The teacher gave (　) some advice before the speech.", "us", ["we", "our", "ours"], "動詞gaveの目的語になる人称代名詞usだよ。"],
    ["These seats are (　), not ours.", "theirs", ["their", "them", "they"], "「彼らのもの」は所有代名詞theirsだよ。"],
    ["(　) of the two answers is correct? Choose one.", "Which", ["Who", "Where", "When"], "二つの選択肢のうちどちらかをたずねるWhichだよ。"],
    ["There is (　) water in the bottle, so we can share it.", "some", ["any", "few", "many"], "肯定文で量のある水を表すsomeが適切だよ。"],
    ["Only a (　) students knew the answer, so the teacher explained it again.", "few", ["little", "much", "every"], "studentsは数えられる複数名詞なのでfewを使うよ。"],
    ["This is not my umbrella. Is it (　)?", "yours", ["your", "you", "yourself"], "名詞を省略して「あなたのもの」と言うyoursだよ。"],
    ["I have two pens. You can use (　) of them.", "either", ["every", "much", "another"], "二つのうちどちらでも、という意味のeitherだよ。"],
  ];
  const prepositionRows = [
    ["Our English class starts (　) nine fifteen.", "at", ["in", "on", "to"], "具体的な時刻の前にはatを使うよ。"],
    ["The school festival is (　) October.", "in", ["at", "on", "by"], "月の前にはinを使うよ。"],
    ["We have a meeting (　) Monday afternoon.", "on", ["in", "at", "for"], "曜日を含む日付表現の前にはonを使うよ。"],
    ["The cat is hiding (　) the table.", "under", ["during", "since", "between"], "「テーブルの下」はunder the tableだよ。"],
    ["She has studied English (　) three years.", "for", ["since", "during", "at"], "期間を表すthree yearsの前はforだよ。"],
    ["The museum is (　) the bank and the post office.", "between", ["among", "during", "through"], "二つのものの間はbetweenで表すよ。"],
    ["Please walk (　) the bridge to reach the park.", "across", ["since", "during", "until"], "橋を渡って向こう側へ行くのでacrossだよ。"],
    ["The train arrived (　) the station just before noon.", "at", ["on", "in", "from"], "駅という地点への到着にはarrive atを使うよ。"],
  ];
  const conjunctionRows = [
    ["I took a coat (　) it was cold outside.", "because", ["but", "or", "although"], "寒かったことがコートを着た理由なのでbecauseだよ。"],
    ["We wanted to walk to school, (　) it started to rain.", "but", ["because", "so", "if"], "歩きたかったが雨が降ったという逆接なのでbutだよ。"],
    ["Call me (　) you need help with the computer.", "if", ["because", "than", "although"], "助けが必要な場合という条件を表すifだよ。"],
    ["Please wash your hands (　) you eat lunch.", "before", ["because", "but", "than"], "昼食を食べる前に、という順序なのでbeforeだよ。"],
    ["I will wait here (　) the bus comes.", "until", ["because", "or", "than"], "バスが来るまで待つのでuntilだよ。"],
    ["He was tired, (　) he finished the report.", "but", ["because", "if", "when"], "疲れていたが終えたという逆接なのでbutだよ。"],
    ["She said (　) she would join us after school.", "that", ["which", "where", "who"], "saidの内容を表すthat節を導くよ。"],
    ["I will call you (　) I arrive at the hotel.", "when", ["because", "but", "than"], "ホテルに着いた時を表すwhenが適切だよ。"],
    ["You can choose tea (　) juice with your lunch.", "or", ["because", "but", "so"], "二つの選択肢を示すorが適切だよ。"],
    ["The town is small, (　) many visitors come in spring.", "but", ["because", "if", "when"], "町は小さいが訪問者が多いという対比なのでbutだよ。"],
  ];
  const clauseRows = [
    ["Do you know (　) the next bus leaves?", "when", ["when does", "what", "what does"], "間接疑問文では疑問詞の後ろを主語＋動詞の語順にするよ。"],
    ["I do not know (　) this word means.", "what", ["what does", "where does", "which is"], "meansの目的語をたずねるwhatで、語順はwhat this word meansだよ。"],
    ["Could you tell me (　) the library is?", "where", ["where is", "what", "where does"], "間接疑問文の語順はwhere the library isだよ。"],
    ["I think (　) this plan will help many people.", "that", ["what", "where", "who"], "thinkの内容を表すthat節を続けるよ。"],
    ["Do you remember (　) we have to submit the form?", "when", ["when do", "what", "where does"], "疑問詞の後ろは主語we＋動詞have toの語順だよ。"],
    ["She asked me (　) I wanted to join the club.", "if", ["what", "which", "whose"], "「参加したいかどうか」を表すifを使うよ。"],
    ["I am sure (　) you can finish the work today.", "that", ["who", "where", "which"], "sureの内容をthat節で表すよ。"],
    ["Please tell us (　) you chose this topic.", "why", ["why did", "what does", "which is"], "理由をたずねる間接疑問文はwhy＋主語＋動詞の語順だよ。"],
    ["Do you know (　) bag is on the chair?", "whose", ["whose is", "who", "where"], "「誰のかばんか」をたずねるwhoseを使うよ。"],
    ["He asked me (　) I had seen his keys.", "whether", ["what", "where", "which"], "「鍵を見たかどうか」を表すwhetherが適切だよ。"],
  ];
  const subjunctiveRows = [
    ["If I (　) more free time, I would learn the guitar.", "had", ["have", "will have", "am having"], "現在の事実に反する仮定なのでIf節は過去形hadだよ。"],
    ["If she were here, she (　) us what to do.", "would tell", ["will tell", "tells", "would told"], "仮定法の主節はwould＋動詞の原形だよ。"],
    ["If I (　) you, I would talk to the teacher.", "were", ["am", "will be", "have been"], "「もし私があなたなら」はIf I were youと表すよ。"],
    ["If our school had a pool, we (　) swim after class.", "could", ["can", "will", "must"], "仮定の状況で可能性を表すcouldが適切だよ。"],
    ["I wish I (　) speak Spanish fluently.", "could", ["can", "will", "am"], "今できないことへの願いはI wish＋過去形で表すよ。"],
    ["If he studied harder, he (　) better results.", "would get", ["gets", "will get", "would got"], "仮定法の主節はwould getだよ。"],
    ["If we (　) a map, we would not be lost now.", "had", ["have", "will have", "are having"], "現在の事実に反する仮定を過去形hadで表すよ。"],
    ["I wish it (　) raining now so we could play outside.", "were not", ["is not", "will not be", "has not been"], "今の状況への願いなのでwishの後ろに過去形を使うよ。"],
    ["If Tom knew the answer, he (　) us.", "would tell", ["will tell", "tells", "would told"], "仮定法の主節はwould＋動詞の原形だよ。"],
    ["If I had a million yen, I (　) some of it to charity.", "would give", ["will give", "gave", "would gave"], "現在の仮定を表すwould giveが適切だよ。"],
    ["I wish I (　) the answer to this question.", "knew", ["know", "will know", "have known"], "今知らないことへの願いはwish＋過去形knewで表すよ。"],
  ];
  const grammarRows = [
    ["基本文型・疑問文・否定文", [
      ["(　) your sister a member of the tennis club?", "Is", ["Are", "Do", "Does"], "主語が三人称単数でbe動詞の疑問文なのでIsだよ。"],
      ["The students (　) not understand the announcement yesterday.", "did", ["do", "does", "were"], "一般動詞の過去の否定文はdid not＋原形だよ。"],
      ["(　) Ken and Yuta play the same instrument?", "Do", ["Does", "Are", "Is"], "複数主語の一般動詞の疑問文はDoで始めるよ。"],
      ["My mother (　) a nurse, but my father is a teacher.", "is", ["are", "does", "has"], "主語がMy motherなのでbe動詞isを使うよ。"],
      ["There (　) two messages for you on the desk.", "are", ["is", "be", "does"], "two messagesは複数なのでThere areだよ。"],
      ["She (　) not eat meat because she is a vegetarian.", "does", ["do", "is", "has"], "三人称単数の一般動詞の否定文はdoes not＋原形だよ。"],
      ["What time (　) the shop close on Sundays?", "does", ["do", "is", "are"], "主語がthe shopなので疑問文ではdoesを使うよ。"],
      ["The students (　) excited about the school trip.", "were", ["was", "did", "has"], "複数主語の過去のbe動詞はwereだよ。"],
      ["(　) there a post office near this station?", "Is", ["Are", "Do", "Have"], "a post officeは単数なのでIs there ...?だよ。"],
      ["I (　) not have enough time to finish the book yesterday.", "did", ["do", "am", "was"], "一般動詞haveの過去の否定文はdid not haveだよ。"],
    ]],
    ["現在形・過去形", pastVerbs.map(([name, base, past, third, ing, phrase]) => [
      `${name} (　) ${phrase} last Friday.`,
      past,
      [base, third, ing],
      `last Fridayは過去を表すので${base}の過去形${past}を使うよ。`,
    ])],
    ["進行形・未来表現", [
      ...presentProgressive.map(([subject, be, activity]) => [
        `Look! ${subject} (　) ${activity} now.`,
        be,
        [be === "is" ? "are" : "is", be === "is" ? "was" : "were", "will be"],
        "nowとLook!があるので、現在進行形を使うよ。",
      ]),
      ...futurePlans.map(([subject, form, plan]) => [
        `${subject} (　) ${plan} next weekend.`,
        form,
        ["will", subject.includes(" and ") ? "is going to" : "are going to", "was going to"],
        "next weekendにする予定を表すbe going toの形が適切だよ。",
      ]),
    ]],
    ["現在完了・現在完了進行形", perfectCues.map(([prompt, answer, distractors]) => [
      prompt,
      answer,
      distractors,
      "過去から現在までの経験・継続・完了を表す現在完了形が適切だよ。",
    ])],
    ["助動詞", modalRows],
    ["不定詞", infinitiveRows],
    ["動名詞", gerundRows],
    ["比較", comparisonRows],
    ["受け身", passiveRows],
    ["現在分詞・過去分詞", participleRows],
    ["関係代名詞", relativeRows],
    ["代名詞", pronounRows],
    ["前置詞", prepositionRows],
    ["接続詞・節", conjunctionRows],
    ["文型・間接疑問文・that節", clauseRows],
    ["仮定法", subjunctiveRows],
  ];
  const questions = [];
  grammarRows.forEach(([unit, rows]) => {
    const targetCount = middleEnglishGrammarUnits.find(([name]) => name === unit)[1];
    for (let index = 0; index < targetCount; index += 1) {
      const [prompt, answer, distractors, explanation] = rows[index % rows.length];
      const levelPrompt = level === "standard"
        ? prompt
        : level === "application"
          ? `文脈に合うよう、空欄に入る語句を選びなさい。\\n${prompt}`
          : `受験対策：英文の意味と文法に合うように、空欄に入る語句を選びなさい。\\n${prompt}`;
      questions.push(englishQuestion(unit, levelPrompt, answer, distractors, explanation));
    }
  });
  return questions;
}

const middleEnglishVocabulary = [
  ["自己紹介・家族", [
    ["relative", "親せき", ["隣人", "医者", "店員"]], ["childhood", "子ども時代", ["将来", "休暇", "約束"]],
    ["twin", "双子の一人", ["祖父", "いとこ", "赤ちゃん"]], ["introduce", "紹介する", ["招待する", "説明を終える", "質問する"]],
    ["similar", "よく似た", ["安全な", "必要な", "異なる"]], ["personality", "性格", ["景色", "習慣", "意見"]],
    ["marry", "結婚する", ["引っ越す", "生まれる", "育てる"]], ["memory", "思い出", ["材料", "予定", "理由"]],
  ]],
  ["学校生活", [
    ["assignment", "課題", ["休み時間", "教室", "校庭"]], ["audience", "聴衆", ["発表者", "委員会", "練習"]],
    ["borrow", "借りる", ["貸す", "返す", "選ぶ"]], ["graduate", "卒業する", ["入学する", "参加する", "練習する"]],
    ["subject", "教科", ["成績", "質問", "宿題"]], ["practice", "練習する", ["忘れる", "運ぶ", "選ぶ"]],
    ["report", "報告・レポート", ["図書館", "休暇", "行事"]], ["uniform", "制服", ["楽器", "道具", "校則"]],
  ]],
  ["町・道案内・交通", [
    ["intersection", "交差点", ["駅", "橋", "歩道"]], ["passenger", "乗客", ["運転手", "旅行者", "店員"]],
    ["entrance", "入口", ["出口", "角", "住所"]], ["traffic", "交通・交通量", ["旅行", "信号", "道路標識"]],
    ["straight", "まっすぐに", ["左に", "向こう側へ", "ゆっくり"]], ["neighborhood", "近所・地域", ["首都", "建物", "景色"]],
    ["convenient", "便利な", ["混雑した", "遠い", "危険な"]], ["platform", "ホーム", ["切符", "線路", "駅員"]],
  ]],
  ["食事・買い物", [
    ["ingredient", "材料", ["値段", "料理人", "食器"]], ["receipt", "レシート", ["割引", "財布", "値札"]],
    ["local", "地元の", ["新鮮な", "高価な", "外国の"]], ["delicious", "おいしい", ["苦い", "空腹の", "甘い"]],
    ["customer", "客", ["店主", "品物", "店員"]], ["discount", "割引", ["注文", "支払い", "交換"]],
    ["recipe", "調理法・レシピ", ["食事", "皿", "買い物"]], ["price", "値段", ["量", "重さ", "味"]],
  ]],
  ["健康・安全", [
    ["injury", "けが", ["病院", "薬", "運動"]], ["recover", "回復する", ["休む", "予防する", "運ぶ"]],
    ["dangerous", "危険な", ["健康な", "便利な", "静かな"]], ["emergency", "緊急事態", ["予定", "案内", "診察"]],
    ["temperature", "温度・体温", ["天気", "薬", "季節"]], ["protect", "守る", ["避ける", "変える", "招く"]],
    ["symptom", "症状", ["運動", "治療費", "習慣"]], ["careful", "注意深い", ["親切な", "心配な", "珍しい"]],
  ]],
  ["自然・環境", [
    ["recycle", "再利用する", ["節約する", "汚染する", "集める"]], ["wildlife", "野生生物", ["植物", "天候", "農業"]],
    ["pollution", "汚染", ["資源", "節約", "景色"]], ["reduce", "減らす", ["増やす", "守る", "分ける"]],
    ["environment", "環境", ["経験", "発明", "社会"]], ["resource", "資源", ["ごみ", "気候", "生物"]],
    ["available", "利用できる", ["危険な", "高価な", "有名な"]], ["weather", "天気", ["季節", "自然", "温度"]],
  ]],
  ["文化・行事", [
    ["tradition", "伝統", ["文化祭", "歴史", "衣装"]], ["performance", "公演・演技", ["練習", "観客", "舞台"]],
    ["celebrate", "祝う", ["開催する", "踊る", "準備する"]], ["festival", "祭り", ["休暇", "展示", "集会"]],
    ["custom", "習慣・慣習", ["行事", "地域", "景色"]], ["instrument", "楽器", ["道具", "舞台", "音楽家"]],
    ["visitor", "訪問者", ["案内人", "参加者", "近所の人"]], ["historic", "歴史的な", ["伝統的な", "現代の", "有名な"]],
  ]],
  ["情報・技術", [
    ["device", "装置・機器", ["発明", "情報", "材料"]], ["connect", "接続する", ["発見する", "共有する", "選ぶ"]],
    ["website", "ウェブサイト", ["手紙", "新聞", "掲示板"]], ["information", "情報", ["意見", "経験", "指示"]],
    ["search", "探す・検索する", ["伝える", "保存する", "借りる"]], ["technology", "技術", ["自然", "社会", "伝統"]],
    ["message", "伝言・メッセージ", ["約束", "質問", "発表"]], ["online", "オンラインの", ["便利な", "個人的な", "世界的な"]],
  ]],
  ["地域・仕事", [
    ["volunteer", "ボランティア", ["旅行者", "職業", "観客"]], ["community", "地域社会", ["会社", "家族", "学校"]],
    ["career", "職業・経歴", ["地域", "計画", "経験"]], ["industry", "産業", ["農業", "工場", "技術"]],
    ["support", "支援する", ["参加する", "発表する", "準備する"]], ["organize", "企画・運営する", ["参加する", "説明する", "比較する"]],
    ["employee", "従業員", ["雇い主", "客", "訪問者"]], ["service", "サービス", ["仕事", "地域", "制度"]],
  ]],
  ["気持ち・計画・意見", [
    ["opinion", "意見", ["理由", "結果", "提案"]], ["decision", "決定", ["相談", "選択肢", "計画"]],
    ["improve", "改善する", ["説明する", "想像する", "比べる"]], ["possible", "可能な", ["必要な", "正確な", "十分な"]],
    ["disagree", "意見が合わない", ["賛成する", "説明する", "選ぶ"]], ["suggest", "提案する", ["同意する", "決定する", "招待する"]],
    ["confident", "自信のある", ["心配な", "退屈な", "驚いた"]], ["purpose", "目的", ["方法", "理由", "結果"]],
  ]],
];

function makeEnglishVocabularyQuestions(level) {
  return middleEnglishVocabulary.flatMap(([unit, words]) => words.map(([word, meaning, meanings], index) => {
    const englishDistractors = [1, 2, 3]
      .map((offset) => words[(index + offset) % words.length][0]);
    const prompt = level === "standard"
      ? `「${meaning}」を表す英単語はどれ？`
      : level === "application"
        ? `語彙問題：英単語 "${word}" の意味として正しいものを選びなさい。`
        : `受験語彙：次の語の意味として最も適切なものは？ ${word}`;
    return englishQuestion(
      unit,
      prompt,
      level === "standard" ? word : meaning,
      level === "standard" ? englishDistractors : meanings,
      `${word}は「${meaning}」という意味だよ。`,
    );
  }));
}

const middleEnglishConversationRows = [
  ["A: I forgot my notebook at home. B: (　) A: Thank you. I will return it tomorrow.", "You can use mine.", ["I do not like notebooks.", "It was raining yesterday.", "How old is your notebook?"], "ノートを忘れた相手に自分のノートを貸す申し出が自然だよ。"],
  ["A: Shall we take the earlier train? B: (　) We can avoid the rush hour.", "That is a good idea.", ["I have taken it yesterday.", "The train is made of paper.", "I do not know his name."], "混雑を避けられるという理由に賛成する返答が合うよ。"],
  ["A: Could you tell me how to get to the gym? B: (　)", "Go straight and turn right at the second corner.", ["I went there last year.", "The gym is very exciting.", "I can play tennis well."], "行き方をたずねているので道順を説明する返答が適切だよ。"],
  ["A: I am nervous about the speech contest. B: (　) You have practiced a lot.", "I am sure you will do well.", ["You should forget your speech.", "The contest is next month.", "I have never seen that book."], "不安な相手を励ます表現が会話に合うよ。"],
  ["A: Would you like some tea? B: (　)", "Yes, please. That would be nice.", ["I drank it tomorrow.", "No, I am a student.", "It is on the second floor."], "飲み物の申し出を受ける自然な返答だよ。"],
  ["A: Why was the meeting changed? B: (　)", "Because several members could not come on Friday.", ["It is a useful meeting.", "We are meeting at the station.", "I have two notebooks."], "理由をたずねているのでBecauseで説明する返答が適切だよ。"],
  ["A: I think we should make the poster easier to read. B: (　)", "I agree. Some letters are too small.", ["I made it last week.", "Where is the station?", "I cannot read yesterday."], "提案に賛成し、その理由も伝えているよ。"],
  ["A: I cannot find my phone. B: (　) A: I last used it in the library.", "When did you last use it?", ["How much is your phone?", "Who is using the library?", "Can you find my homework?"], "最後に使った時をたずねる疑問文が自然につながるよ。"],
  ["A: Thank you for helping me clean the room. B: (　)", "You are welcome. I was glad to help.", ["I clean it tomorrow.", "It is not my room.", "How many rooms do you have?"], "感謝に対する返事としてYou are welcomeが適切だよ。"],
  ["A: The bus is late, and the interview starts in ten minutes. B: (　)", "Let's call the office and explain the situation.", ["We interviewed the bus yesterday.", "You should buy a new bus.", "The office is closed every day."], "遅刻しそうな状況への具体的な提案になっているよ。"],
];

function makeEnglishConversationQuestions(level) {
  return middleEnglishConversationRows.map(([prompt, answer, distractors, explanation]) =>
    englishQuestion(
      "会話表現（依頼・提案・意見・応答）",
      level === "standard" ? prompt : `${level === "application" ? "会話の流れに合う" : "受験対策：前後の発言から意図を読み取った上で"}返答を選びなさい。\\n${prompt}`,
      answer,
      distractors,
      explanation,
    )
  );
}

const middleEnglishReadingRows = [
  ["読解：必要な情報を探す", [
    ["The school library opens at 8:30 on weekdays and at 9:00 on Saturday. Students can borrow up to three books for two weeks. The library is closed on Sundays.", "土曜日の開館時刻は？", "9:00", ["8:30", "2:00", "日曜日"], "土曜日は9時に開館すると書かれているよ。"],
    ["The art club meets every Wednesday after school. This month, the members are preparing a display for the open school day on June 18. They will put their pictures in the gym.", "美術部が作品を展示する日は？", "June 18", ["Every Wednesday", "June 8", "The first day of school"], "公開授業の日である6月18日に展示するよ。"],
    ["A bus leaves Green Station at 10:15 and arrives at the museum at 10:40. The museum ticket includes a short film, which starts at 11:00. Visitors should keep their tickets until they leave.", "博物館で短編映画が始まる時刻は？", "11:00", ["10:15", "10:40", "11:40"], "映画の開始時刻は11時と案内されているよ。"],
    ["The sports center is open until 8:00 p.m. from Monday to Friday. On Saturdays, it closes at 5:00 p.m. The swimming pool is not available on the first Monday of each month.", "土曜日のスポーツセンターの閉館時刻は？", "5:00 p.m.", ["8:00 p.m.", "5:00 a.m.", "6:00 p.m."], "土曜日は午後5時に閉館するよ。"],
    ["For the cooking class, bring an apron and a clean towel. The instructor will provide all ingredients. Please arrive ten minutes before the class begins at 2:30.", "参加者が持参するものは？", "An apron and a clean towel.", ["All the ingredients.", "A cooking book and a ticket.", "A plate and a clock."], "エプロンと清潔なタオルを持参するよう書かれているよ。"],
    ["The town clean-up starts at the east gate of the park at 9:00 on Sunday. Gloves and bags will be given to volunteers. If it rains heavily, the activity will move to the following Sunday.", "大雨の場合、清掃活動はどうなる？", "It will move to the following Sunday.", ["It will start at the west gate.", "It will be held indoors that day.", "It will begin earlier."], "大雨なら翌週の日曜日に延期すると書かれているよ。"],
    ["Mika's train leaves at 7:42. She needs about eight minutes to walk from her house to the station. She plans to arrive at the station ten minutes before the train leaves.", "Mikaは何時までに駅に着く予定？", "7:32", ["7:34", "7:42", "7:50"], "出発の10分前なので7時32分に着く予定だよ。"],
    ["The science room is open for visitors from 1:00 to 4:00. A student demonstration begins at 2:15 and lasts twenty minutes. Visitors may ask questions after the demonstration.", "実演後にできることは？", "Ask questions.", ["Borrow science books.", "Join the class before 1:00.", "Use the room until 5:00."], "実演の後に質問できると案内されているよ。"],
  ]],
  ["読解：理由と因果関係", [
    ["Taku used to miss the first ten minutes of practice because he could not find his sports clothes in the morning. He began putting them beside his school bag before going to bed. He has arrived on time every day this week.", "今週Takuが時間どおり練習に着けている理由は？", "He prepares his sports clothes the night before.", ["He practices at a different place.", "He stopped bringing his school bag.", "The practice starts later now."], "前夜に服を準備することで、朝に探す時間がなくなったからだよ。"],
    ["The class planted flowers in small pots. At first, they watered every pot each morning. Some leaves became yellow, so they checked the soil and found that several pots were still wet. After that, they watered only dry pots, and the flowers grew better.", "水やりの方法を変えた後、花がよく育ったのはなぜ？", "They checked the soil and avoided watering wet pots.", ["They moved every pot into a dark room.", "They used more water every morning.", "They stopped checking the flowers."], "土の状態を確認し、すでにぬれている鉢には水をやらなくなったからだよ。"],
    ["A town opened a small book exchange near the bus stop. At first, few people used it. The organizers added a sign explaining that anyone could take a book and leave another one. More people began using it because they had not known the books were free to borrow.", "利用者が増えた主な理由は？", "The sign explained how the book exchange worked.", ["The bus stop was moved closer.", "The books became more expensive.", "People had to join a club."], "誰でも本を借りたり置いたりできると看板で知らせたからだよ。"],
    ["Yuna wanted to interview an older neighbor about the town's history. She first planned to visit without calling, but her brother said the neighbor might be busy. Yuna called and made an appointment, so the neighbor had time to prepare old photographs.", "Yunaが先に電話をしたことで、何ができた？", "The neighbor could prepare photographs for the interview.", ["She avoided asking about the town.", "Her brother interviewed the neighbor instead.", "The interview was canceled."], "約束をしたので、近所の人は写真を準備する時間を持てたよ。"],
    ["The school reduced the time students could use the gym during lunch. Some students complained. The teacher explained that two classes had to share the gym because another room was being repaired. The schedule changed again when the repair was finished.", "昼休みに体育館を使える時間が短くなったのはなぜ？", "Two classes needed to share it during repairs.", ["Students had damaged the gym.", "The school wanted to stop sports.", "The gym was moved to another town."], "別の部屋の修理中、二つのクラスで体育館を使う必要があったからだよ。"],
    ["A family put a table near the entrance for reusable shopping bags. They still used many plastic bags because they often forgot to take their own bags. They began keeping folded bags in the car and by the front door. The number of plastic bags they used went down.", "家族がプラスチック袋を減らせた工夫は？", "They kept reusable bags where they would remember them.", ["They stopped buying food.", "They put the bags in a locked box.", "They used larger plastic bags."], "車や玄関に置き、買い物のとき忘れないようにしたよ。"],
    ["The school garden had few butterflies. Students planted flowers, but they also found that the garden was often noisy during lunch. They made a quiet corner with more plants. A few weeks later, butterflies began visiting the area.", "生徒たちは蝶を呼ぶために何をした？", "They made a quiet corner with more plants.", ["They removed all the flowers.", "They played music in the garden.", "They moved the garden indoors."], "植物を増やした静かな場所を作ったことが蝶の訪問につながったよ。"],
    ["A group planned a walk along the river. The weather report warned of strong winds, so the leader checked a second route through the town. The group used that route and arrived safely, although it took a little longer.", "グループが町中の道を使った理由は？", "Strong winds made the river route less safe.", ["The river path was shorter.", "They wanted to visit a shop.", "The leader had lost the map."], "強風の予報があったため、川沿いを避けて安全な道を選んだよ。"],
  ]],
  ["読解：要点・主題をつかむ", [
    ["Our class used to throw away paper after writing on only one side. We put a box beside the printer for paper that still had a clean side. Students used it for notes and practice. By the end of the month, we had used much less new paper.", "この英文の要点は？", "Using clean sides of used paper can reduce waste.", ["Students should stop writing notes.", "Printers use less electricity in winter.", "The class bought more paper."], "使える面を再利用することで、新しい紙の使用量を減らした話だよ。"],
    ["When our school invited a musician, some students thought classical music was difficult to understand. The musician played short parts and explained what to listen for. Students then noticed different instruments and said the music was more interesting than they expected.", "この英文の主題として最も適切なものは？", "An explanation can help people enjoy unfamiliar music.", ["Students should learn to play every instrument.", "Classical music is always difficult.", "The school canceled the concert."], "聴きどころの説明によって、初めての音楽を楽しめたという内容だよ。"],
    ["A small store started selling vegetables grown by nearby farmers. Customers liked knowing where the food came from. The store owner also found that the vegetables traveled a shorter distance before reaching the shop. The project helped both local farmers and shoppers.", "この英文の要点は？", "Selling nearby farms' vegetables benefited farmers and customers.", ["The store stopped selling vegetables.", "Customers wanted food from far away.", "Farmers opened a school."], "地元の野菜を売ることが農家と買い物客の双方に役立ったよ。"],
    ["My grandfather keeps a notebook about birds he sees near his house. He writes the date, place, and weather each time. After several years, he noticed that some birds arrived earlier in spring. His records helped him see a change that he might otherwise have forgotten.", "ノートを続けたことで祖父ができたことは？", "He noticed a change in when some birds arrived.", ["He taught the birds to sing.", "He found a new house for the birds.", "He stopped watching the weather."], "記録を続けたことで、鳥が春に来る時期の変化に気づけたよ。"],
    ["A new student did not speak much during group work. Her classmates invited her to share a drawing instead of asking her to give a long speech. She explained her idea with a few words, and the group used it in their project.", "グループが新入生の考えを知るためにしたことは？", "They invited her to share a drawing.", ["They asked her to leave the group.", "They finished the project without her.", "They gave her a long speech to read."], "絵を見せてもらう方法で、話しやすくして考えを聞いたよ。"],
    ["Our town has an old clock tower. Many people passed it without noticing its history. Students made a short audio guide that visitors can hear on their phones. Now visitors can learn why the tower was built and how it was used.", "生徒が作った音声ガイドの目的は？", "To help visitors learn about the clock tower's history.", ["To teach visitors how to repair phones.", "To replace the clock tower.", "To give directions to a school."], "時計台の歴史を訪問者に知ってもらうためだよ。"],
    ["Some students wanted to help at an animal shelter, but they could not visit every week. The shelter asked them to collect clean towels and make simple toys from safe materials. The students found a way to support the animals even when they could not be there.", "この英文の要点は？", "People can support a cause in different practical ways.", ["Only weekly visits can help animals.", "The shelter stopped accepting towels.", "Students should avoid making toys."], "現地に毎週行けなくても、タオル集めなど別の方法で支援できるという話だよ。"],
    ["A class compared two ways to get to school. The train was faster on sunny days, but it was sometimes delayed during heavy snow. The bicycle took longer, yet students could choose a different road when one was blocked. The class learned to consider both speed and reliability.", "生徒たちが学んだことは？", "A useful comparison includes more than just speed.", ["The train is always the best choice.", "Bicycles cannot use other roads.", "Snow makes every trip impossible."], "速さだけでなく、安定して使えるかも比べる必要があると学んだよ。"],
  ]],
  ["読解：会話の流れと意見", [
    ["A: We need an idea for our class display. B: Let's show photos of the school garden. C: Photos are good, but visitors may want to know how we chose the plants. A: We can add short notes about each choice. B: Then the display will show both the garden and our thinking.", "二人が考えた展示の内容は？", "Garden photos with notes explaining the plant choices.", ["Only a list of school rules.", "A display without pictures or notes.", "Photos of a different school."], "写真に植物選びの理由を添えて、庭と考えた過程を示すよ。"],
    ["A: The walk to the museum is free. B: But it may take too long before the tour. C: The bus costs a little, but it takes only ten minutes. A: We have enough time if we leave now. B: Then let's take the bus and arrive before the tour starts.", "二人が選んだ移動方法と理由は？", "The bus, because it will get them there before the tour.", ["Walking, because it is more expensive.", "A taxi, because the museum is closed.", "They decided not to visit."], "歩くより時間を短縮し、見学開始に間に合うようバスに乗るよ。"],
    ["A: We could collect money for the library. B: Some people may not know what the money is for. C: Let's make a list of books students want and share it with families. A: Good. They can see how the books will be used. B: We should also report what we bought.", "募金活動で二人が大切だと考えていることは？", "Explaining the purpose and reporting how the money was used.", ["Keeping the book list secret.", "Buying books before asking anyone.", "Collecting money without a goal."], "使い道を示し、購入後に報告することを提案しているよ。"],
    ["A: The bus stop is crowded after school. B: We could ask the bus company for another bus. C: First, let's count how many students use it at different times. A: That will give us information to share. B: Then we can make a clear request.", "二人は要望を出す前に何をする？", "Count how many students use the stop at different times.", ["Move the bus stop by themselves.", "Ask students to stop taking the bus.", "Write a request without checking anything."], "時間帯ごとの利用人数を調べ、要望の根拠を集めるよ。"],
    ["A: I want to use bright colors on the safety poster. B: They will get attention, but the words must be easy to read. C: We can use dark letters on a light background. A: Let's test it from across the hall. B: Then we will know if people can read it.", "ポスターを完成させるために二人がすることは？", "Use readable colors and test the poster from a distance.", ["Use as many colors as possible.", "Make the words smaller.", "Put the poster inside a desk."], "色を工夫した上で、離れた場所から読めるか確認するよ。"],
    ["A: We have one afternoon to clean the beach. B: We should pick up litter near the entrance first. C: Visitors also leave litter near the benches. A: Let's divide into two teams. B: Good. Each team can cover one area safely.", "二人はどのように清掃する？", "They will split into two teams and clean different areas.", ["One person will clean the whole beach alone.", "They will clean only after dark.", "They will move the benches."], "二つの班に分かれ、それぞれ別の場所を担当するよ。"],
    ["A: The school newspaper has space for one interview. B: The new coach has an interesting story. C: The lunch staff also know how the menu is planned. A: Let's ask students which topic they want to read about. B: Then we can choose based on readers' interest.", "記事の題材を決めるために二人がすることは？", "Ask students which interview topic interests them.", ["Choose a topic without asking readers.", "Interview both people in the same article.", "Cancel the newspaper."], "読者である生徒に希望を聞いてから題材を選ぶよ。"],
    ["A: Our presentation is twelve minutes long. B: We have too many details for that. C: Let's choose three important points and keep one example for each. A: We can put the extra facts on a handout. B: That should make the talk easier to follow.", "二人が発表を分かりやすくする方法は？", "Focus on three main points and put extra facts in a handout.", ["Read every detail as quickly as possible.", "Remove all examples and handouts.", "Make the presentation longer."], "要点を三つに絞り、補足情報は配布資料に分けるよ。"],
  ]],
  ["読解：複数の情報を結び付ける", [
    ["The school plans to reduce electricity use. The computer room uses most power after classes, while the hallway lights stay on until 7:00. Students checked the room and found that some computers were left on after club activities. The school will remind clubs to shut them down and turn off hallway lights at 6:00.", "学校が決めた対策の組み合わせは？", "Remind clubs to turn off computers and switch off hallway lights earlier.", ["Buy more computers and keep lights on longer.", "Close the computer room before classes.", "Ask students to use the hallway more."], "使われていないコンピューターと、長時間ついている照明の両方を見直すよ。"],
    ["A community garden has twelve small plots. Eight are used by families, and four are kept for school activities. The garden has only one water tap. Families usually visit in the morning, while students come after 3:30. The manager plans to set a watering schedule so both groups can use the tap.", "水やりの予定を作る主な理由は？", "Different groups use the garden at different times and share one tap.", ["The garden has too many water taps.", "Students visit in the morning every day.", "Families do not grow anything."], "一つの水道を、時間帯の異なる家族と生徒が共用するからだよ。"],
    ["A museum survey found that many visitors enjoyed the exhibits but could not find the exit easily. The map showed the exit, but it was printed in small letters. Visitors also said the signs near the stairs pointed only toward the next room. The museum plans to make the map larger and add exit signs by the stairs.", "出口を見つけやすくするための改善は？", "Enlarge the map and add signs near the stairs.", ["Remove the map and close the stairs.", "Make all signs smaller.", "Move the exhibits outside."], "地図の文字を大きくし、階段の近くにも出口表示を加えるよ。"],
    ["A class wants to raise money for a shelter. A bake sale may earn more, but the school kitchen is not available that week. A used-book sale needs fewer supplies, and many students have books to donate. The class chose the book sale and will ask for books in good condition.", "クラスが古本市を選んだ理由は？", "It needs fewer supplies and students can donate books.", ["The kitchen was available for baking.", "The shelter asked for cakes only.", "Students had no books to donate."], "調理室が使えない一方、古本市は準備が少なく本を集めやすいからだよ。"],
    ["Two routes lead to the station. Route A takes twelve minutes and has a busy crossing. Route B takes fifteen minutes but has a traffic light and a wide sidewalk. A student with a younger brother chooses the second route when they walk together.", "その学生が弟と歩くときにBを選ぶ理由は？", "It is a little longer but has safer walking conditions.", ["It is the shortest route.", "It has no sidewalk or traffic light.", "It leads to a different station."], "少し時間がかかっても、信号と広い歩道があり安全だからだよ。"],
    ["The school has thirty tablets for a project. Class A has twenty-eight students and Class B has thirty-two. Each student needs one tablet for a ten-minute activity. The teacher plans to let the larger class use the tablets in two groups while the other class works together.", "タブレットを二つのグループに分けて使うのはどのクラス？", "Class B.", ["Class A.", "Both classes have exactly thirty students.", "Neither class."], "32人のClass Bは端末30台より人数が多いので、二班に分けるよ。"],
    ["A town survey says that older residents want more benches near the market. The town has space for two benches, but the sidewalk must stay wide enough for wheelchairs. Students measured three possible places. Two locations leave enough space, while the third blocks part of the path.", "ベンチを置く場所を選ぶときに必要な条件は？", "It must meet residents' needs and leave a wide path for wheelchairs.", ["It must be the most crowded location.", "It must block the sidewalk.", "It must be far from the market."], "住民の希望に応えつつ、車いすが通れる幅を確保する必要があるよ。"],
    ["A club will visit a farm. The bus arrives at 9:20, and the farm tour begins at 9:45. The walk from the bus stop takes ten minutes. The guide asks visitors to check in at the office before the tour. The club leader says they should walk there together as soon as the bus arrives.", "バスが着いた後、クラブがすぐにすることは？", "Walk to the farm office and check in before the tour.", ["Wait at the bus stop until 9:45.", "Start the tour without the guide.", "Return to school to get a ticket."], "徒歩10分の農場へ向かい、見学開始前に事務所で受付をするよ。"],
  ]],
  ["読解：推論・次の行動を考える", [
    ["A school started a program to lend umbrellas. The number of umbrellas returned was lower than expected. The teacher noticed that students were unsure where to leave them. The school put a marked return box beside the entrance and added a note to each umbrella.", "返却数を増やすために次に有効なことは？", "Make the return place clear and remind borrowers where to leave umbrellas.", ["Stop lending umbrellas to students.", "Move the box to a locked room.", "Ask students to keep the umbrellas."], "返す場所が分かりにくかったので、箱と案内を目立たせるのが有効だよ。"],
    ["The school lunch team tried a new vegetable dish. Many students left it unfinished. In a short survey, students said they liked the taste but found the pieces too large. The cooks plan to cut the vegetables smaller next time and ask students what they think.", "調理チームが次にすることとして最も適切なのは？", "Cut the vegetables smaller and collect students' feedback.", ["Remove all vegetables from lunch.", "Make the pieces larger.", "Ignore the survey results."], "味は好評なので、食べにくさを改善して再度意見を聞くよ。"],
    ["A group planted trees beside a road. The young trees grew slowly, even though they received enough water. Students measured the ground and found that it was hard and packed down. They want to check whether loosening the soil helps the roots grow.", "生徒が確かめようとしていることは？", "Whether loosening the packed soil helps the roots grow.", ["Whether the road can be moved.", "Whether the trees need less sunlight.", "Whether the ground should be covered with plastic."], "水が足りているため、固い土をほぐすことが成長を助けるか調べるよ。"],
    ["A library's evening reading group has fewer members than its afternoon group. A survey shows that several students have sports practice in the evening. The librarian wants more students to join but can only hold one meeting each week.", "参加者を増やすために試せる方法は？", "Ask students about a time that does not conflict with practice.", ["Add a second weekly meeting immediately.", "Make the meeting longer in the evening.", "Stop asking students about their schedules."], "練習と重なる人がいるので、都合のよい時間を調べるのがよいよ。"],
    ["A town put a recycling box near the station. People used it often, but many bottles still contained liquid. The signs showed what could be recycled but did not explain how to prepare the bottles. The town plans to add simple pictures showing the steps.", "新しい案内に加えるべき情報は？", "How to empty and prepare bottles before recycling them.", ["Where to buy new bottles.", "Why the station is crowded.", "How to put liquid into bottles."], "分別できる物だけでなく、ボトルの準備方法を示す必要があるよ。"],
    ["A student made a study plan with one hour of English every night. After three days, she stopped following it because she was too tired after club activities. She still wants to study regularly. Her teacher suggested shorter sessions on busy days.", "計画を続けるために最もよい調整は？", "Make study sessions shorter on busy days.", ["Stop all club activities.", "Study for two hours every night.", "Wait until the exam day."], "忙しい日は短時間にして、無理なく続けられる計画にするよ。"],
    ["A park's pond became cloudy after a large number of visitors came during a holiday. The park staff found food scraps near the water and more ducks than usual. They plan to post signs asking visitors not to feed the ducks and to use the trash bins.", "公園のスタッフが看板で伝える内容は？", "Do not feed the ducks and put trash in bins.", ["Bring more food for the ducks.", "Swim in the pond.", "Leave food near the water."], "食べ物の残りとカモの増加が見られたので、餌やりを控えごみを捨てるよう伝えるよ。"],
    ["A class's online presentation was difficult to hear. The students had used a quiet room, but they placed the microphone far from the speaker. They will record again with the microphone closer and check the sound before sharing the video.", "録音をやり直すときに改善することは？", "Move the microphone closer and check the sound.", ["Record in a noisier room.", "Speak farther from the microphone.", "Share the video without listening."], "音が小さい原因はマイクとの距離なので、近づけて確認するよ。"],
  ]],
];

function makeEnglishReadingQuestions(level) {
  return middleEnglishReadingRows.flatMap(([unit, rows]) => rows.map(([passage, question, answer, distractors, explanation]) =>
    englishQuestion(
      unit,
      `${level === "standard" ? "英文を読んで答えなさい。" : level === "application" ? "英文の情報を読み取り、問いに答えなさい。" : "受験読解：英文全体と設問の条件を確認して答えなさい。"}\\n${passage}\\n${question}`,
      answer,
      distractors,
      explanation,
    )
  ));
}

const completeMiddleThirdEnglishBanks = Object.fromEntries(
  Object.entries(middleThirdEnglishBanks).map(([level, originalQuestions]) => [
    level,
    [
      ...originalQuestions,
      ...makeEnglishGrammarQuestions(level),
      ...makeEnglishVocabularyQuestions(level),
      ...makeEnglishConversationQuestions(level),
      ...makeEnglishReadingQuestions(level),
    ],
  ]),
);

function generatedQuestion(unit, prompt, answer, distractors, explanation) {
  const options = [...new Set([String(answer), ...distractors.map(String)])].slice(0, 4);
  if (options.length !== 4) throw new Error(`選択肢が不足しています: ${unit} - ${prompt}`);
  return { unit, prompt, options, answer: 0, explanation };
}

function shuffled(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

const recentSixthGradeQuestionStorageKey = "manabi-pocket-recent-sixth-grade-math";
const sixthGradeQuestionCountPerUnit = 30;

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatMathNumber(value) {
  return Number.isInteger(value) ? String(value) : String(Number(value.toFixed(2)));
}

function numericDistractors(answer, decimalPlacesOverride = null) {
  const formattedAnswer = decimalPlacesOverride === null
    ? formatMathNumber(answer)
    : answer.toFixed(decimalPlacesOverride);
  const magnitude = 10 ** Math.floor(Math.log10(Math.abs(answer) || 1));
  const decimalPlaces = formattedAnswer.includes(".") ? formattedAnswer.split(".")[1].length : 0;
  const answerIsRound = decimalPlaces === 0 && Number.isInteger(answer) && Math.abs(answer) % 10 === 0;
  const step = answerIsRound
    ? Math.max(10, Math.round(magnitude / 10))
    : decimalPlaces > 0
      ? 10 ** -decimalPlaces
      : Math.max(1, Math.round(magnitude * 0.01));
  const formatChoice = (value) => decimalPlaces > 0
    ? value.toFixed(decimalPlaces)
    : formatMathNumber(value);
  const offsets = answerIsRound
    ? [1, -1, 2, -2, 3, 4, -3, 5, -4, 6, -5, 7, -6].map((multiple) => multiple * step)
    : decimalPlaces > 0
      ? [1, -1, 2, -2, 3, 4, -3, 5, -4, 6, -5, 7, -6].map((multiple) => multiple * step)
      : [
        step + 1, -(step + 2), step * 2 + 3, -(step * 2 + 4),
        step * 3 + 7, -(step * 3 + 8), step * 4 + 9, step * 5 + 11,
      ];
  const candidates = [];
  for (const offset of offsets) {
    const candidate = formatChoice(answer + offset);
    const integerCandidate = Number(candidate);
    const preservesRoundingPattern = answerIsRound
      ? Number.isInteger(integerCandidate) && integerCandidate % 10 === 0
      : decimalPlaces > 0
        ? !Number.isInteger(integerCandidate)
        : Number.isInteger(answer)
          ? Math.abs(integerCandidate) % 10 !== 0 && Math.abs(integerCandidate) % 5 !== 0
          : !Number.isInteger(integerCandidate);
    if (integerCandidate >= 0 && integerCandidate !== Number(formattedAnswer) &&
        preservesRoundingPattern && !candidates.includes(candidate)) {
      candidates.push(candidate);
      if (candidates.length === 3) break;
    }
  }
  for (let offset = 1; candidates.length < 3; offset += 1) {
    const candidate = formatChoice(answer + offset * step);
    const integerCandidate = Number(candidate);
    const preservesRoundingPattern = answerIsRound
      ? Number.isInteger(integerCandidate) && integerCandidate % 10 === 0
      : decimalPlaces > 0
        ? !Number.isInteger(integerCandidate)
        : Number.isInteger(answer)
          ? Math.abs(integerCandidate) % 10 !== 0 && Math.abs(integerCandidate) % 5 !== 0
          : !Number.isInteger(integerCandidate);
    if (integerCandidate >= 0 && integerCandidate !== Number(formattedAnswer) &&
        preservesRoundingPattern && !candidates.includes(candidate)) {
      candidates.push(candidate);
    }
  }
  return candidates;
}

function simplifyFraction(numerator, denominator) {
  const gcd = (left, right) => right === 0 ? left : gcd(right, left % right);
  const divisor = gcd(numerator, denominator);
  const reducedNumerator = numerator / divisor;
  const reducedDenominator = denominator / divisor;
  return reducedDenominator === 1 ? String(reducedNumerator) : `${reducedNumerator}/${reducedDenominator}`;
}

function roundedNumericQuestion(unit, prompt, answer, suffix, explanation, add) {
  if (Number.isInteger(answer)) {
    return add(unit, prompt, `${formatMathNumber(answer)}${suffix}`,
      numericDistractors(answer).map((value) => `${value}${suffix}`), explanation);
  }
  const roundedAnswer = Math.floor(answer * 10 + 0.5) / 10;
  const roundedText = roundedAnswer.toFixed(1);
  const roundingInstruction = "（小数第2位を四捨五入して、小数第1位まで答えましょう）";
  return add(unit, `${prompt}${roundingInstruction}`, `${roundedText}${suffix}`,
    numericDistractors(roundedAnswer, 1).map((value) => `${value}${suffix}`),
    `${explanation} 小数第2位を四捨五入して小数第1位までにすると、${roundedText}${suffix}です。`);
}

function loadRecentSixthGradeQuestions() {
  try {
    const saved = JSON.parse(localStorage.getItem(recentSixthGradeQuestionStorageKey) || "{}");
    return Object.fromEntries(Object.entries(saved).filter(([, prompts]) =>
      Array.isArray(prompts) && prompts.every((prompt) => typeof prompt === "string")
    ));
  } catch {
    showStorageNotice("前回までの問題を読み込めませんでした。今回の学習では新しい問題を出題します。");
    return {};
  }
}

function rememberSixthGradeQuestions(questions) {
  const recent = loadRecentSixthGradeQuestions();
  for (const question of questions) {
    const prompts = recent[question.unit] || [];
    recent[question.unit] = [...prompts.filter((prompt) => prompt !== question.prompt), question.prompt].slice(-200);
  }
  try {
    localStorage.setItem(recentSixthGradeQuestionStorageKey, JSON.stringify(recent));
  } catch {
    showStorageNotice("前回までの問題を保存できませんでした。次回は同じ問題が出ることがあります。");
  }
}

function makeSixthGradeApplicationQuestions(recentQuestions = {}) {
  const question = (unit, prompt, answer, distractors, explanation) =>
    generatedQuestion(unit, prompt, answer, distractors, explanation);
  const numeric = (unit, prompt, answer, suffix, explanation) => {
    return roundedNumericQuestion(unit, prompt, answer, suffix, explanation, question);
  };
  const units = {
    "分数のかけ算・わり算": [
      () => {
        const numerator = randomInteger(2, 5);
        const denominator = randomInteger(numerator + 1, 9);
        const people = denominator * randomInteger(2, 5);
        const amount = numerator * people / denominator;
        return numeric("分数のかけ算・わり算",
          `1人分に${numerator}/${denominator}L使うスープを${people}人分作ります。必要な量は何Lですか？`,
          amount, "L", `${numerator}/${denominator}×${people}=${amount}Lです。`);
      },
      () => {
        const total = randomInteger(4, 16);
        const usedNumerator = randomInteger(1, 3);
        const usedDenominator = usedNumerator + randomInteger(1, 3);
        const used = total * usedNumerator / usedDenominator;
        return numeric("分数のかけ算・わり算",
          `${total}mのリボンの${usedNumerator}/${usedDenominator}を使いました。残りは何mですか？`,
          total - used, "m", `使った長さは${total}×${usedNumerator}/${usedDenominator}=${formatMathNumber(used)}m。残りは${total}−${formatMathNumber(used)}=${formatMathNumber(total - used)}mです。`);
      },
      () => {
        const numerator = randomInteger(2, 7);
        const denominator = randomInteger(numerator + 1, 10);
        const people = denominator * randomInteger(2, 6);
        const amount = numerator * people / denominator;
        const portionNumerator = randomInteger(1, 3);
        const portionDenominator = portionNumerator + randomInteger(1, 3);
        const answer = amount * portionNumerator / portionDenominator;
        return numeric("分数のかけ算・わり算",
          `${numerator}/${denominator}L入りのびんが${people}本あります。そのうち${portionNumerator}/${portionDenominator}を使うと、何L使いますか？`,
          answer, "L", `全部で${numerator}/${denominator}×${people}=${amount}Lです。その${portionNumerator}/${portionDenominator}なので${amount}×${portionNumerator}/${portionDenominator}=${formatMathNumber(answer)}Lです。`);
      },
      () => {
        const denominator = randomInteger(3, 9);
        const numerator = randomInteger(1, denominator - 1);
        const groups = randomInteger(2, 8);
        const totalNumerator = numerator * groups;
        return numeric("分数のかけ算・わり算",
          `${totalNumerator}/${denominator}kgの小麦粉を、1回に${numerator}/${denominator}kgずつ使います。何回分ありますか？`,
          groups, "回分", `${totalNumerator}/${denominator}÷${numerator}/${denominator}=${totalNumerator}÷${numerator}=${groups}回分です。`);
      },
      () => {
        const denominator = randomInteger(3, 8);
        const a = randomInteger(1, denominator - 1);
        const b = randomInteger(1, denominator - 1);
        const total = denominator * randomInteger(2, 10);
        const remaining = total * (denominator - a) / denominator * (denominator - b) / denominator;
        return numeric("分数のかけ算・わり算",
          `${total}Lの水の${a}/${denominator}を使い、残りの${b}/${denominator}も使いました。水は何L残っていますか？`,
          remaining, "L", `1回目の残りは${total}×${denominator - a}/${denominator}L。さらにその${denominator - b}/${denominator}が残るので、${formatMathNumber(remaining)}Lです。`);
      },
    ],
    "割合・百分率": [
      () => {
        const original = randomInteger(8, 50) * 100;
        const firstRate = [10, 20, 25, 30, 40][randomInteger(0, 4)];
        const secondRate = [10, 20, 25][randomInteger(0, 2)];
        const price = original * (100 - firstRate) / 100 * (100 - secondRate) / 100;
        return numeric("割合・百分率",
          `${original}円の商品を${firstRate}％引きにし、さらに割引後の価格から${secondRate}％引きにします。価格はいくらですか？`,
          price, "円", `順に割り引きます。${original}×${100 - firstRate}/100×${100 - secondRate}/100=${price}円です。`);
      },
      () => {
        const rate = [60, 70, 75, 80, 85, 90][randomInteger(0, 5)];
        const original = randomInteger(8, 40) * 100;
        const sale = original * rate / 100;
        return numeric("割合・百分率",
          `ある品物は定価の${rate}％にあたる${sale}円で売られています。定価はいくらですか？`,
          original, "円", `${sale}円は定価の${rate}％です。${sale}÷${rate / 100}=${original}円です。`);
      },
      () => {
        const people = randomInteger(2, 12) * 100;
        const rate = [20, 25, 30, 40, 50, 60, 75][randomInteger(0, 6)];
        const part = people * rate / 100;
        const denominators = [2, 3, 4, 5, 6].filter((denominator) => part % denominator === 0);
        const secondDenominator = denominators[randomInteger(0, denominators.length - 1)];
        const secondNumerator = randomInteger(1, secondDenominator - 1);
        const answer = part * secondNumerator / secondDenominator;
        return numeric("割合・百分率",
          `全校${people}人のうち${rate}％が運動会に参加し、参加者の${secondNumerator}/${secondDenominator}がリレーに出ます。リレーに出るのは何人ですか？`,
          answer, "人", `参加者は${people}×${rate}/100=${part}人。その${secondNumerator}/${secondDenominator}は${formatMathNumber(answer)}人です。`);
      },
      () => {
        const population = randomInteger(6, 25) * 400;
        const increase = [5, 10, 15, 20, 25][randomInteger(0, 4)];
        const decrease = [5, 10, 20, 25][randomInteger(0, 3)];
        const next = population * (100 + increase) / 100;
        const answer = next * (100 - decrease) / 100;
        return numeric("割合・百分率",
          `人口${population}人の町で、1年目に${increase}％増え、2年目にその人口から${decrease}％減りました。2年後の人口は何人ですか？`,
          answer, "人", `1年後は${population}×${100 + increase}/100=${next}人。2年後は${next}×${100 - decrease}/100=${answer}人です。`);
      },
      () => {
        const rate = [60, 70, 75, 80, 90][randomInteger(0, 4)];
        const original = randomInteger(8, 40) * 100;
        const amount = original * rate / 100;
        return numeric("割合・百分率",
          `ある商品を${100 - rate}％引きで買うと${amount}円でした。割引前の価格はいくらですか？`,
          original, "円", `${amount}円は割引前の${rate}％です。${amount}÷${rate / 100}=${original}円です。`);
      },
    ],
    "比と比例・反比例": [
      () => {
        const a = randomInteger(2, 6);
        const b = randomInteger(2, 7);
        const scale = randomInteger(5, 30);
        const total = (a + b) * scale;
        return numeric("比と比例・反比例",
          `赤組と白組の人数の比は${a}:${b}で、合わせて${total}人です。赤組は何人ですか？`,
          a * scale, "人", `比の合計は${a + b}です。1つ分は${total}÷${a + b}=${scale}人なので、赤組は${a}×${scale}=${a * scale}人です。`);
      },
      () => {
        const a = randomInteger(2, 6);
        const b = randomInteger(2, 7);
        const scale = randomInteger(5, 25);
        const transfer = randomInteger(1, Math.min(a, b) * scale - 1);
        const red = a * scale + transfer;
        const blue = b * scale - transfer;
        const divisor = (x, y) => y === 0 ? x : divisor(y, x % y);
        const gcd = divisor(red, blue);
        const reducedRed = red / gcd;
        const reducedBlue = blue / gcd;
        const answer = `${reducedRed}:${reducedBlue}`;
        const wrong = [`${reducedRed + 1}:${reducedBlue}`, `${reducedRed}:${reducedBlue + 1}`, `${reducedRed + 2}:${reducedBlue + 1}`];
        return question("比と比例・反比例",
          `赤玉と青玉の比は${a}:${b}で、比の1つ分は${scale}個です。青玉から赤玉へ${transfer}個移すと、赤玉と青玉の比はいくつですか？`,
          answer, wrong, `移す前は赤${a * scale}個、青${b * scale}個です。移した後は${red}個と${blue}個。${gcd}で約分して${answer}です。`);
      },
      () => {
        const a = randomInteger(2, 5);
        const b = randomInteger(2, 5);
        const amount = randomInteger(3, 20) * b;
        const answer = amount * a / b;
        return numeric("比と比例・反比例",
          `赤い絵の具と白い絵の具を${a}:${b}で混ぜます。白い絵の具を${amount}mL使うとき、赤い絵の具は何mL必要ですか？`,
          answer, "mL", `白の${b}つ分が${amount}mLなので、赤は${amount}×${a}/${b}=${answer}mLです。`);
      },
      () => {
        const a = randomInteger(3, 7);
        const b = randomInteger(2, a - 1);
        const scale = randomInteger(4, 15);
        const perimeter = 2 * (a + b) * scale;
        return numeric("比と比例・反比例",
          `長方形の縦と横の長さの比は${a}:${b}で、周りの長さは${perimeter}cmです。長い辺は何cmですか？`,
          a * scale, "cm", `縦横の合計は${perimeter}÷2=${(a + b) * scale}cmです。比の合計${a + b}つ分から1つ分は${scale}cm。長い辺は${a * scale}cmです。`);
      },
      () => {
        const machines = randomInteger(3, 8);
        const hours = randomInteger(2, 6);
        const target = randomInteger(2, machines - 1);
        const answer = machines * hours / target;
        return numeric("比と比例・反比例",
          `${machines}台の機械が${hours}時間で同じ量を作ります。同じ性能の機械${target}台では何時間かかりますか？`,
          answer, "時間", `仕事の量は${machines}×${hours}=${machines * hours}台・時間です。${machines * hours}÷${target}=${formatMathNumber(answer)}時間です。`);
      },
    ],
    "速さ・単位量あたりの大きさ": [
      () => {
        const d1 = randomInteger(2, 8) * 300;
        const d2 = randomInteger(2, 8) * 300;
        const t1 = randomInteger(5, 20);
        const t2 = randomInteger(5, 20);
        const speed = (d1 + d2) / (t1 + t2);
        return numeric("速さ・単位量あたりの大きさ",
          `ある人は${d1}mを${t1}分、続けて${d2}mを${t2}分で歩きました。全体の平均の速さは分速何mですか？`,
          speed, "m/分", `道のりの合計は${d1 + d2}m、時間の合計は${t1 + t2}分です。${d1 + d2}÷${t1 + t2}=${formatMathNumber(speed)}m/分です。`);
      },
      () => {
        const speed = randomInteger(40, 100);
        const moving = randomInteger(8, 30);
        const distance = speed * moving;
        const rest = randomInteger(5, 20);
        const average = distance / (moving + rest);
        return numeric("速さ・単位量あたりの大きさ",
          `${distance}mの道のりを分速${speed}mで進み、途中で${rest}分休みました。出発から到着までの平均の速さは分速何mですか？`,
          average, "m/分", `進んだ時間は${distance}÷${speed}=${formatMathNumber(moving)}分。休みも含む時間は${formatMathNumber(moving + rest)}分です。${distance}÷${formatMathNumber(moving + rest)}=${formatMathNumber(average)}m/分です。`);
      },
      () => {
        const leadMinutes = randomInteger(5, 20);
        const slow = randomInteger(50, 90);
        const faster = slow + randomInteger(20, 60);
        const catchTime = slow * leadMinutes / (faster - slow);
        return numeric("速さ・単位量あたりの大きさ",
          `Aさんが分速${slow}mで出発しました。${leadMinutes}分後にBさんが同じ道を分速${faster}mで追いかけます。Bさんは出発してから何分後に追いつきますか？`,
          catchTime, "分", `Bさんが出発したときAさんは${slow}×${leadMinutes}=${slow * leadMinutes}m先です。速さの差${faster - slow}m/分で追いつくので、${slow * leadMinutes}÷${faster - slow}=${formatMathNumber(catchTime)}分です。`);
      },
      () => {
        const distance = randomInteger(3, 15) * 11;
        const speed1 = randomInteger(3, 8);
        const speed2 = randomInteger(3, 8);
        const time = distance / (speed1 + speed2);
        return numeric("速さ・単位量あたりの大きさ",
          `${distance}km離れた2地点から、時速${speed1}kmと時速${speed2}kmの2人が向かい合って同時に出発します。何時間後に出会いますか？`,
          time, "時間", `近づく速さは${speed1}+${speed2}=${speed1 + speed2}km/時です。${distance}÷${speed1 + speed2}=${formatMathNumber(time)}時間です。`);
      },
      () => {
        const train = randomInteger(120, 360) * 2;
        const seconds = randomInteger(8, 24);
        const speed = train / seconds * 3.6;
        return numeric("速さ・単位量あたりの大きさ",
          `長さ${train}mの列車が、止まっている人の前を${seconds}秒で通り過ぎました。列車の速さは時速何kmですか？`,
          speed, "km/時", `秒速は${train}÷${seconds}=${formatMathNumber(train / seconds)}mです。時速に直すと${formatMathNumber(train / seconds)}×3.6=${formatMathNumber(speed)}km/時です。`);
      },
    ],
    "円の面積・体積": [
      () => {
        const length = randomInteger(12, 30);
        const width = randomInteger(10, 24);
        const path = randomInteger(1, 3);
        const area = (length - 2 * path) * (width - 2 * path);
        return numeric("円の面積・体積",
          `縦${length}m、横${width}mの長方形の土地の内側に、幅${path}mの通路を周りに作ります。花だんの面積は何m²ですか？`,
          area, "m²", `通路を除いた縦と横は${length - 2 * path}m、${width - 2 * path}mです。${length - 2 * path}×${width - 2 * path}=${area}m²です。`);
      },
      () => {
        const base = randomInteger(8, 24);
        const height = randomInteger(5, 18);
        const triangle = base * height / 2;
        const rectangle = randomInteger(20, 100);
        return numeric("円の面積・体積",
          `長方形の花だんの面積は${rectangle}m²です。そこに底辺${base}m、高さ${height}mの三角形の花だんをつなげました。全体の面積は何m²ですか？`,
          rectangle + triangle, "m²", `三角形の面積は${base}×${height}÷2=${triangle}m²です。長方形と合わせて${rectangle}+${triangle}=${rectangle + triangle}m²です。`);
      },
      () => {
        const a = randomInteger(2, 8);
        const b = randomInteger(2, 8);
        const h = randomInteger(2, 10);
        const litres = a * b * h * 1000;
        return numeric("円の面積・体積",
          `内のりが縦${a}m、横${b}m、深さ${h}mの水そうを満水にします。水は何L入りますか？`,
          litres, "L", `体積は${a}×${b}×${h}=${a * b * h}m³です。1m³=1000Lなので${litres}Lです。`);
      },
      () => {
        const radius = randomInteger(2, 12);
        const area = radius * radius * 3.14;
        return numeric("円の面積・体積",
          `半径${radius}cmの円の面積を、円周率を3.14として求めます。面積は何cm²ですか？`,
          area, "cm²", `${radius}×${radius}×3.14=${formatMathNumber(area)}cm²です。`);
      },
      () => {
        const a = randomInteger(8, 20);
        const b = randomInteger(6, 18);
        const h = randomInteger(4, 12);
        const cutA = randomInteger(2, Math.min(5, a - 1));
        const cutB = randomInteger(2, Math.min(5, b - 1));
        const cutH = randomInteger(1, Math.min(3, h - 1));
        const volume = a * b * h - cutA * cutB * cutH;
        return numeric("円の面積・体積",
          `縦${a}cm、横${b}cm、高さ${h}cmの直方体から、縦${cutA}cm、横${cutB}cm、高さ${cutH}cmの直方体を切り取りました。残りの体積は何cm³ですか？`,
          volume, "cm³", `全体は${a}×${b}×${h}=${a * b * h}cm³、切り取った部分は${cutA}×${cutB}×${cutH}=${cutA * cutB * cutH}cm³です。差は${volume}cm³です。`);
      },
    ],
    "拡大図・縮図と対称な図形": [
      () => {
        const scale = randomInteger(10000, 80000);
        const first = randomInteger(2, 12);
        const second = randomInteger(2, 12);
        const distance = (first + second) * scale / 100000;
        return numeric("拡大図・縮図と対称な図形",
          `縮尺1:${scale}の地図で、家から駅まで${first}cm、駅から学校まで${second}cmです。家から学校までの実際の道のりは何kmですか？`,
          distance, "km", `地図上の道のりは${first + second}cmです。実際は${(first + second) * scale}cm=${formatMathNumber(distance)}kmです。`);
      },
      () => {
        const scale = randomInteger(10000, 100000);
        const actualKm = randomInteger(2, 30);
        const mapCm = actualKm * 100000 / scale;
        return numeric("拡大図・縮図と対称な図形",
          `縮尺1:${scale}の地図で、実際に${actualKm}kmある道は何cmで表されますか？`,
          mapCm, "cm", `${actualKm}kmは${actualKm * 100000}cmです。${actualKm * 100000}÷${scale}=${formatMathNumber(mapCm)}cmです。`);
      },
      () => {
        const scale = randomInteger(1, 6) * 50;
        const length = randomInteger(3, 16);
        const width = randomInteger(3, 14);
        const area = length * scale / 100 * (width * scale / 100);
        return numeric("拡大図・縮図と対称な図形",
          `縮尺1:${scale}の設計図で、部屋の縦は${length}cm、横は${width}cmです。実際の床面積は何m²ですか？`,
          area, "m²", `実際の縦横は${formatMathNumber(length * scale / 100)}m、${formatMathNumber(width * scale / 100)}mです。面積は${formatMathNumber(area)}m²です。`);
      },
      () => {
        const length = randomInteger(2, 12);
        const width = randomInteger(2, 10);
        const multiplier = randomInteger(2, 5);
        const area = length * width * multiplier * multiplier;
        return numeric("拡大図・縮図と対称な図形",
          `縦${length}cm、横${width}cmの長方形を、辺の長さがもとの${multiplier}倍になるように拡大します。拡大図の面積は何cm²ですか？`,
          area, "cm²", `拡大後は縦${length * multiplier}cm、横${width * multiplier}cmです。面積は${length * multiplier}×${width * multiplier}=${area}cm²です。`);
      },
      () => {
        const scale = randomInteger(100, 900);
        const actual = randomInteger(2, 20) * 5;
        const drawing = actual * 100 / scale;
        return numeric("拡大図・縮図と対称な図形",
          `縮尺1:${scale}の図で、実際の長さが${actual}mの塀は何cmで表されますか？`,
          drawing, "cm", `${actual}mは${actual * 100}cmです。図の長さは${actual * 100}÷${scale}=${formatMathNumber(drawing)}cmです。`);
      },
    ],
    "データの活用": [
      () => {
        const count = randomInteger(5, 12);
        const average = randomInteger(55, 90);
        const score = randomInteger(30, 100);
        const knownTotal = average * count - score;
        return numeric("データの活用",
          `${count}人の平均点は${average}点です。${count - 1}人の合計が${knownTotal}点のとき、残り1人は何点ですか？`,
          score, "点", `全員の合計は${average}×${count}=${average * count}点です。${average * count}−${knownTotal}=${score}点です。`);
      },
      () => {
        const n1 = randomInteger(5, 15);
        const n2 = randomInteger(5, 15);
        const a1 = randomInteger(50, 90);
        const a2 = randomInteger(50, 90);
        const average = (n1 * a1 + n2 * a2) / (n1 + n2);
        return numeric("データの活用",
          `${n1}人の平均点は${a1}点、${n2}人の平均点は${a2}点です。合わせた全員の平均点は何点ですか？`,
          average, "点", `合計点は${n1}×${a1}+${n2}×${a2}=${n1 * a1 + n2 * a2}点です。人数${n1 + n2}人でわると${formatMathNumber(average)}点です。`);
      },
      () => {
        const values = Array.from({ length: 6 }, () => randomInteger(10, 90)).sort((a, b) => a - b);
        const median = (values[2] + values[3]) / 2;
        return numeric("データの活用",
          `6人の記録は${values.join("、")}点でした。中央値は何点ですか？`,
          median, "点", `小さい順に並んでいるので、中央の2つ${values[2]}点と${values[3]}点の平均が中央値です。(${values[2]}+${values[3]})÷2=${formatMathNumber(median)}点です。`);
      },
      () => {
        const days = randomInteger(4, 8);
        const average = randomInteger(20, 80);
        const values = Array.from({ length: days - 1 }, () => randomInteger(10, 100));
        const missing = average * days - values.reduce((sum, value) => sum + value, 0);
        if (missing < 0) return null;
        return numeric("データの活用",
          `${days}日間の読書ページ数の平均は1日${average}ページでした。最初の${days - 1}日は${values.join("、")}ページです。最後の日は何ページですか？`,
          missing, "ページ", `合計は${average}×${days}=${average * days}ページです。最初の${days - 1}日の合計は${values.reduce((sum, value) => sum + value, 0)}ページなので、最後の日は${missing}ページです。`);
      },
      () => {
        const count = randomInteger(4, 10);
        const average = randomInteger(50, 85);
        const added = randomInteger(70, 100);
        const newAverage = (count * average + added) / (count + 1);
        return numeric("データの活用",
          `${count}人の平均点は${average}点です。${added}点の人が1人加わると、全員の平均点は何点になりますか？`,
          newAverage, "点", `もとの合計は${count}×${average}=${count * average}点です。${added}点を加え、${count + 1}人でわると${formatMathNumber(newAverage)}点です。`);
      },
    ],
    "文字と式・数量の関係": [
      () => {
        const notebooks = randomInteger(2, 8);
        const penPrice = randomInteger(80, 240);
        const pens = randomInteger(2, 6);
        const notebookPrice = randomInteger(150, 600);
        const total = notebooks * notebookPrice + pens * penPrice;
        return numeric("文字と式・数量の関係",
          `1冊x円のノートを${notebooks}冊と、1本${penPrice}円のペンを${pens}本買うと合計${total}円でした。ノート1冊の値段はいくらですか？`,
          notebookPrice, "円", `式は${notebooks}x+${penPrice}×${pens}=${total}です。${notebooks}x=${notebooks * notebookPrice}なので、x=${notebookPrice}円です。`);
      },
      () => {
        const tiles = randomInteger(5, 40);
        const sticks = 3 * tiles + 1;
        return numeric("文字と式・数量の関係",
          `正方形のタイルを横一列につなぎ、隣り合う辺を共有します。タイルを${tiles}枚並べると、周りを囲む棒は何本必要ですか？`,
          sticks, "本", `1枚目は4本で、1枚増えるごとに3本増えます。4+3×(${tiles}−1)=${sticks}本です。`);
      },
      () => {
        const people = randomInteger(2, 8);
        const ticket = randomInteger(100, 500);
        const tickets = randomInteger(1, 4);
        const fee = randomInteger(300, 1200);
        const total = people * fee + people * tickets * ticket;
        return numeric("文字と式・数量の関係",
          `入場料は1人${fee}円、乗り物券は1枚${ticket}円です。${people}人が1人${tickets}枚ずつ買うと合計はいくらですか？`,
          total, "円", `合計は${people}×${fee}+${people}×${tickets}×${ticket}=${total}円です。`);
      },
      () => {
        const length = randomInteger(4, 20);
        const width = randomInteger(3, 15);
        const x = randomInteger(2, 12);
        const perimeter = 2 * ((length + x) + width);
        return numeric("文字と式・数量の関係",
          `縦が${length}cm、横がx cmの長方形があります。x=${x}のとき、周りの長さは何cmですか？`,
          perimeter, "cm", `周りの長さは2×(${length}+x)です。x=${x}を代入すると2×(${length}+${x})=${perimeter}cmです。`);
      },
      () => {
        const hours = randomInteger(2, 12);
        const speed = randomInteger(3, 18);
        const distance = hours * speed;
        const otherHours = randomInteger(2, 15);
        return numeric("文字と式・数量の関係",
          `${hours}時間で${distance}km進む自転車があります。同じ速さでx時間進むとき、x=${otherHours}なら道のりは何kmですか？`,
          speed * otherHours, "km", `速さは${distance}÷${hours}=${speed}km/時です。道のりは${speed}×${otherHours}=${speed * otherHours}kmです。`);
      },
    ],
    "場合の数・条件整理": [
      () => {
        const drinks = randomInteger(2, 8);
        const sides = randomInteger(2, 8);
        const desserts = randomInteger(2, 5);
        const answer = drinks * sides * desserts;
        return numeric("場合の数・条件整理",
          `${drinks}種類の飲み物、${sides}種類のおかず、${desserts}種類のデザートから1つずつ選びます。組み合わせは何通りですか？`,
          answer, "通り", `${drinks}×${sides}×${desserts}=${answer}通りです。`);
      },
      () => {
        const cards = randomInteger(4, 9);
        const lastDigit = randomInteger(2, Math.min(7, cards - 1));
        const eligible = cards - lastDigit;
        const answer = eligible * (cards - 1);
        return numeric("場合の数・条件整理",
          `1から${cards}までのカードから異なる2枚で2けたの整数を作ります。一の位が${lastDigit}より大きい整数は何個できますか？`,
          answer, "個", `一の位は${lastDigit + 1}から${cards}までの${eligible}通りです。十の位は残り${cards - 1}通りなので、${eligible}×${cards - 1}=${answer}個です。`);
      },
      () => {
        const right = randomInteger(2, 5);
        const up = randomInteger(2, 5);
        const paths = factorial(right + up) / (factorial(right) * factorial(up));
        return numeric("場合の数・条件整理",
          `格子状の道で、目的地まで右に${right}区画、上に${up}区画進みます。最短経路は何通りですか？`,
          paths, "通り", `全部で${right + up}回進みます。${right}回右へ進む場所の選び方を数えると${paths}通りです。`);
      },
      () => {
        const people = randomInteger(5, 14);
        const answer = people * (people - 1) / 2;
        return numeric("場合の数・条件整理",
          `${people}チームが総当たり戦をし、どの2チームも1回ずつ対戦します。試合は全部で何試合ですか？`,
          answer, "試合", `各チームが${people - 1}試合ずつ行うと重複して数えるので、${people}×${people - 1}÷2=${answer}試合です。`);
      },
      () => {
        const colors = randomInteger(4, 8);
        const flags = randomInteger(2, 3);
        let answer = 1;
        for (let index = 0; index < flags; index += 1) answer *= colors - index;
        return numeric("場合の数・条件整理",
          `${colors}色から${flags}色を選び、左から順に並べて旗を作ります。同じ色を使わないとき、何通りできますか？`,
          answer, "通り", `${colors}色から順に${flags}色を選ぶので${Array.from({ length: flags }, (_, index) => colors - index).join("×")}=${answer}通りです。`);
      },
    ],
  };
  const factorial = (value) => value <= 1 ? 1 : value * factorial(value - 1);
  const banks = {};
  for (const [unit, templates] of Object.entries(units)) {
    const previous = new Set(recentQuestions[unit] || []);
    const prompts = new Set();
    for (let count = 0; count < 50; count += 1) {
      let item;
      for (let attempt = 0; attempt < 5000; attempt += 1) {
        item = templates[randomInteger(0, templates.length - 1)]();
        if (item && !previous.has(item.prompt) && !prompts.has(item.prompt)) break;
        item = null;
      }
      if (!item) throw new Error(`応用問題を50問作成できませんでした: ${unit}`);
      (banks[unit] ||= []).push(item);
      prompts.add(item.prompt);
    }
  }
  return banks;
}

function makeYamaguchiQuestions() {
  const unit = "県立中学校・中等教育学校（共通検査）";
  const table = (title, headers, rows) => ({ title, headers, rows });
  const chart = (title, values) => ({ title, chart: values });
  const passage = (title, text) => ({ title, text });
  const written = (prompt, materials, modelAnswer, criteria, dialogue) => ({
    unit,
    prompt,
    options: [],
    answer: null,
    explanation: "",
    writtenResponse: true,
    minCharacters: 60,
    materials: dialogue ? [passage("話し合い", dialogue), ...materials] : materials,
    modelAnswer,
    criteria,
  });

  return {
    [unit]: [
      written(
        "実行委員会の話し合いで、来場者が増えたのは広報の効果だという意見と、雨が少なかったからだという意見が出ました。二つの資料から確かに読み取れる変化を数値で説明し、雨の日数が来場者数に影響したと決めつけられるかどうかも、理由を添えて書きましょう。なお、広報の回数や来場者への聞き取り結果は記録されていません。資料にある事実と、原因についての予想を区別してまとめてください。",
        [
          chart("地域イベントの来場者数", [{ label: "2024年", value: 360 }, { label: "2025年", value: 480 }]),
          table("開催月の雨日数", ["年", "雨日数"], [["2024年", "8日"], ["2025年", "3日"]]),
        ],
        "来場者数は2024年の360人から2025年の480人へ120人増えた。雨の日数は8日から3日へ減っているので、天候が来場者数に関係した可能性はあるが、この資料だけでは原因とは言い切れない。",
        ["来場者数の増加を数値で示した", "雨日数の変化を資料から示した", "因果関係を断定せずに説明した"],
      ),
      written(
        "直売所では、家族から「量が多い方を選べばお得」と言われましたが、重さも値段も違うので、そのままでは比べられません。二つの果物を同じ重さにそろえた場合の値段を計算し、どちらを買うのがよいか、計算の道筋とともに説明しましょう。家族に納得してもらえるよう、まず何gあたりで比べるかを決め、両方に同じ単位を使ってください。この売り場では袋を分けずに買うため、実際の値段と重さを使って公平に比べましょう。",
        [table("直売所の果物", ["商品", "重さ", "値段"], [["夏みかん", "600g", "540円"], ["りんご", "800g", "640円"]])],
        "りんごを選ぶ。夏みかんは100gあたり90円、りんごは100gあたり80円なので、同じ重さで比べるとりんごの方が安い。",
        ["100gあたりの値段を両方求めた", "安い商品を選んだ", "数値を使って比較した"],
      ),
      written(
        "地域イベントの日は、混雑を減らすためにバスの便を一つ増やす案が出ています。担当者は、利用者の合計が多い路線ではなく、1便あたりの利用者が多い路線を優先したいそうです。三つの路線の人数と便数を比べ、どこを増便するか、根拠となる計算も含めて提案しましょう。合計人数だけでは便ごとの混み方は分かりません。路線ごとの利用者数を運行本数で割り、比較の単位をそろえてください。",
        [table("地域イベントの日のバス利用", ["路線", "利用者数", "運行本数"], [["海側", "180人", "6便"], ["山側", "150人", "3便"], ["駅前", "210人", "7便"]])],
        "山側の便を増やす。利用者は150人で海側の180人より少ないが、運行は3便だけで、1便あたり50人となり、海側の30人や駅前の30人より多いからだ。",
        ["提案した路線を明確にした", "利用者数と運行本数を使った", "1便あたりの人数など比較の根拠を示した"],
      ),
      written(
        "市立図書館では、限られた予算で子ども向けの場所を一つ整備することになりました。利用者数の平日と休日の違いを年代ごとに比べ、どの利用者に向けて、どのような工夫をするのがよいかを提案しましょう。提案が資料のどの数値に基づくかも書いてください。利用者数の多い年代を挙げるだけでなく、平日と休日の差から、いつどのような場所が必要かを考えてください。限られた予算でできる具体的な工夫として提案しましょう。",
        [table("市立図書館の利用者", ["年代", "平日の利用者", "休日の利用者"], [["小学生", "45人", "80人"], ["中高生", "55人", "60人"], ["大人", "120人", "110人"]])],
        "小学生は平日の45人に対して休日は80人で、休日の利用が多い。休日に子ども向けの読書スペースや行事を用意すると、利用しやすくなると考える。",
        ["平日と休日の数値を比べた", "読み取った特徴に合う工夫を提案した", "資料の数値を根拠にした"],
      ),
      written(
        "町の公園に、ステージと花だんを置いた後、子どもが遊べる芝生をできるだけ広く残したいと考えています。二つの施設は重ならず、広場の長方形の中にすべて収まるものとして、芝生にできる面積を求めましょう。どの面積を先に求め、どう引いたのか、単位も付けて説明してください。通路や施設の重なりは考えず、広場全体から二つの施設の面積だけを取り除くものとして計算します。面積を比べるときは、すべて同じ単位で表してください。",
        [table("広場の設計", ["場所", "たて", "横"], [["広場全体", "24m", "18m"], ["ステージ", "8m", "5m"], ["花だん", "10m", "7m"]])],
        "広場全体は24×18=432m²。ステージは8×5=40m²、花だんは10×7=70m²なので、残りは432−40−70=322m²。",
        ["広場全体の面積を求めた", "ステージと花だんの面積を引いた", "単位をm²で示した"],
      ),
      written(
        "会話を読み、噴水A・B・Cが次に三つとも同時に水を出すのは何分後か、また何時かを求めましょう。二つだけが同時になる時刻ではなく、三つすべてが同時になる最も早い時刻を考え、倍数を使った求め方も説明してください。",
        [],
        "6、8、10の最小公倍数は120なので、120分後に3つが同時に水を出す。6と8と10の倍数を調べ、最初に共通する数を見つける。",
        ["答えを120分後とした", "3つの間隔に共通する倍数を考えた", "最小公倍数を使った理由を説明した"],
        "地域の公園では、昼休みに子どもたちが楽しめる噴水の演出をしています。管理員さんから、三つの噴水は正午ちょうどに水を出し始め、その後も決まった間隔で同じように運転すると聞きました。\nゆうた：Aは6分ごと、Bは8分ごと、Cは10分ごとに水が出るそうだよ。\nさくら：それぞれの噴水が何度も水を出すうちに、また同じ時刻に重なることがあるんだね。点検の人は、三つがいっしょに出る瞬間に合わせてノズルを確認したいそうだよ。\nみのり：AとBだけが重なる時刻ではなく、Cも同時に出る時刻を探さないといけないね。正午から何分後かを、それぞれの間隔の倍数を使って調べてみよう。\nゆうた：いちばん早く三つの条件がそろう時刻が分かったら、正午から何時何分になるかも伝えよう。\nさくら：間隔の数字を足すのではなく、それぞれの噴水が水を出す時刻を書き出して、三つに共通する時刻を探すんだね。見つけた時刻より前に共通するものがないことも確かめて、最も早い時刻を答えよう。",
      ),
      written(
        "会話をもとに、午前10時から11時までに、ちょうど二つの噴水が同時に水を出し始める時刻をすべて求めましょう。どの二つが重なるかも示し、午前10時ちょうどは数えず、午前11時ちょうどは含めて考えてください。",
        [],
        "AとBは24分ごとに重なるので10時24分と10時48分、BとCは36分ごとなので10時36分に重なる。AとCが重なるのは72分後で範囲外。したがって、ちょうど2つが同時に始まる時刻は10時24分、10時36分、10時48分の3回。",
        ["該当する時刻を3回とした", "3つの噴水の組み合わせを調べた", "範囲内の時刻と噴水の組を説明した"],
        "公園では、噴水の動きを撮影するイベントが開かれます。午前10時にA・B・Cの三つが同時に動き始め、その後、Aは8分ごと、Bは12分ごと、Cは18分ごとに水を出し始めます。撮影係は、三つすべてが重なる場面ではなく、二つだけが同時に水を出す場面を撮りたいと考えています。\nあおい：二つずつの組み合わせごとに、何分おきに重なるかを調べるとよさそうだね。\nけん：でも、同じ時刻に三つとも出る場合は「二つだけ」には入らないよ。三つの組み合わせをそれぞれ調べて、重なる時刻が同じにならないかも確かめよう。\nあおい：撮影できるのは午前11時まで。10時ちょうどは最初の開始だから数えないけれど、11時ちょうどに始まる場合は範囲に入れる約束だよ。\nけん：何時何分に、どの二つがいっしょに出るのか、全部書き出してみよう。\nあおい：たとえば二つの組の周期が分かったら、午前10時からその周期ずつ進めて時刻に直せばいいね。三つとも出る時刻と重なるときは、二つだけの回数には入れないようにしよう。",
      ),
      written(
        "会話にある運転間隔と1回の水量を使い、午前9時から10時までに三つの噴水が使う水の合計を求めましょう。9時ちょうどの運転は数えず、10時ちょうどに始まる運転は含めて、噴水ごとの回数と計算の道筋を説明してください。",
        [],
        "Aは5分から60分までで12回、Bは8分から56分までで7回、Cは12分から60分までで5回。使用量はそれぞれ120L、98L、100Lなので、合計は318L。",
        ["各噴水の運転回数を正しく求めた", "回数に1回の水量を掛けた", "合計318Lを単位付きで示した"],
        "公園の環境委員になった三人は、噴水の水をむだなく使えているか調べることになりました。管理員さんによると、三つの噴水は午前9時に運転を始め、Aは5分ごと、Bは8分ごと、Cは12分ごとに水を出します。水が出るたびに、Aは10L、Bは14L、Cは20Lを使います。運転は午前10時まで続きます。\nさくら：回数が同じでも、噴水によって一度に使う量が違うんだね。\nゆうた：まず、それぞれが何回水を出すか数えて、その回数に1回の量を掛けてみよう。\nみのり：数え方を間違えないようにしよう。午前9時ちょうどの分は数えないけれど、午前10時ちょうどに始まる分は含める約束だよ。\nさくら：最後に三つの使用量を合わせて、1時間で何L使ったのか管理員さんに報告しよう。\nゆうた：回数を数えるときは、Aなら5分、10分、15分というように、1時間の終わりまで進めればいいね。BやCも同じように考えれば、見落としがないかな。\nみのり：一度に使う水の量を掛けるのは、噴水ごとの回数を出した後だね。三つの結果を最後に足して、合計にLを付けよう。",
      ),
      written(
        "会話の条件から、午前9時から9時30分までに二つの噴水から水が出ている時間の合計を求めましょう。9時ちょうどの運転は数えず、9時30分ちょうどに始まる運転は含めます。運転回数と秒数の計算を示し、答えは分と秒で表してください。",
        [],
        "Aは4、8、12、16、20、24、28分後の7回、Bは6、12、18、24、30分後の5回運転する。合計は7×40+5×30=430秒で、430秒は7分10秒。",
        ["AとBの運転回数を求めた", "回数と運転時間から430秒を計算した", "7分10秒に直した"],
        "夏祭りの準備で、公園の噴水が実際に水を出している時間を調べています。管理員さんは午前9時にAとBを動かし始め、Aは4分ごとに40秒間、Bは6分ごとに30秒間水を出すと説明しました。運転間隔の間は止まり、次の時刻になると再び同じ時間だけ水が出ます。調べる時間は午前9時から9時30分までです。\nけん：止まっている時間を足すのではなく、水が出ている回数に1回の時間を掛けるんだね。\nあおい：Aは9時ちょうどから数えず、9時4分、8分というように動くよ。Bも同じ考え方だね。\nけん：30分ちょうどに始まるBの運転は含めるけれど、9時ちょうどの最初の運転は含めない約束にしよう。\nあおい：それぞれの回数から合計秒数を出して、何分何秒になるかまで説明しよう。\nけん：AとBは同じ時刻に水を出すこともあるけれど、ここでは水が出ている時間をそれぞれ数えて合計するんだね。二つの運転時間を足して、秒のまま整理してから分と秒に直そう。",
      ),
      written(
        "三つの噴水の運転回数を会話から求め、1回あたりに使う水の量を求めましょう。午前9時ちょうどの運転は数えず、午前10時ちょうどに始まる運転は含めます。式を使い、なぜその計算で求められるのか説明してください。",
        [],
        "1時間の間にAは6回、Bは4回、Cは3回水を出すので、合計13回。1回あたりの水量は780÷13=60L。運転間隔ごとの回数を先に合計してから、全体の使用量を割る。",
        ["各噴水の回数を求めた", "合計13回と計算した", "1回あたり60Lと説明した"],
        "公園の水道メーターを調べたところ、三つの噴水が午前9時から10時までに使った水は、合わせて780Lでした。管理員さんの話では、Aは10分ごと、Bは15分ごと、Cは20分ごとに水を出し、どの噴水も水が出るたびに使う量は同じです。\nみのり：合計の水量は分かったけれど、噴水ごとの回数が違うから、そのまま三つで割るのは違うね。\nさくら：A、B、Cそれぞれの間隔から1時間の回数を数えて、全部で何回水が出たかを先に求めよう。\nゆうた：午前9時ちょうどの最初の運転は数えず、午前10時ちょうどに始まる分は数える約束だよ。合計回数で780Lを分ければ、1回分が分かりそうだね。\nみのり：三つの噴水が同じ量ずつ使うという意味ではなく、どの噴水も「1回の運転で使う量」が同じということだよ。回数を全部合わせてから割るのが大切だね。",
      ),
      written(
        "会話にある二つの測定結果を使い、ノズルPとQの1秒あたりの流量と、1分間に出る水の量を求めましょう。流量の大きい方と、その差も式を使って説明してください。",
        [],
        "Pは8÷20=0.4L/秒で、1分では0.4×60=24L。Qは15÷30=0.5L/秒で、1分では0.5×60=30L。Qの方が1分あたり6L多く、流量が大きい。",
        ["両方の1秒あたりの量を求めた", "1分あたり24Lと30Lを求めた", "差を使ってQを選んだ"],
        "公園の設備を新しくするため、担当者は二種類のノズルを試しました。水道の記録によると、ノズルPは20秒間水を出すと8L、ノズルQは30秒間水を出すと15L出ました。見た目ではどちらも勢いよく水が出ていて、担当者は水が多く出る方を選びたいと考えています。\nゆうた：測った時間が違うから、8Lと15Lだけを比べても、どちらの勢いが強いかは分からないね。\nさくら：1秒あたりに何L出るかにそろえて比べたらよさそう。PとQそれぞれの水量を時間で割ろう。\nみのり：さらに、来園者に説明しやすいよう、1分間に出る量にも直してみよう。どちらが1分あたり何L多いかまで計算して、選んだ理由を伝えよう。\nゆうた：時間の単位をそろえてから比べると、測定時間の違いにまどわされずにすむね。答えには、1秒あたりの量と1分あたりの量の両方を書いて、どちらを選んだか説明しよう。",
      ),
      written(
        "会話にある条件を使い、新しいノズルに交換すると1日と5日間でそれぞれ何L節約できるか求めましょう。1回あたりの節水量と、期間中の運転回数が分かる式を示してください。",
        [],
        "1回あたり5L節約できる。1日の運転回数は3基×3回×2時間=18回なので、1日に5×18=90L、5日間では90×5=450L節約できる。",
        ["1回あたりの差を5Lとした", "1日の運転回数を18回とした", "1日90L、5日450Lを求めた"],
        "公園では、夏の間に噴水を毎日運転するため、水を節約できるノズルへの交換を検討しています。担当者によると、これまでのノズルは1回の運転で22L使いますが、新しいノズルなら17Lに減らせるそうです。噴水は3基あり、それぞれ1時間に3回水を出し、毎日2時間運転します。\nあおい：新しいノズルにすると、1回ごとに使う水が少なくなるね。\nけん：ただ、1回分だけを比べても、1日にどれだけ節約できるかは分からないよ。まず、1回で何L減るかを求めよう。\nあおい：それから、三つの噴水が2時間の間に何回ずつ動くかを考えればいいね。\nけん：同じ運転を5日間続ける予定だから、1日の節水量を使って5日分も求め、式と単位を付けて説明しよう。\nあおい：ここでいう「1時間に3回」は、三基を合わせて3回ではなく、噴水一基が3回ずつという意味だね。三基分と、毎日2時間分の両方を計算に入れよう。",
      ),
      written(
        "噴水AとBを1時間運転した後、タンクに残る水の量を求めましょう。運転開始時は数えず、1時間後ちょうどの運転は含めます。会話中の条件から運転回数と使用量を求め、答えに至る式を説明してください。",
        [],
        "1時間でAは10回、Bは6回運転する。合計16回なので使用量は16×18=288L。タンクの残量は1200−288=912L。",
        ["AとBの運転回数を求めた", "合計使用量288Lを計算した", "残量912Lを示した"],
        "水景広場では、噴水の水を大きなタンクから送っています。イベント前にタンクを確認すると、1200Lの水が入っていました。噴水Aは6分ごと、Bは10分ごとに水を出し、どちらも1回の運転で18L使います。二つの噴水を同時に動かして1時間後に止める予定ですが、その間にタンクへの給水はありません。\nみのり：1時間で何L使うか分からないと、残りの水が足りるか判断できないね。\nゆうた：AとBは運転間隔が違うから、それぞれ何回動くかを別々に数えよう。\nさくら：開始時刻の運転は数えず、1時間後ちょうどに始まる運転は数える約束だよ。まず全部の使用量を出してから、最初の1200Lから引いて残量を求めよう。\nみのり：Aが動くたびに18L、Bが動くたびにも18L使うから、二つの回数は合算してから1回分を掛ければいいね。水があふれたり、途中で補給されたりしないことも条件だよ。",
      ),
      written(
        "会話にある運転間隔と料金から、午前9時から10時までの水道料金を求めましょう。9時ちょうどは数えず、10時ちょうどは含めます。使用量をLとm³の両方で表し、計算の道筋を説明してください。",
        [],
        "1時間にAは10回、Bは6回なので、合計16回。使用量は16×18=288Lで、288÷1000=0.288m³。料金は250×0.288=72円。",
        ["運転回数から288Lを求めた", "0.288m³に換算した", "1日分72円を求めた"],
        "公園の担当者は、噴水を毎日運転した場合の水道料金を予算に入れたいと考えています。午前9時にAとBを動かし、午前10時に止めます。Aは6分ごと、Bは10分ごとに水を出し、どちらも1回で18L使います。水道料金は1m³あたり250円で、1000Lは1m³です。\nさくら：まず、1時間にAとBがそれぞれ何回水を出すか数えよう。\nゆうた：開始した9時ちょうどは数えず、10時ちょうどに始まる運転は含めるんだね。回数が分かったら、使った水をLで求めよう。\nみのり：料金は立方メートルで計算するから、Lをm³に直す必要があるね。単位を確かめながら、1日分の料金まで求めてみよう。\nさくら：1m³に満たない量でも、使った量に応じて料金が決まるものとして計算しよう。固定料金は考えなくてよいから、使用した水量に料金を掛ければいいね。",
      ),
      written(
        "会話にある条件から、噴水を15分運転した後のタンクの水位を求めましょう。水の出入りを体積で考え、1L＝1000cm³を使って水位の変化に直す計算を説明してください。",
        [],
        "底面積は250×160=40,000cm²。噴水と給水の差は1分あたり24−18=6Lで、15分では90L減る。90Lは90,000cm³なので、水位は90,000÷40,000=2.25cm下がり、15分後は30−2.25=27.75cm。",
        ["噴水と給水の差を求めた", "15分で90L減ると計算した", "水位を27.75cmと求めた"],
        "水景広場のタンクは、たて250cm、横160cmの長方形の底をもつ直方体です。今の水位は底から30cmで、噴水を動かすと毎分24Lの水を使います。一方、給水ポンプは毎分18Lをタンクに送ります。担当者はポンプを動かしたまま噴水を15分間運転した後、水位がどこまで下がるか知りたいそうです。水位が変化しても底面積は変わらず、タンクから水があふれることはありません。\nけん：噴水が使う量だけを考えると、実際より水が減ったことにしてしまうね。\nあおい：ポンプから入る量を引いて、1分あたりにタンクから減る量を先に求めよう。\nけん：その量を15分分にしても、まだ水位の変化ではないよ。1Lは1000cm³だから体積をcm³に直し、タンクの底面積で割れば何cm下がったか分かるね。\nあおい：最後に、最初の30cmからその分を引いて答えよう。\nけん：体積の単位と面積の単位をそろえると、割り算の答えがcmになるね。どの段階でLをcm³に直したかも、式に書いて説明しよう。",
      ),
      written(
        "会話中の記録を比べ、使用量の減少量と減少率を求めましょう。また、記録だけから言えることと、節水の原因を確かめるために必要な調べ方を区別して説明してください。",
        [],
        "使用量は360−270=90L減った。減少率は90÷360×100=25％。記録から工夫後に使用量が90L、25％減ったことは分かるが、原因を確かめるには運転条件をそろえ、同じ条件で工夫の有無を比べる必要がある。",
        ["減少量90Lを求めた", "減少率25％を求めた", "原因を確かめる比較方法に触れた"],
        "公園では水を大切に使うため、噴水の運転方法を見直しました。担当者が記録を確認すると、工夫をする前は1日に360L使っていましたが、工夫をした後は270Lになっていました。前後で噴水の台数と1日の運転時間は同じだったそうです。\nみのり：工夫の後に使う水が減ったのは分かるけれど、どれだけ減ったのかな。\nさくら：減った量だけでなく、工夫前の量と比べて何％減ったかも計算できそうだね。\nゆうた：この二つの記録だけで、運転方法の工夫が原因だと言い切れるのかな。天気や点検の状況など、ほかに違いがあったかもしれないよ。\nみのり：資料から確かに分かる結果と、原因を確かめるために追加で調べることを分けて説明しよう。\nさくら：減少率を出すときは、工夫後の270Lではなく工夫前の360Lをもとにするんだね。割合の基準を間違えないようにしよう。\nゆうた：原因を調べるなら、同じ季節や同じ運転時間で何日も記録し、工夫をした場合としない場合を比べる方法が考えられるね。",
      ),
      written(
        "会話にある予備測定をふまえ、三種類のノズルを公平に比べる実験方法を提案してください。変える条件とそろえる条件を区別し、測定結果をどのように確かめるかも説明しましょう。",
        [],
        "同じ水圧、同じ運転時間、同じ測定容器で各ノズルの水量を測る。ノズル以外の条件をそろえ、各種類を複数回測って平均を比べる。予備測定ではCが最も多いが、繰り返し測定して同じ傾向になるか確かめてから結論にする。",
        ["ノズル以外の条件をそろえるとした", "複数回測って平均を比べるとした", "予備結果だけで断定しなかった"],
        "理科クラブでは、噴水のノズルの形によって、同じ時間に出る水の量が変わるかを調べることになりました。予備測定では、Aは20秒で12L、Bは20秒で15L、Cは20秒で18L出ました。ただし、測定したのは各ノズル一回ずつです。実験場所や水道の圧力が変わると結果にも影響する可能性があります。\nあおい：予備測定ではCがいちばん多かったけれど、一回だけの結果でCが必ずよいと言っていいのかな。\nけん：ノズルの形以外の条件が違うと、公平に比べられないね。水圧や水を出す時間、集める容器などをどうするか決めよう。\nあおい：測るたびに少しずつ違うこともありそうだよ。どのノズルも何回か測って、結果を比べる方法がよさそうだね。\nけん：何を変える条件にし、何を同じにするか、また結果をどう確かめるかを実験計画として説明しよう。\nあおい：測る順番も一つのノズルだけ先に何度も行うのではなく、順を入れ替えるとよさそうだね。くり返し測った値の平均を比べて、予備測定と同じ傾向になるか確かめよう。",
      ),
      written(
        "学校祭で、濃縮液と水を表の比で混ぜて飲み物を作ります。実行委員は、できあがりを18Lにするために、それぞれ何Lずつ用意するか知りたいそうです。濃縮液と水を合わせた比の数を手がかりに1つ分の量を求め、両方の必要量を式と単位を付けて説明しましょう。水だけを増やすと濃さが変わってしまいます。完成量と比の両方を確かめながら、必要な量を出してください。最後に二つの量を足して18Lになるか確かめましょう。",
        [table("飲み物の濃さ", ["濃縮液（部）", "水（部）", "できあがり（部）"], [["2", "3", "5"]])],
        "濃縮液と水の合計の比は5なので、18÷5=3.6Lが比の1つ分。濃縮液は3.6×2=7.2L、水は3.6×3=10.8L。",
        ["比の合計が5と分かる", "1つ分の量を求めた", "濃縮液と水の量をそれぞれ示した"],
      ),
      written(
        "理科の時間に、水と食用油を入れた容器へろうの小片を入れたところ、二つの液体の境目にとどまりました。班では「油には浮く」「水には沈む」という反対の予想も出ています。1cm³あたりの重さを比べ、ろうがそれぞれの液体の中でどうなるか、境目にとどまる理由も含めて説明しましょう。「浮く」「沈む」を別々の液体について判断し、ろうの値が二つの液体の値の間にあることを根拠にしてください。",
        [table("液体とろうの密度", ["もの", "1cm³あたりの重さ"], [["食用油", "0.91g"], ["ろう", "0.95g"], ["水", "1.00g"]])],
        "ろうは食用油より密度が大きいので油の中では沈み、水より密度が小さいので水の中では浮く。油と水の境目にとどまると考えられる。",
        ["ろうと油の密度を比較した", "ろうと水の密度を比較した", "浮く・沈むの結論を両方示した"],
      ),
      written(
        "校庭のアサガオで、日光が当たると葉にでんぷんができるかを調べます。日光を当てた葉だけを調べても、でんぷんが日光によってできたのかは比べられません。実験前には、葉にもともとあるでんぷんの影響を少なくするため鉢を暗い場所に置き、実験後に葉をヨウ素液で調べます。日光を当てない葉をどのように準備し、ほかに何を同じにしておけばよいか、変える条件とそろえる条件を分けて説明しましょう。葉の大きさや水やり、実験する時間をそろえる理由も考えてください。",
        [table("実験で使う葉", ["葉A", "葉B"], [["日光に当てる", "日光を当てない"]])],
        "実験前に鉢を暗い場所に置いて、葉にもともとあるでんぷんの影響を少なくする。同じ株の同じくらいの大きさの葉を使い、葉Bだけを光が当たらないようにおおう。水や実験時間などは同じにして、日光の有無だけを変え、実験後にヨウ素液で調べる。",
        ["日光の有無だけを変えるとした", "葉の大きさなど他の条件をそろえるとした", "比較して調べる理由を示した"],
      ),
      written(
        "科学クラブでは、ブランコが1往復する時間はおもりの重さで変わるのかを調べました。ひもは同じ長さにそろえ、表の結果を得ました。測定値から言えることを、重さと時間の両方を挙げて説明してください。また、この回数の実験だけで確かな結論を出せるかどうかも考えましょう。測定のわずかな差が偶然かどうかを判断するには、どのような追加の測定が必要かも提案してください。おもりを変えるときに、振れ幅なども同じにする必要があります。",
        [table("ブランコの実験結果（長さは同じ）", ["おもり", "1往復の時間"], [["40g", "1.8秒"], ["60g", "1.8秒"], ["80g", "1.9秒"]])],
        "この実験では、おもりが40gと60gのときは1.8秒、80gのときは1.9秒だった。差が小さく、測定回数も少ないので、重さで時間が変わると結論づけるには追加実験が必要だ。",
        ["少なくとも2つの測定値を使った", "結果を過度に一般化しなかった", "追加実験など慎重な判断に触れた"],
      ),
      written(
        "地域交流センターでは、電気を大切に使うため、照明・空調・調理室で節電を試しました。担当者は、次の月に一つの工夫を全館へ広げたいと考えています。工夫の前後で電力量が最も大きく減った場所を計算で確かめ、そこを優先する提案を、他の場所との比較を使って書きましょう。減少率ではなく、実際に減った電力量の大きさで選ぶという条件に注意してください。工夫前と工夫後の差をそれぞれ求め、節電の効果を数値で示してください。",
        [table("地域交流センターの月間電力量", ["場所", "工夫前", "工夫後"], [["照明", "320kWh", "240kWh"], ["空調", "500kWh", "430kWh"], ["調理室", "180kWh", "150kWh"]])],
        "照明の工夫を優先する。照明は320−240=80kWh減り、空調の70kWh、調理室の30kWhより減少量が大きいからだ。",
        ["優先する工夫を明確にした", "工夫前後の差を計算した", "他の場所の減少量と比較した"],
      ),
      written(
        "地域の催しの実行委員会では、駐車場の混雑を心配する人と、会場までの移動手段を増やしたい人が話し合っています。アンケートと移動手段の二つの資料を読み、利用しやすくする工夫を一つ提案しましょう。提案だけでなく、両方の資料から数値を挙げ、それらをどう結びつけて考えたかも説明してください。ただし、二つの調査の回答者が同じ人とは限りません。資料から直接分かることと、対策による効果の予想を分けて書きましょう。",
        [
          table("来場者アンケート", ["困ったこと", "回答者"], [["駐車場が混んだ", "42人"], ["会場案内が分かりにくい", "28人"], ["休める場所が少ない", "20人"]]),
          table("来場者の移動手段", ["手段", "人数"], [["自家用車", "90人"], ["バス", "35人"], ["徒歩・自転車", "25人"]]),
        ],
        "提案：臨時バスの案内を増やし、乗り場を分かりやすくして試験的に便を増やす。移動手段では自家用車が90人で最も多く、アンケートでは駐車場の混雑が42人で最も多い。ただし二つの調査の回答者が同じとは限らないため、混雑が減ると断定せず、実施後に利用人数や駐車場の状況を確かめる。",
        ["具体的な工夫を提案した", "二つの資料から数値を引用した", "資料の情報をつないで理由を説明した"],
      ),
      written(
        "地域の加工所では、収穫した果物を使ってジャムを作ります。試作品は、果物と砂糖を表の比で混ぜると、甘さと固さのバランスがよくなりました。今度は果物を2.4kg使う予定です。試作品と同じ味にするには砂糖を何kg用意すればよいか、また加熱前の材料の合計が何kgになるかを、比の1つ分をもとに説明しましょう。単位をそろえた式で、材料ごとの量と合計量が分かるようにしてください。果物の量が変わっても、レシピの比は保たれるものとして考えます。",
        [table("ジャムの試作レシピ", ["果物", "砂糖"], [["4", "3"]])],
        "果物4に対して砂糖は3なので、比の1つ分は2.4÷4=0.6kg。砂糖は0.6×3=1.8kgで、材料の合計は2.4+1.8=4.2kg。",
        ["比の1つ分を求めた", "砂糖の量を求めた", "合計量を式と単位で示した"],
      ),
      written(
        "校外学習では、地図にある学校から資料館まで歩き、その後バスに乗って公園へ向かいます。道に迷わないよう、歩く区間の実際の長さと、歩く時間、全体の移動時間を事前に調べることになりました。縮尺と表の条件を使い、歩く距離をkmで、待ち時間も含めた移動時間を分で説明しましょう。地図上の長さを実際の長さに直すときは、cmとm、kmの単位変換を確かめ、最後にすべての時間を分にそろえてください。",
        [
          table("地図と移動の条件", ["項目", "値"], [["地図の縮尺", "1:25,000"], ["学校から資料館までの地図上の長さ", "3.2cm"], ["歩く速さ", "時速4km"], ["資料館から公園までのバス乗車", "8分"], ["バスを待つ時間", "5分"]]),
        ],
        "3.2cm×25,000=80,000cm=0.8km歩く。時速4kmで0.8km歩く時間は0.8÷4時間=12分。バスと待ち時間を合わせると12+8+5=25分。",
        ["縮尺から0.8kmを求めた", "歩く時間を12分と求めた", "バスと待ち時間を加えた"],
      ),
      written(
        "動物園の飼育体験で、参加者全員に昼食を用意します。子どもも大人も一人一つずつ弁当を受け取り、弁当の4分の1はアレルギーに配慮した特別メニューにすることになりました。表の人数から必要な弁当の合計と特別メニューの数を求め、予算60,000円に収まるかも確かめてください。計算の順序を示し、余った予算も説明しましょう。特別メニューも通常の弁当と同じ値段とし、予算の残額まで確かめて準備担当者へ伝えてください。",
        [table("参加者と弁当の条件", ["項目", "人数・金額"], [["子ども", "64人"], ["大人とスタッフ", "20人"], ["弁当1つの値段", "650円"], ["特別メニューの割合", "全体の1/4"], ["予算", "60,000円"]])],
        "弁当は64+20=84個必要で、特別メニューは84÷4=21個。代金は84×650=54,600円なので予算内であり、60,000−54,600=5,400円残る。",
        ["参加人数から84個と求めた", "特別メニューを21個と求めた", "合計金額と残る予算を正しく求めた"],
      ),
      written(
        "農業クラブでは、同じ広さの畑で育てた野菜の収穫量を、雨の多かった年と少なかった年で比べました。発表では「雨が多いと必ず収穫量が増える」と言い切ってよいでしょうか。表から直接読み取れる変化を数値で説明し、ほかの条件が分からない場合にどこまで結論を言えるかを書きましょう。二つの年では雨の日数以外にも気温や日照、世話の仕方が違った可能性があります。観察結果と原因の説明を分けてください。",
        [table("同じ広さの畑の収穫記録", ["年", "雨の日数", "収穫量"], [["2024年", "12日", "180kg"], ["2025年", "8日", "210kg"]])],
        "雨の日は12日から8日に減った一方、収穫量は180kgから210kgへ30kg増えた。この2年の記録だけでは雨の日数が収穫量を決めたとは言えず、気温や世話の仕方なども調べる必要がある。",
        ["二つの数値の変化を示した", "資料の結果を正しく説明した", "雨が原因と断定できない理由を書いた"],
      ),
      written(
        "学習発表会では、来賓を含めて300人が来る予定で、そのうち来賓24人分の席はあらかじめ予約します。会場の席だけでは足りないのではないかと心配する声が出ました。表から会場の席数を計算し、予約席と自由席がそれぞれ何席かを求めてください。来賓以外の参加者が自由席に座れるか、全員分の席が足りるかを、人数と席数を照らし合わせて説明しましょう。来賓は300人の内数なので、予約席の分を二重に数えないようにしてください。",
        [table("発表会の座席", ["項目", "数"], [["客席の列", "18列"], ["1列の席", "20席"], ["来賓として予約する席", "24席"], ["来場予定", "300人"]])],
        "客席は18×20=360席。来賓24人は予約席に座るので、自由席は360−24=336席。来賓以外は300−24=276人で、自由席は60席多いため、全員が座れる。",
        ["全体の席数を計算した", "予約席を差し引いた", "来場予定と比較して結論を出した"],
      ),
      written(
        "図書委員は、本の紹介を載せる学級新聞を作っています。資料Aには本の内容、資料Bには委員が調べた読書時間の記録、資料Cには下書きがあります。下書きの「長い時間読む人ほど、必ず本が好きになる」という文は、資料だけで言い切れるでしょうか。資料の事実と書き手の考えを区別して、読み手に伝わるように文を直しましょう。二つのグループでは人数が異なるため、答えた人数だけでなく、それぞれのグループに占める割合を比べて判断してください。",
        [
          passage("資料A：本の紹介", "この物語では、主人公が失敗を重ねながら、友達と協力して地域の発表会を成功させます。作者は、上手にできることだけでなく、工夫してやり直すことの大切さを描いています。"),
          table("資料B：学級で聞いた読書時間", ["一日の読書時間", "その本をおもしろいと答えた人数"], [["30分以上", "12人中8人"], ["30分未満", "10人中6人"]]),
          passage("資料C：新聞の下書き", "本を長い時間読む人は、必ず本が好きになる。だから、みんなも毎日長い時間読書をするとよい。"),
        ],
        "30分以上の人は8÷12で約67％、30分未満の人は6÷10で60％がおもしろいと答えた。この調査では前者の割合が少し高いが、人数が少なく、読書時間だけが理由とは言い切れない。",
        ["二つのグループの人数と割合を使った", "必ずとは言えない理由を書いた", "資料から分かる範囲に文を直した"],
      ),
      written(
        "国語の授業で、同じ出来事でも言葉の選び方によって読み手に伝わる印象が変わることを学びました。委員会の記録に「発表者は話した」とだけ書かれていましたが、聞いた人の様子も伝わる文に直したいそうです。資料の説明を参考に、どのような様子を表す言葉を選ぶかを考え、言葉が伝える様子の違いも説明しましょう。発表者が話す速さだけでなく、聞き手の反応とのつながりが読み手に伝わるようにしてください。",
        [
          passage("言葉の資料", "「すらすら」は、つかえずに物事を進める様子を表します。「ゆっくり」は、急がず時間をかける様子を表します。「どきどき」は、緊張や期待で心臓が速く打つような気持ちを表します。"),
          passage("委員会の記録", "発表者は話した。聞いていた人は、うなずきながら最後まで聞いていた。"),
        ],
        "発表者は、聞いている人のうなずきを確かめながら、ゆっくり話した。資料の「ゆっくり」を使うと、急いで言い終えるのではなく、相手に伝えようとする様子が分かる。",
        ["資料の言葉の意味に合う語を選んだ", "出来事の様子が分かる文に直した", "言葉が伝える印象を説明した"],
      ),
      written(
        "理科クラブでは、飲み物を温かく保つ容器を選ぶ実験をしました。三つの容器に同じ温度のお湯を同じ量入れ、同じ部屋に20分置いた記録です。温度の下がり方を比べて最も保温できた容器を選び、実験から言えることと、さらに確かめるとよいことを説明しましょう。容器以外の条件がそろっていることを根拠に今回の結果をまとめ、別の条件でも同じ結果になるかは慎重に考えてください。温度の差を計算し、下がり方の少ない容器を選びます。",
        [table("20分後の湯の温度", ["容器", "入れた直後", "20分後"], [["ふたなし", "80℃", "52℃"], ["ふた付き", "80℃", "63℃"], ["布で包む", "80℃", "68℃"]])],
        "布で包んだ容器は80−68=12℃下がり、ふた付きは17℃、ふたなしは28℃下がったので、今回の条件では布で包んだ容器が最も保温できた。別の日や複数回でも同じ結果になるか確かめたい。",
        ["温度の下がり方を計算した", "資料に基づいて容器を選んだ", "条件や追加実験に触れた"],
      ),
      written(
        "校庭に棒を立て、晴れた日に影の向きと長さを記録しました。班の一人は「太陽が動いたから影も動いた」とまとめましたが、観察したのは影の変化です。記録にある時刻ごとの向きと長さを順に説明し、観察結果とその理由を区別して、より正確なまとめを書きましょう。資料から直接確かめられるのは棒の影の様子です。太陽の位置については、観察結果をもとに考えた説明として書いてください。",
        [table("棒の影の観察", ["時刻", "影の向き", "影の長さ"], [["午前9時", "西", "長い"], ["正午", "北", "短い"], ["午後3時", "東", "長い"]])],
        "影は午前9時に西向きで長く、正午には北向きで短く、午後3時には東向きで長くなった。観察から分かるのは影の変化であり、その理由は太陽の見かけの位置が変わったためと考えられる。",
        ["三つの時刻の影の向きと長さを示した", "観察結果と理由を分けた", "太陽の位置との関係を説明した"],
      ),
      written(
        "学校では水をむだにしないため、手洗いのときに流し続ける時間を短くする取り組みを始めます。今の使用量と一人あたりの節水量が表にあります。毎日同じ人数が登校し、全員が節水を続けるとして、1日と180日間でどれだけ水を節約できるかを計算してください。その量が身近な人にも伝わるよう、全校への呼びかけを数値の根拠とともに書きましょう。途中の計算から、毎日続けることの意味が伝わる文を考えてください。",
        [table("学校の水使用", ["項目", "量"], [["児童数", "230人"], ["一人が1日に減らせる量", "2L"], ["年間の登校日", "180日"]])],
        "1日に減らせる水は230×2=460L。180日では460×180=82,800Lを節約できる。小さな節水でも全員が続ければ大きな量になると伝える。",
        ["一日の節水量を求めた", "180日分を計算した", "数値を使って呼びかけた"],
      ),
      written(
        "運動会の実行委員は、組ごとの順位に応じて得点を決めています。昨年は、1位の人数が多い組が必ずしも優勝しませんでした。そこで、1位と4位以下の点は変えず、2位と3位の点を見直すことになりました。表の人数を使い、2位を8点、3位を4点にした場合にどの組の合計点が上になるかを計算し、得点配分によって順位が変わる理由を説明しましょう。人数だけや1位の回数だけで判断せず、それぞれの順位の人数に点数を掛けてから合計してください。",
        [table("昨年の順位別人数", ["組", "1位", "2位", "3位", "4位以下"], [["赤組", "4人", "3人", "3人", "2人"], ["青組", "3人", "5人", "2人", "2人"]]), table("見直し後の点数", ["順位", "1位", "2位", "3位", "4位以下"], [["点数", "10点", "8点", "4点", "1点"]])],
        "赤組は4×10+3×8+3×4+2×1=78点。青組は3×10+5×8+2×4+2×1=80点なので、青組が2点上になる。1位の人数だけでなく、各順位の人数と配点をすべて合わせるため順位が変わる。",
        ["両組の合計点を正しく計算した", "順位の結論を示した", "人数と配点の関係を説明した"],
      ),
      written(
        "交流センターの展示室に、直方体の大きな模型を置きます。模型の外側には、底面も含めて紙を貼り、辺のつなぎ目や重なり分は考えないことにしました。材料をむだにしないため、表の三つの長さから必要な紙の面積を求め、どの面の面積を何枚分足したのか分かるように説明しましょう。長さ・幅・高さを組み合わせると同じ大きさの面が二枚ずつあります。六面の面積をすべて確認し、最後に必要な紙の単位を付けてください。",
        [table("直方体模型の大きさ", ["長さ", "幅", "高さ"], [["120cm", "80cm", "50cm"]])],
        "上下面は120×80×2=19,200cm²、側面は120×50×2=12,000cm²と80×50×2=8,000cm²。合計39,200cm²の紙が必要。",
        ["三組の向かい合う面を計算した", "面積をすべて合計した", "cm²で答えた"],
      ),
      written(
        "直売所では、同じ種類の柑橘を二つの袋で販売しています。見た目の袋の大きさだけで決めず、値引き後の値段を同じ重さあたりで比べることになりました。表にある重さと値引き率を使って、それぞれの値引き後の値段を求め、100gあたりの値段が安い袋を理由とともに選びましょう。値引き率をそのまま値引き額と取り違えないようにし、重さもgにそろえて計算過程を示してください。割引後の価格と単位あたりの価格の両方を資料に沿って比べます。",
        [table("柑橘の販売", ["袋", "重さ", "値引き前", "値引き"], [["A", "3kg", "1,350円", "10％引き"], ["B", "2.5kg", "1,200円", "5％引き"]])],
        "Aは1,350×0.9=1,215円で、100gあたり40.5円。Bは1,200×0.95=1,140円で、100gあたり45.6円。値引き後もAの方が100gあたり安い。",
        ["両方の値引き後の値段を求めた", "重さをそろえて比較した", "選んだ理由を数値で示した"],
      ),
      written(
        "市の担当者は、災害時に避難所で水が足りるかを確かめています。子どもと大人を合わせた人数分の水を、1人あたりの必要量をもとに準備し、2L入りのペットボトルを箱で保管します。表の条件から必要な水の総量と箱の数を求め、箱はばら売りされないとして、何L余るかも説明しましょう。人数、日数、1箱の容量を順に使い、最後に必要な箱数を切り上げてください。箱数と余る水量の両方を、単位を付けて伝えましょう。",
        [table("避難所の水の条件", ["項目", "数"], [["子ども", "24人"], ["大人", "6人"], ["一人1日あたり", "3L"], ["準備する日数", "3日"], ["1箱の本数", "6本（1本2L）"]])],
        "人数は24+6=30人。水は30×3×3=270L必要。1箱は6×2=12Lなので270÷12=22.5箱。切り上げて23箱買うと276Lになり、6L余る。",
        ["必要人数と日数を使って270Lと求めた", "1箱の容量から23箱とした", "余る水を6Lと求めた"],
      ),
      written(
        "地域の自然観察会では、鳥を見かけた回数が増えたという声がありました。担当者は、数の変化を記録した表と、調査方法を説明した文章を用意しています。二つを読んで、どの変化を資料から読み取れるか、調査方法の違いが結論にどう影響するかを分けて説明しましょう。年ごとに観察する季節や回数が異なるため、見つかった種類数の差だけで環境の変化を断定できるかも考えてください。より確かに比べるため、どの条件をそろえて調査するかも提案します。",
        [
          table("観察された鳥の種類数", ["年", "種類数"], [["2022年", "14種類"], ["2024年", "17種類"], ["2026年", "18種類"]]),
          passage("調査方法について", "2022年は春の一日だけ、2024年は春と秋に各一日、2026年は春から秋まで毎月一日ずつ観察しました。観察場所は同じ遊歩道ですが、調査する日数は年によって異なります。"),
        ],
        "種類数は2022年の14から2026年の18へ増えている。ただし2026年は観察日数が多く、見つける機会も増えているため、鳥の種類そのものが増えたと断定するには、同じ日数・時期で調べる必要がある。",
        ["種類数の変化を数値で示した", "調査日数の違いに気づいた", "結論の限界と必要な調査を説明した"],
      ),
      written(
        "地域の交流施設では、子どもが安全に遊べる広場を整備します。アンケートには希望する設備、図面には設置できる面積、担当者の話には優先条件が書かれています。これらを別々に見ず、条件を満たす案を一つ選び、必要な面積を計算して、なぜその案が利用者に合うのかを説明しましょう。希望者が多くても、面積または予算の条件を満たさない案は選べません。まず条件に合う案を確かめてから比べてください。",
        [
          table("利用者アンケート", ["希望する設備", "希望した人数"], [["日よけのある休憩場所", "36人"], ["小さな遊具", "28人"], ["花だん", "16人"]]),
          table("設置案", ["案", "必要な面積", "工事費"], [["A：休憩場所", "6m×4m", "18万円"], ["B：遊具", "7m×5m", "24万円"], ["C：花だん", "8m×3m", "12万円"]]),
          passage("担当者の条件", "整備できるのは30m²以下で、予算は20万円までです。まず一つだけ設置し、利用者の希望が多い案を優先することになりました。"),
        ],
        "休憩場所の案Aを選ぶ。面積は6×4=24m²、工事費は18万円で、面積と予算の両方の条件を満たす。希望した人数も36人で最も多い。",
        ["面積と予算の両条件を確認した", "希望人数を比較して案を選んだ", "数値を根拠に説明した"],
      ),
      written(
        "子ども会では、限られた時間で複数の活動を行う計画を立てています。活動の長さ、準備にかかる時間、終わりの時刻を守る条件が表にあります。活動を順番に行う場合に、すべてを実施できるかを計算し、難しい場合は何分足りないか、時間を守るための工夫を一つ提案しましょう。活動時間だけを足して準備時間を忘れないようにし、時計の時刻から使える時間を求めて比べてください。提案する工夫がどの時間を短くするのかも説明してください。",
        [
          table("活動と準備時間", ["活動", "活動時間", "準備時間"], [["工作", "25分", "5分"], ["自然観察", "30分", "10分"], ["ふり返り", "15分", "5分"]]),
          table("使える時間", ["開始", "終了"], [["午後1時", "午後2時30分"]]),
        ],
        "必要な時間は25+5+30+10+15+5=90分で、使える時間も午後1時から2時30分までの90分なので、予定どおりならすべて実施できる。移動や片付けが必要なら、その時間を別に確保する工夫が必要。",
        ["活動と準備時間を合計した", "使える90分と比べた", "移動・片付けなど現実の条件にも触れた"],
      ),
      written(
        "広報係は、町の取り組みを紹介する掲示を作っています。資料には、取り組みを始める前後の数値と、参加者の感想が記録されています。数値の変化だけを見て成功と決めるのではなく、何が改善し、何がまだ分からないかを整理して、次の一年に続ける提案を理由とともに書きましょう。同じ地域・同じ期間の回収記録として比べますが、取り組み以外の原因もあり得ます。感想の中に示された課題にも触れてください。",
        [
          table("同じ地域・同じ期間の取り組み記録", ["項目", "開始前", "1年後"], [["ごみの量", "240kg", "180kg"], ["参加した世帯", "40世帯", "65世帯"]]),
          passage("参加者の感想", "ごみを分別する方法が分かりやすくなったという声がある一方、参加できなかった世帯からは、回収場所が遠いという意見も寄せられました。"),
        ],
        "同じ地域・期間で比べると、ごみの量は240kgから180kgへ60kg減り、参加世帯は40から65へ増えた。取り組みが広がったことは分かるが、ごみが減った原因をこれだけで断定はできない。回収場所が遠いという意見を受け、場所を増やすなど参加しやすい方法を試して次の年も続けたい。",
        ["前後の数値を正しく比べた", "感想の資料も使った", "課題を踏まえた提案をした"],
      ),
    ],
  };
}

function makeRandomSixthGradeMathQuestions(recentQuestions = loadRecentSixthGradeQuestions(), difficulty = "standard") {
  if (difficulty === "entrance") return makeYamaguchiQuestions();
  const banks = {
    "分数のかけ算・わり算": [],
    "割合・百分率": [],
    "比と比例・反比例": [],
    "速さ・単位量あたりの大きさ": [],
    "円の面積・体積": [],
    "拡大図・縮図と対称な図形": [],
    "データの活用": [],
    "文字と式・数量の関係": [],
    "場合の数・条件整理": [],
  };
  if (difficulty === "application") return makeSixthGradeApplicationQuestions(recentQuestions);
  const add = (unit, prompt, answer, distractors, explanation) =>
    generatedQuestion(unit, prompt, answer, distractors, explanation);
  const numericQuestion = (unit, prompt, answer, suffix, explanation) =>
    roundedNumericQuestion(unit, prompt, answer, suffix, explanation, add);
  const fractionQuestion = (unit, prompt, numerator, denominator, explanation) => {
    const answer = simplifyFraction(numerator, denominator);
    const distractors = [
      simplifyFraction(numerator + 1, denominator),
      simplifyFraction(numerator + 2, denominator),
      simplifyFraction(numerator, denominator + 1),
    ];
    return add(unit, prompt, answer, distractors, explanation);
  };

  const templates = {
    "分数のかけ算・わり算": [
      () => {
        const numerator = randomInteger(2, 9);
        const denominator = randomInteger(3, 12);
        const people = randomInteger(2, 8);
        return fractionQuestion("分数のかけ算・わり算",
          `${numerator}/${denominator} Lのジュースを${people}人で同じ量ずつ分けます。1人分は何L？`,
          numerator, denominator * people,
          `${numerator}/${denominator} ÷ ${people} = ${numerator}/${denominator} × 1/${people} = ${simplifyFraction(numerator, denominator * people)} Lです。`);
      },
      () => {
        const a = randomInteger(2, 9);
        const b = randomInteger(3, 12);
        const c = randomInteger(2, 9);
        const d = randomInteger(3, 12);
        return fractionQuestion("分数のかけ算・わり算", `${a}/${b} × ${c}/${d} を計算しよう。`,
          a * c, b * d, `分子どうし、分母どうしをかけて約分します。答えは ${simplifyFraction(a * c, b * d)} です。`);
      },
      () => {
        const a = randomInteger(2, 9);
        const b = randomInteger(3, 12);
        const c = randomInteger(2, 9);
        const d = randomInteger(3, 12);
        return fractionQuestion("分数のかけ算・わり算", `${a}/${b} ÷ ${c}/${d} を計算しよう。`,
          a * d, b * c, `わる数の逆数をかけます。${a}/${b} × ${d}/${c} = ${simplifyFraction(a * d, b * c)} です。`);
      },
      () => {
        const numerator = randomInteger(2, 9);
        const denominator = randomInteger(3, 12);
        const multiplier = randomInteger(2, 8);
        return fractionQuestion("分数のかけ算・わり算",
          `${numerator}/${denominator} × ${multiplier} を計算しよう。`,
          numerator * multiplier, denominator,
          `${numerator}×${multiplier}/${denominator}を約分すると${simplifyFraction(numerator * multiplier, denominator)}です。`);
      },
      () => {
        const numerator = randomInteger(2, 8);
        const denominator = randomInteger(3, 10);
        const pieceDenominator = randomInteger(2, 8);
        return numericQuestion("分数のかけ算・わり算",
          `${numerator}/${denominator} mのリボンを、1本に1/${pieceDenominator} mずつ使うと何本できますか？`,
          (numerator * pieceDenominator) / denominator, "本",
          `${numerator}/${denominator} ÷ 1/${pieceDenominator} = ${numerator}/${denominator} × ${pieceDenominator} です。`);
      },
    ],
    "割合・百分率": [
      () => {
        const whole = randomInteger(2, 10) * 100;
        const rate = randomInteger(1, 9) * 10;
        const part = whole * rate / 100;
        return numericQuestion("割合・百分率",
          `${whole}人のうち${part}人が参加しました。参加した人は全体の何％？`,
          rate, "%", `割合は比べられる量÷もとにする量です。${part}÷${whole}=${formatMathNumber(rate / 100)}なので、${rate}％です。`);
      },
      () => {
        const whole = randomInteger(2, 15) * 100;
        const rate = [10, 20, 25, 30, 40, 50, 60, 75, 80][randomInteger(0, 8)];
        const part = whole * rate / 100;
        return numericQuestion("割合・百分率",
          `${whole}円の${rate}％はいくら？`,
          part, "円", `${rate}％は${rate}/100です。${whole}×${rate}/100=${part}円です。`);
      },
      () => {
        const whole = randomInteger(2, 12) * 100;
        const rate = [10, 20, 25, 40, 50, 75][randomInteger(0, 5)];
        const part = whole * rate / 100;
        return numericQuestion("割合・百分率",
          `${part}人は、${whole}人の何％？`,
          rate, "%", `比べられる量÷もとにする量=${part}÷${whole}=${formatMathNumber(rate / 100)}。百分率では${rate}％です。`);
      },
      () => {
        const whole = randomInteger(2, 12) * 100;
        const rate = [10, 20, 25, 40, 50, 75][randomInteger(0, 5)];
        const part = whole * rate / 100;
        return numericQuestion("割合・百分率",
          `${part}円が全体の${rate}％です。もとにする金額はいくら？`,
          whole, "円", `もとにする量=比べられる量÷割合です。${part}÷${formatMathNumber(rate / 100)}=${whole}円です。`);
      },
      () => {
        const original = randomInteger(5, 30) * 100;
        const rate = [10, 20, 25, 30, 40, 50][randomInteger(0, 5)];
        const discount = original * rate / 100;
        return numericQuestion("割合・百分率",
          `${original}円の品物が${rate}％引きです。ねびき後の値段はいくら？`,
          original - discount, "円", `ねびき額は${original}×${rate}/100=${discount}円。${original}−${discount}=${original - discount}円です。`);
      },
      () => {
        const original = randomInteger(2, 12) * 100;
        const rate = [10, 20, 25, 30, 40, 50][randomInteger(0, 5)];
        const increase = original * rate / 100;
        return numericQuestion("割合・百分率",
          `${original}円の品物の値段が${rate}％上がりました。新しい値段はいくら？`,
          original + increase, "円", `値上がり分は${original}×${rate}/100=${increase}円。${original}+${increase}=${original + increase}円です。`);
      },
      () => {
        const rate = randomInteger(1, 9) * 10;
        const decimal = rate / 100;
        return add("割合・百分率",
          `割合${formatMathNumber(decimal)}を百分率で表すと？`,
          `${rate}%`, [`${rate / 10}%`, `${rate + 10}%`, `${formatMathNumber(decimal)}%`],
          `割合を百分率で表すには100をかけます。${formatMathNumber(decimal)}×100=${rate}％です。`);
      },
      () => {
        const rate = [10, 20, 25, 40, 50, 75, 80, 90][randomInteger(0, 7)];
        const decimal = rate / 100;
        return add("割合・百分率",
          `${rate}％を小数で表すと？`,
          formatMathNumber(decimal), [`${formatMathNumber(rate * 100)}%`, `${formatMathNumber(rate / 10)}`, `${formatMathNumber(decimal / 10)}`],
          `百分率は100をもとにした割合です。${rate}÷100=${formatMathNumber(decimal)}です。`);
      },
    ],
    "比と比例・反比例": [
      () => {
        const a = randomInteger(2, 9);
        const b = randomInteger(2, 9);
        const scale = randomInteger(2, 8);
        const divisor = (left, right) => right === 0 ? left : divisor(right, left % right);
        const commonDivisor = divisor(a, b);
        const reducedA = a / commonDivisor;
        const reducedB = b / commonDivisor;
        return add("比と比例・反比例", `${a * scale}:${b * scale}を、最も簡単な整数の比にしよう。`,
          `${reducedA}:${reducedB}`, [`${reducedA + 1}:${reducedB}`, `${reducedA}:${reducedB + 1}`, `${reducedA + 2}:${reducedB}`],
          `比の両方を${scale * commonDivisor}でわり、最も簡単にすると${reducedA}:${reducedB}になります。`);
      },
      () => {
        const a = randomInteger(2, 7);
        const b = randomInteger(2, 8);
        const scale = randomInteger(2, 9);
        return numericQuestion("比と比例・反比例",
          `赤と白の絵の具を${a}:${b}で混ぜます。赤が${a * scale}杯なら、白は何杯？`,
          b * scale, "杯", `赤は${scale}倍になっているので、白も${b}×${scale}=${b * scale}杯です。`);
      },
      () => {
        const a = randomInteger(2, 5);
        const b = randomInteger(2, 6);
        const scale = randomInteger(2, 6);
        return numericQuestion("比と比例・反比例",
          `男子と女子の比は${a}:${b}で、全部で${(a + b) * scale}人です。男子は何人？`,
          a * scale, "人", `比の合計は${a + b}。1つ分は${scale}人なので、男子は${a}×${scale}=${a * scale}人です。`);
      },
      () => {
        const coefficient = randomInteger(2, 9);
        const x1 = randomInteger(2, 8);
        const x2 = randomInteger(2, 9);
        return numericQuestion("比と比例・反比例",
          `yはxに比例し、x=${x1}のときy=${coefficient * x1}です。x=${x2}のときyはいくつ？`,
          coefficient * x2, "", `比例定数は${coefficient * x1}÷${x1}=${coefficient}。${coefficient}×${x2}=${coefficient * x2}です。`);
      },
      () => {
        const product = randomInteger(3, 12) * randomInteger(4, 10);
        const x1 = randomInteger(2, 8);
        const x2 = randomInteger(2, 8);
        return numericQuestion("比と比例・反比例",
          `yはxに反比例し、x=${x1}のときy=${product / x1}です。x=${x2}のときyはいくつ？`,
          product / x2, "", `反比例ではxとyの積が一定です。${product}÷${x2}=${formatMathNumber(product / x2)}です。`);
      },
      () => {
        const coefficient = randomInteger(2, 9);
        return add("比と比例・反比例", `yがxに比例し、比例定数が${coefficient}のとき、正しい式はどれ？`,
          `y=${coefficient}x`, [`y=x+${coefficient}`, `y=${coefficient}÷x`, `x+y=${coefficient}`],
          `比例の関係はy=axと表せるので、比例定数${coefficient}ならy=${coefficient}xです。`);
      },
    ],
    "速さ・単位量あたりの大きさ": [
      () => {
        const speed = randomInteger(35, 180);
        const time = randomInteger(2, 9);
        return numericQuestion("速さ・単位量あたりの大きさ",
          `分速${speed}mで${time}分歩きました。進んだ道のりは？`,
          speed * time, "m", `道のり=速さ×時間です。${speed}×${time}=${speed * time}mです。`);
      },
      () => {
        const speed = randomInteger(40, 180);
        const time = randomInteger(2, 9);
        const distance = speed * time;
        return numericQuestion("速さ・単位量あたりの大きさ",
          `${distance}mを${time}分で走りました。分速は何m？`,
          speed, "m/分", `速さ=道のり÷時間です。${distance}÷${time}=${speed}m/分です。`);
      },
      () => {
        const speed = randomInteger(2, 12);
        const minutes = randomInteger(15, 55);
        return numericQuestion("速さ・単位量あたりの大きさ",
          `時速${speed}kmで${minutes}分進むと、何km進みますか？`,
          speed * minutes / 60, "km", `${minutes}分は${formatMathNumber(minutes / 60)}時間です。${speed}×${formatMathNumber(minutes / 60)}=${formatMathNumber(speed * minutes / 60)}kmです。`);
      },
      () => {
        const weight1 = randomInteger(3, 9) * 100;
        const weight2 = randomInteger(4, 12) * 100;
        const price1 = randomInteger(35, 95) * (weight1 / 100);
        let price2 = randomInteger(35, 95) * (weight2 / 100);
        if (price1 / weight1 === price2 / weight2) price2 += weight2 / 100;
        const cheaper = price1 / weight1 < price2 / weight2 ? 1 : 2;
        return add("速さ・単位量あたりの大きさ",
          `${weight1}gで${price1}円の品物Aと、${weight2}gで${price2}円の品物B。100gあたり安いのは？`,
          `品物${cheaper === 1 ? "A" : "B"}`, [`品物${cheaper === 1 ? "B" : "A"}`, "どちらも同じ", "重さだけでは比べられない"],
          `100gあたりの値段を比べます。Aは${formatMathNumber(price1 / (weight1 / 100))}円、Bは${formatMathNumber(price2 / (weight2 / 100))}円です。`);
      },
      () => {
        const duration = randomInteger(15, 55);
        const startHour = randomInteger(1, 10);
        const startMinute = randomInteger(0, 59);
        const endMinuteTotal = startHour * 60 + startMinute + duration;
        const endHour = Math.floor(endMinuteTotal / 60) % 12 || 12;
        const endMinute = endMinuteTotal % 60;
        return numericQuestion("速さ・単位量あたりの大きさ",
          `午後${startHour}時${String(startMinute).padStart(2, "0")}分から午後${endHour}時${String(endMinute).padStart(2, "0")}分までの時間は？`,
          duration, "分", `時刻の差を計算すると${duration}分です。`);
      },
      () => {
        const speed = randomInteger(30, 150);
        const time = randomInteger(2, 9);
        return numericQuestion("速さ・単位量あたりの大きさ",
          `分速${speed}mで${speed * time}m進むには何分かかりますか？`,
          time, "分", `時間=道のり÷速さです。${speed * time}÷${speed}=${time}分です。`);
      },
    ],
    "円の面積・体積": [
      () => {
        const radius = randomInteger(2, 15);
        const area = radius * radius * 3.14;
        return numericQuestion("円の面積・体積",
          `半径${radius}cmの円の面積を、円周率を3.14として求めよう。`,
          area, "cm²", `円の面積は半径×半径×円周率です。${radius}×${radius}×3.14=${formatMathNumber(area)}cm²です。`);
      },
      () => {
        const side = randomInteger(3, 15);
        const height = randomInteger(3, 12);
        return numericQuestion("円の面積・体積",
          `底面が1辺${side}cmの正方形で、高さ${height}cmの四角柱の体積は？`,
          side * side * height, "cm³", `底面積は${side}×${side}=${side * side}cm²。${side * side}×${height}=${side * side * height}cm³です。`);
      },
      () => {
        const radius = randomInteger(2, 9);
        const height = randomInteger(3, 12);
        const volume = radius * radius * 3.14 * height;
        return numericQuestion("円の面積・体積",
          `半径${radius}cm、高さ${height}cmの円柱の体積は？（円周率は3.14）`,
          volume, "cm³", `底面積は${radius}×${radius}×3.14=${formatMathNumber(radius * radius * 3.14)}cm²。高さをかけて${formatMathNumber(volume)}cm³です。`);
      },
      () => {
        const base = randomInteger(10, 40);
        const height = randomInteger(3, 12);
        return numericQuestion("円の面積・体積",
          `底面積${base}cm²、高さ${height}cmの三角柱の体積は？`,
          base * height, "cm³", `柱体の体積は底面積×高さです。${base}×${height}=${base * height}cm³です。`);
      },
      () => {
        const radius = randomInteger(2, 10);
        const area = radius * radius * 3.14 / 2;
        return numericQuestion("円の面積・体積",
          `半径${radius}cmの円を半分にした形の面積は？（円周率は3.14）`,
          area, "cm²", `円全体の面積は${radius}×${radius}×3.14=${formatMathNumber(area * 2)}cm²。その半分は${formatMathNumber(area)}cm²です。`);
      },
      () => {
        const diameter = randomInteger(4, 20);
        const radius = diameter / 2;
        const area = radius * radius * 3.14;
        return numericQuestion("円の面積・体積",
          `直径${diameter}cmの円の面積を、円周率を3.14として求めよう。`,
          area, "cm²", `半径は${diameter}÷2=${radius}cmです。${radius}×${radius}×3.14=${formatMathNumber(area)}cm²です。`);
      },
    ],
    "拡大図・縮図と対称な図形": [
      () => {
        const scale = randomInteger(1000, 50000);
        const mapLength = randomInteger(2, 12);
        const actualMeters = scale * mapLength / 100;
        return numericQuestion("拡大図・縮図と対称な図形",
          `縮尺1:${scale}の地図で${mapLength}cmの道のりは、実際には何m？`,
          actualMeters, "m", `実際は${mapLength}×${scale}=${mapLength * scale}cmです。100cmを1mに直すと${formatMathNumber(actualMeters)}mです。`);
      },
      () => {
        const original = randomInteger(2, 12);
        const multiplier = randomInteger(2, 5);
        return numericQuestion("拡大図・縮図と対称な図形",
          `${original}cmの辺が拡大図では${original * multiplier}cmになりました。拡大する割合は？`,
          multiplier, "倍", `拡大する割合は${original * multiplier}÷${original}=${multiplier}倍です。`);
      },
      () => {
        const angle = randomInteger(35, 145);
        return numericQuestion("拡大図・縮図と対称な図形",
          `ある三角形の角が${angle}°です。相似な拡大図で対応する角は何度？`,
          angle, "°", "拡大図や縮図では、対応する角の大きさは変わりません。");
      },
      () => {
        const numberOfSides = randomInteger(3, 9);
        return numericQuestion("拡大図・縮図と対称な図形",
          `正${numberOfSides}角形の対称の軸は何本？`,
          numberOfSides, "本", `正${numberOfSides}角形は、対称の軸を${numberOfSides}本もちます。`);
      },
      () => {
        const scale = randomInteger(100, 2000);
        const actualMeters = randomInteger(5, 80);
        const drawingCentimeters = actualMeters * 100 / scale;
        return numericQuestion("拡大図・縮図と対称な図形",
          `縮尺1:${scale}の図で、実際の長さが${actualMeters}mの塀は何cmで表されますか？`,
          drawingCentimeters, "cm", `${actualMeters}mは${actualMeters * 100}cmです。図の長さは${actualMeters * 100}÷${scale}=${formatMathNumber(drawingCentimeters)}cmです。`);
      },
      () => {
        const sides = randomInteger(2, 8) * 2;
        return add("拡大図・縮図と対称な図形",
          `正${sides}角形を点対称の中心のまわりに何度回転すると重なりますか？`,
          "180°", ["90°", "120°", "360°"],
          `正${sides}角形は点対称なので、対称の中心のまわりに180°回転すると重なります。`);
      },
    ],
    "データの活用": [
      () => {
        const values = Array.from({ length: 5 }, () => randomInteger(10, 60));
        const average = values.reduce((sum, value) => sum + value, 0) / values.length;
        return numericQuestion("データの活用", `5人の記録は${values.join("、")}点でした。平均は何点？`,
          average, "点", `合計${values.reduce((sum, value) => sum + value, 0)}点を5人でわると、平均は${formatMathNumber(average)}点です。`);
      },
      () => {
        const values = Array.from({ length: 5 }, () => randomInteger(10, 90)).sort((a, b) => a - b);
        return numericQuestion("データの活用", `データ ${values.join("、")} の中央値は？`,
          values[2], "", "5個のデータを小さい順に並べたとき、3番目の値が中央値です。");
      },
      () => {
        const mode = randomInteger(10, 60);
        const values = [mode, mode, mode, randomInteger(1, mode - 1), randomInteger(mode + 1, mode + 20)];
        return numericQuestion("データの活用", `データ ${shuffled(values).join("、")} の最頻値は？`,
          mode, "", `${mode}が最も多く現れるので、最頻値は${mode}です。`);
      },
      () => {
        const low = randomInteger(2, 40);
        const high = low + randomInteger(5, 50);
        const values = [low, randomInteger(low + 1, high - 1), high, randomInteger(low + 1, high - 1)];
        return numericQuestion("データの活用", `データ ${values.join("、")} の範囲はいくつ？`,
          high - low, "", `範囲は最大値${high}から最小値${low}をひいて求めます。${high}−${low}=${high - low}です。`);
      },
      () => {
        const people = randomInteger(4, 9);
        const average = randomInteger(60, 95);
        const lastScore = randomInteger(20, 100);
        const knownTotal = average * people - lastScore;
        return numericQuestion("データの活用",
          `${people}人の平均点は${average}点です。${people - 1}人の合計が${knownTotal}点なら、残り1人は何点？`,
          lastScore, "点", `全員の合計は${average}×${people}=${average * people}点。残りは${average * people}−${knownTotal}=${lastScore}点です。`);
      },
      () => {
        const mode = randomInteger(2, 12);
        const count = randomInteger(3, 8);
        const other = mode === 2 ? 1 : mode - 1;
        return numericQuestion("データの活用",
          `ドットプロットで${mode}冊の人が${count}人、${other}冊の人が2人でした。人数が多い読書冊数は？`,
          mode, "冊", `${mode}冊の人は${count}人で、${other}冊の人の2人より多いです。`);
      },
    ],
    "文字と式・数量の関係": [
      () => {
        const count = randomInteger(2, 9);
        const payment = randomInteger(500, 2000);
        return add("文字と式・数量の関係",
          `1個x円のノートを${count}冊買い、${payment}円を払いました。おつりを表す式は？`,
          `${payment}−${count}x`, [`${count}x−${payment}`, `${payment}÷${count}x`, `${count}+x+${payment}`],
          `代金は${count}x円なので、${payment}円から${count}x円をひきます。`);
      },
      () => {
        const people = randomInteger(2, 12);
        return add("文字と式・数量の関係",
          `x個のあめを${people}人に同じ数ずつ分けます。1人分を表す式は？`,
          `x÷${people}`, [`${people}÷x`, `x−${people}`, `${people}x`],
          `全体のx個を${people}人で等しく分けるので、1人分はx÷${people}個です。`);
      },
      () => {
        const length = randomInteger(2, 15);
        const width = randomInteger(2, 15);
        const area = length * width;
        return add("文字と式・数量の関係",
          `縦がa cm、横がb cmの長方形で、a=${length}、b=${width}のときの面積は？`,
          `${area}cm²`, [`${area + 1}cm²`, `${area + 2}cm²`, `${area + 3}cm²`],
          `面積は縦×横です。${length}×${width}=${area}cm²です。`);
      },
      () => {
        const x = randomInteger(2, 15);
        const coefficient = randomInteger(2, 9);
        const constant = randomInteger(2, 20);
        return numericQuestion("文字と式・数量の関係",
          `x=${x}のとき、${coefficient}×x+${constant}の値はいくつ？`,
          coefficient * x + constant, "", `${coefficient}×${x}+${constant}=${coefficient * x + constant}です。`);
      },
      () => {
        const multiplier = randomInteger(2, 9);
        const constant = randomInteger(2, 12);
        return add("文字と式・数量の関係",
          `「ある数xの${multiplier}倍より${constant}大きい数」を表す式は？`,
          `${multiplier}x+${constant}`, [`${multiplier}(x+${constant})`, `x+${multiplier}+${constant}`, `${multiplier + 1}x+${constant}`],
          `xの${multiplier}倍は${multiplier}x。それより${constant}大きいので${multiplier}x+${constant}です。`);
      },
      () => {
        const time = randomInteger(2, 8);
        const distance = randomInteger(20, 90);
        return numericQuestion("文字と式・数量の関係",
          `一定の速さで${time}時間に${distance}km進みます。時間をx時間とすると道のりを表す式は？`,
          distance / time, "x",
          `速さは${distance}÷${time}=${formatMathNumber(distance / time)}km/時です。道のりは速さ×時間なので${formatMathNumber(distance / time)}xです。`);
      },
    ],
  };

  for (const [unit, unitTemplates] of Object.entries(templates)) {
    const excluded = new Set(recentQuestions[unit] || []);
    const prompts = new Set();
    for (let count = 0; count < sixthGradeQuestionCountPerUnit; count += 1) {
      let question;
      for (let attempt = 0; attempt < 500; attempt += 1) {
        question = unitTemplates[randomInteger(0, unitTemplates.length - 1)]();
        if (!excluded.has(question.prompt) && !prompts.has(question.prompt)) break;
        question = null;
      }
      if (!question) throw new Error(`新しい問題を作成できませんでした: ${unit}`);
      banks[unit].push(question);
      prompts.add(question.prompt);
    }
  }

  return banks;
}

const customQuestionBanks = {
  小6: {
    math: makeRandomSixthGradeMathQuestions(),
  },
};

const stageForGrade = (grade) => grade.startsWith("小") ? "elementary" : grade.startsWith("中") ? "middle" : "high";
const gradeLongName = (grade) => {
  const school = grade.slice(0, 1);
  const year = grade.slice(1);
  return `${school === "小" ? "小学" : school === "中" ? "中学" : "高校"}${year}年生`;
};
const today = new Date();
document.querySelector("#today-date").textContent = new Intl.DateTimeFormat("ja-JP", {
  year: "numeric", month: "long", day: "numeric", weekday: "long",
}).format(today);
const dailyMessages = [
  "「できた！」を一つずつ。",
  "「どうしたら勉強できるかな？」を一緒に考えよう。",
  "分からないところまで戻って、一つずつ確かめよう。",
  "小さな「できた！」が、次の自信につながるよ。",
  "自分に合った勉強の仕方を見つけていこう。",
  "つまずいたところが、これから伸びるところ。",
  "あせらず、自分のペースで一歩ずつ進もう。",
];
const localMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
const dayNumber = Math.floor(localMidnight.getTime() / 86400000);
document.querySelectorAll("[data-daily-message]").forEach((message) => {
  message.textContent = dailyMessages[dayNumber % dailyMessages.length];
});

let stats = loadStats();
let activeQuestions = [];
let questionIndex = 0;
let correctAnswers = 0;
let answered = false;
let activeSubject = null;
let activeUnit = null;
let activeHistoryEntry = null;

function showStorageNotice(message) {
  const notice = document.querySelector("#storage-notice");
  notice.textContent = message;
  notice.hidden = false;
}

function loadStats() {
  try {
    const saved = JSON.parse(localStorage.getItem("manabi-pocket-stats") || "{}");
    return {
      sessions: Number.isSafeInteger(saved.sessions) && saved.sessions >= 0 ? saved.sessions : 0,
      correct: Number.isSafeInteger(saved.correct) && saved.correct >= 0 ? saved.correct : 0,
      studyDates: Array.isArray(saved.studyDates)
        ? [...new Set(saved.studyDates.filter((date) => typeof date === "string" && /^\d{4}-\d{2}-\d{2}$/.test(date)))]
        : [],
      history: Array.isArray(saved.history) ? saved.history.filter((entry) =>
        entry && typeof entry.completedAt === "string" &&
        Number.isFinite(Date.parse(entry.completedAt)) &&
        typeof entry.grade === "string" && typeof entry.subject === "string" &&
        typeof entry.icon === "string" && typeof entry.color === "string" &&
        Number.isSafeInteger(entry.correct) && entry.correct >= 0 &&
        Number.isSafeInteger(entry.total) && entry.total > 0 && entry.correct <= entry.total
      ).map((entry) => ({
        ...entry,
        unit: typeof entry.unit === "string" ? entry.unit : "",
        answered: Number.isSafeInteger(entry.answered) && entry.answered >= 0 && entry.answered <= entry.total
          ? entry.answered
          : entry.total,
        mistakes: Array.isArray(entry.mistakes) ? entry.mistakes.filter((mistake) =>
          mistake && typeof mistake.prompt === "string"
        ).map((mistake) => ({
          prompt: mistake.prompt,
          explanation: typeof mistake.explanation === "string" ? mistake.explanation : "",
          selectedAnswer: typeof mistake.selectedAnswer === "string" ? mistake.selectedAnswer : "",
          correctAnswer: typeof mistake.correctAnswer === "string" ? mistake.correctAnswer : "",
          context: typeof mistake.context === "string" ? mistake.context : "",
          response: typeof mistake.response === "string" ? mistake.response : "",
          modelAnswer: typeof mistake.modelAnswer === "string" ? mistake.modelAnswer : "",
          criteria: Array.isArray(mistake.criteria) ? mistake.criteria.filter((criterion) =>
            criterion && typeof criterion.text === "string"
          ).map((criterion) => ({
            text: criterion.text,
            checked: criterion.checked === true,
          })) : [],
        })).slice(-100) : [],
      })).slice(0, 50) : [],
    };
  } catch {
    showStorageNotice("学習記録を読み込めませんでした。新しい記録から始めます。");
    return { sessions: 0, correct: 0, studyDates: [], history: [] };
  }
}

function saveStats() {
  try {
    localStorage.setItem("manabi-pocket-stats", JSON.stringify(stats));
  } catch {
    showStorageNotice("このブラウザに学習記録を保存できませんでした。ブラウザの設定をご確認ください。");
  }
}

function updateStats() {
  document.querySelector("#days-stat").innerHTML = `${stats.studyDates.length}<span>日</span>`;
  document.querySelector("#sessions-stat").innerHTML = `${stats.sessions}<span>回</span>`;
  document.querySelector("#correct-stat").innerHTML = `${stats.correct}<span>問</span>`;
  document.querySelector("#history-days-stat").innerHTML = `${stats.studyDates.length}<span>日</span>`;
  document.querySelector("#history-sessions-stat").innerHTML = `${stats.sessions}<span>回</span>`;
  document.querySelector("#history-correct-stat").innerHTML = `${stats.correct}<span>問</span>`;
}

function renderHistory() {
  const historyList = document.querySelector("#history-list");
  if (stats.history.length === 0) {
    const empty = document.createElement("div");
    empty.className = "history-empty";
    const icon = document.createElement("div");
    icon.className = "history-empty-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = "📝";
    const message = document.createElement("p");
    message.textContent = "まだチャレンジのきろくはありません。問題に挑戦してみよう！";
    const link = document.createElement("a");
    link.className = "history-start-link";
    link.href = "#subjects";
    link.dataset.view = "subjects";
    link.textContent = "教科をえらぶ →";
    empty.append(icon, message, link);
    historyList.replaceChildren(empty);
    return;
  }

  historyList.replaceChildren(...stats.history.map((entry) => {
    const item = document.createElement("article");
    item.className = "history-item";
    const main = document.createElement("div");
    main.className = "history-item-main";
    const icon = document.createElement("span");
    icon.className = `history-item-icon ${entry.color}`;
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = entry.icon;
    const details = document.createElement("div");
    const subject = document.createElement("strong");
    subject.textContent = `${entry.grade} · ${entry.subject}${entry.unit ? ` · ${entry.unit}` : ""}`;
    const caption = document.createElement("span");
    caption.textContent = entry.answered < entry.total
      ? `${entry.answered} / ${entry.total}問に回答 · 進行中`
      : `${entry.total}問チャレンジ`;
    details.append(subject, caption);
    main.append(icon, details);
    const date = document.createElement("time");
    date.className = "history-item-date";
    date.dateTime = entry.completedAt;
    date.textContent = new Intl.DateTimeFormat("ja-JP", {
      year: "numeric", month: "long", day: "numeric",
      hour: "2-digit", minute: "2-digit",
    }).format(new Date(entry.completedAt));
    const score = document.createElement("span");
    score.className = "history-score";
    score.textContent = entry.answered < entry.total
      ? `${entry.correct}問正解`
      : `${entry.correct} / ${entry.total}問 正解`;
    item.append(main, date, score);
    if (entry.mistakes.length > 0) {
      const reviewToggle = document.createElement("button");
      reviewToggle.type = "button";
      reviewToggle.className = "history-review-toggle";
      reviewToggle.textContent = `間違えた問題を復習（${entry.mistakes.length}問）`;
      reviewToggle.setAttribute("aria-expanded", "false");
      const reviewList = document.createElement("div");
      reviewList.className = "history-review-list";
      reviewList.hidden = true;
      reviewList.replaceChildren(...entry.mistakes.map((mistake, index) => {
        const reviewItem = document.createElement("article");
        reviewItem.className = "history-review-item";
        const heading = document.createElement("h3");
        heading.textContent = `復習 ${index + 1}`;
        const prompt = document.createElement("p");
        prompt.className = "history-review-prompt";
        prompt.textContent = mistake.prompt;
        reviewItem.append(heading, prompt);
        if (mistake.context) {
          const context = document.createElement("p");
          context.className = "history-review-context";
          context.textContent = mistake.context;
          reviewItem.append(context);
        }
        if (mistake.selectedAnswer || mistake.correctAnswer) {
          const answer = document.createElement("p");
          answer.className = "history-review-answer";
          answer.textContent = `あなたの答え：${mistake.selectedAnswer || "（未記入）"}　正しい答え：${mistake.correctAnswer || "模範例を確認"}`;
          reviewItem.append(answer);
        }
        if (mistake.response) {
          const response = document.createElement("p");
          response.className = "history-review-response";
          response.textContent = `記述した答え：${mistake.response}`;
          reviewItem.append(response);
        }
        if (mistake.explanation) {
          const explanation = document.createElement("p");
          explanation.className = "history-review-explanation";
          explanation.textContent = `解説：${mistake.explanation}`;
          reviewItem.append(explanation);
        }
        if (mistake.modelAnswer) {
          const modelAnswer = document.createElement("p");
          modelAnswer.className = "history-review-model";
          modelAnswer.textContent = `模範例：${mistake.modelAnswer}`;
          reviewItem.append(modelAnswer);
        }
        if (mistake.criteria.length > 0) {
          const criteria = document.createElement("ul");
          criteria.className = "history-review-criteria";
          mistake.criteria.forEach((criterion) => {
            const item = document.createElement("li");
            item.textContent = `${criterion.checked ? "✓" : "□"} ${criterion.text}`;
            criteria.append(item);
          });
          reviewItem.append(criteria);
        }
        return reviewItem;
      }));
      reviewToggle.addEventListener("click", () => {
        reviewList.hidden = !reviewList.hidden;
        reviewToggle.setAttribute("aria-expanded", String(!reviewList.hidden));
        reviewToggle.textContent = `${reviewList.hidden ? "間違えた問題を復習" : "復習を閉じる"}（${entry.mistakes.length}問）`;
      });
      item.append(reviewToggle, reviewList);
    }
    return item;
  }));
}

function renderSubjects() {
  const stage = stageForGrade(gradeSelect.value);
  const subjects = subjectsByStage[stage].filter((subject) => subjectsByGrade[gradeSelect.value].includes(subject.id));
  const previous = subjectSelect.value;
  subjectSelect.replaceChildren(...subjects.map((subject) => {
    const option = document.createElement("option");
    option.value = subject.id;
    option.textContent = subject.name;
    return option;
  }));
  subjectSelect.value = subjects.some((subject) => subject.id === previous) ? previous : subjects[0].id;
  sixthGradeMathLevelField.hidden = gradeSelect.value !== "小6" || subjectSelect.value !== "math";
  yamaguchiPrepNote.hidden = sixthGradeMathLevelField.hidden || sixthGradeMathLevelSelect.value !== "entrance";
  middleThirdEnglishLevelField.hidden = !isMiddleThirdEnglish();
  renderUnits();
  subjectGrid.replaceChildren(...subjects.map((subject) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = `subject-card ${subject.color}${subject.id === subjectSelect.value ? " selected" : ""}`;
    card.dataset.subject = subject.id;
    card.setAttribute("aria-pressed", String(subject.id === subjectSelect.value));

    const tag = document.createElement("span");
    tag.className = "subject-tag";
    tag.textContent = "単元別";
    const text = document.createElement("span");
    const title = document.createElement("h3");
    title.textContent = subject.name;
    const description = document.createElement("p");
    description.textContent = subject.description;
    text.append(title, description);
    const icon = document.createElement("span");
    icon.className = "subject-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = subject.icon;
    card.append(tag, text, icon);
    card.addEventListener("click", () => {
      subjectSelect.value = subject.id;
      syncSubjectCards();
      sixthGradeMathLevelField.hidden = gradeSelect.value !== "小6" || subjectSelect.value !== "math";
      yamaguchiPrepNote.hidden = sixthGradeMathLevelField.hidden || sixthGradeMathLevelSelect.value !== "entrance";
      middleThirdEnglishLevelField.hidden = !isMiddleThirdEnglish();
      renderUnits();
    });
    return card;
  }));
}

function renderUnits() {
  const previous = [...unitOptions.querySelectorAll("input:checked")]
    .filter((input) => input.dataset.region !== "true")
    .map((input) => input.value);
  const units = [...new Set(availableQuestionsForSelection().map((question) => question.unit))];
  const selectedUnits = previous.filter((unit) => units.includes(unit));
  const isEntrancePractice = gradeSelect.value === "小6" && subjectSelect.value === "math" &&
    sixthGradeMathLevelSelect.value === "entrance";
  unitFieldLegend.textContent = isEntrancePractice
    ? "県・学校（複数選択できます）"
    : "単元（複数選択できます）";
  unitOptions.setAttribute("aria-label", isEntrancePractice ? "受験先" : "単元");
  const unitLabels = units.map((unit) => {
    const label = document.createElement("label");
    label.className = "unit-option";
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.value = unit;
    checkbox.checked = selectedUnits.includes(unit);
    const name = document.createElement("span");
    name.textContent = unit;
    label.append(checkbox, name);
    checkbox.addEventListener("change", updateQuestionCountLimit);
    return { unit, label };
  });
  if (isEntrancePractice) {
    const regionGroup = document.createElement("div");
    regionGroup.className = "unit-region-group";
    const regionLabel = document.createElement("label");
    regionLabel.className = "unit-option unit-region-option";
    const regionCheckbox = document.createElement("input");
    regionCheckbox.type = "checkbox";
    regionCheckbox.dataset.region = "true";
    regionCheckbox.setAttribute("aria-label", "山口県の受験先をすべて選択");
    regionCheckbox.addEventListener("change", () => {
      regionGroup.querySelectorAll(".unit-option input:not([data-region])").forEach((checkbox) => {
        checkbox.checked = regionCheckbox.checked;
      });
      updateQuestionCountLimit();
    });
    const regionName = document.createElement("span");
    regionName.className = "unit-region-name";
    regionName.textContent = "山口県";
    regionLabel.append(regionCheckbox, regionName);
    regionGroup.append(regionLabel, ...unitLabels.map(({ label }) => label));
    unitOptions.replaceChildren(regionGroup);
  } else {
    unitOptions.replaceChildren(...unitLabels.map(({ label }) => label));
  }
  updateQuestionCountLimit();
}

function toggleAllUnits() {
  const checkboxes = [...unitOptions.querySelectorAll("input[type='checkbox']")];
  const shouldCheck = checkboxes.some((checkbox) => !checkbox.checked);
  checkboxes.forEach((checkbox) => {
    checkbox.checked = shouldCheck;
  });
  updateQuestionCountLimit();
}

function availableQuestionsForSelection() {
  const stage = stageForGrade(gradeSelect.value);
  const customBank = customQuestionBanks[gradeSelect.value]?.[subjectSelect.value];
  const gradeQuestionForSubject = gradeQuestions[gradeSelect.value][subjectSelect.value];
  if (isMiddleThirdEnglish()) {
    return completeMiddleThirdEnglishBanks[middleThirdEnglishLevelSelect.value].map((question) => ({
      ...question,
      prompt: question.prompt.replaceAll("\\n", "\n"),
    }));
  }
  if (gradeSelect.value === "小6" && subjectSelect.value === "math") {
    return Object.values(customBank || {}).flat();
  }
  return customBank
    ? Object.values(customBank).flat()
    : [gradeQuestionForSubject, ...questions[stage][subjectSelect.value]];
}

function isMiddleThirdEnglish() {
  return gradeSelect.value === "中3" && subjectSelect.value === "english";
}

function updateQuestionCountLimit() {
  const checkboxes = [...unitOptions.querySelectorAll("input[type='checkbox']")];
  const regionCheckbox = checkboxes.find((checkbox) => checkbox.dataset.region === "true");
  const schoolCheckboxes = checkboxes.filter((checkbox) => checkbox.dataset.region !== "true");
  if (regionCheckbox && schoolCheckboxes.length > 0) {
    const selectedSchools = schoolCheckboxes.filter((checkbox) => checkbox.checked).length;
    regionCheckbox.checked = selectedSchools === schoolCheckboxes.length;
    regionCheckbox.indeterminate = selectedSchools > 0 && selectedSchools < schoolCheckboxes.length;
  }
  const selectedUnits = schoolCheckboxes.filter((input) => input.checked).map((input) => input.value);
  const availableCount = availableQuestionsForSelection()
    .filter((question) => selectedUnits.includes(question.unit)).length;
  const startButton = document.querySelector("#start-button");
  const limitMessage = document.querySelector("#setup-question-limit");
  const unitCheckboxes = checkboxes;
  const allUnitsSelected = unitCheckboxes.length > 0 && unitCheckboxes.every((checkbox) => checkbox.checked);
  const isEntrancePractice = gradeSelect.value === "小6" && subjectSelect.value === "math" &&
    sixthGradeMathLevelSelect.value === "entrance";
  unitSelectAllButton.textContent = allUnitsSelected
    ? "すべて解除"
    : isEntrancePractice ? "受験先を選択" : "すべてチェック";
  unitSelectAllButton.setAttribute("aria-pressed", String(allUnitsSelected));
  unitSelectAllButton.disabled = unitCheckboxes.length === 0;
  questionCountInput.max = String(Math.max(availableCount, 1));
  if (!Number.isSafeInteger(questionCountInput.valueAsNumber) || questionCountInput.valueAsNumber < 1) {
    questionCountInput.value = String(Math.min(5, Math.max(availableCount, 1)));
  } else if (availableCount > 0 && questionCountInput.valueAsNumber > availableCount) {
    questionCountInput.value = String(availableCount);
  }
  startButton.disabled = availableCount === 0;
  limitMessage.textContent = availableCount === 0
    ? "単元を1つ以上選んでください。"
    : `選んだ単元から${availableCount}問出題できます。`;
}

function syncSubjectCards() {
  subjectGrid.querySelectorAll(".subject-card").forEach((card) => {
    const selected = card.dataset.subject === subjectSelect.value;
    card.classList.toggle("selected", selected);
    card.setAttribute("aria-pressed", String(selected));
  });
}

function updateGradeLabels() {
  document.querySelector("#profile-grade").textContent = gradeSelect.value;
  document.querySelector("#welcome-grade").textContent = gradeLongName(gradeSelect.value);
}

function startQuiz() {
  const stage = stageForGrade(gradeSelect.value);
  const subject = subjectsByStage[stage].find((item) => item.id === subjectSelect.value);
  if (!subject) return;
  activeSubject = subject;
  const isSixthGradeMath = gradeSelect.value === "小6" && subjectSelect.value === "math";
  const isApplicationPractice = isSixthGradeMath && sixthGradeMathLevelSelect.value === "application";
  const isEntrancePractice = isSixthGradeMath && sixthGradeMathLevelSelect.value === "entrance";
  const isMiddleEnglishPractice = isMiddleThirdEnglish();
  const middleEnglishLevelName = {
    standard: "標準",
    application: "応用",
    entrance: "受験",
  }[middleThirdEnglishLevelSelect.value];
  if (isSixthGradeMath) {
    customQuestionBanks.小6.math = makeRandomSixthGradeMathQuestions(
      loadRecentSixthGradeQuestions(),
      isEntrancePractice ? "entrance" : isApplicationPractice ? "application" : "standard",
    );
  }
  const selectedUnits = [...unitOptions.querySelectorAll("input:checked")]
    .filter((input) => input.dataset.region !== "true")
    .map((input) => input.value);
  const availableQuestions = availableQuestionsForSelection()
    .filter((question) => selectedUnits.includes(question.unit));
  const requestedCount = questionCountInput.valueAsNumber;
  if (availableQuestions.length === 0 || !Number.isSafeInteger(requestedCount) ||
      requestedCount < 1 || requestedCount > availableQuestions.length) {
    return;
  }
  activeUnit = isEntrancePractice
    ? `受験対策：山口県：${selectedUnits.join("・")}`
    : isApplicationPractice
    ? `応用・適性検査対策：${selectedUnits.join("・")}`
    : isMiddleEnglishPractice
    ? `英語${middleEnglishLevelName}：${selectedUnits.join("・")}`
    : selectedUnits.join("・");
  activeQuestions = shuffled(availableQuestions).slice(0, requestedCount).map((question) => {
    if (question.writtenResponse) return { ...question };
    const options = shuffled(question.options.map((option, index) => ({
      option,
      correct: index === question.answer,
    })));
    return {
      ...question,
      options: options.map(({ option }) => option),
      answer: options.findIndex(({ correct }) => correct),
    };
  });
  if (isSixthGradeMath && !isEntrancePractice) {
    rememberSixthGradeQuestions(activeQuestions);
  }
  questionIndex = 0;
  correctAnswers = 0;
  activeHistoryEntry = null;
  quizNext.dataset.result = "false";
  quizSubject.textContent = `${gradeLongName(gradeSelect.value)} · ${subject.name}${isEntrancePractice ? " · 受験対策" : isApplicationPractice ? " · 応用・適性検査対策" : isMiddleEnglishPractice ? ` · ${middleEnglishLevelName}` : ""}`;
  renderQuestion();
  quizDialog.showModal();
}

function renderQuestion() {
  answered = false;
  const question = activeQuestions[questionIndex];
  quizCount.textContent = `QUESTION ${questionIndex + 1} / ${activeQuestions.length}`;
  document.querySelector("#quiz-unit").textContent = question.unit;
  quizTitle.textContent = question.prompt;
  quizProgressFill.style.width = `${(questionIndex / activeQuestions.length) * 100}%`;
  quizFeedback.textContent = "";
  quizFeedback.className = "quiz-feedback";
  quizNext.disabled = true;
  quizNext.textContent = question.writtenResponse ? "記述してね" : "こたえをえらんでね";
  quizOptions.hidden = Boolean(question.writtenResponse);
  writtenResponse.hidden = !question.writtenResponse;
  writtenResponse.replaceChildren();
  if (question.writtenResponse) {
    renderWrittenResponse(question);
    quizOptions.replaceChildren();
    return;
  }
  quizOptions.replaceChildren(...question.options.map((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "quiz-option";
    button.textContent = option;
    button.addEventListener("click", () => chooseAnswer(index));
    return button;
  }));
}

function renderWrittenResponse(question) {
  const instructions = document.createElement("p");
  instructions.className = "written-instructions";
  instructions.textContent = `問題文や資料にある数値・条件を根拠に、結論と理由を自分の言葉で${question.minCharacters}字以上書きましょう。数値や文章は練習用に作成したものです。入力した内容は自動採点せず、模範例と観点で自己チェックします。`;

  const materialElements = question.materials.map((material) => {
    const section = document.createElement("section");
    section.className = material.title === "話し合い"
      ? "written-material written-dialogue"
      : "written-material";
    const heading = document.createElement("h3");
    heading.textContent = material.title;
    if (material.text) {
      const content = document.createElement("p");
      content.className = "written-passage";
      content.textContent = material.text;
      section.append(heading, content);
      return section;
    }
    if (material.chart) {
      const chart = document.createElement("div");
      chart.className = "written-bar-chart";
      chart.setAttribute("role", "img");
      chart.setAttribute("aria-label", `${material.title}の棒グラフ`);
      const maximum = Math.max(...material.chart.map((item) => item.value));
      material.chart.forEach((item) => {
        const row = document.createElement("div");
        row.className = "written-bar-row";
        const label = document.createElement("span");
        label.textContent = item.label;
        const track = document.createElement("div");
        track.className = "written-bar-track";
        const bar = document.createElement("div");
        bar.className = "written-bar";
        bar.style.width = `${item.value / maximum * 100}%`;
        track.append(bar);
        const value = document.createElement("strong");
        value.textContent = `${item.value}人`;
        row.append(label, track, value);
        chart.append(row);
      });
      section.append(heading, chart);
      return section;
    }
    const wrapper = document.createElement("div");
    wrapper.className = "written-table-wrapper";
    const table = document.createElement("table");
    const head = document.createElement("thead");
    const headerRow = document.createElement("tr");
    material.headers.forEach((headingText) => {
      const cell = document.createElement("th");
      cell.scope = "col";
      cell.textContent = headingText;
      headerRow.append(cell);
    });
    head.append(headerRow);
    const body = document.createElement("tbody");
    material.rows.forEach((row) => {
      const rowElement = document.createElement("tr");
      row.forEach((cellText, index) => {
        const cell = document.createElement(index === 0 ? "th" : "td");
        if (index === 0) cell.scope = "row";
        cell.textContent = cellText;
        rowElement.append(cell);
      });
      body.append(rowElement);
    });
    table.append(head, body);
    wrapper.append(table);
    section.append(heading, wrapper);
    return section;
  });

  const label = document.createElement("label");
  label.className = "written-answer-label";
  label.textContent = "あなたの答え";
  const textarea = document.createElement("textarea");
  textarea.className = "written-answer";
  textarea.maxLength = 1000;
  textarea.rows = 5;
  textarea.setAttribute("aria-label", "記述式の答え");
  const submit = document.createElement("button");
  submit.type = "button";
  submit.className = "written-submit";
  submit.textContent = "記述を確認する";
  const status = document.createElement("p");
  status.className = "written-status";
  status.setAttribute("role", "status");
  status.setAttribute("aria-live", "polite");
  label.append(textarea);
  writtenResponse.append(instructions, ...materialElements, label, submit, status);

  submit.addEventListener("click", () => {
    textarea.disabled = true;
    submit.disabled = true;
    status.textContent = "模範例とチェック項目を見て、自分の答えを確認しましょう。";

    const sample = document.createElement("section");
    sample.className = "written-sample";
    const sampleHeading = document.createElement("h3");
    sampleHeading.textContent = "模範例";
    const sampleText = document.createElement("p");
    sampleText.textContent = question.modelAnswer;
    sample.append(sampleHeading, sampleText);

    const checklistHeading = document.createElement("h3");
    checklistHeading.className = "written-checklist-heading";
    checklistHeading.textContent = "自分の答えを観点別にチェック";
    const checklistHelp = document.createElement("p");
    checklistHelp.className = "written-checklist-help";
    checklistHelp.textContent = "模範例と比べ、書けている項目にチェックしてください。自己チェックを省略して、次の問題へ進むこともできます。";
    const checklist = document.createElement("div");
    checklist.className = "written-checklist";
    question.criteria.forEach((criterion) => {
      const criterionLabel = document.createElement("label");
      criterionLabel.className = "written-check-item";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = criterion;
      const text = document.createElement("span");
      text.textContent = criterion;
      criterionLabel.append(checkbox, text);
      checklist.append(criterionLabel);
    });
    const finish = document.createElement("button");
    finish.type = "button";
    finish.className = "written-submit";
    finish.textContent = "自己チェックを確定する（任意）";
    const checkStatus = document.createElement("p");
    checkStatus.className = "written-status";
    checkStatus.setAttribute("role", "status");
    checkStatus.setAttribute("aria-live", "polite");
    writtenResponse.append(sample, checklistHeading, checklistHelp, checklist, finish, checkStatus);
    quizNext.disabled = false;
    quizNext.textContent = questionIndex === activeQuestions.length - 1 ? "結果をみる" : "次の問題へ";
    finish.addEventListener("click", () => {
      const checks = [...checklist.querySelectorAll("input[type='checkbox']")];
      if (checks.some((checkbox) => !checkbox.checked)) {
        checkStatus.textContent = "まだチェックされていない観点があります。書けなかったところも、振り返りとして確認しましょう。";
      }
      finish.disabled = true;
      checks.forEach((checkbox) => { checkbox.disabled = true; });
      completeWrittenAnswer(
        checks.every((checkbox) => checkbox.checked),
        true,
        textarea.value.trim(),
        checks.map((checkbox) => ({ text: checkbox.value, checked: checkbox.checked })),
      );
    });
    sample.scrollIntoView({ block: "nearest", behavior: "smooth" });
  });
}

function completeWrittenAnswer(isSelfChecked, shouldReview = true, response = "", criteria = []) {
  if (answered) return;
  answered = true;
  if (isSelfChecked) correctAnswers += 1;
  const question = activeQuestions[questionIndex];
  recordAnswer(isSelfChecked, shouldReview ? { question, response, criteria } : null);
  quizFeedback.textContent = isSelfChecked
    ? "自己チェック完了。模範例の観点を自分の答えで確認できました。"
    : "振り返り完了。チェックできなかった観点を、模範例を参考に書き直してみましょう。";
  quizFeedback.classList.add(isSelfChecked ? "good" : "bad");
  quizNext.disabled = false;
  quizNext.textContent = questionIndex === activeQuestions.length - 1 ? "結果をみる" : "次の問題へ";
}

function chooseAnswer(selectedIndex) {
  if (answered) return;
  answered = true;
  const question = activeQuestions[questionIndex];
  const isCorrect = selectedIndex === question.answer;
  if (isCorrect) correctAnswers += 1;
  recordAnswer(isCorrect, isCorrect ? null : {
    question,
    selectedAnswer: question.options[selectedIndex],
    correctAnswer: question.options[question.answer],
  });
  quizOptions.querySelectorAll(".quiz-option").forEach((button, index) => {
    button.disabled = true;
    if (index === question.answer) button.classList.add("correct");
    else if (index === selectedIndex) button.classList.add("incorrect");
  });
  quizFeedback.textContent = `${isCorrect ? "せいかい！" : "おしい！"} ${question.explanation}`;
  quizFeedback.classList.add(isCorrect ? "good" : "bad");
  quizNext.disabled = false;
  quizNext.textContent = questionIndex === activeQuestions.length - 1 ? "結果をみる" : "次の問題へ";
}

function recordAnswer(isCorrect, mistake = null) {
  const now = new Date();
  if (!activeHistoryEntry) {
    activeHistoryEntry = {
      completedAt: now.toISOString(),
      grade: gradeSelect.value,
      subject: activeSubject.name,
      unit: activeUnit,
      icon: activeSubject.icon,
      color: activeSubject.color,
      correct: 0,
      answered: 0,
      total: activeQuestions.length,
      mistakes: [],
    };
    stats.sessions += 1;
    stats.history.unshift(activeHistoryEntry);
  }

  activeHistoryEntry.completedAt = now.toISOString();
  activeHistoryEntry.answered += 1;
  if (isCorrect) {
    activeHistoryEntry.correct += 1;
    stats.correct += 1;
  } else if (mistake) {
    const { question } = mistake;
    const context = (question.materials || []).map((material) => {
      if (material.text) return `${material.title}：${material.text}`;
      if (material.chart) {
        return `${material.title}：${material.chart.map(({ label, value }) => `${label} ${value}`).join("、")}`;
      }
      return `${material.title}：${material.rows.map((row) => row.join("、")).join("／")}`;
    }).join("\n");
    activeHistoryEntry.mistakes.push({
      prompt: question.prompt,
      explanation: question.explanation || "",
      selectedAnswer: mistake.selectedAnswer || "",
      correctAnswer: mistake.correctAnswer || "",
      context,
      response: mistake.response || "",
      modelAnswer: question.writtenResponse ? question.modelAnswer : "",
      criteria: mistake.criteria || [],
    });
  }

  const dateParts = new Intl.DateTimeFormat("en-CA", {
    year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now).reduce((parts, part) => {
    if (part.type !== "literal") parts[part.type] = part.value;
    return parts;
  }, {});
  const todayKey = `${dateParts.year}-${dateParts.month}-${dateParts.day}`;
  if (!stats.studyDates.includes(todayKey)) stats.studyDates.push(todayKey);
  stats.history = stats.history.slice(0, 50);
  const storedMistakes = [...stats.history].reverse().flatMap((entry) =>
    (entry.mistakes || []).map((entryMistake) => ({ entry, entryMistake }))
  );
  storedMistakes.slice(0, Math.max(0, storedMistakes.length - 100)).forEach(({ entry, entryMistake }) => {
    entry.mistakes.splice(entry.mistakes.indexOf(entryMistake), 1);
  });
  saveStats();
  updateStats();
}

function showResult() {
  const percent = Math.round((correctAnswers / activeQuestions.length) * 100);
  quizProgressFill.style.width = "100%";
  quizCount.textContent = "TODAY'S RESULT";
  quizOptions.replaceChildren();
  quizOptions.hidden = false;
  writtenResponse.replaceChildren();
  writtenResponse.hidden = true;
  quizFeedback.textContent = "";
  quizFeedback.className = "quiz-feedback";
  quizTitle.innerHTML = "";
  const result = document.createElement("div");
  result.className = "quiz-result";
  const emoji = document.createElement("div");
  emoji.className = "quiz-result-emoji";
  emoji.textContent = percent === 100 ? "🏆" : percent >= 60 ? "🎉" : "🌱";
  const title = document.createElement("h2");
  title.textContent = `${activeQuestions.length}問中 ${correctAnswers}問正解！`;
  const message = document.createElement("p");
  message.textContent = activeQuestions.some((question) => question.writtenResponse)
    ? "記述問題の正解数は、模範例と観点に基づく自己チェックです。自分の言葉で説明する練習を続けましょう。"
    : percent === 100 ? "すばらしい！ぜんぶ正解だよ。" : percent >= 60 ? "いい調子！この調子で続けよう。" : "チャレンジしたことがえらい！解説をふりかえってみよう。";
  result.append(emoji, title, message);
  quizTitle.append(result);

  quizNext.disabled = false;
  quizNext.textContent = "ホームにもどる";
  quizNext.dataset.result = "true";
}

function renderPage(view) {
  const page = ["home", "subjects", "progress"].includes(view) ? view : "home";
  const isHistory = page === "progress";
  document.querySelector("#dashboard-view").hidden = isHistory;
  document.querySelector("#progress").hidden = !isHistory;
  document.querySelectorAll(".nav-link[data-view]").forEach((link) => {
    const isActive = link.dataset.view === page || (page === "subjects" && link.dataset.view === "subjects");
    link.classList.toggle("active", isActive);
    if (isActive) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  if (isHistory) renderHistory();
  window.scrollTo(0, 0);
  if (page === "subjects") {
    requestAnimationFrame(() => document.querySelector("#subjects").scrollIntoView({ behavior: "smooth", block: "start" }));
  }
}

document.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-view]");
  if (!link) return;
  event.preventDefault();
  const page = link.dataset.view;
  if (location.hash === `#${page}`) renderPage(page);
  else location.hash = page;
});
window.addEventListener("hashchange", () => renderPage(location.hash.slice(1)));

gradeSelect.addEventListener("change", () => {
  updateGradeLabels();
  renderSubjects();
});
subjectSelect.addEventListener("change", () => {
  syncSubjectCards();
  sixthGradeMathLevelField.hidden = gradeSelect.value !== "小6" || subjectSelect.value !== "math";
  middleThirdEnglishLevelField.hidden = !isMiddleThirdEnglish();
  renderUnits();
});
function updateSixthGradeMathLevel() {
  if (renderedSixthGradeMathLevel === sixthGradeMathLevelSelect.value) return;
  renderedSixthGradeMathLevel = sixthGradeMathLevelSelect.value;
  const unitCheckboxes = [...unitOptions.querySelectorAll("input[type='checkbox']")];
  const allUnitsSelected = unitCheckboxes.length > 0 && unitCheckboxes.every((checkbox) => checkbox.checked);
  yamaguchiPrepNote.hidden = sixthGradeMathLevelSelect.value !== "entrance";
  customQuestionBanks.小6.math = makeRandomSixthGradeMathQuestions(
    loadRecentSixthGradeQuestions(),
    sixthGradeMathLevelSelect.value,
  );
  renderUnits();
  const updatedUnitCheckboxes = [...unitOptions.querySelectorAll("input[type='checkbox']")];
  if (sixthGradeMathLevelSelect.value === "entrance" && updatedUnitCheckboxes.length > 0 &&
      updatedUnitCheckboxes.every((checkbox) => !checkbox.checked)) {
    toggleAllUnits();
  }
  if (sixthGradeMathLevelSelect.value !== "entrance" && allUnitsSelected &&
      [...unitOptions.querySelectorAll("input[type='checkbox']")].some((checkbox) => !checkbox.checked)) {
    toggleAllUnits();
  }
}
sixthGradeMathLevelSelect.addEventListener("input", updateSixthGradeMathLevel);
sixthGradeMathLevelSelect.addEventListener("change", updateSixthGradeMathLevel);
middleThirdEnglishLevelSelect.addEventListener("change", () => {
  const checkboxes = [...unitOptions.querySelectorAll("input[type='checkbox']")];
  const allUnitsSelected = checkboxes.length > 0 && checkboxes.every((checkbox) => checkbox.checked);
  renderUnits();
  const updatedUnitCheckboxes = [...unitOptions.querySelectorAll("input[type='checkbox']")];
  if (allUnitsSelected && updatedUnitCheckboxes.some((checkbox) => !checkbox.checked)) {
    toggleAllUnits();
  }
});
questionCountInput.addEventListener("change", updateQuestionCountLimit);
unitSelectAllButton.addEventListener("click", toggleAllUnits);
document.querySelector("#start-button").addEventListener("click", startQuiz);
document.querySelector(".profile-button").addEventListener("click", () => gradeSelect.focus());
document.querySelector("#close-quiz").addEventListener("click", () => quizDialog.close());
quizDialog.addEventListener("click", (event) => {
  if (event.target === quizDialog) quizDialog.close();
});
quizNext.addEventListener("click", () => {
  if (quizNext.dataset.result === "true") {
    quizNext.dataset.result = "false";
    quizDialog.close();
    return;
  }
  if (!answered) {
    const question = activeQuestions[questionIndex];
    if (!question.writtenResponse) return;
    completeWrittenAnswer(false, false);
  }
  if (questionIndex < activeQuestions.length - 1) {
    questionIndex += 1;
    renderQuestion();
  } else {
    showResult();
  }
});

updateGradeLabels();
renderSubjects();
updateStats();
renderPage(location.hash.slice(1));
