---
title: Multiplicative weights
published: 2017-02-24
modified: 2017-02-24
tags: boosting, multiplicative weights
type: notes
showTOC: True
---

Ref:

* Arora Hazan Kale

See also [Curse and blessing](optimization/multiplicative_updates.md)

# Basic algorithm and guarantees

## Problem

* Prediction: $n$ experts make predictions in $\{0,1\}$ at times $1,\ldots, T$. After seeing predictions $y_{t,1:n}$, you make a prediction. You want your total number of mistakes to be comparable to that of the best expert.
* Losses/gains: At each time, you get some loss for choosing 0 or 1, $l_t(0), l_t(1)$. (Assume losses are bounded.) You want your total loss (gain) to be comparable to that of the best expert.

# Algorithm

* Vanilla: Let $w_{t+1,i} = w_{t,i}\pa{1-\eta m_{t,i}}$.
	* Deterministic: at time $t$, take weighted majority of experts with weights $w_{t,i}$.
	* Random: at time $t$, randomly choose $i$ with probability proportional to $w_{t,i}$.
* Hedge: Let $w_{t+1,i} = w_{t,i} e^{-\eta m_{t,i}}$.
* MWU with restriction: $p^{(t+1)} = \amin_{p\in \mathcal P} KL(p||\wh p^{(t)})$.

For "counting" case, $m_i=1$ iff mistake. For "loss" case, $m_i$ is loss. Assume $\eta\le \rc2$.

# Guarantees

1.  Deterministic multiplicative weights attains
    $$
	M^{(T)} \le 2(1+\eta) m_i^{(T)} + \fc{2\ln n}{\eta}.
	$$
2.  Probabilistic multiplicative weights (let $p^{(t)}=\fc{w^{(t)}}{\Phi^{(t)}}$)
	\begin{align}
	\E M^{(T)} &= \sumo tT m^{(t)}\cdot p^{(t)} \le \sumo iT m_i^{(t)} + \eta\sumo tT |m_i^{(t)}| + \fc{\ln n}{\eta} \\
	& \le (1+\eta) m_i^{(t)} + \fc{\ln n}{\eta} 
	& \text{if }m_i^{(t)}\ge0.
	\end{align}
	*Proof*. 2 parts.
	1.  $\Phi^{(t+1)} \le \Phi^{(t)} e^{-\eta m^{(t)}\cdot p^{(t)}}$. (If costs are large, this decreases a lot. $p_i$ are exactly the slice of the pie occupied by expert $i$.) Look at pie occupied by all experts.
	2.  $(1-\eta)^{\sum_{\ge 0}m_i(t)} (1+\eta)^{-\sum_{\le 0} m_i(t)}\le \Phi^{(t+1)}$. Look at slice occupied by $i$th expert.
3.  Hedge attains
	$$
	\sumo tT m^{(t)}\cdot p^{(t)} \le \sumo tT m_i^{(t)} + \eta\sumo tT m_i^{(t)} + \eta\sumo tT (m^{(t)})^2 \cdot p^{(t)} + \fc{\ln n}{\eta}.
	$$
	(Note this bound depends on $p$ on the RHS.
4.  For MWU with restrictions,
	$$
	\sumo tT m^{(t)} \cdot p^{(t)} \le \sumo tT (m^{(t)} + \eta |m^{(t)}|)\cdot p + \fc{KL(p||p^{(1)})}{\eta}.
	$$
	(The farther away $p$ is from $p^{(1)}$ the more loss you might incur.)

## Questions

What if we replace a finite number of experts with an infinite number of experts with finite VC dimension? This is typically not tractable, but can still be analyzed. Is this like the online version of ERM? Bayesian version/version with uncertainty? 

# Applications

## Classification with margin

Solve
\begin{align}
a_j^T x &\ge 0\\
\one^T x&=1\\
x_i &\ge 0
\end{align}
under the promise that there exists $x^*$ with $a_j^Tx^*\ge \ep$. (More generally, can solve other LP's with margin.) Let $\rh = \max_j \ve{a_j}_\iy$.
	
Ideas:

1.  The experts are the coordinates. They do nothing except existing. It is the *weighting* that is the solution we're looking for. (In the original formulation, the default interpretations is that the experts are some different algorithms, and we seek an algorithm using them as black boxes that does well. Here, the experts are nothing but points, and we find an algorithm that classifies well---where the "algorithm" is restricted to be in the class of linear classifiers.)
	* The experts are not the points $a_j$.
2.  The bulk of this comes from how we define the gains. These gains should be related to the points $a_j$. 
3.  Note the right sign: we should reward a coordinate $i$ if $a_{ij}$ is large, because increasing $x_i$ would increase the dot product more. (cf. gradient - but this is projected back onto the simplex by scaling (what norm is this?)) The gain is ${a_{ji}}$. <!--shouldn't be a /\rh here because that's in $\eta$-->
4.  We are not going through the $a_j$ in order. Instead, at each step we pick an $a_j$ where $a_j^Tx^{(t)}<0$. (! For GAN, pick $D$ that is violated?)
5.  To analyze this, we consider the total number of steps where there is some $j$ such that $a_j^T x^{(t)}<0$. Let $T$ be the largest step for which this the case.

The inequality is
$$
0 > \sumo tT m^{(t)}\cdot x^{(t)} \ge 
\sumo tT m^{(T)} \cdot x^* 
- \eta \fc{\sumo tT \one^T a_{j(t)}}{\rh}
- \fc{\ln n}{\eta} = 
\pa{\fc{\eta}{\rh} - \fc{\eta}{2\rh}}T + \fc{\ln n}{\eta/(2\rh)}.
$$
<!-- not 1-\eta formulation -->
Solving, get $T = \ce{\fc{4\rh^2\ln n}{\ep^2}}$.

Notes: 

1. Thinking of the difference in margins as regret, this says that we get $O\prc{\sqrt T}$ regret.
2. We can think of this as a game, $\max_x \min_j a_j^Tx$ over probability vectors. At each step, the "max/column" player chooses a mixed strategy $x$, and the "min/row" player plays the best response. Best response is not actually necessary, just some choice of $j$ such that $a_j^Tx<0$ (since that's what we're aiming for).
3. This is logarithmic in $n$. So if $x$ has super-many coordinates, a sparse solution is good enough! We can prove this existentially---that there exists a $O(\rh^2\ln n/\ep^2)$ sparse solution---existentially using sampling from $x^*$ and using Chernoff.

This naturally generalizes!

## Game theory

We want to solve a zero-sum game approximately: find $\wt q$ (column mixed strategy) and $\wt p$ (row mixed strategy) such that 
\begin{align}
\la^* - \ep & \le \min_i e_i^TA\wt q\\
\la^* &= \max_j \wt p A e_j \le \la^* + \ep
\end{align}
where
$$
\la^* = \min_p \max_j A(p,j) = \max_q \min_i A(i,q).
$$
Note $\ge$ is clear.

Result: Assume all entries of $A$ bounded in absolute value by 1. We can approximate $\la^*$ up to $\ep$ with $O\pf{\ln n}{\ep^2}$ calls to oracle and time $O(n)$ per call. 

*Proof*. T use the algorithm, we  specify:

1. Experts: row coordinates. (We take row's POV.)
2. Losses: column responds with best response $j$ at each step. The loss for $i$ is $(Ae_j)_i$.

For all distributions $p$,
\begin{align}
\sumo tT p^{(t)} Ae_j
&\le\sumo tT p^* A e_{j(t)} + \eta \sumo tT p^* Ae_{j(t)}+ \fc{\ln n}{\eta}\\
&\le \la^* + \eta\ve{A}_{\iy} + \fc{\ln n}{\eta}\\
& \le \la^* T + \ub{2\sqrt{T\ln n}}{\ep}
\end{align}
with $\eta = \sfc{\ln n}T$. Thus can take $T=\ce{\fc{4\ln n}{\ep^2}}$.

Notes:

1.  Suppose we didn't know the minimax theorem. Then $\la^*$ should be defined as $\min\max$. This goes through.
2.  Does this give a strategy for the column player? We can let $\wt q = \fc{\set{t}{j(t)=j}}{T}$. Then we get
    $$
	\ol p A \wt q \le p A \wt q + \ep.
	$$
	Note we can set $p$ to anything; we don't need to choose $p^*$. We have
	$$
	\la^{*} - \ep \le \ol p A\wt q \le p A \wt q
	$$
	the LHS because $j(t)$ is the best response. Thus we not only found a good $\wt p$, we also found $\wt q$ which attains $\ge \la^*-\ep$ for any $p$.
3.  Alas, this does not prove the minimax theorem because the $\ge$ part is clear.

## Boosting

Again specify

1. Experts: experts are now the data points.
2. Loss: reward the experts (data points) for fooling the algorithm.

The role of "algorithm" and "data point" is swapped from the initial interpretation of multiplicative weights as operating on "experts = algorithms" shown "data points = incur losses from mistaks", and the sign is flipped: we get rewards for fooling the algorithm. 

(The "linear classifier with margin" still had "data points" being shown. The data points there were also adversarial in order to get improvement. We were rewarding coordinates for doing well.)

MAKE A TABLE.

If there are $\rc 2+\ga$-weak learners, then there is a $1-\ep$-strong learner with $T=\ce{\fc{2}{\ga^2}\ln \prc{\ep}}$. (To be more precise, talk about weak-learners on somewhat dense distributions...)

*Proof*. Let $m_x=1-|h(x)-c(x)|$: a data point is penalized for being correctly classified. WL means that at each step we force many mistakes, $\rc2+\ga$ proportion at each time step.

Now comes the tricky part. We want to bound the number of steps until the mistakes (wrt original, uniform distribution) is small. Thus, we want: when we can find a large set $E$ on which the algorithm misclassifies, then this forces $T$ to be small. Using the refined inequality with KL divergence and $p$ the uniform distribution on $E$, ("counting in 2 ways", noting that each row of $x\in E$ sums to at most $\fc T2$)
$$
\pa{\rc 2 + \ga}T \le (1+\eta)\fc{T}{2} + \fc{\ln \pf{n}{|E|}}{\eta}.
$$
Note that it's key that we get a ratio $\fc{n}{|E|}$. We have $\fc{|E|}{n}\le \ep$. We get $T< \fc{2}{\ga^2} \ln \prc{\ep}$, so for larger $T$, we can't find such a $E$.
The "majority vote" comes from $\fc T2$.

(You can also probably penalize differently depending on how the weak learner does, getting different weights, and probably improved bounds depending on performance of weak learners.)

# Bayesian interpretation
