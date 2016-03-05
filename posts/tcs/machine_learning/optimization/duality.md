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
In (1) the $f_i$ are convex; in (2) they are concave.

**Slater's constraints**: Equality holds if the problem is strictly feasible: there exists $x$ such that $f_i(x)<0, Ax=b$.

##KKT conditions

The KKT conditions are (here $h=Ax-b$)

1. (derivative 0) $\nb f+\sum \la_i \nb f_i + \nu^TA=0$.
2. (constraints satisfied)  $\la \ge 0, f_i\le 0, h_i=0$.
3. (complementary slackness) $\la f_i=0$.

Interpretation: 

* If $x,\la,\nu$ satisfy the conditions, then $x$ and $(\la,\nu)$ are primal and dual optimal and the optimal values are equal.
* if Slater's condition is satisfied, $x$ is optimal if and only if there exist, $\la,\nu$ that satisfy KKT conditions

#Questions

If $x$ is a primal optimal, is there necessarily a $(\la,\nu)$ that satisfies the equations? I think if $x$ is primal optimal and $(\la,\nu)$ is dual optimal, $(x,\la,\nu)$ does not necessarily satisfy. Check this.
