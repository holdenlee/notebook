---
title: SDP duality
published: 2016-03-04
modified: 2016-03-04
tags: SDP, duality
type: concept
---

[Duality](duality.html)

#Summary

The following SDP's are dual:
$$
\max_{X\succeq 0,\an{A_i,X}=b_i}\an{C,X} \lra \min_{\nu, \sum \nu_iA_i\succeq C} \nu^Tb.
$$
(When are they equal? When there is a strictly feasible point.)

#Derivation

1.   First write as a convex program. Replace the condition $X\succeq 0$ by
     $$
     \la_{\min}(X)=\min_{\Tr(A)=1, A\succeq 0}\an{A,X}\ge 0.
     $$
     (Use (2) in [duality](duality.html).)
2.   Simplify, using minimax as a key step.
	 \begin{align}
	 g(\la,\nu) &= \max_X(\an{C,X} + \la \min_{\Tr(A)=1, A\succeq 0}\an{A,X} - \sum \nu_i (\an{A_i,X}-b_i)\\
	 &=\max_X\min_{\Tr(A)=1}\an{\ub{C-\sum \nu_iA_i}{Z}+\la A,X} + \nu^Tb\\
	 &=\max_X\min_{\Tr(A)=\la}\an{Z + A,X} + \nu^Tb\\
	 &= \min_{\Tr(A)=\la}\max_X \an{Z+A,X}\\
	 &=\pa{\begin{cases}
	 0,&\Tr(Z)=-\la, Z\preceq 0\\
	 \iy,&\text{else.}
	 \end{cases}}-\nu^Tb
	 \end{align}
	 using minimax, then noting the inside $\max$ forces the condition $Z=-A$.
3. Taking $\min$ of this, $Z\preceq 0$ turns into a constraint. 

See [notes].

[notes]: http://www.eecs.berkeley.edu/~wainwrig/ee227a/SDP_Duality.pdf
