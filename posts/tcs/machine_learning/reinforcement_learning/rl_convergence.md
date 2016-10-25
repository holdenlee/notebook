---
title: Reinforcement learning convergence
published: 2016-10-24
modified: 2016-10-24
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
