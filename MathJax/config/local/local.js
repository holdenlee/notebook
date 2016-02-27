MathJax.Hub.Config({
  TeX: {
    extensions: ["AMSmath.js","color.js"],
    Macros: {
      sA: "\\mathscr{A}",
      cA: "\\mathcal{A}",
      A: "\\mathbb{A}",
      cB: "\\mathcal{B}",
      C: "\\mathbb{C}",
      sC: "\\mathcal{C}",
      cC: "\\mathcal{C}",
      sD: "\\mathscr{D}",
      mD: "\\mathfrak D",
      cE: "\\mathscr{E}",
      sE: "\\mathscr{E}",
      E: "\\mathbb{E}",
      EE: "\\mathop{\\mathbb E}",
      F: "\\mathbb{F}",
      cF: "\\mathscr{F}",
      sF: "\\mathscr{F}",
      G: "\\mathbb{G}",
      cG: "\\mathscr{G}",
      sG: "\\mathscr{G}",
      cH: "\\mathscr H",
      sH: "\\mathscr H",
      Hq: "\\mathbb{H}",
      bfI: "\\mathbf{I}",
      I: "\\mathbb{I}",
      cI: "\\mathscr{I}",
      sI: "\\mathscr{I}",
      cJ: "\\mathscr{J}",
      cL: "\\mathscr{L}",
      N: "\\mathbb{N}",
      fN: "\\mathfrak{N}",
      cP: "\\mathcal{P}",
      Pj: "\\mathbb{P}",
      mP: "\\mathfrak{P}",
      mQ: "\\mathfrak{Q}",
      cO: "\\mathcal{O}",
      sO: "\\mathscr{O}",
      Q: "\\mathbb{Q}",
      R: "\\mathbb{R}",
      bS: "\\mathbb{bS}",
      T: "\\mathbb{T}",
      X: "\\mathfrak{X}",
      Z: "\\mathbb{Z}",
      one: "\\mathbbm{1}",
      mba: "\\mathbf{a}",
      ma: "\\mathfrak{a}",
      mb: "\\mathfrak{b}",
      mc: "\\mathfrak{c}",
      mfd: "\\mathfrak d",
      mf: "\\mathfrak{f}",
      fg: "\\mathfrak{g}",
      vi: "\\mathbf{i}",
      vj: "\\mathbf{j}",
      vk: "\\mathbf{k}",
      mm: "\\mathfrak{m}",
      mfp: "\\mathfrak{p}",
      mq: "\\mathfrak{q}",
      mr: "\\mathfrak{r}",
      mv: "\\mathbf{v}",
      mx: "\\mathbf{x}",
      my: "\\mathbf{y}",
      et: "_{\\text{\\'et}}",
      Gm: "\\mathbb{G}_m",
      Fp: "\\mathbb{F}_p",
      fq: "\\mathbb{F}_q",
      fpb: "\\ol{\\mathbb{F}_p}",
      fpt: "\\mathbb{F}_p^{\\times}",
      fqt: "\\mathbb{F}_q^{\\times}",
      Kt: "K^{\\times}",
      RP: "\\mathbb{R}P",
      qb: "\\ol{\\mathbb{Q}}",
      qp: "\\mathbb{Q}_p",
      qpb: "\\ol{\\mathbb{Q}_p}",
      ql: "\\mathbb Q_{\\ell}",
      sll: "\\mathfrak{sl}",
      vl: "V_{\\ell}",
      zl: "\\mathbb Z_{\\ell}",
      zp: "\\mathbb Z_{p}",
      zpz: "\\mathbb Z/p\\mathbb Z",
      al: "\\alpha",
      be: "\\beta",
      ga: "\\gamma",
      Ga: "\\Gamma",
      de: "\\delta",
      De: "\\Delta",
      ep: "\\varepsilon",
      eph: "\\frac{\\varepsilon}{2}",
      ept: "\\frac{\\varepsilon}{3}",
      ka: "\\kappa",
      la: "\\lambda",
      La: "\\Lambda",
      ph: "\\varphi",
      Ph: "\\Phi",
      rh: "\\rho",
      te: "\\theta",
      Te: "\\Theta",
      vte: "\\vartheta",
      om: "\\omega",
      Om: "\\Omega",
      si: "\\sigma",
      Si: "\\Sigma",
      ze: "\\zeta",
      nin: "\\not\\in",
      opl: "\\oplus",
      bigopl: "\\bigoplus",
      ot: "\\otimes",
      bigot: "\\bigotimes",
      sub: "\\subset",
      subeq: "\\subseteq",
      supeq: "\\supseteq",
      nsubeq: "\\not\\subseteq",
      nsupeq: "\\not\\supseteq",
      nequiv: "\\not\\equiv",
      bs: "\\backslash",
      iy: "\\infty",
      no: "\\trianglelefteq",
      qeq: "\\stackrel?=",
      subsim: "\\stackrel{\\sub}{\\sim}",
      supsim: "\\stackrel{\\supset}{\\sim}",
      na: "\\nabla",
      mcv: "*_-",
      dlim: "\\varinjlim",
      ilim: "\\varprojlim",
      gle: "\\begin{array}{c}
\\ge\\\\
\\le
\\end{array}",
      lge: "\\begin{array}{c}
\\le\\\\
\\ge
\\end{array}",
      rc: ["\\frac{1}{#1}",1],
      prc: ["\\pa{\\rc{#1}}",1],
      ff: ["\\left\\lfloor\\frac{#1}{#2}\\right\\rfloor",2],
      cf: ["\\left\\lceil\\frac{#1}{#2}\\rceil\\rfloor",2],
      fc: ["\\frac{#1}{#2}",2],
      sfc: ["\\sqrt{\\frac{#1}{#2}}",2],
      pf: ["\\pa{\\frac{#1}{#2}}",2],
      pd: ["\\frac{\\partial #1}{\\partial #2}",2],
      dd: ["\\frac{d #1}{d #2}",2],
      pdd: ["\\frac{\\partial}{\\partial #1}",1],
      ddd: ["\\frac{d}{d #1}",1],
      af: ["\\ab{\\fc{#1}{#2}}",2],
      ddt: ["\\frac{d^2 #1}{d {#2}^2}",2],
      pdt: ["\\frac{\\partial^2 #1}{\\partial {#2}^2}",2],
      pdxy: ["\\frac{\\partial^2 #1}{\\partial {#2}\\partial {#3}}",3],
      pl: "\\partial",
      nb: "\\nabla",
      onb: "\\ol{\\nabla}",
      dy: "\\,dy",
      dx: "\\,dx",
      lar: "\\leftarrow",
      ra: "\\rightarrow",
      dra: "\\dashrightarrow",
      lra: "\\leftrightarrow",
      rra: "\\twoheadrightarrow",
      hra: "\\hookrightarrow",
      tra: "\\twoheadrightarrow",
      send: "\\mapsto",
      xra: ["\\xrightarrow{#1}",1],
      xla: ["\\xleftarrow{#1}",1],
      xhra: ["\\xhookrightarrow{#1}",1],
      xlra: ["\\xleftrightarrow{#1}",1],
      xrc: "\\xrightarrow{\\cong}",
      cir: "\\circlearrowright",
      cil: "\\circlearrowleft",
      ab: ["\\left| {#1} \\right|",1],
      an: ["\\left\\langle {#1}\\right\\rangle",1],
      ba: ["\\left[ {#1} \\right]",1],
      bc: ["\\left\\{ {#1} \\right\\}",1],
      bra: ["\\langle{#1}|",1],
      braa: ["\\langle\\langle{#1}|",1],
      ce: ["\\left\\lceil {#1}\\right\\rceil",1],
      fl: ["\\left\\lfloor {#1}\\right\\rfloor",1],
      ro: ["\\left\\lfloor {#1}\\right\\rceil",1],
      ket: ["|{#1}\\rangle",1],
      kett: ["|{#1}\\rangle\\rangle",1],
      bk: ["\\langle{#1}|{#2}\\rangle",2],
      braak: ["\\langle\\langle{#1}|{#2}\\rangle\\rangle",2],
      kbb: ["|{#1}\\rangle\\langle{#1}|",1],
      kb: ["|{#1}\\rangle\\langle{#2}|",2],
      kettb: ["|{#1}\\rangle\\rangle\\langle\\langle{#2}|",2],
      pa: ["\\left( {#1} \\right)",1],
      pat: ["\\left( \\text{#1} \\right)",1],
      ve: ["\\left\\Vert {#1}\\right\\Vert",1],
      rb: ["\\left.{#1}\\right|",1],
      nl: ["\\left\\Vert #1 \\right\\Vert_{L^1}",1],
      ad: "|\\cdot|",
      ved: "\\ve{\\cdot}",
      set: ["\\left\\{{#1}:{#2}\\right\\}",2],
      sett: ["\\left\\{\\left.{#1}\\right|{#2}\\right\\}",2],
      ch: ["\\check{#1}",1],
      dch: ["\\check{\\check{#1}}",1],
      olra: ["\\overleftrightarrow{#1}",1],
      ol: ["\\overline{#1}",1],
      ul: ["\\underline{#1}",1],
      ub: ["\\underbrace{#1}_{#2}",2],
      ora: ["\\overrightarrow{#1}",1],
      ura: ["\\underrightarrow{#1}",1],
      wt: ["\\widetilde{#1}",1],
      wh: ["\\widehat{#1}",1],
      fp: ["^{\\underline{#1}}",1],
      rp: ["^{\\overline{#1}}",1],
      sh: "^{\\sharp}",
      ri: "\\ddagger",
      bit: "\\{0,1\\}",
      btih: ["\\text{ by the induction hypothesis{#1}}",1],
      bwoc: "by way of contradiction",
      by: ["\\text{by~(\\ref{#1})}",1],
      idk: "{\\color{red}I don't know.} ",
      ore: "\\text{ or }",
      wog: " without loss of generality ",
      Wog: " Without loss of generality ",
      step: ["\\noindent{\\underline{Step {#1}:}}",1],
      prt: ["\\noindent{\\underline{Part {#1}:}}",1],
      tfae: " the following are equivalent",
      fabfm: "for all but finitely many ",
      Abs: "(\\text{Ab}/S)",
      abk: "(\\text{Ab}/k)",
      abc: "(\\text{Ab}/\\C)",
      Alb: "\\operatorname{Alb}",
      Ann: "\\operatorname{Ann}",
      Area: "\\operatorname{Area}",
      amax: "\\operatorname{argmax}",
      amin: "\\operatorname{argmin}",
      Ass: "\\operatorname{Ass}",
      Art: "\\operatorname{Art}",
      Aut: "\\operatorname{Aut}",
      avg: "\\operatorname{avg}",
      bias: "\\operatorname{bias}",
      Binom: "\\operatorname{Binom}",
      Bl: "\\operatorname{Bl}",
      Br: "\\operatorname{Br}",
      chr: "\\operatorname{char}",
      cis: "\\operatorname{cis}",
      cl: "\\operatorname{Cl}",
      Cl: "\\operatorname{Cl}",
      Coh: "\\operatorname{Coh}",
      Coinf: "\\operatorname{Coinf}",
      Coind: "\\operatorname{Coind}",
      coker: "\\operatorname{coker}",
      colim: "\\operatorname{colim}",
      Comp: "\\operatorname{Comp}",
      conv: "\\operatorname{conv}",
      oconv: "\\ol{\\conv}",
      Cor: "\\operatorname{Cor}",
      Cov: "\\operatorname{Cov}",
      cro: "\\operatorname{cr}",
      degs: "\\deg_{\\text{s}}",
      Dec: "\\operatorname{Dec}",
      depth: "\\operatorname{depth}",
      Der: "\\operatorname{Der}",
      diag: "\\operatorname{diag}",
      diam: "\\operatorname{diam}",
      div: "\\operatorname{div}",
      Dir: "\\operatorname{Dir}",
      Div: "\\operatorname{Div}",
      Disc: "\\operatorname{Disc}",
      disc: "\\operatorname{disc}",
      dom: "\\operatorname{dom}",
      Ell: "\\mathcal{E}{\\rm{ll}}",
      Enc: "\\operatorname{Enc}",
      End: "\\operatorname{End}",
      Ent: "\\operatorname{Ent}",
      Ext: "\\operatorname{Ext}",
      Exp: "\\operatorname{Exp}",
      err: "\\operatorname{err}",
      ess: "\\operatorname{ess}",
      ext: "\\operatorname{ext}",
      pfcg: "(p\\text{-FCGp}/k)",
      fcg: "(\\text{FCGp}/k)",
      Frac: "\\operatorname{Frac}",
      Frob: "\\operatorname{Frob}",
      Fun: "\\operatorname{Fun}",
      FS: "\\operatorname{FS}",
      Gal: "\\operatorname{Gal}",
      grad: "\\operatorname{grad}",
      GL: "\\operatorname{GL}",
      gps: "(\\text{Gp}/S)",
      Hess: "\\operatorname{Hess}",
      Het: "H_{\\text{\\'et}}",
      Hom: "\\operatorname{Hom}",
      Homeo: "\\operatorname{Homeo}",
      chom: "\\mathscr{H}om",
      Homc: "\\operatorname{Hom}_{\\text{cont}}",
      id: "\\mathrm{id}",
      Id: "\\operatorname{Id}",
      im: "\\text{im}",
      imp: "\\im^{\\text{pre}}",
      Ind: "\\operatorname{Ind}",
      Inf: "\\operatorname{Inf}",
      inv: "\\operatorname{inv}",
      Isoc: "\\operatorname{Isoc}",
      Isog: "\\operatorname{Isog}",
      Isom: "\\operatorname{Isom}",
      Jac: "\\operatorname{Jac}",
      li: "\\operatorname{li}",
      Li: "\\operatorname{li}",
      Lie: "\\operatorname{Lie}",
      Line: "\\operatorname{Line}",
      lcm: "\\operatorname{lcm}",
      Mat: "\\operatorname{Mat}",
      Mod: "\\operatorname{Mod}",
      Dmod: "\\Mod_{W[F,V]}^{\\text{fl}}",
      nil: "\\operatorname{nil}",
      nm: "\\operatorname{Nm}",
      NS: "\\operatorname{NS}",
      ord: "\\operatorname{ord}",
      PDer: "\\operatorname{PDer}",
      PGL: "\\operatorname{PGL}",
      Pic: "\\operatorname{Pic}",
      Pico: "\\operatorname{Pic}^{\\circ}",
      Pois: "\\operatorname{Pois}",
      poly: "\\operatorname{poly}",
      polylog: "\\operatorname{polylog}",
      PSL: "\\operatorname{PSL}",
      Per: "\\operatorname{Per}",
      perm: "\\operatorname{perm}",
      PrePer: "\\operatorname{PrePer}",
      Prob: "\\operatorname{Prob}",
      Proj: "\\operatorname{Proj}",
      Prj: "\\textbf{Proj}",
      QCoh: "\\operatorname{QCoh}",
      Rad: "\\operatorname{Rad}",
      range: "\\operatorname{range}",
      rank: "\\operatorname{rank}",
      red: "\\operatorname{red}",
      Reg: "\\operatorname{Reg}",
      Res: "\\operatorname{Res}",
      Ric: "\\operatorname{Ric}",
      rot: "\\operatorname{rot}",
      Scal: "\\operatorname{Scal}",
      schs: "(\\text{Sch}/S)",
      schk: "(\\text{Sch}/k)",
      se: "\\text{se}",
      srank: "\\text{srank}",
      hse: "\\wh{\\text{se}}",
      Sel: "\\operatorname{Sel}",
      sens: "\\operatorname{sens}",
      Set: "(\\text{Set})",
      sgn: "\\operatorname{sign}",
      sign: "\\operatorname{sign}",
      SL: "\\operatorname{SL}",
      SO: "\\operatorname{SO}",
      Spec: "\\operatorname{Spec}",
      Specf: ["\\Spec\\pa{\\frac{k[{#1}]}{#2}}",2],
      rspec: "\\ul{\\operatorname{Spec}}",
      Spl: "\\operatorname{Spl}",
      spp: "\\operatorname{sp}",
      spn: "\\operatorname{span}",
      Stab: "\\operatorname{Stab}",
      SU: "\\operatorname{SU}",
      Supp: "\\operatorname{Supp}",
      ssupp: "\\operatorname{sing}\\operatorname{supp}",
      Sym: "\\operatorname{Sym}",
      Th: "\\operatorname{Th}",
      Tor: "\\operatorname{Tor}",
      tor: "\\operatorname{tor}",
      Tr: "\\operatorname{Tr}",
      tr: "\\operatorname{tr}",
      val: "\\text{val}",
      Var: "\\operatorname{Var}",
      var: "\\text{var}",
      vcong: "\\operatorname{vcong}",
      Vol: "\\text{Vol}",
      vol: "\\text{vol}",
      cal: ["\\mathcal{#1}",1],
      bb: ["\\mathbb{#1}",1],
      abe: "^{\\text{ab}}",
      gal: "^{\\text{gal}}",
      op: "^{\\text{op}}",
      pre: "^{\\text{pre}}",
      rd: "_{\\text{red}}",
      sep: "^{\\text{sep}}",
      tp: "^{\\text{top}}",
      tors: "_{\\text{tors}}",
      ur: "^{\\text{ur}}",
      urt: "^{\\text{ur}\\times}",
      commsq: ["\\xymatrix{#1\\ar[r]^-{#6}\\ar[d]_{#5} &#2\\ar[d]^{#7} \\\\ #3 \\ar[r]^-{#8} & #4}",8],
      pull: ["
#1\\ar@/_/[ddr]_{#2} \\ar@{.>}[rd]^{#3} \\ar@/^/[rrd]^{#4} & &\\\\
& #5\\ar[r]^{#6}\\ar[d]^{#8} &#7\\ar[d]^{#9} \\\\",9],
      back: ["& #1 \\ar[r]^{#2} & #3",3],
      cmp: ["
\\xymatrix{
#1 \\ar[r]^{#4}{#5} \\ar@/_2pc/[rr]^{#8}_{#9} & #2 \\ar[r]^{#6}_{#7} & #3
}
",9],
      ctr: ["
\\xymatrix{
#1 \\ar[rr]^{#4}_{#5}\\ar[rd]^{#6}_{#7} && #2\\ar[ld]_{#8}^{#9}\\\\
& #3 &
}
",9],
      ctrr: ["
\\xymatrix{
#1 \\ar[rr]^{#4}_{#5} && #2\\\\
& #3 \\ar[lu]_{#6}^{#7}\\ar[ru]_{#8}^{#9}&
}
",9],
      ctri: ["
\\xymatrix{
#1 \\ar[rr]^{#4}_{#5}\\ar[rd]^{#6}_{#7} && #2\\\\
& #3 \\ar[ru]^{#8}_{#9}&
}
",9],
      rcommsq: ["\\xymatrix{#1 &#2\\ar[l]_-{#6} \\\\ #3 \\ar[u]^{#5} & #4 \\ar[u]_{#7}\\ar[l]_-{#8}}",8],
      ha: ["\\ar@{^(->}[#1]",1],
      ls: ["\\ar@{-}[#1]",1],
      sj: ["\\ar@{->>}[#1]",1],
      aq: ["\\ar@{=}[#1]",1],
      acir: ["\\ar@{}[#1]|-{\\textstyle{\\circlearrowright}}",1],
      acil: ["\\ar@{}[#1]|-{\\textstyle{\\circlearrowleft}}",1],
      ard: ["\\ar@{.>}[#1]",1],
      mt: ["\\ar@{|->}[#1]",1],
      inm: ["\\ar@{}[#1]|-{\\in}",1],
      inr: "\\ar@{}[d]|-{\\rotatebox[origin=c]{-90}{$\\in$}}",
      inl: "\\ar@{}[u]|-{\\rotatebox[origin=c]{90}{$\\in$}}",
      sumr: ["\\sum_{\\scriptsize \\begin{array}{c}{#1}\\\\{#2}\\end{array}}",2],
      prr: ["\\prod_{\\scriptsize \\begin{array}{c}{#1}\\\\{#2}\\end{array}}",2],
      su: "\\sum_{n=0}^{\\iy}",
      suo: "\\sum_{n=1}^{\\iy}",
      sumo: ["\\sum_{#1=1}^{#2}",2],
      iiy: "\\int_0^{\\infty}",
      iiiy: "\\int_{-\\infty}^{\\infty}",
      sui: "\\sum_{i=1}^{n}",
      suiy: "\\sum_{i=1}^{\\iy}",
      cui: "\\bigcup_{i=1}^n",
      suj: "\\sum_{j=1}^{n}",
      suij: "\\sum_{i,j}",
      limn: "\\lim_{n\\to \\infty}",
      coltwo: ["
\\begin{pmatrix}
{#1}\\\\
{#2}
\\end{pmatrix}",2],
      colthree: ["
\\begin{pmatrix}
{#1}\\\\
{#2}\\\\
{#3}
\\end{pmatrix}
",3],
      cth: ["
\\begin{pmatrix}
{#1}\\\\
{#2}\\\\
{#3}
\\end{pmatrix}
",3],
      detm: ["
\\ab{
\\begin{matrix}
{#1}&{#2}\\\\
{#3}&{#4}
\\end{matrix}
}",4],
      sdetm: ["
\\ab{
\\begin{smallmatrix}
{#1}&{#2}\\\\
{#3}&{#4}
\\end{smallmatrix}
}",4],
      matt: ["
\\begin{pmatrix}
{#1}&{#2}\\\\
{#3}&{#4}
\\end{pmatrix}
",4],
      smatt: ["
\\left(\\begin{smallmatrix} 
{#1}&{#2}\\\\
{#3}&{#4}
\\end{smallmatrix}\\right)
",4],
      bt: ["
\\left\\{\\begin{matrix}
\\text{#1}\\\\
\\text{#2}
\\end{matrix}
\\right\\}",2],
      bth: ["
\\left\\{\\begin{matrix}
\\text{#1}\\\\
\\text{#2}\\\\
\\text{#3}
\\end{matrix}
\\right\\}",3],
      beq: ["\\begin{equation}\\llabel{#1}",1],
      eeq: "\\end{equation}",
      bal: "\\begin{align*}",
      eal: "\\end{align*}",
      ban: "\\begin{align}",
      ean: "\\end{align}",
      ig: ["\\begin{center}\\includegraphics[scale=#2]{#1}\\end{center}",2],
      am: "(a.e., $\\mu$)",
      ftla: ["\\int e^{i\\lambda\\cdot x}{#1}\\,d\\lambda",1],
      lime: "\\lim_{\\varepsilon\\to 0}",
      modt: ["\\,(\\text{mod}^{\\times}\\, {#1})",1],
      tl: "T_{\\ell}",
      zmod: ["\\Z/{#1}\\Z",1],
      md: ["\\,(\\text{mod }#1)",1],
      ks: ["K(\\sqrt{#1})",1],
      ksq: ["K(\\sqrt{#1})/K",1],
      nksq: ["\\nm_{K(\\sqrt{#1})/K}(K(\\sqrt{#1})^{\\times})",1],
      mpp: "\\mP/\\mfp",
      cvd: "\\frac{D}{\\partial t}",
      cvs: "\\frac{D}{\\partial s}",
      np: ["\\nabla_{\\pd{}{#1}}",1],
      av: "A^{\\vee}",
      Deq: ["\\Delta^{\\times}_{#1}",1],
      GLAi: "\\text{GL}_2(\\mathbb A)_{\\infty}",
      Dict: "\\operatorname{\\mathsf{Dict}}",
      Maj: "\\operatorname{\\mathsf{Maj}}",
      MAJ: "\\operatorname{\\mathsf{Maj}}",
      Tribes: "\\operatorname{\\mathsf{Tribes}}",
      Ns: "\\operatorname{NS}",
      DT: "\\operatorname{\\mathsf{DT}}",
      DNF: "\\operatorname{\\mathsf{DNF}}",
      CNF: "\\operatorname{\\mathsf{CNF}}",
      Circuit: "\\operatorname{\\mathsf{Circuit}}",
      Ac: "\\mathsf{AC}",
      EB: "\\text{EB}",
      ACC: "\\operatorname{\\mathsf{ACC}}",
      BPP: "\\mathsf{BPP}",
      BPTIME: "\\operatorname{\\mathsf{BPTIME}}",
      CLIQUE: "\\operatorname{\\mathsf{CLIQUE}}",
      EXP: "\\mathsf{EXP}",
      NEXP: "\\mathsf{NEXP}",
      NP: "\\operatorname{\\mathsf{NP}}",
      NTIME: "\\operatorname{\\mathsf{NTIME}}",
      PCP: "\\operatorname{\\mathsf{PCP}}",
      SAT: "\\mathsf{SAT}",
      SUBEXP: "\\mathsf{SUBEXP}",
      TIME: "\\operatorname{\\mathsf{TIME}}",
      zz: "\\textcircled{Z}",
      hten: "\\widehat{\\theta_n}",
      blu: ["{\\color{blue}#1}",1],
      grn: ["{\\color{green}#1}",1],
      redd: ["{\\color{red}#1}",1],
      pur: ["{\\color{purple}#1}",1],
      oge: ["{\\color{orange}#1}",1],
      concept: ["#1",1],
      fixme: ["{\\color{red}#1}",1],
      cary: ["{\\color{purple}#1}",1],
      llabel: ["\\label{#1}\\text{\\fixme{\\tiny#1}}",1],
      nref: ["\\ref{#1}",1],
      itag: ["\\index{#1}[\\##1]",1],
      ilbl: ["[#1]\\index{#1}",1],
      iadd: ["\\index{#1} #1",1],
      arxiv: ["\\url{http://www.arxiv.org/abs/#1}",1],
      ivocab: ["\\index{#1}\\textbf{#1}",1],
      vocab: ["\\textbf{#1}",1],
      summq: ["\\textbf{Summary Question: }#1",1],
      keypt: ["{\\it #1}",1],
      subprob: ["\\noindent\\textbf{#1}\\\\",1],
      qatable: ["\\begin{center}
    \\begin{longtable}{ | p{5.5cm} | p{10cm} |}
#1
\\end{longtable}
\\end{center}",1]
    }
  }
});

MathJax.Ajax.loadComplete("[MathJax]/config/local/local.js");
