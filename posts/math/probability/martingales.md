---
title: Martingales
published: 2016-04-08
modified: 2016-04-08
tags: none
type: notes
showTOC: True
---

Durrett Ch. 5

#Conditional expectation

Define conditional expectation and show it is well defined.

Let $X$ be a random variable on $(\Om, \mathcal F_0, P)$ with $\E|X|<\iy$. The **conditional expectation** of $X$ given $\mathcal F$ is any (the unique) random variable $Y$ such that

1. $Y\in \mathcal F$.
2. for all $A\in \mathcal F$, $\int_A X\,dP = \int_B Y\,dP$.

We show uniqueness and existence. First note that any $Y$ satisfying the above is integrable: show $\E |Y|\le \E |X|$ by partitioning based on $\sgn(Y)$.

1.  Uniqueness (up to a.s.): We have $0=\int_A Y-Y'\, dP$. Now take $A=\{Y-Y'\ge \ep>0\}$.
2.  Existence is based on the **Radon-Nikodym Theorem**. Let $\mu,\nu$ be $\si$-finite measures on $(\Om, \mathcal F)$. If $\nu\ll \mu$ ($\nu$ is absolutely continuous with respect to $\mu$, i.e., $\mu(A)=0\implies \nu(A)=0$), then there is a function $f\in \mathcal F$ such that for all $A\in \mathcal F$,
    $$\int_A f\,d\mu = \nu(A).$$
	Write $f=\dd{v}{\mu}$, and call it the **Radon-Nikodym derivative**.

	For $X\ge 0$, we have
	$$ \E(X|\mathcal F) = \dd{\nu}{\mu}$$
	where $\mu=P$ and $\nu(A) = \int_A X\,dP$. For general $X$, write $X=X^+-X^-$.

##Examples

The general strategy for finding the conditional expectation is to "guess and verify".

1.  If $X\in \mathcal F$ the $\E[X|\mathcal F]=X$.
2.  If $X$ is independent of $\mathcal F$ then $\E[X|\mathcal F]=\E X$.
3.  (Relate to conditional probability)
	If $\mathcal F = \si(\Om_1,\ldots)$ and each $\Om_i$ has positive probability, then $\E[X|\mathcal F] = \fc{\E[X;\Om_i]}{\Pj(\Om_i)}$ on $\Om_i$.

    Generalize conditional probability by letting
	\begin{align}
	\Pj(A|\mathcal G) &= \E[1_A|\mathcal G]\\
	\Pj(A|B) &= \fc{P(A\cap B)}{P(B)}\\
	\E[X|Y] &= \E[X|\si(Y)].
	\end{align}
4.  If the probability density of $(X,Y)$ is given by $f(x,y)$, then
    $$\E[g(X)|Y] = h(Y)$$
	where
	$$h(y) = \fc{\int g(x) f(x,y)\dx}{\int f(x,y)\dx}.$$
(5 and 6 omitted.)	

##Properties

1. Linearity: $\E[aX+Y|\mathcal F] = a\E[X|\mathcal F] + \E[Y|\mathcal F]$.
2. Monotonicity: $X\le Y\implies \E[X|\mathcal F] \le E[Y|\mathcal F]$.
3. Monotone convergence: $X_n\ge 0, X_n\uparrow X$, $\E X<\iy \implies \E[X_n|\mathcal F] \uparrow \E[X|\mathcal F]$.
4. Jensen: If $\ph$ is convex and $\E|X|, \E|\ph(X)|<\iy$, then $\ph(\E[X|\mathcal F])\le \E[\ph(X)|\mathcal F]$.
5. Contraction in $L^p$
6. $\E[\E[Y|\mathcal F]]=\E Y$.
7.  (Tower property) If $\mathcal F_1\subeq \mathcal F_2$ then
    $$\E[\E[X|\mathcal F_1]|\mathcal F_2] = \E[X|\mathcal F_1] = \E[\E[X|\mathcal F_2]|\mathcal F_1].$$
	(The coarser field wins.)
8.  (Taking $X\in \mathcal F$ outside) If $X\in \mathcal F$ and $\E |Y|, \E|XY|<\iy$ then $\E[XY|\mathcal F] = X\E[Y|\mathcal F]$.
9.  (Least squares, projection) If $\E X^2<\iy$, then $\E[X|\mathcal F]$ is the variable $Y\in \mathcal F$ that minimizes $\E(X-Y)^2$.

(Proofs straightforward from definition, omitted.)

#Martingales, Almost Sure Convergence

A **filtration** $\mathcal F$ is an increasing sequence of $\si$-fields.

$X_n$ is **adapted** to $\mathcal F_n$ if for all $n$, $X_n\in \mathcal F_n$.

$X_n$ is a **martingale** if
1. $\E|X_n|<\iy$
2. $X_n$ is adapted to $\mathcal F_n$
3. $\E[X_{n+1}|\mathcal F_n]=X_n$ for all $n$.

If 3 holds with $\le,\ge$, $X_n$ is a **supermartingale, submartingale**. (Note a supermartingale goes *down* and a submartingle goes *up*.)

1.  If $X_n$ is a supermartingale and $n>m$, then $\E[X_n|\mathcal F_m]\le X_m$. 

	*Proof*. Induct and use monotonicity,
	\begin{align}
	\E[X_{m+k}|\mathcal F_m] &= \E[\E[X_{m+k}|\mathcal F_{n+k-1}]|\mathcal F_m]\\
	&\le \E[X_{m+k-1}|\mathcal F_m]
	\end{align}
2.  We get a reversed inequality for a submartingale, and equality for a martingale
3.  If $X_n$ is a martingale, $\ph$ is convex, and $\E[\ph(X_n)]<\iy$, then $\ph(X_n)$ is a submartingale.

	*Proof*. Use Jensen to bring the $\ph$ outside in $\E[\ph(X_{n+1})|\mathcal F_n]$. We need $X_n$ to be a martingale so the inside becomes $X_n$.
4.  Ex. let $\ph(x) = |x|^p$.
5.  The same holds if we change the conditions to: $X_n$ is a submartingale wrt $\mathcal F_n$, $\ph$ is *increasing* convex.
6.  Cor. If $X_n$ is sub, then $(X_n-a)^+$ is sub.

	If $X_n$ is super, $X_n\wedge a$ is super.
7.  Define $(H\cdot X)_n = \sum_{m=1}^n H_m (X_m-X_{m-1})$. $H_n$ is **predictable** if $H_n\in \mathcal F_{n-1}$ (predictable from information at time $n-1$).

	(You can't beat an unfavorable game.) If $X_n$ is super, $H_n\ge 0$ is predictable, and each $H_n$ is bounded, then $(H\cdot X)_n$ is super.

	*Proof*. Expand $\E[(H\cdot X)_{n+1}|\mathcal F_{n}]$ and take the $H_{n+1}$ out.
8.   **Corollary**: If $N$ is a stopping time and $X_n$ is super, then $X_{N\wedge n}$ is super.

	*Proof*. Let $H_n = 1_{N\ge n}$.
9.  **Theorem (Upcrossing inequality)**: Let
	\begin{align}
	N_0&=-1\\
	N_{2k-1}&=\inf\set{m>N_{2k-2}}{X_m\le a}\\
	N_{2k}&=\inf\set{m>N_{2k-1}}{X_m\ge b}\\
	U_n&=\sup\set{k}{N_{2k}\le n},
	\end{align}
	number of upcrossings by time $n$.

	If $X_m$ is sub, then
	$$(b-a) \E U_n\le E(X_n-a)^+ - \E (X_0-a)^+.$$

	*Motivation*. To prove the martingale convergence theorem (10). A martingale doesn't converge if it has infinitely many upcrossings of some $[a,b]$. Show this happens with probability 0 and union-bound.

	*Proof*. Consider a betting system trying to take advantage of upcrossings,
	$$H_m=\begin{cases} 1, &\text{if }N_{2k-1}<m\le N_{2k}\text{for some }k\\
	0,&\text{otherwise}\end{cases}.$$
	Let $Y_n = a+(X_n-a)^+$. We have
	$$ \E(Y_n - Y_0) \ge \E(H\cdot Y)_n \ge (b-a) \E U_n.$$
10. **Martingale convergence theorem**:  If $X_n$ is sub, $\sup \E X_n^+<\iy$, then as $n\to \iy$, $X_n$ converges a.s. to a limit $X$ with $\E|X|<\iy$.

	*Proof*. The expected number of upcrossings is finite. So $\limsup X_n=\liminf X_n$ a.s.
11. If $X_n\ge 0$ is super then as $n\to \iy$, $X_n\to X$ a.s., $\E X\le \E X_0$.
12. **Doob's decomposition**: Any submartingale $X_n$ can be written uniquely as $X_n=M_n+A_n$, $M_n$ a martingale and $A_n$ predictable with $A_0=0$.

    *Proof*. Solve for what $A_n$ must be: $A_n = A_{n-1} + \E[X_n|\mathcal F_{n-1}] - X_{n-1}$.


##Exercises

1.  For $i\le j$, $\si(X_i)\subeq \mathcal F_i \subeq \mathcal F_j$ so $\si(X_i)\subeq \mathcal F_j$. Hence $\mathcal G_j\subeq \mathcal F_j$.

	Using definition and then taking $\E[\bullet|\mathcal F_n]$,
	\begin{align}
	\E[X_{n+1}|\mathcal G_n]&=X_n\\
	\E[X_{n+1}|\mathcal F_n] = \E[\E[X_{n+1}|\mathcal G_n]|\mathcal F_n]&=X_n.
	\end{align}
2.  Let $\mathcal F_n = \si(S_n,\ldots, S_1)$.
	\begin{align}
	\E[X_{n+1}|\mathcal F_n] &= \E[X_{n+1}|\si(S_n,\ldots, S_1)]\\
	&=\E[f(S_n+\xi_n)|S_n] &\text{why?}\\
	&=\rc{B(0,r)} \int_{B(S_n,r)} f(y)\le f(S_n)=X_n.
	\end{align}
3.  Let $X_n = -\rc n$.
4.  Let $X_n=\sumo in \xi_i$, $\xi_i$

#Examples

#Doob's inequality, $L^p$ convergence

1.  If $X_n$ is a submartingale and $N$ is a stopping time with $\Pj(N\le k)=1$, then
	$$ \E X_0\le \E X_N \le \E X_k.$$
	(Note the first inequality is not true in general if $N$ is unbounded.)
	*Proof.*
	1. Show that $X_n - X_{N\wedge n}$ is a submartingale. To see this, wrie it as a dot product with a predictable sequence, $X_n-X_{N\wedge n} = 1_{\{n-1 \ge N\}}\cdot X$.[^f41]
	2. (Alternative) Condition on $N$ and use the submartingale property. See exercise 1.
2.  **Doob's inequality**: Let $X_m$ be a submartingale, $\ol X_n = \max_{0\le m\le n} X_m^+$, $\la>0$. Then
    $$ \la \Pj(A) \le \E X_n 1_A \le \E X_n^+.$$

    *Proof.* Interpret the event $A$ as early stopping by defining the stopping time $N=\inf \set{m}{X_m\ge \la \text{ or }m=n}$. Now apply 1.

    *Corollary*: Kolmogorov's inequality
3.  **$L^p$ maximum inequality**: If $X_n$ is a submartingale then for $p>1$,
    $$ \E (\ol X_n^p) \le \pf{p}{p-1}^p \E(X_n^+)^p.$$
	*Proof.* Our "only tool" is to use Doob's inequality to bound $\Pj(\ol X_n\ge \la)$ (actually, $\ol X_n\wedge M$). To make this term appear, bound $\E[(\ol X_n\wedge M)^p]$ by $\int_0^{\iy} p\la^{p-1}\Pj(\ol X_n\wedge M \ge \la)$. We get one less power of $\ol X_n \wedge M$ on the RHS. Use Holder and bootstrap.
4.  ($L^1$ version)
5.  **$L^p$ convergence theorem**: If $X_n$ is a matringale with $\sup \E|X_n|^p<\iy$ when $p>1$, then $X_n\to X$ a.s. and in $L^p$.
    *Proof.* The hypothesis implies $(\E X_n^+)$ is bounded so a.s. follows from martingale convergence. To show $X_n\to X$ in $L^p$, it suffices to show that $|X_n-X|^p\le Y$ with $\E|Y|<\iy$ and $X_n\to X$ a.s. (Dominated convergence theorem.) Bound $|X_n-X|^p\le (2\sup |X_n|^p)$ and use $L^p$ maximal inequality to bound the RHS (use MCT on $\sup_{0\le m\le n}X_n$).
6.  **Orthogonality of martingale increments**: Let $X_n$ be a martingale with $\E X_n^2<\iy$ for all $n$. If $m\le n, Y\in \cal F_m, \E Y^2<\iy$, then
    $$ \E[(X_n - X_m)Y]=0. $$
	*Proof.* Cauchy Schwarz gives this is $L^1$. Now just use the martingale property.
7.  **Conditional variance formula**: If $X_n$ is a $L^2$ martingale, $\E[(X_n-X_m)^2|\cal F_m]=\E [X_n^2|\cal F_m]-X_m^2$.
8.  **Branching processes**: Letting $X_n=Z_n/\mu^2$, use 7 to get an expression for $\E[X_n^2|\cal F_{n-1}]$ and $\E X_n^2$. This shows $\sup \E X_n^2<\iy$, so $X_n\to X$ in $L^2$.

##Exercises

1. Use submartingale property with the fact that $N=j$ is in $\cal F_j$. Now sum over $N$.
2. 
3. 
4. ?
5. 

[^f41]: Recall this means dot product with the differences.


A good counterexample is the 1-D simple random walk starting at 1 with absorbing barrier at 0.

1. We have $\E X_0=1>\E S_N$ where $N=\inf\set{n}{S_n=0}$.
2. We have $\E(\max_m X_m) = \iy$, so no $L^1$ maximal inequality holds.

# 5 Uniform integrability; convergence in $L^1$

$X_i$ are **uniformly integrable** if
$$\lim_{M\to \iy}\pa{\sup_{i\in I} \E(|X_i|;|X_i|>M)}=0.$$
Note this implies $\sup_{i\in I}\E|X_i|<\iy$.

1.  Given $(\Om,\mathcal F_0, P)$ and $X\in L^1$, $\set{\E(X|\mathcal F)}{\mathcal F\text{ is a $\si$-field $\subeq \mathcal F_0$}}$ is uniformly integrable.

	*Proof*. $\le \E(|X|;\E(|X||\mathcal F)>M)$ and use Chebyshev and the fact that $P(A_n)\to 0\implies \E(|X|;A_n)\to 0$.
2.  (Relationship between uniform integrability and convergence in $L^1$: If $X_n\to X$ in probability, TFAE:
	1. $\set{X_n}{n\ge 0}$ is uniformly integrable.
	2. $X_n\to X$ in $L^1$.
	3. $\E|X_n|\to \E|X|<\iy$.

	*Proof*. ($n\implies n+1$)

	1.  Let $\ph_M=\text{clamp}(-M,M)$. By the triangle inequality,
		$$\E|X_n-X| \le \E|\ph_M(X_n) - \ph_M(X)| + \E(|X_n|; |X_n|>M) + \E(|X|;|X|>M).$$
		The first term goes to 0 ($\lim_{n\to \iy}$) by bounded convergence, the second term goes to 0 ($\lim_M\to \iy}\lim_{n\to \iy}$) by uniform integrability; the last term goes to 0 by Fatou.
	2.  Jensen.
	3.  Write $\E(|X_n|; |X_n|>M) \le\E|X_n| - \E \psi_M(|X_n|)$ where $\psi_M(x)=x$ on $[0,M-1]$ and 0 on $[M,\iy)$. Use DCT.
3.  **Theorem (Submartingale L1 convergence)**: For a submartingale, TFAE:
	1.  Uniformly integrable
	2.  Converges a.s. and in $L^1$
	3.  Converges in $L^1$
	*Proof*.
	1.  Uniform integrability $\implies \sup \E|X_n|<\iy \implies X_n\to X$ a.s. by martingale convergence theorem. + Use 2.
	2.  Clear.
	3.  $X_n\to X$ in $L^1 \implies$ $X_n\to X$ i.p. + Use 2.
4.  If $X_n\to X$ in $L^1$ then $\E(X_n;A)\to \E(X;A)$.
5.  If martingale $X_n\to X$ in $L^1$ then $X_n = \E(X|\mathcal F_n)$.

    *Proof*. Use 4 with $A\in \mathcal F_n$.
6.  **Theorem (Martingale L1 convergence)**: For a martingle, TFAE:
	1. Uniformly integrable
	2. Converges a.s. and in $L^1$
	3. Converges in $L^1$
	4. There is an integrable random variable $X$ so that $X_n=\E (X|\mathcal F_n)$
7.  If $\mathcal F_n \uparrow \mathcal F_\iy$ (i.e., $\mathcal F_\iy = \si\pa{\bigcup_n \mathcal F_n}$), then as $n\to \iy$, $\E(X|\mathcal F_n) \to \E(X|\mathcal F_\iy)$ a.s. and in $L^1$.

    *Proof*. $Y_n=\E(X|\mathcal F_n)$ is a martingale. Use 6 and 5. Use the $\pi$-$\la$ theorem to get that $\int_A X\,dP = \int_A Y_\iy\,dP$ for all $A\in \mathcal F_\iy$.
8.  **Theorem (Levy's 0-1 law)**: If $\mathcal F_n\uparrow \mathcal F_{\iy}$ and $A\in \mathcal F_{\iy}$ then $\E(1_A|\mathcal F_n)\to 1_A$ a.s.

	Note this proves Kolmogorov's 0-1 law: take $A$ to be in the tail $\si$-field.
9.  **Theorem (DCT for conditional expectations)**: Suppose $Y_n\to Y$ a.s., $|Y_n|\le Z$ for all $n$ where $\E Z<\iy$, and $\mathcal F_n\uparrow \mathcal F_\iy$ then
	$$\E(Y_n|\mathcl F_n)\to \E(Y|\mathcal F_\iy)\text{ a.s.}$$. (If instead $Y_n\to Y$ is $L^1$, then convergence is $L^1$.)

	*Proof*. Show $|\E(Y_n|\mathcal F_n) - \E(Y|\mathcal F_n)| \to 0$ a.s. as $n\to \iy$, and then use 5.7. To show the inequality, bound by a variable that doesn't depend on $N$,
	$$ \limsup_{n\to \iy} \E(|Y_n-Y||\mathcal F_n)\le \lim_{n\to \iy} \E(W_N|\mathcal F_n)$$
	where $W_N$ is defined as the maximum Cauchy difference.

## Exercises

1. We have $\fc{\E(|X_i|;|X_i|\ge M)}{\E(\ph(|X_i|);|X_i|\ge M)}\to 0$, and the denominator is $\le C$.
2. By 5.7, $\E(\te|Y_{[1,n]})\to \E(\te|Y_{[1,\iy)})$. By the Law of Large Numbers, the average of $Y_{[1,n]}$ converges, say to $\mu$. We have by calculation that $\fc{\E(\mu|Y_{[1,n]})}{\E(\mu'|Y_{[1,n]})}\to \iy$. It converges i.p. to $\te$. 5.6/7 gives that it converges a.s.
3. ?
4. ?
5.  By $L^1$ convergence,
    \begin{align}
	\int_{X_m\le x\text{ i.o.},\neg D} \E(1_D|X_1,\ldots, X_n) &\to \int_{X_m\le x\text{ i.o.},\neg D} 1_D = 0\\
	\pat{LHS} &\ge \int_{X_m\le x\text{ i.o.},\neg D, X_n\le x} \E(1_D|X_1,\ldots, X_n)\\
	&\ge \Pj(X_n\le x) \Pj(D^c \wedge X_m\le x\text{ i.o.}|X_n\le x).
	\end{align}
	We may assume that if $X_n=0$, then $X_{n+1}=0$ (redefine the random variable so this is true). $\Pj(X_n\le x)$ is bounded away from 0, so the second term goes to 0. Now
	$$\Pj(D^c\wedge X_m\le x\text{ i.o.}) = \Pj(D^c\wedge X_m\le x\text{ i.o.}|X_n\le x) + \cdots.$$
	Choosing $n$ large enough, we make the RHS as small as we want.
6.  The condition in 5 holds.

# 6 Backwards Martingales

A **backwards martingale** is a martingale indexed by $n\le 0$ adapted to an increasing sequence $\mathcal F_n$:
$$ \E(X_{n+1}|\mathcal F_n) = X_n,\quad n\le -1. $$

1.  $X_{-\iy}=\lim_{n\to -\iy} X_n$ exists a.s. and in $L^1$. (If $X_0\in L^p$, then convergence is in $L^p$.)

	*Proof*. Use the upcrossing inequality to show the limit exists (the proof is same as before except that $n\to -\iy$ instead of $\iy$).
	$$(b-a)\E U_n \le \E(X_0-a)^+.$$
	By 5.1, $X_n=\E(X_0|\mathcal F_n)$ is uniformly integrable; 5.2 shows convergence in $L^1$. 
2.  If $X_{-\iy}= \lim_{n\to -\iy} X_n$ and $\mathcal F_{-\iy} = \bigcap_n \mathcal F_n$, then $X_{-\iy}= \E(X_0|\mathcal F_{-\iy})$.

	*Proof*. Check that $\int_A X_{-\iy} \,dP = \int_A X_0\,dP$ for all $A\in \mathcal F_{-\iy}$.
3.  If $\mathcal F_n\downarrow \mathcal F_{-\iy}$ as $n\to -\iy$ ($\mathcal F_{-\iy} = \bigcap_n\mathcal F_n$), then
	$$\E(Y|\mathcal F_n)\to \E(Y|\mathcal F_{-\iy})\text{ a.s., in }L^1.$$
	

##Examples

1. Strong law of large numbers: Let $\xi_i$ be iid with $\E|\xi_i|<\iy$. Let $S_n= \sumo in \xi_i$ and $X_{-n} = \fc{S_n}{n}$. Calculate by symmetry that $\E(\xi_{n+1}|\mathcal F_{-(n+1)}$ and show $X_{-n}$ is a backwards martingale. So $\limn \fc{S_n}n = \E(X_{-1}|\mathcal F_{-\iy})$. Now use the Hewitt-Savage 0-1 law, $\mathcal E\supeq \mathcal F_{-\iy}$ is trivial.
2.  Ballot Theorem: Let $\xi_j\in \N$ (ex. $\{0,2\}$) rv's, $S_k=\sumo ik \xi_i$, $G=\set{S_j<j\text{ for }1\le j\le n}$. Then
    $\Pj(G|S_n)\ge \pa{1-\fc{S_n}{n}}^+$ with equality if $\Pj(\xi_j\le 2)=1$.

	*Proof*: Let $T=\inf\set{k\ge -n}{X_k}$. (Take averages over fewer elements; stop when it's $\ge 1$.) (Let $T=-1$ if it's $\phi$.) $X_T\ge 1$ on $G^c$ and $0$ on $G$.
	$$\Pj(G^c|S_n) \le \E(X_T|\mathcal F_{-n}) = \fc{S_n}n.$$
3.  Hewitt-Savage 0-1 law (alternate proof):
	**Lemma**: Let $A_n(\ph) = \rc{n\fp k} \sum_i \ph(X_{i_1},\ldots, X_{i_k})$. If $X_i$ are iid and $\ph$ is bounded, $A_n(\ph) \to \E\ph(X_1,\ldots, X_k)$ a.s.

	*Proof*.
	\begin{align}
	A_n(\ph) &= \E(\ph(X_1,\ldots, X_k)|\mathcal E_n) & \text{symmetry}\\
	&\to \E (\ph(X_1,\ldots, X_k)|\mathcal E)\\
	&=\E (\ph(X_1,\ldots, X_k))
	\end{align}
	The last is because most permutations move $X_1,\ldots, X_k$ away from positions in $[1,k]$. Formally, we first have $\E[\ph(X_1,\ldots, X_k)|\mathcal E] \in \si(X_{k+1},\ldots)$, and then show lemma: if $\E X^2<\iy$, $\E(X|\mathcal G)\in \mathcal F$, and $X$ is independent of $\mathcal F$, then $\E(X|\mathcal G) = \E X$. (Proof: Show $\Var(Y)=0$.)

	Then $\mathcal E$ is independent of $\mathcal G_k = \si(X_1,\ldots, X_k)$, so $\mathcal E$ is independent of $\si\pa{\bigcup_k \mathcal G_k}$.
4.  **Theorem (de Finetti)**: If $X_1,\ldots$ are exchangeable, then conditional on $\mathcal E$, $X_1,\ldots$ are iid.[^f51]

	($X_1,\ldots$ is **exchangeable** if for each $n$, $\pi\in S_n$, $(X_1,\ldots, X_n)$ and $(X_{\pi(1)},\ldots, X_{\pi(n)})$ have the same distribution.)

	*Proof*. Again by symmetry, $A_n(\ph)\to \E[\ph(X_1,\ldots, X_k)|\mathcal E]$. For $f,g$ on $\R^k, \R$, calculate $A_n(f)A_n(g)$ in terms of $A_n(\ph), A_n(\ph_j)$ where $\ph_j = (f\circ \pi_{-j})(g\circ \pi_j)$ to get
	$$ A_n(\ph) = \fc{n}{n-k+1} A_n(f) A_n(g) - \rc{n-k+1} \sumo j{k-1} A_n(\ph_j).$$
	Take limits, note that $\E(\ph|\mathcal E) = \E(\ph_j | \mathcal E)$, and induct.

[^f51]: ex. Chinese restaurant process.

# 7 Optional stopping theorems

1.  If $X_n$ is a uniformly integrable submartingale then for any stopping time $N$, $X_{N\wedge n}$ is uniformly integrable.

	*Proof*. From 4.1, $\E X_{N\wedge n}^+ \le \E X_n^+$. Use the martingale convergence theorem to ge $X_{N\wedge n} \to X_N$ a.s. and $\E |X_N|<\iy$. Now split up $|X_{N\wedge n}|$ based on $N\wedge n \stackrel?n$ to show it's uniformly integrable.
2.  If $\E|X_N|<\iy$ and $X_n1_{N>n}$ is uniofrmly integrable, then $X_{N\wedge n}$ is uniformly integrable.
3.  If $X_n$ is a uniformly integrable submartingale, then for any stopping time $N\le \iy$, $\E X_0\le \E X_n\le \E X_\iy$ where $X_\iy = \lim X_n$.

	*Proof*. Use 4.1 and 5.3, which shows that a uniformly integrable submartingale converges in $L^1$.
4.  **Theorem (Optional stopping)**: If $L\le M$ are stopping times and $Y_{M\wedge n}$ is a uniformly integrable submartingale then
	\begin{align}
	\E Y_L &\le \E Y_M\\
	\E X_N &\le \mathcal F_L.
	\end{align}

	*Proof*. Use 7.3 with $X_n=Y_{M\wedge n}, N=L$.

	Let $N=\begin{cases} L,&\text{on }A\\ M,&\text{on }A^c$. Use the first part on $N\le M$ to get $\E Y_N\le \E Y_M$. Note that $N=M$ on $A^c$ to get
	$$A\in \mathcal F_L\implies \E(Y_L;A) \le \E(Y_M;A) = \E[\E[Y_M|\mathcal F_L];A].$$
	(Define $N$ so we can just localize the inequality to $A$.)
5.  **Theorem (Generalization of Wald's equation)**: If $X_n$ is a submartingale, $\E[|X_{n+1}-X_n||\mathcal F_n]\le B$ a.s., and $\E N<\iy$, then $X_{N\wedge n}$ is uniformly integrable and $\E X_N\ge \E X_0$.[^f71] (For a martingale, we have $=$.)

	*Proof*. 
	$$|X_{N \wedge n}| \le |X_0| + \sum_{m=0}^{\iy} |X_{m+1} - X_m| 1_{(N>m)} \le B\sum_{m=0}^{\iy} \Pj(N>m) = B \E N.$$

[^f71]: To get Wald's equation, let $S_n$ be a random walk and $X_n = S_n-n\E(S_1-S_0)$.
6.  (Stopping theorem not requiring uniform integrability) If $X_n\ge 0$ is a supermartingale and $N\le \iy$ is a stopping time, then $\E X_0\ge \E X_N$.

	*Proof*. $\E X_0\ge \E X_{N\wedge n}$. Now use MCT and Fatou on $\E(X_N; N<\iy) + \E(X_N; N=\iy)$.

##Example

Let $\xi_i=1,-1$ with probability $p,1-p$. Suppose $p>\rc 2$, $a<0<b$.

1.  Let $\ph(x) = \pf{1-p}{p}^x$. $\ph(S_n)$ is a martingale.
2.  (Absorption probabilities) Let $T_x=\inf\set{n}{S_n=x}$. Then
	$$\Pj(T_a<T_b) = \fc{\ph(b)-\ph(0)}{\ph(b)-\ph(a)}.$$

	Check that $T_a\wedge T_b<\iy$ a.s. and apply 7.3. (Check directly, or use 5.6 on $\ph(S_{N\wedge n})$.)
3.  \begin{align}
	\Pj(T_a<\iy) &= \pf{1-p}{p}^{-a}\\
	\Pj(T_b<\iy) &= 1.
	\end{align}

	*Proof*. Let $b\to \iy$; $a\to \iy$, respectively in 2.
4.  $\E T_b = \fc{b}{2p-1}$.

	*Proof*. $S_n-(p-q)n$ is a martingale. Either show $\E T_b<\iy$, or apply 4.1 to $T_b\wedge n$ and let $n\to iy$.
