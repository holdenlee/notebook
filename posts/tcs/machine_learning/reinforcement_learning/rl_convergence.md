---
title: Reinforcement learning convergence
published: 2016-10-24
modified: 2016-11-21
tags: reinforcement learning
type: notes
showTOC: True
---

Here we're interested in convergence guarantees for algorithms/methods used in practice. (Rather than, e.g., coming up with provable polytime theoretical algorithms that work but are too slow to be used in practice.)

Recall: Mixing time $\tau_\ep = \min\set{t}{\max_{P_0} \ve{P_t - P_{\text{eq}}}\le \ep} \le \fc{\ln \pf{N}{\ep}}{\de}$, $\de=1-\max_{k\ge 2}|\la_k|$.

# Policy estimation

Policy satisfies
\begin{align}
v_\pi  &= d(P_\pi^T R_\pi) + \ga P_\pi v\\
\iff 
v_\pi &= (I-\ga P_\pi)^{-1} d(P_\pi^T R_\pi).
\end{align}
Then
\begin{align}
v_{k+1} &= d(P_\pi^T R_\pi) + \ga P_\pi v_k\\
v_{k+1} - v_\pi &= \ga P_\pi (v_k-v_\pi).
\end{align}
So convergence happens at rate of $\ga \ve{P_\pi}_2$ to $v_\pi$.

For nondiscounted case, we get 
$$
v_t = \rc t[d + P_\pi d+ \cdots + P_\pi^{t-1} d].
$$
We find (are stochastic matrices diagonalizable?) $v$ is the projection of $d$ onto space of 1-eigenvectors.

(Notation is easier if the reward only depends on $s,a$; then we just get $v_\pi = r_\pi + \ga P_\pi v_\pi$.)

# Policy/value iteration

Why does it improve? 
Let 

* $P_{\pi, s',s} = \Pj(s'|s,\pi(s))$
* $R_{\pi, s',s} = r(s,\pi(s),s')$
* $q_{\pi,\pi'} = q_\pi(s,\pi'(s))$.

Write the Bellman equation as ($d(A)$ is the diagonal of $A$)
\begin{align}
v_\pi &= d(P_\pi^TR) + \ga P_\pi^T v_\pi\\
q_{\pi,\pi'} &= d(P_{\pi'}^TR_{\pi'}) + \ga P_{\pi'}^T v_\pi\\
v_\pi &=(I-\ga P_\pi^T)^{-1} d(P_{\pi'}^T, R_{\pi'})\\
q_{\pi,\pi'} &= (1-\ga P_{\pi'}^T)^{-1} d(P_{\pi'}^TR_{\pi'})
\end{align}
We have
\begin{align}
q_{\pi,\pi'} & \ge q_{\pi,\pi} = v_\pi\\
\iff 
d(P_{\pi'}^TR_{\pi'}) + \ga P_{\pi'}^T v_\pi & \ge v_\pi \\
\iff
v_{\pi'} = (I-\ga P_{\pi'}^T)^{-1} d(P_{\pi'}^TR) & \ge (I-\ga P_{\pi'}^T)^{-1} (I-\ga P_{\pi'}^T) v_\pi = v_\pi.
\end{align}
<!--\ge d(P_\pi^T R_\pi) + P_\pi^T v_\pi-->
(Note $I-\ga P_{\pi'}^T$ is a geometric series so has positive entries.)

<!-- analysis for $q$-values. How improve when $\ga$ increases to 1?-->

<!--$q$-iteration weirder? $q_a^{t+1} = R_a + \ga P_a^t q_b$. No, don't work with q-->

1.  Value iteration: $\ve{v^{n+1}-v^n}\le \fc{\ep(1-\la)}{2\la}\implies \ve{v^{n+1}-v_\la^*}<\eph$. (161)
	
	Proof: Let $v^{n+1}$ be the vale if you follow $\pi^n$ after choosing the best $a$ and $v^{*n+1}$ be the value if you follow $\pi^{n+1}$. Then 
	\begin{align}
	\ve{v^{*n+1} - v^{n+1}} &\le \ve{Lv^{*n+1} - Lv^{n+1}} + \ve{Lv^{n+1} - v^{n+1}}\\
	\implies \ve{v^{*n+1} - v^{n+1}} &\le \fc{\la }{1-\la} \ve{v^{n+1}-v^n}
	\end{align}
	Geometric series gives
	$$\ve{v^{n+1} - v_\la^*} \le \fc{\la}{1-\la} \ve{v^{n+1} - v^n}.$$
2.  Policy iteration (180)

## Changing $\ga$

Do a triangle inequality between
$$
v_{*'}^{\ga'} = (I-\ga'P_*')^{-1}r_*, v_{*'}^{\ga}, v_\pi^\ga, v_\pi^{\ga'}.
$$ 
More involved with averaging $\lim_{T\to \iy}\rc T\cdots$. Choose $\ga$ small enough so that can be approximated with rectangles, etc.

## Alternating policy improvement/evaluation

$$\pi'(s) = \amax_a \sum_{s'} p(s'|s,a) [r(s,a,s') + \ga v_\pi(s')].$$

# Q-learning

* [WatkinsDayan92] Q-learning
* [Tsitsiklis94] Asynchronous Stochastic Approximation and Q-learning

Main idea: to solve a fixed-point equation, need an unbiased approximation of operator $F$, and $F$ to be a contraction. (Noise is not a big deal---finiteness is usually enough.)

## Preliminaries

Abstraction: Solve fixed point equation
$$F(x)=x.$$
Let $T^i$ be the set of times when $x_i$ is updated, and the update equation be
$$x_i(t+1) = x_i(t) + \al_i(t) (F_i(x^i(t)) + w_i(t) - x_i(t)).$$
The components of $x^i(t)$ are $x_j(\tau_j^i(t))$, possibly outdated. (If they are not outdated, $\tau=t$.)

Assumptions: Let $\mathcal F(t)$ be the subfield at time $t$. Define $\ve{x}_v=\max_i \fc{|x_i|}{v_i}$.

1. $\forall i,j, \lim_{t\to \iy} \tau_j^i(t)=\iy$. (This allows outdated info!)
2.  (Noise) 
    * Mean: $\E[w_i(t)|\mathcal F(t)]=0$.
	* Variance: $\E[w_i(t)^2| \mathcal F(t)]\le A + B\max_j \max_{\tau\le t}|x_j(\tau)|^2$.
3.  (Enough updating, but not too much)
	* $\sumz t{\iy} \al_i(t)=\iy$
	* $\sumz t{\iy} \al_i^2(t) \le C$.
4.  $F$ is monotone wrt pointwise $\le$, continuous, has unique fixed point, and is 1-Lipschitz in the $\one$ direction.
5.  (Contraction) $\exists v>0, \be\in [0,1),\forall x, \ve{F(x) - x^*}_v\le \be \ve{x-x^*}_v$.
6.  (Weaker form of contraction) $\exists v>0, \be\in[0,1), D, \forall x, \ve{F(x)}_v\le \be \ve{x}_v+D$.
7.  For undiscounted state only: There exists at least one proper stationary policy (probability at being absorbing state $\to 1$), and every improper stationary policy has $\iy$ expected cost for some initial state.

**Theorem**: 1, 2, 3, 5 imply that $x(t)\to x^*$ w.p. 1.

**Lemma**: Let $\{\mathcal F(t)\}$ be an increasing sequence of $\si$-fields, $\al(t),w(t-1), B(t)$ be $\mathcal F(t)$-measurable. If 

* $\E[w(t)|\mathcal F(t)]=0$
* $\E[w^2(t)|\mathcal F(t)]\le B(t)$
* $\al(t)\in [0,1]$
* $\sumz t{\iy} \al(t)=\iy$
* $\sumz t{\iy}\al^2(t)\le C$
* $\{B(t)\}$ is bounded wp 1

and $W(t+1)=(1-\al(t))W(t) + \al(t) w(t)$ then $\lim_{t\to \iy}W(t)=0$ wp 1.

*Proof*. Write out the expression for $W(t)$. The term $\prodz t{T} (1-\al(t))W^0(t)\to 0$. The other terms: square and use Chebyshev.

**Theorem**. 1, 2, 3, 6 imply that $x(t)$ is bounded.

*Proof*. 
We have $\max |F_i(x)|\le \ga \max(\max_j (|x_j|,G_0))$.

Look at the relative fluctuations (wrt the nearest power of $G_0$). As $M(t)=\max_{\tau\le t}\ve{x(\tau)}_\iy$ gets big it gets more and more difficult for the relative fluctuations (actually, relative to the next smaller $G\ga^{-k}$, for technical reasons) to be big. To argue this, apply lemma to normalized $\wt w_i(t) = \fc{w_i(t)}{G(t)}$ to show the fluctuations after $t_0$ are go to 0 as $t_0\to \iy$.
(Define $\wt W(t_0;t_0)=0$ and define $\wt W(t;t_0)$ with the recurrence but with $\wt w_i(t)$.)
Now $\wt W_i(t;t_0)$ small means that $x_i(t+1)$ can't "overcome" the $\ga$ contraction factor.

Adding in assumption 5:  Now show that $\ve{x(t)}_{\iy}\le D_k$ implies that $\ve{x(t)}_{\iy}\le D_{k+1} := \be (1+2\ep)D_k$ at some later $r$. Proof is similar, except we establish contraction instead of just non-expansion. When bounding $x_i(t+1)$ use assumption 5.

**Question: what is the convergence rate? (Exercise!)** Based on the analysis (proceeding by a geometric sequence), it's probably linear.

## Convergence of Q-learning

$c_{iu}$ is cost of $u$ at state $i$.

Here 

\begin{align}
T_i(V) &= \min_{u\in U(i)}
\ba{\E[c_{iu}] + \be\sum_{j\in S} p_{ij}(u)V_j}\\
F_{iu} (Q) & = \E c_{iu} + \be \sum_{j\in S} p_{ij}(u) \min_{v\in U(j)} Q_{jv}\\
W_{iu}(t) &= c_{iu} - \E c_{iu} + \min_{v\in U(s(i,u))} Q_{s(i,u),v}(t) - \E[\min_{v\in U(s,(i,u))} Q_{s(i,u),v}(t) | \mathcal F(t)]
\end{align}
(Note that implicitly $\min_{v...}Q... = \sum_{j\in S} p_{ij}(u) \min_{v\in U(j)}Q_{jv}$.)

(Skip: discounted policies.)

(cf. stochastic gradient descent?)
