---
title: NMF algorithm
published: 2016-04-22
modified: 2016-04-22
tags: NMF
type: research
showTOC: True
---

#Setup

The setup for alternating minimization is as follows.

1.  (Decoding) Let $x \leftarrow \text{decode}_{A^{(t)}} y$.
2.  (Gradient step) Let
    $$A^{(t+1)} = A^{(t)} - \eta \pi(\nb L_x(A))$$
	where the loss function is the KL-divergence (negative log-likelihood)
	\begin{align}
	L_x(A) &= \sum y_i \ln \pf{y_i}{Ax_i}\\
	\nb L_x(A) &= (-y\odot \rc{Ax}) x^T
	\end{align}
	and $\pi$ is projection to the probability simplex.

The plan is to show this satisfies the conditions needed for approximate gradient descent: each step is correlated with the right direction. We want to find $\al,\be,\ep$ so that
$$ \an{g,A-A^*} \ge \al \ve{A-A^*}^2 + \be \ve{g}^2 - \ep$$
(for some norm).

We have to be careful about 2 things.

*   Uniqueness doesn't hold in general---ex. we can expand the simplex, so there would be a manifold of solutions---but it does hold under separability. We have to use this somehow.
*   The more complicated the decoding map is, the harder this is to analyze. The MLE estimator is difficult to work with because there is no explicit form. The inverse is probably easier to work with. It gives a biased estimate, but this may be OK if we only want to get close enough (ex. from $\rc{\log n}$ to $\rc{n}$).

We proceed in 2 lemmas.

* When $A\approx A^*$, the decodings satisfy $x\approx x^*$.
* When $x\approx x^*$, the descent direction for $L_x(A)$ is correlated with $A-A^*$.

As a first step, show that
$$\an{\EE_y \pa{-y\odot \pa{\rc{Ax} -\rc{A^*x}}x^T} , A-A^*}>0.$$

#Preliminary calculations

First suppose $y=A^*x$ (no noise), $x=x^*$ (perfect decoding).  Then letting $D= \diag\prc{(Ax)_i}$,
\begin{align}
\an{\EE_y \pa{-y\odot \pa{\rc{Ax} -\rc{A^*x}}x^T} , A-A^*}
&= x^T\ub{(A-A^*)^T D (A-A^*)}{=:M^2}x\\
&= \ve{x}_{M}^2.
\end{align}

Now relax $y\approx A^*x$, We get
\begin{align}
\an{\EE_y \pa{-y\odot \pa{\rc{Ax} -\rc{A^*x}}x^T} , A-A^*}
&= \EE_{y} \ve{x}_M^2 + \cancelto0{(x^TA^{*T} - y^T) D (A-A^*)x}
\end{align}
using $\E y = A^* x$.

Now relax $x\approx x^*$. (Warning: $x^*$ simply being close may not imply convergence to $A^*$ without additional assumptions on $A^*$, because of nonuniqueness.)
\begin{align}
\EE_{x,y} \an{-D yx^T, A-A^*}
&= \EE_{x,y} [-y^T D(A-A^*) x]\\
&= \EE_{x,y} [-y^T DA^*x]-1\\
\end{align}
The dependencies of the random variables are $x^* \to y \to x$ ($\E_y = A^*x^*$). We can't simply replace $\E y = A^*x^*$ because we have to average over $x$ first, which depends on the decoding. (If we could replace $y$ like that, we get $\an{x,x-x^*}_M$.)

#Actual calculations

Recall that if we're decoding by multiplying by $B$, we also have to threshold, $\text{Th}(Bx)$.

In Theorem 4.1, if $A$ is biased, then we instead obtain a bound
$$ (By)_i - \E x_i = \ub{(By)_i - BA^*x}{\text{w.h.p. }\le 2\la(A) \sfc{\ln r}{n}} + B(A^*-A) x^*. $$
For the second term,
$$ \ve{B(A-A^*)x}_{\iy} \le |B|_{\iy} \max_i \ve{A_{\cdot i} - A_{\cdot i}^*}_1 \le \la \ep.$$
We want to lower bound
\begin{align}
\an{\nb A, A-A^*}
&= \sum \fc{y_iA_{ij}^*}{(Ax)_i} - 1\\
&= \sum_i \fc{y_i(A^*x)_i}{(Ax)_i} - 1\\
&= \sum \fc{b_i(A^* x)_i}{(Ax)_i} +
\sum_i \fc{(A^*(x^*-x))_i (A^*x)_i}{(Ax)_i} + \sum_{i,j} \pa{(A^*x)_i\sfc{(Ax)_j}{(Ax)_i} - (A^*x)_j\sfc{(Ax)_i}{(Ax)_j}}^2.
\end{align}
We may suppose $\ve{A_{\bullet i} - A_{\bullet i}^*}\le \rc{\poly\log(n)}$, or something like this.

Try 2:
INCORRECT: I mixed up $x,x^*$ here.
$$\an{\nb A, A-A^*} = \an{\pa{y_i \sfc{(Ax)_j}{(Ax)_i} - y_j \sfc{(Ax)_i}{(Ax)_j}}_{ij}, \pa{(A^*x)_i  \sfc{(Ax)_j}{(Ax)_i} - (A^*x)_j  \sfc{(Ax)_i}{(Ax)_j}}_{ij}}.
$$
It's tempting to take $\E_y$ first, but we can't do that.

If $x=x^*, y= A^*x^*$ then we write this as a sum of squares above. (This is probably the same as writing $\ve{x}_M^2$ from the previous section...) This is Lagrange's identity.

We want to lower-bound by
$$ \al \ve{A-A^*}_F^2 + \be \ve{\pf{y_i}{(Ax)_i}}_2^2 \ve{x}_2^2 - \ep.
$$

# KL Divergence

(5-12)

Idea: use a different potential function. $L^2$ doesn't make so much sense here.

Suppose $x= (1)$ and do MWU. The gradient is
$$-\diag\prc{Ax} yx^T = -\fc{y}{a}.$$
We get
$$a_i' = \fc{a_ie^{-\eta \fc{y_i}{a_i}}}{\sumo kn a_ke^{\eta \fc{y_k}{a_k}}}.$$
The metric is
$$d_{KL}(y,a) = \sumo in y_i \ln \pf{y_i}{a_i}.$$
The decrease is
\begin{align}
d_{KL}(y,a) - d_{KL}(y,a') &= \sumo in y_i \ln\pf{a_i'}{a_i}\\
&=\sumo in y_i \ln \fc{e^{\eta\fc{y_j}{a_j}}}{\sumo jn a_j e^{-\eta \fc{y_j}{a_j}}}\\
&=\sumo in y_i \ln e^{\eta \fc{y_j}{a_j}} - \ln \sumo jn a_j e^{-\eta\fc{y_j}{a_j}}
\end{align}
Sanity check: For $\eta\to 0$, this is $\eta(\sum \fc{y_i^2}{a_i}-\sum y_i)>0$ by $T_2$'s inequality.
