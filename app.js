const gradeSelect = document.querySelector("#grade-select");
const subjectSelect = document.querySelector("#subject-select");
const sixthGradeMathLevelField = document.querySelector("#sixth-grade-math-level-field");
const sixthGradeMathLevelSelect = document.querySelector("#sixth-grade-math-level");
let renderedSixthGradeMathLevel = sixthGradeMathLevelSelect.value;
const yamaguchiPrepNote = document.querySelector("#yamaguchi-prep-note");
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
  if (gradeSelect.value === "小6" && subjectSelect.value === "math") {
    return Object.values(customBank || {}).flat();
  }
  return customBank
    ? Object.values(customBank).flat()
    : [gradeQuestionForSubject, ...questions[stage][subjectSelect.value]];
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
  quizSubject.textContent = `${gradeLongName(gradeSelect.value)} · ${subject.name}${isEntrancePractice ? " · 受験対策" : isApplicationPractice ? " · 応用・適性検査対策" : ""}`;
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
      completeWrittenAnswer(checks.every((checkbox) => checkbox.checked));
    });
    sample.scrollIntoView({ block: "nearest", behavior: "smooth" });
  });
}

function completeWrittenAnswer(isSelfChecked) {
  if (answered) return;
  answered = true;
  if (isSelfChecked) correctAnswers += 1;
  recordAnswer(isSelfChecked);
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
  recordAnswer(isCorrect);
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

function recordAnswer(isCorrect) {
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
    };
    stats.sessions += 1;
    stats.history.unshift(activeHistoryEntry);
  }

  activeHistoryEntry.completedAt = now.toISOString();
  activeHistoryEntry.answered += 1;
  if (isCorrect) {
    activeHistoryEntry.correct += 1;
    stats.correct += 1;
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
    completeWrittenAnswer(false);
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
