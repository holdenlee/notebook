---
title: Policy gradient
published: 2016-11-22
modified: 2016-11-22
tags: reinforcement learning
type: notes
showTOC: True
---

[SASM00] Policy gradient methods for RL with function approximation

A version of policy iteration with arbitrary differentiable function converges to a locally optimal policy.

Problems with the value-function approach

* finds deterministic policies.
* a small change in estimated vaue of action can change the action selected. (obstacles for convergence guarantees)

$$\De \te \approx \al \pdd{\rh}{\te}.$$

# Setup

The policy is parameterized by $\te$, and gives probabilities of making action $a$ in state $s$,
$$
\pi_\te(a|s) = \Pj_\te(a|s).
$$
Before, we considered the value at every state. Here, it's more convenient to consider the value of a fixed start state, which we'll denote by $\rh$. 

There are 2 ways we can have an expression for $\rh$. 
\begin{enumerate}
\item
Bellman equation. In the average reward setting, we will actually define $V$ differently - as a kind of "residual" from $\rh$, and write the Bellman equation for $V$. This implicitly includes $\rh$.
\item
We calculate intermediately the stationary distribution, and write the value in terms of that.
\end{enumerate}

Consider two settings.

1. Average reward setting. Here we want to maximize $\lim_{T\to \iy} \rc{T}\sumz t{T-1} R_t$. Then let $d_\te$ be the stationary distribution: $d_\te(s)$ is the probability of being at state $s$ under policy $\pi_\te$.
2.  Discounted reward setting. Here we want to maximize $\sumz t{\iy} \ga^t R_t$. Now $d_\te$ has to take into account the discounting, so 
	$$ d_\te (s) = \sumz t{\iy} \ga^t \Pj (s_t = s).$$
	
We also have to change our definition of $Q$ for the average reward setting - otherwise all the $Q$'s would be the same! In the two cases, define
\begin{align}
Q^{\pi}(s,a) &= \sumz t{\iy} \E[R_t - \rh_\pi | s_0=s,a_0=a, \te]\\
Q^{\pi}(s,a) &= \E\ba{\sumz k{\iy} \ga^{k} R_{t+k} | s_t=s, a_t=a, \pi}.
\end{align}
The second is the usual definition of the $Q$-function. Think of the first as "advantage" of starting at $(s,a)$. It converges because working out with matrices,
$$
\E R_t = \rh_\te + O_{s,a} \pa{\la^t}
$$
where $\la$ is the second-largest eigenvalue of the transition matrix (besides 1). So instead of discounting to make $Q$ converge, we subtract the mean to make $Q$ converge. Define $V^\pi(s) = \max_a Q^\pi(s,a)$.
	
Then (for continuous spaces replace $\sum$ with $\int$)
$$\rh_\te = \sum_s d_\te(s) \sum_{a} Q^\te(s,a) \pi_\te(a|s) $$
(Whenever something depends on the policy $\pi_\te$, we write $\te$ as shorthand: $Q^{\te} = Q^{\pi_\te}$.

# Computation

We need to calculate the derivative. Naively using the product rule, we would need $\nb_\te d_\te(s)$ which we don't have a way of estimating. But we can derive an expression that doesn't include this term! To do this we differentiate the Bellman equation for $V$ (which implicitly includes $\rh$).

**Lemma 1**. 
$$
\nb_\te \rh_\te = \sum_s d_\te(s) \sum_a \nb_\te \pi(s|a) Q^\te(s,a).
$$

*Proof*. Our strategy is to write the one-step expansion of $Q^\te$
<!-- , and find there's a term that cancels with $\nb_\te \pi_\te(a|s)$.--> Let $R(s,a)$ be the one-step reward of action $a$ in state $s$. We write the proof for the undiscounted case.
\begin{align}
\nb_\te V^\te (s)
&= \sum_a \pa{
(\nb_\te \pi_\te(a|s)) Q^\te(s,a) 
+
\pi_\te(a|s) (\nb_te Q^\te(s,a))}
&= 
\sum_a (\nb_\te \pi_\te (a|s)) Q^\te(s,a) 
+ \pi(a|s) \nb_\te\pa{\E R(s,a) - \rh_\te + \sum_{s'} \Pj(s'|s,a) V^{\te}(s')}\\
\nb_\te \rh_\te &= \pa{\sum_a \nb_\te \pi_\te (a|s)) Q^\te(s,a) +  + \pi(a|s) \sum_{s'} \nb_\te V^{\te} (s') \Pj(s'|s,a) }- \nb_\te V^{\te}(s)
\end{align}
This is unsatisfactory because we can't estimate $\nb_\te V^{\te}(s')$ for every $s'$. But there is a combination of these we can estimate, namely the stationary distribution. So multiply by $d_\te(s)$ and sum.
\begin{align}
\nb_\te \rh_\te &= \pa{\sum_{s} d_\te(s) \pa{\sum_a(\nb_\te \pi_\te(a|s)) Q^{\te}(s,a)} + \cancel{d_\te(s) \pa{\sum_a\pi(a|s) \sum_{s'} \nb_\te V^{\te}(s') \Pj(s'|s,a)}} - \cancel{\nb_\te V_\te(s)}}.
\end{align}

We have to replace $Q^\te$ by an estimate. This doesn't correspond to an update rule directly, because we can't estimate $\nb_\te(s|a)$. 

We estimate of $Q^\te$ by a function approximation, updating by $\nb_w (\wh Q^\te(s,a) - f_w(s,a))^2$ given a sample $(s,a)$. This converges to a local min where ($\wh Q^\te$ is an unbiased estimator)
\begin{align}
\E \nb_w \pa{\wh Q^{\te} (s,a) - f_w(s,a)} &=0\\
\sum_s d_\te(s) \sum_a \pi_\te(s|a) (Q^\te(s,a) - f_w(s,a)) &=0
\end{align}

We would like to be able to replace $Q^\te(s,a)$ in Lemma 1 with the approximation $f_w(s,a)$. In order to do this we need the error to be 0:
$$
\sum_s d^{\pi}(s) \pa{
\sum_a (\nb_\te \pi_\te(s|a)) Q^\te(s,a) - \nb_\te\pi(s|a) f_w(s,a)
}
$$
In order for these to match up, we need
$$
\nb_w f_w(s,a) = \fc{\nb_\te \pi(s|a)}{\pi(s|a)} = \nb_\te(\ln \pi(s|a)).
$$

**Question**: Do people wait until convergence, or do they do alternating minimization in practice? Does alternating minimization converge?

Work out the loglinear case:
\begin{align}
\pi(s|a) &= \fc{e^{\te^T \phi_a(s)}}{\sum_b e^{\te^T\phi_b(s)}}\\
\nb_\te \ln \pi(s|a) &= \phi_a(s) - \fc{\sum_b e^{\te^T\phi_b(s)} \phi_b(s)}{\sum_b e^{\te^T \phi_b(s)}}\\
&= \phi_a(s) - \sum_b \pi(s|b) \phi_b(s).
\end{align}
So take 
$$
f_w(s,a) = w^T ( \phi_a(s) - \sum_b \pi(s|b) \phi_b(s)).
$$

How well does this parametrization work, compared to Q-learning by FA?

# Questions, notes

1. Does the LP formulation give a way to understand the derivative? In terms of slack constraints, etc.
2. How nonconvex is this? What does the optimization landscape look like? Ex. take 2-action, 3-action case, random transition matrices, some kind of grouping together of states. See [POMDP](POMDP.html)
3. Try to prove intractability - see POMDP. The parametrization there is a slice of the product of simplices, rather than a subspace in logspace. But you can relate it to optimizing rational functions this way. The main reason I suspect intractability is that the degree can be as large as number of parameters...

Minimizing cross-entropy for loglinear is a convex problem. Minimize perplexity for distribution $\Pj(y|x)$ with distribution 
$$
\wh P(y|x) = \fc{e^{\te_y^T\phi(x)}}{\sum_{y'} e^{\te_{y'}^T \phi(x)}}.
$$
To show convexity, we need to show log of partition function is convex. Reducing to 1-variable case, 
\begin{align}
f &= \ln \sum_i e^{a_i+b_i\te}\\
f_\te & = \E b_i\\
f_{\te\te} &= \E b_i^2 - \pa{\E b_i}^2 \ge 0.
\end{align}



