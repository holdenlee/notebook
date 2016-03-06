---
title: Duality
published: 2016-03-04
modified: 2016-03-04
tags: duality
type: concept
showTOC: True
---

#Summary

##Duality

These problems are dual.
\begin{align}
\min_{f_i\le 0, Ax=b} f & \lra \max_{\la \ge 0,\nu} \ub{\min_x \ub{f+\la^T\vec{f} + \nu^T (Ax-b)}{\cal L(x,\la,\nu)}}{g(\la,\nu)}\\
\max_{f_i\ge 0, Ax=b} f & \lra \min_{\la \ge 0,\nu} \ub{\max_x \ub{f+\la^T\vec{f} - \nu^T (Ax-b)}{\cal L(x,\la,\nu)}}{g(\la,\nu)}
\end{align}
In (1) the $f_i$ are convex; in (2) they are concave. In (1), we have dual$\le$primal:
$$
\min_{f_i\le 0, Ax=b} f \ge \max_{\la \ge 0,\nu} \ub{\min_x \ub{f+\la^T\vec{f} + \nu^T (Ax-b)}{\cal L(x,\la,\nu)}}{g(\la,\nu)}
$$
Note: $f^*(y)=\sup y^T - f(x)$ is the conjugate or **Legendre transform**. It is convex, and for convex functions, the double conjugate is the original function.

**Slater's constraints**: Equality holds if the problem is strictly feasible: there exists $x$ such that $f_i(x)<0, Ax=b$. Linear inequalities are allowed to be non-strict, $f_i(x)\le 0$.

##KKT conditions

The KKT conditions are (here $h=Ax-b$)

1. (derivative 0) $\nb f+\sum \la_i \nb f_i + \nu^TA=0$.
2. (constraints satisfied)  $\la \ge 0, f_i\le 0, h_i=0$.
3. (complementary slackness) $\la f_i=0$.

Interpretation: 

* If $x,\la,\nu$ satisfy the conditions, then $x$ and $(\la,\nu)$ are primal and dual optimal and the optimal values are equal.
* if Slater's condition is satisfied, $x$ is optimal if and only if there exist, $\la,\nu$ that satisfy KKT conditions

##Examples

1.  Linear programming (equality when there exists a feasible solution)
    \begin{align}
	\min_{Ax=b,x\ge 0} c^Tx &= \max_{\la\ge 0, A^T\nu\ge -c} -b^T\nu\\
	\min_{Ax\le b} c^Tx &= \max_{\la\ge 0, A^T\nu=-c} -b^T\nu.
	\end{align}

###Dual functions

(Check this.)

Function|Dual
---|---
$u\ln u$|$e^{v-1}$
$\ve{x}$|$\begin{cases}0,&\ve{y}_*\le 1\\ \iy,&\text{else}\end{cases}$
$\ln \det(X^{-1})$|$\ln \det(-Y)^{-1}-n$

#Proofs and intuition

##Weak duality

Given a dual feasible $\la,\nu$, choose $x=x^*$. Then
$$
g(\la,\nu) = f(x^*) + \sum \la_i \ub{f_i(x^*)}_{\le 0} + \nu^T \ub{(Ax^*-b)}{=0}\le f(x^*).
$$

##Strong duality

##Intuition

Think of the dual as (1) relaxing the strict conditions that $f_i\le 0$ and (2) being a game. If you fail to meet the constraint $f_i\le 0$, you are penalized by cost $\la_if_i$ (and you gain money from constraints that are met). The adversary first sets "shadow prices" $\la_i,\nu_i$, the cost for violating the constraints, and then you choose $x^*$. Duality says you can't do better in this game. (You can do just as well by choosing your original $x^*$; this is weak duality.

Let $p^*(u,v)$ be the optima under constraints $f_i\le u_i,h_i=v_i$. The sensitivity to the constraints are given by the dual optima. We have the following (the derivative equations hold if $p^*$ is differentiable.[^f1]
\begin{align}
p^*(u,v) &\ge p^*(0,0)-\la^{*T} u - \nu^{*T} v\\
\pd{p^*}{v_i} &= -\nu_i\\
\pd{p^*}{u_i} &= -\la_i.
\end{align}

[^f1]: Otherwise maybe an inequality? Multiple dual optima are possible.

#Questions

If $x$ is a primal optimal, is there necessarily a $(\la,\nu)$ that satisfies the equations? I think if $x$ is primal optimal and $(\la,\nu)$ is dual optimal, $(x,\la,\nu)$ does not necessarily satisfy. Check this.
