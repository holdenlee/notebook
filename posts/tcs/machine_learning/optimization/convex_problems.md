---
title: Convex problems
published: 2016-04-23
modified: 2016-04-23
tags: convex optimization
type: topic
showTOC: True
---

Express the following as convex optimization problems.

* Quadratic minimization
    * Least squares
* Geometric programming
* Analytic center

\begin{align}
& \min \rc 2 x^T P x + q^T x + r, &P\in S_+^h\\
& \min \ve{Ax-b}_262, &P=A^TA, q=A^Tb \text{ matching with above}\\
& (\text{optimality conditions: } Px^*+q=0, \quad A^TAx^* = A^Tb\\
& \min \ln \pa{\sum \exp(a_i^Tx+b_i)}\\
& \min - \sum \ln(b_i - a_i^Tx)\\
& \min \ln \det(F(x)^{-1}),& F(x) = F_0+\sum_i x_i F_i.
\end{align}
