---
title: Interior point methods
published: 2016-08-26
modified: 2016-08-26
tags: convex optimization
type: notes
showTOC: True
---

# Introduction

The idea: Given $\min_{f_i\le 0} f$,

1. Find a feasible point.
2. Turn into soft constraints: let $F(t,x) = \min f+ \sum -\rc t \ln (-f_i)$. (Add a barrier function.) As $t\to \iy$, $F(t,x)$ becomes steeper and $\to f(x)$ pointwise.
3. Solve iteratively. Start at some $(x_0,t_0)$: Find a value within $\ep$ of $\min F(t_i,x)$. (Centering)
4. Set $t_{i+1}=\ga t_i$ (updating schedule).
5. Go back to 3. Repeat until $t$ is large enough. ($m/t<\ep$)

Define the central path. What are the properties of the central path. Explain the relationship to the dual problem.

$$
C = \set{(t,x)}{x=\amin f(x) + \sum -\rc t \ln (-f_i(x))}.
$$
Now $f(c(t))\to f(x^*)$. For $(t,x')\in C$, we have
$$ \nb f + \sum - \fc{\nb f_i}{tf_i}=0.$$
This is the first KKT condition with $\la_i = -\rc{tf_i(x')}$. (Complementarity is not satisfied though: we have $-\la_if_i=\rc t$, not 0.)

Let $x^*=\amin_{f_i\le 0} f$, $x'=\amin f - \sum \rc t \ln (-f_i)$.
Substituting $x',\la_i$ in the dual problem, we get 
\begin{align}
f(x^*) &\ge \min_x f(x) - \sum \rc{t f_i(x')} f_i(x) \\
& = f(x') - \fc mt & x=x'\\
\implies f(x^*) \le f(x') &\le f(x^*) + \fc mt.
\end{align}

Now add in the condition $Ax=b$, and the term $\nu^T(Ax-b)$. The analysis stays the same.

($\ln(-f_i)$ has the magic that its gradient is $\nb f_i$ times something.)

What questions do we need to address?

1. How do we find a point to start---find a feasible point?
2. Given the previous almost-optimal solution, what's the complexity of finding the next one, given ratio $\mu$? (Number of inner steps)
3. How many outer steps do we need? When to stop? (We've shown the gap is $\fc mt$, so stop when $t>\fc m\ep$.

What assumptions do we need?

* $tf_0+\phi$ ($\phi = -\sumo im \ln(-f_i)$) closed (??) and self-concordant for all $t\ge t^{(0)}$.
* Sublevel sets of $f_0$ ($f_i\le 0$, $Ax=b$) are bounded. (This implies that $\nb^2(tf_0+\phi)$ is PD---why?)

This is reasonable because it is self-concordant if all $f_i$ are linear or quadratic, and $\ln$ is good at making functions self-concordant.

Give an example of a problem that can be reformulated to be self-concordant. Technique is to add redundant constraints or extra variables.

*   For $\min_{Fx\le g, Ax=b} \sumo in x_i\ln x_i$, $tf_0(x)+\phi(x)$ is not closed (?) or self-concordant. Using that $ty\ln y - \ln y$ is self-concordant, we add in the redundant constraint $x\ge 0$ to get
    $$tf_0+\phi = \sumo in (tx_i\ln x_i - \ln x_i) - \sumo im \ln (g_i-f_i^Tx).$$
*   For $\min_{\ln(\sumo k{K_i}\exp(a_{ik}^T + b_{ik}))\le 0} \ln \pa{\sumo k{K_0} \exp(a_{0k}^Tx+b_{0k})}$, introduce the variables $y_{ik}$. Change the problem to
	\begin{align}
	\min \sumo k{K_0} y_{0k}\\
	\sumo k{K_i} y_{ik} &\le 1\\
	a_{ik}^T x+b_{ik} - \ln y_{ik} &\le 0\\
	y_{ik} &\ge 0.
	\end{align}

# Analysis and algorithm explanation

## 1 Place to start

How to find a feasible point? A feasibility problem can be transformed into an optimization problem

$$
\exists x, f_i\le 0,  \iff \min_{f_i\le m} m\le 0.
$$
<!-- Ax = b -->
Assume $\{\forall i, f_i\le 0\}\subeq B_R(0)$. Let $\ol p^*$ be the optimal value of this optimization problem.

Actually add an extra constraint ($a$ satisfies $\ve{a}_2\le \rc R$ so is redundant).
$$
\min_{f_i\le s, a^Tx \le 1} s.
$$
Choose $a,s_0$ so that $(x=0,s=s_0, t_0)$ is on the central path (to make analysis easier), i.e., so $x=0,s=s_0$ minimizes
$$t^{(0)}s- \sumo im \ln (s-f_i(x)) - \ln (1-a^T x).$$
Set the gradient to 0 to see that we require
\begin{align}
t^{(0)} &= \sumo im \rc{s_0 - f_i(0)}\\
a &= -\sumo im \rc{s_0-f_i(0)} \nb f_i(0).
\end{align}

What to choose for $s_0$? We need $s_0>F:=\max_i f_i(0)$ and $\ve{a}_2\le \rc{R}$. Upper bound $\ve{a}_2$ by
$$
\ve{a}_2\le \sumo im \rc{s_0-f_i(0)}\ve{\nb f_i(0)} \le \fc{mG}{s_0-F},\quad G=\max_i \ve{\nb f_i(0)}_2,
$$
so we can take $\boxed{s_0=mGR+F}$. Then $t^{(0)} \ge \rc{mGR}$ so the initial duality gap is $\fc{m+1}{t^{(0)}} \le (m+1) mGR$. Use the barrier method until the duality gap is $<|\ol p^*|$, so that we can determine $\sgn(\ol p^*)$. This requires (take $\mu = 1+\rc{\sqrt{m+1}}$)
$$
\le \ce{\sqrt{m+1} \log_2 \fc{m(m+1)GR}{|\ol p^*|}}\pa{\rc{2\ga} + c}
$$
Newton steps. (Interpret $\lg\pf{GR}{|\ol p^*|}$ as how close the feasibility problem is to the boundary between feasibility and infeasibility.)

(Equality constraints don't change things too much. ?? $G$, $R$ refer to reduced/eliminated problem.)

Why did we add in $a^Tx\le 1$? Otherwise, we minimize $ts-\sum \ln (-(f_i-s))$, and 
\begin{align}
\ddd{s} &= t+\sum \rc{f_i-s} = 0\\
\nb_x &= \sum \fc{-\nb f_i}{f_i-s} =0.
\end{align}
We can't choose $x=0$ because we need $s>\max f_i$, and $\nb_x>0$.

(Note if we add the constraint $a^Tx\le 1$ for phase 1, we have to include it for phase II as well.)

### Termination near phase II central path

During phase I, add in the extra constraint $f_0(x)\le M$ to make it intersect the phase II central path. (We can add the constraint $a^Tx\le 1$ below.) We want the point on the central path for phase I corresponding to $s=0$ to also be on the phase II central path. (I think you won't get to $s=0$ exactly, but you get close---then the duality gap is $m(M-f_0)+$(something small).)

\begin{align}
\min_{f_i\le s, f_0\le M, Ax=b} s:&& \nb(ts + (\sum-\ln (s-f_i)) - \ln (M-f_0) + A^T \nu) &=0\\
\iff && t&=\sum \rc{s-f_i} = \sum -\rc{f_i}\\
&& \rc{M-f_0} \nb f_0 + \sum\rc{s-f_i} \nb f_i + A^T\nu &=0\\
\min_{f_i\le 0, Ax=b}f_0:&& \nb(tf_0+\sum - \ln (-f_i) + A^T \nu) &=0\\
\iff &&t\nb f + \fc{\nb f_i}{f_i} + A^T \nu &=0
\end{align}
Make these match by setting $t=\rc{M-f_0}$. I.e., the initial duality gap for phase 2 is $\fc{m}{t} = m(M-f_0)$.

## 2 Inner steps

Given $x^*(t)$, how many steps does it take to compute $x^*(\mu t)$?

How can you use the fact that $x$ is optimal for $tf_0(x) + \phi(x)$ to prove how optimal it is for $\mu t f_0(x)+\phi(x)$?

Let $x=x^*(t)$, $x^+=x^*(\mu t)$.

It suffices to bound 
$$\mu t f_0(x) + \phi(x) - \mu tf_0(x^+) - \phi(x^+).$$

We can't bound $\ln(-f_i)$ directly. We can hope to bound the dual function $\cL$ (we have info from the KKT conditions). Use the linear approximation to $\ln$.

\begin{align}
\mu t f_0(x) + \phi(x) - \mu tf_0(x^+) - \phi(x^+)
&= \mu t f_0(x) - \mu t f_0(x^+) + \sum \ln \pf{\mu f_i(x^+)}{\mu f_i(x^+)}\\
&\le \mu t f_0(x) - \mu t f_0(x^+) + \sum \pa{\fc{\mu f_i(x^+)}{f_i(x)} - 1 -\ln \mu}\\
&= \mu t f_0(x) - \mu t f_0(x^+) + t\pa{\sum \rc{tf_i} \mu f_i(x^+)} - m - m\ln \mu\\
&= \mu t f_0(x) - \mu t \cL(x^+, \la, \nu) - m - m \ln \mu &Ax^+=b, \la_i  = \rc{tf_i}\\
&\le \mu tf_0(x) - \mu t g(\la, \nu) - m - m\ln \mu\\
&=m(\mu-1 - \ln \mu).
\end{align}

Thus, the number of inner steps is 
$$
\fc{f(x)=p^*}{\ga}+c = \fc{m(\mu - 1 - \ln \mu)}{\ga} + c
$$
(See [Newton](second-order.html) for definition of $\ga$. We approximate $\ln\ln$ by a constant.) This is approximately quadratic for small $\mu$ ($O(m(\mu-1)^2)$), linear ($O(m\mu)$) for large $\mu$. (This does not depend on $n,p$.)

## 3 Outer steps
 
The number of outer steps needed is $\ce{\fc{\ln (m/(t^{(0)}\ep))}{\ln \mu}}$ so the total number of Newton steps needed is
$$\ce{\log_\mu \pf{m}{t^{(0)}\ep)}} \pa{\fc{m(\mu - 1 - \ln \mu)}{\ga} + c}. $$

* Choosing $\mu$ constant, get $O\pf{\pa{\ln\pf{m}\ep}m}{\ga}$. 
* Set $\mu$ small to do better. Balance $(\mu-1-\ln \mu)m=O(m(\mu-1)^2)$ and $c$ by setting $\mu = 1+\rc{\sqrt m}$, and get $O(\sqrt m)$. (Recall $m$ is number of constraints.)
* In practice, though, choose $\mu$ constant.

## Total

\begin{align}
N_I &= O(\sqrt m \log \pf{mGR}{|\ol p^*|} \rc{\ga})\\
N_{II} &= O(\sqrt m \log \pf{m(M-p^*)}{\ep}) \prc{\ga}.
\end{align}

Explanation:  The point at the end of phase I has duality gap $\le (m+1)(M-p^*)$.

## Variations

What are other ways to do Phase I?

* Sum of infeasibilities $\min_{f_i\le s_i, Ax=b, s\ge0} \one^Ts$. Why use this? When infeasible, the optimal point often violates a small unber of inequalities (cf. $l_1$-regression, basis pursuit). Here the penalty is $l_1$ not $l_\iy$.
*   Use infeasible start Newton to solve the barrier formulation
    $$\min_{f_i\le s, Ax=b, s=0} f_0\qquad \min_{Ax=b, s=0} t^{(0)} f_0-\sum \ln (s-f_i).$$
	(Infeasible start means you can start with points violating equality constraints.)
	
What if we don't know a point in $\bigcap dom(f_i)$? Add a translation, $\min_{..., z_i=0} t^{(0)} f_0(x+z_0) - \sum \ln (s-f_i(x+z_i))$.

Disadvantage: There is no good stopping criterion when infeasible.

# Primal-dual IPM

Review [constrained optimization](constrained.html). Here there is no distinction between inner and outer iterations.

Applying the infeasible start Newton method to the barrier problem gives
$$ \matt{t\nb^2 f_0+\nb^2 \phi A^T}{A^T}{A}{0} \coltwo{\De x_{nt}}{\nu_{nt}}  = -\coltwo{t\nb f_0+\nb \phi}{0}. $$
The residual is $(\nb f + \nb \phi + A^T\nu, Ax-b)$, $\phi = -\sum \rc{t}\ln (-f_i)$. 

But here $t$ is fixed. We want to treat $t$ as a variable. Actually, we introduce $\la$.

Recall that a point on the central path gives a dual feasible $(\la, \nu)$ with $\la_if_i=-\rc t$. We write everything in terms of the primal $x$ and dual $(\la,\nu)$. Introduce $\la$ as a variable that we want to satisfy $\la_if_i=-\rc t$ (the modified KKT equation) to get the (dual, centrality, primal) residual
$$r_t(x,\la,\nu) = \colthree{\nb f + Df^T\la + A^T\nu}{-\diag(\la) f - \rc t \one}{Ax-b} =: \colthree{\De x}{\De \la}{\De \nu} = -\colthree{r_{dual}}{r_{cent}}{r_{pri}}.$$

The Newton step for solving the modified KKT equations
\begin{align}
\nb f_0 + Df^T \la + A^T\nu &=0\\
-\la_i f_i &=\rc t\\
Ax-b &=0
\end{align}
is hence (set the gradients of these equations to the negative residuals)
\begin{align}
\mattn{\nb^2 f_0+\sum \la_i \nb^2 f_i}{Df^T}{A^T}{-\diag(\la)Df}{-\diag(f)}{0}{A}00 \colthree{\De x}{\De \la}{\De \nu} = -\colthree{r_{dual}}{r_{cent}}{r_{pri}}.
\end{align}
($Df$ has $\nb f_i$ as rows.) 
The solution is the primal-dual search direction. It is not the same as the search direction in the barrier method (because here we're changing $\la$).

Solving for $\De \la$ and substituting gives
\begin{align}
\matt{\nb^2 f_0 + \sumo im \la_i \nb^2 f_i + \sumo im -\fc{\la_i}{f_i}\nb f_i \nb f_i^T}{A^T}A0 \coltwo{\De x_{pd}}{\De \nu_{pd}} &= 
\coltwo{r_{dual} - \sum \la_i \nb f_i - \sum \fc{\nb f_i}{tf_i}}{r_{pri}}\\
&=-\coltwo{\nb f_0 + \rc t \sumo im -\rc{f_i}\nb f_i+A^T\nu}{r_{pri}}.
\end{align}

Compare to the Newton step for the centering method ($t$ fixed) in the barrier method. The upper-left entry is replaced by $t\nb^2 f_0 + \sumo im -\rc{f_i} \nb^2 f_i + \sumo \rc{f_i^2} \nb f_i f_i^T$, and the dual residual is instead $t\nb f_0 + \sumo im -\rc{f_i} \nb f_i$.

The iterates are not necessarily feasible, so we can't evaluate a duality gap. Define the **surrogate duality gap** for $x,f(x)<0, \la\ge 0$ by 
$$\wh \eta(x,\la) = -f^T\la.$$
It is the duality gap if $x$ were primal feasible and $\la,\nu$ were dual feasible ($r_{pri}=0,r_{dual}=0$).

The algorithm:

(Feasible start) Start with $x$ such that $f_i(x)<0$, $\la>0$, $\mu>1$, $\ep_{feas}>0$, $\ep>0$.

1. Set $t=\mu m/\wh eta$.
2. Compute primal-dual search direction $\De y_{pd}$.
3. Line search and update.
4. Repeat until $\ve{r_{pri}}_2\le \ep_{feas}$, $\ve{r_{dual}}_2\le \ep_{feas}$, and $\wh \eta \le \ep$.

(Note $r_{cent}$ means that we stick close to the central path.)

# Intuitions

* Each constraint has the force $\rc{f_i(x)}\nb f_i(x)$ and the objective force field is $-t\nb f_0(x)$.
