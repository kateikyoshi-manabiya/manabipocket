const highThirdMathBanks = (() => {
  const round = (value) => Math.round(value * 100) / 100;
  const format = (value) => Number.isInteger(value) ? String(value) : String(round(value));

  function question(unit, prompt, answer, explanation, step = 1, range = null) {
    const correct = round(answer);
    const choices = [correct];
    for (let distance = 1; choices.length < 4; distance += 1) {
      for (const direction of [-1, 1]) {
        const candidate = round(correct + direction * distance * step);
        if (range && (candidate < range[0] || candidate > range[1])) continue;
        if (!choices.includes(candidate)) choices.push(candidate);
        if (choices.length === 4) break;
      }
    }
    return {
      unit,
      prompt,
      options: choices.map(format),
      answer: 0,
      explanation,
    };
  }

  const iaTopics = [
    {
      unit: "数と式",
      make(i, mode) {
        const a = 2 + i % 8;
        const b = a + 1 + i % 5;
        const product = a * b;
        const context = mode === "common"
          ? `二次方程式 x²−${a + b}x+${product}=0 の2つの解をα、βとします。`
          : mode === "application" || mode === "entrance"
            ? `二次方程式 x²−${a + b}x+${product}=0 の解を求めずに、解と係数の関係を使おう。`
            : `二次方程式 x²−${a + b}x+${product}=0 の2つの解の積は？`;
        return question(this.unit, `${context}\nαβ の値は？`, product, `二次方程式 x²+px+q=0 の解の積はq。よってαβ=${product}。`);
      },
    },
    {
      unit: "二次関数",
      make(i, mode) {
        const h = 2 + i % 6;
        const k = 8 + (i % 7) * 2;
        const context = mode === "common"
          ? `ある商品の利益 y（百円）は y = −(x − ${h})² + ${k} で表されます。x は販売数の条件を満たす値です。`
          : `二次関数 y = −(x − ${h})² + ${k} の最大値を求めよう。`;
        return question(this.unit, `${context}\ny の最大値は？`, k, `平方完成された形なので、(x−${h})²が0のとき最大となり、最大値は${k}。`);
      },
    },
    {
      unit: "図形と計量",
      make(i, mode) {
        const n = 2 + i;
        const opposite = n ** 2 - 1;
        const hypotenuse = n ** 2 + 1;
        const ratio = round(opposite / hypotenuse);
        const context = mode === "common"
          ? `水平な地面に対する斜面の長さは${hypotenuse}m、高さは${opposite}mです。斜面と地面のなす角をθとします。`
          : `直角三角形で、角θの向かい側が${opposite}、斜辺が${hypotenuse}です。`;
        return question(this.unit, `${context}\nsinθ の値は？`, ratio, `正弦は「角の向かい側÷斜辺」なので、${opposite}÷${hypotenuse}=${format(ratio)}。`, 0.1, [0, 1]);
      },
    },
    {
      unit: "データの分析",
      make(i, mode) {
        const start = 2 + i;
        const values = [start, start + 2, start + 4, start + 6];
        const mean = start + 3;
        const context = mode === "common"
          ? `4日間の学習時間（時間）は ${values.join("、")} でした。`
          : `データ ${values.join("、")} の平均値を求めよう。`;
        return question(this.unit, `${context}\n平均値は？`, mean, `合計${values.reduce((sum, value) => sum + value, 0)}を4で割ると${mean}。`);
      },
    },
    {
      unit: "場合の数",
      make(i, mode) {
        const n = 5 + i;
        const chooseThree = mode === "application" || mode === "entrance";
        const selected = chooseThree ? 3 : 2;
        const count = selected === 3 ? n * (n - 1) * (n - 2) / 6 : n * (n - 1) / 2;
        const context = mode === "common"
          ? `${n}人の委員から、役割の区別をせずに2人を選びます。`
          : `${n}個の異なるものから、順序を考えずに${selected}個を選ぶ方法は何通り？`;
        const explanation = selected === 3
          ? `${n}C3=${n}×${n - 1}×${n - 2}÷6=${count}通り。`
          : `${n}C2=${n}×${n - 1}÷2=${count}通り。`;
        return question(this.unit, context, count, explanation);
      },
    },
    {
      unit: "確率",
      make(i, mode) {
        const red = 2 + i % 5;
        const blue = 2 + (i * 3) % 11;
        const total = red + blue;
        const repeatedDraw = mode === "application" || mode === "entrance";
        const probability = repeatedDraw ? 1 - (blue / total) ** 2 : red / total;
        const percent = round(probability * 100);
        const context = mode === "common"
          ? `袋に赤玉${red}個、青玉${blue}個が入っています。1個を無作為に取り出します。`
          : repeatedDraw
            ? `赤玉${red}個、青玉${blue}個から、1個ずつ2回取り出します。取り出した玉は戻してから次を引きます。少なくとも1回赤玉を引く確率は？`
            : `赤玉${red}個、青玉${blue}個から1個を取り出すとき、赤玉を引く確率を百分率で表そう。`;
        const explanation = repeatedDraw
          ? `余事象は2回とも青玉を引くこと。1−(${blue}/${total})²=${format(probability)}なので、約${format(percent)}％。`
          : `全${total}個のうち赤は${red}個なので、${red}/${total}×100=${format(percent)}％。`;
        return question(this.unit, `${context}\n確率は何％？`, percent, explanation);
      },
    },
    {
      unit: "図形の性質",
      make(i, mode) {
        const first = 70 + i * 5;
        const opposite = 180 - first;
        const context = mode === "common"
          ? `円に内接する四角形ABCDで、∠A=${first}°です。測定値から対角の関係を確認します。`
          : `円に内接する四角形で、∠A=${first}°のとき、対角∠Cは何度？`;
        return question(this.unit, `${context}\n∠C は何度？`, opposite, `円に内接する四角形の対角の和は180°。∠C=180°−${first}°=${opposite}°。`);
      },
    },
    {
      unit: "集合と命題",
      make(i, mode) {
        const a = 12 + i % 7;
        const b = 10 + (i * 2) % 7;
        const both = 3 + i % 4;
        const union = a + b - both;
        const context = mode === "common"
          ? `調査対象のうち、Aを選んだ人は${a}人、Bを選んだ人は${b}人、両方を選んだ人は${both}人でした。`
          : `n(A)=${a}、n(B)=${b}、n(A∩B)=${both}のとき、n(A∪B)を求めよう。`;
        return question(this.unit, `${context}\nAまたはBに属する人数は？`, union, `和集合の要素数は${a}+${b}−${both}=${union}。`);
      },
    },
  ];

  const iibcTopics = [
    {
      unit: "三角関数",
      common: true,
      make(i, mode) {
        const angle = 10 + i * 5;
        const answer = round(Math.sin(angle * Math.PI / 180));
        return question(this.unit, `三角関数の値を小数第2位まで求めよう。\nsin ${angle}° ≒ ?`, answer,
          `sin ${angle}°を計算し、小数第2位まで表すと${format(answer)}。`, 0.1, [0, 1]);
      },
    },
    {
      unit: "指数・対数",
      common: true,
      make(i, mode) {
        const base = 2 + i % 5;
        const power = 2 + (i % 3);
        const value = base ** power;
        const context = mode === "common"
          ? `ある量は初めの値の${base}倍ずつ、${power}段階で増加します。累乗を対数で確かめます。`
          : `log${base} ${value} の値を求めよう。`;
        return question(this.unit, `${context}\nlog${base} ${value} = ?`, power, `${base}^${power}=${value}なので、log${base} ${value}=${power}。`);
      },
    },
    {
      unit: "微分法",
      common: true,
      make(i, mode) {
        const coefficient = 2 + i % 5;
        const x = 1 + i % 4;
        const derivative = 2 * coefficient * x;
        const context = mode === "common"
          ? `時刻xにおける量 y は y=${coefficient}x² で表されます。x=${x}での瞬間の変化率を求めます。`
          : `関数 y=${coefficient}x² の x=${x} における導関数の値は？`;
        return question(this.unit, `${context}\n答えは？`, derivative, `y'= ${2 * coefficient}x。x=${x}を代入して${derivative}。`);
      },
    },
    {
      unit: "積分法",
      common: true,
      make(i, mode) {
        const coefficient = 1 + i % 5;
        const end = 2 + i % 4;
        const value = coefficient * end * end / 2;
        const context = mode === "common"
          ? `速度 v(t)=${coefficient}t として、0秒から${end}秒までの移動距離を積分で求めます。`
          : `∫[0,${end}] ${coefficient}x dx の値を求めよう。`;
        return question(this.unit, `${context}\n答えは？`, value, `原始関数は${coefficient}x²/2。上端と下端を代入すると${format(value)}。`);
      },
    },
    {
      unit: "数列",
      common: true,
      make(i, mode) {
        const first = 2 + i % 6;
        const difference = 2 + i % 4;
        const term = 6 + i % 7;
        const sumPractice = mode === "application" || mode === "entrance";
        const value = sumPractice
          ? term * (2 * first + (term - 1) * difference) / 2
          : first + (term - 1) * difference;
        const context = mode === "common"
          ? `毎回${difference}ずつ増える記録が初回${first}から始まりました。第${term}回の値を求めます。`
          : sumPractice
            ? `初項${first}、公差${difference}の等差数列の初項から第${term}項までの和は？`
            : `初項${first}、公差${difference}の等差数列の第${term}項は？`;
        const explanation = sumPractice
          ? `S_n=n{2a_1+(n−1)d}/2。${term}×{2×${first}+(${term}−1)×${difference}}÷2=${format(value)}。`
          : `a_n=a_1+(n−1)dより、${first}+(${term}−1)×${difference}=${value}。`;
        return question(this.unit, `${context}\n答えは？`, value, explanation);
      },
    },
    {
      unit: "ベクトル",
      common: true,
      make(i, mode) {
        const ax = 1 + i % 5;
        const ay = 2 + i % 4;
        const bx = 2 + i % 3;
        const by = 1 + i % 6;
        const dot = ax * bx + ay * by;
        const context = mode === "common"
          ? `東をx方向、北をy方向とします。移動ベクトル a=(${ax},${ay})、b=(${bx},${by}) の内積を調べます。`
          : `ベクトル a=(${ax},${ay})、b=(${bx},${by}) の内積 a・b は？`;
        return question(this.unit, `${context}\n答えは？`, dot, `内積は${ax}×${bx}+${ay}×${by}=${dot}。`);
      },
    },
    {
      unit: "統計的推測",
      common: true,
      make(i, mode) {
        const mean = 20 + i % 8;
        const standardError = 2 + i % 3;
        const lower = mean - 2 * standardError;
        const upper = mean + 2 * standardError;
        const context = mode === "common"
          ? `標本平均は${mean}、標準誤差は${standardError}です。正規分布を仮定し、平均±2×標準誤差を目安の区間とします。`
          : `標本平均${mean}、標準誤差${standardError}のとき、平均±2×標準誤差の区間の幅は？`;
        return question(this.unit, `${context}\n区間の幅は？`, upper - lower, `幅は上端−下端、すなわち4×${standardError}=${upper - lower}。`);
      },
    },
    {
      unit: "複素数平面",
      common: true,
      make(i, mode) {
        const real = 3 + i;
        const imaginary = 4 + i * 2;
        const modulus = round(Math.hypot(real, imaginary));
        const context = mode === "common"
          ? `複素数 z=${real}+${imaginary}i を複素数平面上の点として表します。原点からの距離を小数第2位まで求めます。`
          : `複素数 z=${real}+${imaginary}i の絶対値 |z| を小数第2位まで求めよう。`;
        return question(this.unit, `${context}\n答えは？`, modulus, `|z|=√(${real}²+${imaginary}²)=√${real * real + imaginary * imaginary}=${format(modulus)}。`);
      },
    },
    {
      unit: "三角関数のグラフ",
      common: true,
      make(i, mode) {
        const periods = [12, 15, 18, 20, 24, 30, 36, 40, 45, 60, 72, 90, 120, 180, 360];
        const period = periods[i % periods.length];
        const coefficient = 360 / period;
        const context = mode === "common"
          ? `周期的に変化する量を y=sin(${format(coefficient)}x) で表します。角度は度数法です。`
          : `関数 y=sin(${format(coefficient)}x) の周期を求めよう。`;
        return question(this.unit, `${context}\n周期は何度？`, period,
          `y=sin(kx)の周期は360°/|k|。ここではk=${format(coefficient)}なので周期は${period}°。`);
      },
    },
    {
      unit: "平面曲線",
      common: true,
      make(i, mode) {
        const a = 2 + i;
        const context = mode === "common"
          ? `曲線 x²=${a}y を考えます。x=${a}のときのy座標を読み取ります。`
          : `放物線 x²=${a}y 上で、x=${a}のときの y は？`;
        return question(this.unit, `${context}\n答えは？`, a, `x²=${a}y にx=${a}を代入すると、${a * a}=${a}y。したがってy=${a}。`);
      },
    },
  ];

  const iiicTopics = [
    {
      unit: "極限",
      make(i, mode) {
        const a = 2 + i % 6;
        const b = 1 + (i * 2) % 5;
        const limit = a;
        return question(this.unit, `x→∞ のとき、( ${a}x² + ${b}x ) / x² の極限は？`, limit,
          `分子・分母をx²で割ると${a}+${b}/x。x→∞で第2項が0に近づくため極限は${a}。`);
      },
    },
    {
      unit: "微分法",
      make(i, mode) {
        const coefficient = 1 + i % 5;
        const x = 2 + i % 4;
        const slope = 3 * coefficient * x ** 2;
        return question(this.unit, `関数 y=${coefficient}x³ の x=${x} における接線の傾きは？`, slope,
          `y'=3×${coefficient}x²。x=${x}を代入すると${slope}。`);
      },
    },
    {
      unit: "積分法",
      make(i, mode) {
        const end = 2 + i;
        const area = round(end ** 3 / 3);
        return question(this.unit, `曲線 y=x²、x=0、x=${end}、x軸で囲まれる部分の面積を小数第2位まで求めよう。`, area,
          `面積は∫₀^${end}x²dx=[x³/3]₀^${end}=${format(area)}。`);
      },
    },
    {
      unit: "複素数平面",
      common: true,
      make(i, mode) {
        const real = 1 + i;
        const imaginary = 2 + i * 2;
        const norm = real * real + imaginary * imaginary;
        return question(this.unit, `複素数 z=${real}+${imaginary}i の |z|² は？`, norm,
          `|z|²は実部の2乗と虚部の2乗の和なので、${real}²+${imaginary}²=${norm}。`);
      },
    },
    {
      unit: "平面曲線",
      common: true,
      make(i, mode) {
        const a = 1 + i;
        const focus = a;
        return question(this.unit, `放物線 y²=${4 * a}x の焦点の座標は？`, focus,
          `標準形 y²=4ax の焦点は(a,0)。ここではa=${a}なので焦点は(${focus},0)。`);
      },
    },
    {
      unit: "ベクトル",
      common: true,
      make(i, mode) {
        const ax = 1 + i;
        const ay = 2;
        const bx = 1;
        const by = 3 + i;
        const determinant = Math.abs(ax * by - ay * bx);
        return question(this.unit, `平面ベクトル a=(${ax},${ay})、b=(${bx},${by}) が作る平行四辺形の面積は？`, determinant,
          `面積は行列式の絶対値 |${ax}×${by}−${ay}×${bx}|=${determinant}。`);
      },
    },
    {
      unit: "面積と体積",
      make(i, mode) {
        const radius = 1 + i % 5;
        const height = 2 + i % 4;
        const volume = Math.round(3.14 * radius ** 2 * height);
        return question(this.unit, `半径${radius}、高さ${height}の円柱の体積をπ=3.14として整数に四捨五入すると？`, volume,
          `円柱の体積は底面積×高さ。3.14×${radius}²×${height}を計算して四捨五入すると${volume}。`);
      },
    },
    {
      unit: "関数の増減",
      make(i, mode) {
        const h = 1 + i % 5;
        const k = 4 + i % 6;
        return question(this.unit, `関数 y=(x−${h})²+${k} の最小値は？`, k,
          `(x−${h})²は0以上なので、最小値はx=${h}のときの${k}。`);
      },
    },
  ];

  const topics = { math1a: iaTopics, math2bc: iibcTopics, math3c: iiicTopics };

  function makeBank(course, mode, total) {
    const availableTopics = topics[course];
    const offset = mode === "application" ? 11 : mode === "entrance" ? 23 : 0;
    return Array.from({ length: total }, (_, index) =>
      availableTopics[index % availableTopics.length].make(
        Math.floor(index / availableTopics.length) + offset,
        mode,
      )
    );
  }

  function examQuestion(unit, prompt, answer, explanation, distractors = []) {
    const correct = round(answer);
    const choices = [...new Set([correct, ...distractors.map(round)])];
    for (let distance = 1; choices.length < 4; distance += 1) {
      for (const candidate of [round(correct - distance), round(correct + distance)]) {
        if (!choices.includes(candidate)) choices.push(candidate);
        if (choices.length === 4) break;
      }
    }
    return {
      unit,
      prompt,
      options: choices.slice(0, 4).map(format),
      answer: 0,
      explanation,
    };
  }

  function examChoiceQuestion(unit, prompt, options, explanation) {
    return { unit, prompt, options, answer: 0, explanation };
  }

  function choose(n, r) {
    if (r < 0 || r > n) return 0;
    let result = 1;
    for (let index = 1; index <= r; index += 1) {
      result = result * (n - index + 1) / index;
    }
    return result;
  }

  const math1aCommonTopics = [
    (i) => {
      const sum = 5 + i;
      const product = 1 + i % 4;
      const value = sum ** 2 - 2 * product;
      return examQuestion("数と式",
        `二次方程式 x²−${sum}x+${product}=0 の2解をα、βとする。個々の解を先に求めず、解と係数の関係を使って α²+β² を求めなさい。`,
        value,
        `α+β=${sum}、αβ=${product}。したがって α²+β²=(α+β)²−2αβ=${sum}²−2×${product}=${value}。`,
        [sum ** 2, sum ** 2 + 2 * product, sum + product]);
    },
    (i) => {
      const vertex = 3 + i;
      const radius = 1 + i % 4;
      const maximum = vertex ** 2 + 2 * vertex;
      const threshold = maximum - radius ** 2;
      const value = 2 * radius + 1;
      return examQuestion("二次関数",
        `ある装置の出力 y は、整数 x（0≦x≦${2 * vertex}）に対して y=−(x−${vertex})²+${maximum} で表される。出力が ${threshold} 以上となる x は何個あるか。`,
        value,
        `頂点形式から (x−${vertex})²≦${radius ** 2}、つまり ${vertex - radius}≦x≦${vertex + radius}。整数xは両端を含めて${value}個。`,
        [2 * radius, 2 * radius + 2, 2 * radius + 3]);
    },
    (i) => {
      const a = 3 + i;
      const b = a + 2;
      const value = a ** 2 + b ** 2 - a * b;
      return examQuestion("図形と計量",
        `三角形の2辺の長さが ${a}、${b}、その間の角が60°である。余弦定理を用いて、残る辺の長さの2乗を求めなさい。`,
        value,
        `余弦定理より c²=${a}²+${b}²−2×${a}×${b}×cos60°=${a ** 2}+${b ** 2}−${a * b}=${value}。`,
        [a ** 2 + b ** 2, (b - a) ** 2, a ** 2 + b ** 2 + a * b]);
    },
    (i) => {
      const center = 20 + i;
      const step = 2 + i;
      const value = 2 * step;
      return examQuestion("データの分析",
        `5人の記録を小さい順に並べると、${center - 2 * step}、${center - step}、${center}、${center + step}、${center + 2 * step} であった。第1四分位数と第3四分位数の差を求めなさい。`,
        value,
        `5個のデータでは第1四分位数は2番目、第3四分位数は4番目。差は(${center + step})−(${center - step})=${value}。`,
        [step, 3 * step, 4 * step]);
    },
    (i) => {
      const boys = 3 + i % 4;
      const girls = 4 + Math.floor(i / 4);
      const total = boys + girls;
      const value = choose(total, 3) - choose(boys, 3) - choose(girls, 3);
      return examQuestion("場合の数",
        `男子${boys}人、女子${girls}人から3人の委員を選ぶ。男女が少なくとも1人ずつ含まれる選び方は何通りか。`,
        value,
        `全体 ${total}C3 から、男子だけの ${boys}C3 と女子だけの ${girls}C3 を除く。${total}C3−${boys}C3−${girls}C3=${value}通り。`,
        [choose(total, 3) - choose(boys, 3), choose(total, 3) - choose(girls, 3), boys * girls]);
    },
    (i) => {
      const red = 3 + i % 4;
      const blue = 4 + Math.floor(i / 4);
      const total = red + blue;
      const all = choose(total, 2);
      const favorable = all - choose(blue, 2);
      const value = round(100 * favorable / all);
      return examQuestion("確率",
        `赤玉${red}個、青玉${blue}個の袋から、玉を戻さずに2個を同時に取り出す。「少なくとも1個が赤玉」である確率を百分率で表すと約何％か。`,
        value,
        `全ての組合せは ${total}C2。余事象の「青2個」は ${blue}C2 なので、確率は {${total}C2−${blue}C2}/${total}C2=${favorable}/${all}≈${format(value)}％。`,
        [round(100 * choose(blue, 2) / all), round(100 * red / total), round(100 * red * blue / all)]);
    },
    (i) => {
      const scale = 2 + 2 * i;
      const value = 5 * scale / 2;
      return examQuestion("図形の性質",
        `直角三角形ABCは∠B=90°、AB=${3 * scale}、BC=${4 * scale}である。斜辺ACの中点をMとするとき、BMの長さを求めなさい。`,
        value,
        `三平方の定理から AC=√((${3 * scale})²+(${4 * scale})²)=${5 * scale}。直角三角形では斜辺の中点までの距離は斜辺の半分なので、BM=${5 * scale}/2=${value}。`,
        [5 * scale, 3 * scale, 4 * scale]);
    },
    (i) => {
      const a = 35 + i;
      const b = 30 + i % 8;
      const both = 10 + i % 7;
      const value = a + b - 2 * both;
      return examQuestion("集合と命題",
        `全校調査で、Aを利用する生徒は${a}人、Bを利用する生徒は${b}人、両方を利用する生徒は${both}人だった。Aだけ、またはBだけを利用する生徒は何人か。`,
        value,
        `Aだけは${a}−${both}人、Bだけは${b}−${both}人。合計は${a}+${b}−2×${both}=${value}人。`,
        [a + b - both, a + both, b - both]);
    },
  ];

  const math2bcCommonTopics = [
    (i) => {
      const angle = 20 + i * 3;
      return examChoiceQuestion("三角関数",
        `0≦x＜π の範囲で sin(2x)=sin(${angle}°) を満たす解を考える。単位円上で同じy座標となる角を漏れなく対応させるとき、解の和はいくらか（ラジアン）。`,
        ["π/2", "π/4", "π", "3π/2"],
        `t=2x と置くと 0≦t＜2π。sin t=sin(${angle}°) の2解は対称な組となり、その和はπ。したがってxの和はπ/2。`);
    },
    (i) => {
      const periods = 3 + i;
      const initial = 12 + i;
      const target = initial * 2 ** periods;
      return examQuestion("指数・対数",
        `ある水草の面積は、除去作業の間に一定の割合で増え、毎回2倍になる。初めの面積が${initial}m²で、${target}m²に達したとき作業を行う。何回目の作業間隔でこの面積に達するか。`,
        periods,
        `${initial}×2ⁿ=${target}より2ⁿ=${2 ** periods}。両辺の底を2とする対数を考えると n=${periods}回。`,
        [periods - 1, periods + 1, 2 ** periods]);
    },
    (i) => {
      const a = 2 + i;
      const value = 2 * a ** 3;
      return examQuestion("微分法",
        `関数 f(x)=x³−3(${a})²x の増減を調べる。極大となるxの値を導関数から特定し、そのときの極大値を求めなさい。`,
        value,
        `f'(x)=3x²−3(${a})²=3(x−${a})(x+${a})。極大となるのはx=−${a}で、f(−${a})=−${a}³+3(${a})³=${value}。`,
        [-value, a ** 3, 3 * a ** 3]);
    },
    (i) => {
      const scale = 1 + i;
      const value = 4 * scale ** 3 / 3;
      return examQuestion("積分法",
        `2曲線 y=2(${scale})x と y=x² は x=0 と x=${2 * scale} で交わる。この2曲線に挟まれた部分の面積を求めなさい。`,
        value,
        `区間内では直線が上側。面積は ∫₀^${2 * scale}(2(${scale})x−x²)dx=[${scale}x²−x³/3]₀^${2 * scale}=${format(value)}。`);
    },
    (i) => {
      const first = 1 + i % 5;
      const ratio = 2 + i % 3;
      const terms = 5 + Math.floor(i / 3);
      const value = first * (ratio ** terms - 1) / (ratio - 1);
      return examQuestion("数列",
        `初項${first}、公比${ratio}の等比数列について、初項から第${terms}項までの和を求めなさい。`,
        value,
        `等比数列の和は S_n=a(rⁿ−1)/(r−1)。よって S_${terms}=${first}×(${ratio}^${terms}−1)/(${ratio}−1)=${value}。`,
        [first * ratio ** terms, first * (ratio ** terms - 1), first * (ratio ** (terms - 1) - 1) / (ratio - 1)]);
    },
    (i) => {
      const k = 1 + i;
      const numerator = 2 * k ** 2 + k + 1;
      const denominator = k ** 2 + 1;
      const value = round(numerator / denominator);
      return examQuestion("ベクトル",
        `ベクトル a=(1,${k})、b=(${k + 1},${2 * k}) に対し、a方向への正射影を b の実数倍 ta と表す。係数tを小数第2位まで求めなさい。`,
        value,
        `正射影の係数は t=(a・b)/(a・a)。分子は${numerator}、分母は${denominator}なので、t=${numerator}/${denominator}≈${format(value)}。`,
        [round(numerator), round(value + 1), round(value - 1)]);
    },
    (i) => {
      const mean = 50 + i;
      const standardError = 1 + i;
      const nullMean = mean - 2 * standardError;
      return examChoiceQuestion("統計的推測",
        `ある商品の母平均を${nullMean}とする仮説を検討する。標本平均は${mean}、標準誤差は${standardError}であった。有意水準5％の両側検定の境界値を1.96とするとき、適切な判断はどれか。`,
        ["帰無仮説を棄却する", "帰無仮説を棄却できない", "標本平均が仮説平均との差より大きいので必ず棄却する", "標準誤差だけからは判断できない"],
        `検定統計量は z=(${mean}−${nullMean})/${standardError}=2。|z|=2>1.96 なので、この条件では帰無仮説を棄却する。`);
    },
    (i) => {
      const real = 1 + i;
      const imaginary = 2 + (i * 3) % 11;
      const value = 2 * (real ** 2 + imaginary ** 2);
      return examQuestion("複素数平面",
        `複素数 z=${real}+${imaginary}i を w=(1+i)z に移す。複素数平面上で原点からwまでの距離の2乗、すなわち |w|² を求めなさい。`,
        value,
        `|w|²=|1+i|²|z|²=2(${real}²+${imaginary}²)=${value}。複素数の積では絶対値が積になることを用いる。`,
        [real ** 2 + imaginary ** 2, 2 * (real + imaginary) ** 2, (real - imaginary) ** 2]);
    },
    (i) => {
      const coefficient = 1 + i;
      const period = round(360 / coefficient);
      return examQuestion("三角関数のグラフ",
        `周期的な現象を y=sin(${coefficient}x)+cos(${coefficient}x) で表す（xは度数法）。2つの項をまとめて、この関数の最小の正の周期を求めなさい。`,
        period,
        `sin(kx)+cos(kx) は振幅を変えても角度kxに対して周期360°。したがってxの周期は360°/${coefficient}=${format(period)}°。`,
        [round(180 / coefficient), 360, round(720 / coefficient)]);
    },
    (i) => {
      const scale = 1 + i;
      const value = 4 * scale;
      return examQuestion("平面曲線",
        `楕円 x²/(${5 * scale})²+y²/(${3 * scale})²=1 の焦点を求める。焦点の1つのx座標はいくらか。`,
        value,
        `楕円の焦点距離cは c²=a²−b²。ここでは c²=(${5 * scale})²−(${3 * scale})²=(${4 * scale})² なので、正の焦点のx座標は${value}。`,
        [3 * scale, 5 * scale, 8 * scale]);
    },
  ];

  function makeExamBank(questionTopics, total) {
    return Array.from({ length: total }, (_, index) =>
      questionTopics[index % questionTopics.length](Math.floor(index / questionTopics.length))
    );
  }

  const math2bcCommon = makeExamBank(math2bcCommonTopics, 120);
  return {
    math1a: {
      basic: makeBank("math1a", "basic", 40),
      application: makeBank("math1a", "application", 32),
      common: makeExamBank(math1aCommonTopics, 120),
      entrance: makeBank("math1a", "entrance", 24),
    },
    math2bc: {
      basic: makeBank("math2bc", "basic", 40),
      application: makeBank("math2bc", "application", 32),
      common: math2bcCommon,
      entrance: makeBank("math2bc", "entrance", 24),
    },
    math3c: {
      basic: makeBank("math3c", "basic", 40),
      application: makeBank("math3c", "application", 32),
      common: math2bcCommon.filter((item) =>
        ["ベクトル", "複素数平面", "平面曲線"].includes(item.unit)
      ),
      entrance: makeBank("math3c", "entrance", 24),
    },
  };
})();
