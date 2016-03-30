---
title: [AGMM15] Simple, efficient, and neural algorithms for sparse coding
published: 2016-03-25
modified: 2016-03-25
tags: dictionary learning, sparse coding
type: paper
showTOC: True
---

#Problem/Model and Assumptions

Given many independent samples $y=A^*x^*+N$, recover $(A^*,x^*)$. Here,

1. $A^*\in \R^{n\times m}$ is a fixed matrix. We assume:
    * $A$ has unit norm columns.
    * (Norm is like that of a random matrix) $\ve{A^*}=O\pa{\sfc{m}{n}}$.
	* $A$ is $\mu$-incoherent, i.e., $\an{A_i,A_j}\le \fc{\mu}{\sqrt n}$.
2. $x^*$ is drawn from a sparse distribution. Specifically, $x^*\sim D$ where
    * Always, $\Supp(x^*)\le k$.
	* $\Pj(i\in S)=\Te\pf{k}{m}$.
	* $\Pj(i,j\in S) = \Te\pf{k^2}{m^2}$.
    * $\E[x_i^*|x_j^*\ne 0]=0$ (why do we care about the conditioning here?) and $\E[x_i^{*2}| x_i^*\ne0]=1$.
	* When $x_i^*\ne 0$, $|x_i^*|\ge C$ for some constant $C\le 1$. (This is an unreasonable assumption, but it makes sure the thresholding doesn't cut off actual coordinates.)
	*   Conditioned on the support, the nonzero entries are pairwise independent and subgaussian. Subgaussian means $\exists C,v>0, \Pj(|X|>t)\le Ce^{-vt^2}$ or equivalently $\exists b, \E e^{tX}\le e^{b^2t^2/2}$.
3. The noise $N$ is Gaussian and independent.[^q1]

[^q1]: What is the magnitude? I think this is responsible for the $\ga$'s that appear, but which are swept under the rug.

#Algorithm

The algorithm is alternating minimization. In alternating minimization, we want to minimize a function $f(x,y)$. It is difficult to minimize with respect to $(x,y)$ together (e.g., because $f$ is nonconvex when taken as a joint function of $x,y$) but easy to minimize with respect to $x$ or $y$ while keeping the other fixed (e.g., because $f$ is convex in $x$ and in $y$). Alternate between

* minimizing with respect to $x$, and
* minimizing with respect to $y$.

For example, we can take gradient steps.

There are no results for general nonconvex $f$; theoretical results tend to be ad hoc (for specific $f$). AGMM make a general technique that can be used to analyze alternating minimization algorithms, **approximate gradient descent**.

##Instantiation

###Version 1

The algorithm is

* Input: initial guess $A^0$, step size $\eta$.
* At step $s$, take $p$ samples $y^{(i)}$ and let
    *   (Decode) Let $x^{(i)}=1_{\ge \fc C2}((A^s)^Ty^{(i)})$.
	*   (Update) 
		\begin{align}
		\wh g^s &=\rc p \sumo ip (y^{(i)} - A^{(s)}x^{(i)}) \sign(x^{(i)})^T\\
		A^{s+1} &= A^s - \eta \wh g^s
		\end{align}

The decoding step is doing a minimization with respect to $x$[^q2]. Intuitively, since $A^*$ is incoherent (random-like), $(A^*)^TA^*\approx I$, so multiplying by $(A^*)^T$ has the effect of inverting. The threshold acts as a denoiser.

[^q2]: Is it the minimum?

Note that we don't quite take the gradient step: the gradient is $2(y^{(i)} - Ax^{(i)})^T x^{(i)}$; we only take the sign of $x^{(i)}$.[^q3]

[^q3]: Is this important, or just for simplicity of analysis?

(There's no regularization here?)

###Version 2

A better version of the above is to use gradient descent (Olshausen-Field), rather than just the sign of the difference. Let $A'=A - \eta g$ where $g=\E [(y-Ax) x^T]$. The complication is that this may not prserver $(\de,2)$-nearness, so the update rule is replaced by

\begin{align}
\wh g^s &=\rc p \sumo ip (y^{(i)} - A^{(s)}x^{(i)}) \sign(x^{(i)})^T\\
A^{s+1} &= \Proj_B(A^s - \eta \wh g^s)
\end{align}
where $B$ is the set of $(\de_0,2)$-close matrices to $A^*$.

###Instantiation

The algorithms above require a matrix that is $O^*\prc{\log n}$-close to the true matrix. Algorithm 3 gives such a matrix.

*   Set $L=\phi$.
*   While $|L|<m$ choose samples $u,v$. (We will need $p_1$ of these samples.)
    *   Set $\wh M_{u,v} - \EE_{i\in p_2}$\an{y^{(i)},u}\an{y^{(i)},v} y^{(i)}y^{(i)T}$. (Average over $p_2$ fresh samples.)
	*   Compute the top two singular values $\si_1,\si_2$ and top singular vector $z$ of $\wh M_{u,v}$.
	*    If $\si_1\ge \Om\pf{k}{m}, \si_2<O^*\pf{k}{m\log m}$, and $\pm z$ is not within distance $\rc{\log m}$ of any vector in $L$, add $z$ to $L$.
* Let $z\in L$ be the columns of $\wt A$. Let $A=\Proj_B\wt A$.

#Approximate gradient descent

A general condition for a "descent"-type algorithm to work is that we make a step correlated with the direction to the optimum each time.

**Definition**: $g$ is $(\al,\be,\ep)$-correlated with $z^*$ if
$$\an{g,z-z^*} \ge \al\ve{z-z^*}^2 + \be \ve{g}^2 - \ep.$$

An algorithm which makes correlated steps has geometric convergence. For example, gradient descent on strongly convex, smooth functions gives geometric convergence.

**Proposition**: If $f$ is $2\al$-strongly convex and $\rc{2\be}$-smooth, then $\nb f(z)$ is $(\al,\be,0)$-correlated with $z^*$.

*Proof*: Note that $L$-smooth means $f(x) - f(x^*) \ge \rc{2L} \ve{\nb f(x)}^2$ (cf. gradient descent lemma). Then
\begin{align}
\an{g,x-x^*} &\ge f(x)-f(x^*) + \al\ve{x-x^*}^2\\
&\ge \be \ve{\nb f}^2 + \al\ve{x-x^*}^2.
\end{align}

**Theorem** (Theorem 6): If $g$ is $(\al,\be,\ep)$-correlated with $z^*$ and $z'=z-\eta g$ and $0<\eta\le 2\be$, then
$$\ve{z'-z^*}^2 \le (1-2\al \eta)\ve{z-z^*}^2 + 2\eta \ep.$$
If $z_{t+1}=z_t - \eta g_t$ and each $g_t$ is $(\al,\be,\ep)$-correlated with $z^*$,
$$\ve{z_t-z^*}^2\le (1-\al \eta)^t \ve{z_0-z^*}^2.$$

(Note the usual gradient step size for $\rc{2\be}$-smooth functions is $2\be$.)

*Proof*: Break up $z'-z^* = (z-z^*) - \eta g$ in order to use the correlation.
\begin{align}
\ve{z'-z^*}^2 &=\ve{z-z^*} - 2\an{z-z^*, \eta g} + \eta^2\ve{g}^2\\
&\le \ve{z-z^*}^2 - 2\eta (\al\ve{z-z^*}^2+\be \ve{g}^2-\ep) + \eta^2\ve{g}^2\\
&= (1-2\eta \al)\ve{z-z^*}^2 +\ub{ \eta (\eta - 2\be) \ve{g}^2}{\le 0} + 2\eta \ep.
\end{align}

In actuality, we'll need a weaker form of this, "$(\al,\be,\ep_s)$-correlated with high probability" (Definition 38). There is an analogue of the theorem in this setting (Theorem 40).

#Theorems

* Theorem 2, 9 give the convergence of the main alternating minimization algorithm for sparse coding, given good initialization. Theorem 14 is the simpler case where we have an infinite number of samples in each step (so we can actually minimize in $A$ at each step, rather than just take a step towards the minimum). We show Theorem 14.
* Theorem 3, 13 give the convergence of a more sophisticated algorithm which achieves better additive error.
* Theorem 4, 19 give an algorithm to initialize $A$ (using SVD).

Say $A$ is $(\de,\ka)$-near to $A^*$ if

* there is a permutation $\pi\in S_m$ and $\si:[m]\to \{\pm1\}$ such that $\ve{\si(i)A_{\pi(i)}-A_i^*}\le \de$ for all $i$.
* $\ve{A-A^*}\le \ka \ve{A^*}$.

In detail: Let $\de = O^*\prc{\log n}$. (Here $x=O^*(y)$ means there exists $c$ such that the statement is true for $x\le cy$.[^f1])

[^f1]: This is to disambiguate from the other meaning of $O$, which is "whenever $x\le cy$ for some $c$, there are constants such that the result holds." 

*   (Theorem 14, 9) Suppose $A^0$ is $(2\de,2)$-near to $A^*$ and $\eta = \Te\pf{m}{k}$. If each update step uses an infinite ($\wt \Om(mk)$) samples, there is $0<\tau<\rc2$ such that 
    $$\ve{A_i^s - A_i^*}^2\le \ve{A_i^0 - A_i^*}^2 + \begin{cases}O\pf{k^2}{n^2}&\\
	O\pf{k}n&\\\end{cases},$$
	respectively.[^q4]
*   (Theorem 13) We can improve the algorithm to get additive error $n^{-\om(1)}$.
*   (Theorem 19) If the instantiation algorithm is given $p_1=\wt\Om(m)$ and $p_2=\wt\Om(mk)$ fresh samples, and
    * $A^*$ is $\mu=O^*\pf{\sqrt n}{k(\log n)^3}$-incoherent,
	* $m=O(n)$
	* $\ve{A^*} \le O\pa{\sfc{m}{n}}$,
	then w.h.p. $A$ is $(O^*\prc{\log n},2)$-near to $A^*$.

[^q4]: Are we implicitly reordering the columns here?

#Proofs

We cheat in this proof; for the correct version see Appendix D. We calculate $\E g$, the expected value of the gradient step, and pretend that is the actual gradient step (this is OK for infinite sample size). For the real version, we'd have to consider concentration around $\E g$.

The strategy is to show that step is correlated with the actual minimum, and then use the theorem on approximate gradient descent. First, we need to show that the minimum $x$ will have the right support with high probability.

*   (Lemma 10, 23) Suppose $A$ is $\de$-close to $A^*$. Then with high probability over $y=A^*x^*$ (randomness is over $x\sim D$),
	$$\sign(1_{\ge \fc C2} (A^Ty)) = \sign(x^*).$$
	(Decoding gives the right sign. This uses crucially that $A$ is already close enough.)
	We rely on the assumption that when $x_i\ne 0$, it is bounded away on 0. (It would be interesting to remove this condition.)
	*   **Lemma**: If $\fc{\mu}{\sqrt{n}}\le \rc{2k}$ and $k=\Om^*(\log m)$ and $\de=O^*\prc{\sqrt{\log m}}$, then w.h.p over $x^*$, $S:=\Supp(x^*)=\set{i}{|\an{A_i, y}|>\fc C2}$, and $\sign(\an{A_i,y})=\sign(x_i^*)$.
	    *Proof*: Write
		$$\an{A_i, A^*x^*}=\ub{\an{A_i,A_i^*}x_i^*}{\ad\ge 1-\fc{\de^2}2} + \sum_{j\ne i} \ub{\an{A_i,A_j^*}}{(\cdot)^2 \le 2\mu^2 + \an{A_i-A_i^*,A_j^*}}x_j^*$$
		where we use closeness of $A_i,A_i^*$ and incoherence of $A^*$. The sum is $$\le 2\mu^2 + \ve{A_{S\be \{i\}}^{*T}(A_i-A_i^*)}^2.$$ Bound $\ve{A_{S\bs\{i\}}}^2$ by bounding
		$$\ve{A_{S\bs\{i\}}}^2 =\sqrt{\ve{A_{S\bs\{i\}}^TA_{S\bs\{i\}}}} \le \sqrt{1+k\fc{\mu}{2\sqrt n}}.$$
*   (Lemma 11) Now derive an expression for the expected value of the next value of $A$. Let $A'=A-\eta g$. We write it in the form $\al (A-A^*)+\pat{error terms}$.
	*   **Lemma**: Let $A'=A-\eta g$. Then
		$$\E g_i = p_iq_i (\ub{\an{A_i' , A_i^*}}{=:\la_i}A_i - A_i^*+O\pf{k}n).$$[^q5]
		*Proof*: With high probability, $g$ has the right sign as $x$, so in calculating the expected value, we can assume it always has the right sign---its support is always $\Supp(x)$. Then we can restrict to the support of $x$. We separate the term $i$ because that will have the main contribution (recall incoherence means $AA^T \approx I$).
		\begin{align}
		\E g_i &= \E[(y-Ax)\sgn(x_i)]\\
		&\approx \E[(y-A_SA_S^Ty) \sgn(x_i)]\\
		&=\E[(I-A_SA_S^T)A^* x \sgn(x_i)]\\
		&=\E[(I-A_iA_i^T)A^* x \sgn(x_i)] - \E[A_{S\bs\{i\}} A_{S\bs\{i\}}^T A^* x \sgn(x_i)]\\
		&= \ub{\E[x_i^*\sgn(x_i^*)|S]}{p_i} \ub{\Pj(i\in S)}{q_i} (I-A_iA_i^T) A_i^* - p_i A_{-i} \diag(\ub{\Pj(i,j\in S)}{q_{i,j}}) A_{-i} A_i^*.
	    \end{align}
		The error is $\ve{A_{-i}}^2\max\fc{q_{ij}}{q_i} = \fc mn O\pf km = O\pf kn$, as needed.
*   (Lemma 15-18) Bound the error term to show that at each step of the algorithm, the step is correlated, and maintains nearness.
	*   Lemma 11 gives the following. Let $k=p_iq_i$. We show the bound indicated below.
		$$\E g_i  = \ub{p_iq_i}{=:k}(A_i - A^*) + \ub{p_iq_i ((1-\la_i) A_i + \ep_i + \ga)}{\ved \le \fc k4 \ve{A_i - A_i^*} + \ze}$$
		where $\ze=O\pf{k^2}{mn}$.
		Then
		$$\an{g_i,A_i-A_i^*} \ge k\ve{A_i - A_i^*}^2 - \fc k4 \ve{A_i - A_i^*}^2 - \ze\ve{A_i - A_i^*}.$$
		Using the inequality $ax^2-bx \ge cx^2 + \fc{b^2}{4(a-c)}$ with $a=\fc 34k$, $b=\ze$, $c=\fc k4$, we get this is $\ge \rc 4 k\ve{A_i-A_i^*}^2 + \fc{\ze^2}{2k}$.
	*   Thus $\E g_i$ is $(\Om\pf km, \Om\pf mk, O\pf{k^3}{mn^2})$-correlated with $A^*$. The last term comes from $\fc{\ep}{\al} = \fc{k^3/(mn^2)}{k/m}$.
	*   Note we need to maintain nearness in order to apply the estimates that gave correlation. (Where do we use 2-nearness in Lemma 11?) We show nearness is preserved. The natural way to decompose $A_i'$ is as follows.
		\begin{align}
		\E(A_i' - A_i^*) &= \E[(A_i' - A_i)+(A_i-A_i^*)]\\
		&=-\eta p_iq_i (\la_i^s A_i^s - A_i^*+\ep_i +\ga) + A_i - A_i^*\\
		&=\diag(1-\eta p_iq_i) (A_i-A_i^*) + (1-\la_i) \eta p_iq_i A_i - \eta p_iq_i(\ep_i+\ga).
		\end{align}
		Now bound the two error terms by bounding the spectral norm.
*   Finish.
	*   At each step the step is $(\Om\pf{k}m,\Om \pf mk, O\pf{k^3}{mn^2})$-correlated with $A_i^*$. By the approximate gradient descent theorem, this gives the result.

[^q5]: Do we need concentration too?

##Initialization

*   (Lemma 20) Write $M_{u,v}=\EE[\an{u,y}\an{v,y}yy^T]$ as a main term plus error terms. (Why does this only give up to $\rc{\log n}$?)
    $$ M_{u,v} = \sum_{i\in U\cap V} q_ic_i\be_i\be_i' A_i^*,A_i^{*T}+E_1+E_2+E_3$$
	where $\be = A^{*T},\be'=A^{*T}v,q_i=\Pj(i\in S), c_i=\E[x_i^{*4}|i\nin S]$, $U=\Supp(u),V=\Supp(v)$. The main term comes from the indices in ths support of both vectors.
	To calculate this, expand in terms of $x_i^*$, and note that because they have mean 0, the terms that contribute are $x_i^{*4},x_i^{*2}x_j^{*2}$.
	Bound the spectral norm of $E_1+E_2+E_3$ by $O^*\pf{k}{m\log n}$.
	*   (Lemma 36) If $U\cap V=\{i\}$, then the top singular vector of $M_{u,v}$ is $O^*\prc{\log n}$-close to $A_i^*$. Proof: Use Wedin's Theorem. (Let $v_1(A)$ be the top eigenvector of $A$. If $\de=|\la_1(A)-\la_2(A)|$, then $\sin(\angle (v_1(A), v_1(A+E)))\le \fc{\ve{E}_2}{\de}$.)
	*   (Lemma 37) If there is a gap between the largest and second largest singular values as in the algorithm, then w.h.p. $u,v$ share a unique dictionary element. (Proof uses Weyl's Theorem, HJ90---check this out.)
	*   Finally, $\Pj(|U\cap V|=\{i\}) = \Om\pf{k^2}{m^2}$.

#Bird's eye view

*   Main technique: Alternating minimization. Crystallize out a weaker form of gradient descent, what is *actually* needed.
*   Threshold to denoise and cancel out the vectors that are 0.
*   For initialization, try to find the columns as the largest eigenvector of some matrix (SVD). Which matrix? $\E\an{y,u}\an{y,v}yy^T$, because intuitively the large singular values will correspond to indices shared by $u,v$, and with good probability $u,v$ have only one index in common in their support. 

#Questions

* Presence of multiple local minima?
