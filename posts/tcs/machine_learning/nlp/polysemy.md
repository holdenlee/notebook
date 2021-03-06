---
title: (ALLMR16) Linear Algebraic Structure of Word Senses, with Applications to Polysemy
published: 2016-03-15
modified: 2016-03-15
tags: nlp, word embeddings
type: paper
showTOC: True
---

Words don't just live in a small-dimensional space; they are composed of a small number of atoms plus noise.

$$v_w = Ax_w + n_w$$
where $\Supp(x_w)\le s$ ($s=5$ works well), $A$ is overcomplete $d\times k$, $k>d$, and $n_w$ is noise. $k=2000$ works well. The $A_{\bullet i}$ are discourse vectors. They correspond to different senses (meanings) of the word. (Rather than just different features of the word.)

Do dictionary learning another time (recursive/hierarchical!)[^f1] with $k'=200$ and sparsity $s'=2$. Get meta-discourse vectors.

[^f1]: cf. hierarchical topic models (but sparse coding is very different from topic modeling. does it work better?), cf. a multiple-layer neural net

For a polysemous word, given lists (by WordNet/humans) of sets of 8 words representing senses,

1.  find 5 atoms of the word and its inflectional forms to obtain 10-20 candidate discourse atoms.
2.  for each atom, find top 2 senses with highest normalized similarities,
    $$S(a,L) = \sqrt{\sum_{u\in L}\an{a,v_u}^2/|L|} + \sqrt{\sum_{u\in L}\an{v_w,v_u}^2/|L|}.$$
3.  return top $k$ senses.

Let $r=\fc{\Pj(w_2)}{\Pj(w_1)}$. The set of words that appear in both $w_1,w_2$ is much smaller than the set of words that appear with exactly one of them.

Suppose each $\chi$ appears with only one $w_i$. Let $T_i$ be the $\chi$ appearing with $w_i$. Then
\begin{align}
\chi&\in T_1\implies &PMI(\chi,w) &= PMI(\chi,w_1) - \ub{\log(1+r)}{\ka_1}\\
\chi&\in T_2\implies &PMI(\chi,w) &= PMI(\chi,w_2) - \ub{\log(1+\rc r)}{\ka_2}.
\end{align}

Identify words and their context vectors.

*Claim*: under the assumptions

1. $v_1\perp v_2$
2. For words that coappear with $w_1$, their vectors are pretty correlated with $v_1$, and orthogonal components behave like random vectors, $\chi= \an{\chi,v_1}v_1/ve{v_1}^2 + \xi$

we have
$$\amin_z \sum_\chi \Pj(\chi,w) (PMI(\chi,w)-\an{\chi,z})^2\approx \sumo i2(1-\ka_ic_i)v_i.$$
[^f2]

[^f2]: This tells us how the word vectors change, provided that the other terms in the sum don't affect things much.

Note the logarithmic scaling---this means that even small senses are detectable.

