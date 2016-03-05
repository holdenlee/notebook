---
title: [MNS12] 
published: 2016-02-28
modified: 2016-02-28
tags: abbe
type: paper
cite: Mossel, Elchanan, Joe Neeman, and Allan Sly. "Stochastic block models and reconstruction." arXiv preprint arXiv:1202.1499 (2012).
link: http://arxiv.org/pdf/1202.1499.pdf
showTOC: true
---

#Summary

Mossel, Elchanan, Joe Neeman, and Allan Sly. "Stochastic block models and reconstruction." arXiv preprint arXiv:1202.1499 (2012).

Model: Given a stochastic block model $G(n, \fc an, \fc bn)$, recover the communities and estimate $a$ and $b$.

They prove 3/4 of the problem. The conjectured threshold is $(a-b)^2>2(a+b)$.

1. When $(a-b)^2>2(a+b),
    1. Recovery: can we recover the communities efficiently? (Still open.)
	2. Estimate $a,b$ (w.h.p. get $a(1+o(1))$ as $n\to \iy$). (Theorem 2.5)
2. When $(a-b)^2\le 2(a+b)$,
    1. Non-recovery: we can recover communities exactly (with probability $1-o(1)$). (Theorem 2.1)
	2. Non-estimation: we cannot estimate $a,b$. (Theorem 2.4)

Note that recovery seems stronger than estimation (is this true formally?).

Details of the theorems: Let $\Pj_n=\cal G(n,\fc an, \fc bn)$, $\Pj_n' = \cal G(n,\fc{a+b}{2n})$.

* 2.1: Show something stronger: for fixed vertices, $\Pj_n(\si_u=+|G,\si_v=+)\to \rc2$ a.a.s. This means no algorithm can tell whether 2 vertices have the same label.[^f1]
* 2.4: Show that $\Pj_n,\Pj_n'$ are mutually continuous.
    * Mutually contiguous means that $\Pj_n(A_n)\to 0\iff \Pj_n'(A_n)\to 0$. This is weaker than being statistically indistinguishable.
	* Mutual continiguity is a transitive relation, so it's indistinguishable from all $\cal G(n,\fc{a'+b'}{2n})$ also satisfying the same inequality, with the same sum.
* 2.5: There are consistent estimators for $a,b$ depending on the number of $k_n$-cycles ($k_n=\fl{\ln^{\rc 4}n}$).
    * $\Pj_n,\Pj_n'$ are asymptotically orthogonal, i.e., there is $A_n$, $\Pj_n(A_n)\to 1, \Pj_n'(A_n)\to 0$.

[^f1]: Note that the "a.s." is with respect to $(\si,G)$. Two neighboring vertices will have a lot of information on each other, but two vertices will be neighboring with low probability with respect to the distribution over $G$.

#Proofs

##Estimation

Idea: The number of cycles for $\Pj_n,\Pj_n'$ follow a Poisson distribution. They are spaced farther apart than their standard deviation exactly when $(a-b)^2>2(a+b)$.

1.  Calculation of number of $k$-cycles:
    $$ X_{k,n}\xra{d} \Pois\pa{\rc{k2^{k+1}}((a+b)^k + (a-b)^k)}.$$
	(For the Erdos-Renyi random graph $a'=b'=\fc{a+b}{2}$, there is no 2nd term.)
	To calculate this,
	1.  Expected value: Use linearity of $\E$ over all $\binom nk$ cycles. The probability of the cycle depends on the number of sign changes. Get $n^{-k}2^{-k+1}\sum_{m\text{ even}} \binom km a^{k-m}b^m$.
	2.  Higher moments: We're counting number of $m$-cycles. It suffices to show the expected number of non-vertex disjoint $m$-types converges to 0.[^q1] Then it's Poisson.
2.  Parameters. $a+b$ can be estimated from average degree. Estimate $a-b$ using the estimate for $a+b$ and $X_{k_n}$.
3.  Algorithm. This is Proposition 3.2 which I don't understand![^q2]

[^q1]: ? (How? Reference given is Bollobas, Ch. 4. Need $k=O(\ln^{\rc 4}n)$.)
[^q2]: ?

##Non-recovery

First consider a problem on trees.

Model: A Galton-Watson tree has $\Pois(d)$ offspring. An offspring is flipped with probability $\ep$. Can you deduce the sign of the root from the sign of the depth-$R$ signs?

Answer: There is threshold.

Idea of non-recovery: On neighborhoods, the distribution of signs is close to that of the model. The posterior distribution of the signs given the graph is approximately a Markov.

1.  **Theorem 4.1**: $d(1-2\ep)^2\le 1 \iff \lim_{R\to \iy} \Pj(\tau_p=+|\tau_{\pl T_R})=\rc2$ a.s.[^q3]
2.  **Pr. 4.2**: The distribution of a small neighborhood of a given vertex is statistically close the the distribution for the tree model. Take the radius to be $\rc{C} \log_{\fc{a+b}2} n$, so that the expected number of nodes is $O(n^{\rc C})$. Think of this as a coupling argument. Do an inductive argument on the depth, the distance between distributions grows a little each time. Bound the probability of the bad event of having too many children---if this doesn't happen, there are still approximately $\fc n2$ $+$'s and $-$'s left, and the appromate number of children that switch/don't switch will be close to $\fc a2, \fc b2$. (See lemmas 4.3-6.)
3.  Consider $\Pj(\si|G)$. This is not a Markov field because the probability (multiplying factor) of non-edge is different for if the vertices are same/different. But the ratio is $\fc{1-\fc an}{1-\fc bn}\approx 1$, so it shouldn't have much effect. We show we still have approximate independence in the sense of **Lemma 4.7**: $\Pj(\si_A|\si_{B\cup C,G} = (1+o(1))\Pj(\si_A|\si_B,G)$ for a.a.e. $G,\si$,[^q4] when $A,B,C$ is a partition with $|A\cup B|=o(\sqrt n)$. (This condition is necessary to make sure we're not multiplying too many $(1-\fc an)$ and $(1-\fc bn)$'s.) Take $A$ to be $B_{R-1}(v)$, $B$ to be $\pl G_R$, and $C$ to be the rest. This gives that $\si_v,\si_\rh$ are conditionally independent given the boundary.
4.  Use 1 with $\ep = \fc{b}{a+b}, d=\fc{a+b}{2}$ (proportion of edges corresponding to flipping). The variance approaches the variance without conditioning on $\si_v$. The variance without conditioning $\Var(\si_\rh|G_,\si_v)$ is close to tht for the tree model, which is 1 (the nonrecovery regime) when $d(1-2\ep)^2\le 1$, which is exactly the condition. From the variance going to 1, the expectation goes to 0;probability goes to $\rc2$.

[^q3]: It would be good to understand this proof for $d$-ary trees (without the GW complication).
[^q4]: I don't understand what it means by random partition.

##Non-estimation

(Unfinished)

Define $\Pj_n(\si|G)$ to be the same as $\Pj_n'(\si|G)$. The joint distribution is not the same because the marginal distribution over the graphs is different.

Use a criteria for contiguity, **Theorem 5.1**[^q5]. See this as a black box. Calculate moments, etc. of $Y_n=\fc{\Pj_n}{\Pj_n'}$. Using independence of edges given $\si$, you can decompose this as a product nicely.

[^q5]: I don't understand the motivation/theory behind this. Reference is [35], Wormald, Models of random regular graphs.

#Questions

##Minor

* What is a.a.s.?


