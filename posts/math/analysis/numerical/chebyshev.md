---
title: Chebyshev polynomials
published: 2016-08-04
modified: 2016-08-04
tags: none
type: notes
---

References:

* [The Zen of gradient descent](http://blog.mrtz.org/2013/09/07/the-zen-of-gradient-descent.html)

Define the Chebyshev polynomials by
\begin{align}
T_0 &=1\\
T_1 &=x\\
T_{n+1} &= 2xT_n - T_{n-1}\\
T_n(\cos x) &= \cos(nx).
\end{align}



**Theorem**. There exists a polynomial $p_k$ such that
\begin{align}
\deg(p_k) &= O\pa{\sqrt{\fc{L}{l}} \ln \prc{\ep}}\\
p_k(0) &= 1\\
p_k(x)&\le \ep, &x\in [l,L]
\end{align}

First attempt: Scale and translate the Chebyshev polynomial to be $\le \ep$ on $[l,L]$. A Chebyshev poly at $x$ is $O(2^{n-1}x^n)$. Then the value at 0 is $2^{n-1}$ is $2^{n-1}\pf{l}{(L-l)/2}^n$, it suffices for this to be $\le 1$. But this only that $n\le \fc{\ln \prc{\ep}}{\ln \pf{4l}{L-l}}$ is sufficient.

This is a bad approximation!

We know 
\begin{align}
T_n\pf{e^x+e^{-x}}2 &= \fc{e^{nx}+e^{-nx}}2\\
T_n\pf{u+\rc u}{2} &= \pf{u^n+\rc{u^n}}2.
\end{align}
Solving $u+\rc{u} = x$ gives $u=x \pm\sqrt{x^2-1}$ and 
$$u^n +\rc{u^n} = (x+\sqrt{x^2-1})^n + (x-\sqrt{x^2-1})^n.$$
Thus it suffices to have (let $k = \fc Ll$)
\begin{align}
2\ba{\pf{L+l}{L-l} + \sqrt{\pf{L+l}{L-l}^2 - 1}}^n \ep &\le 1\\
\iff n\ln \ba{\pf{L+l}{L-l} + \sqrt{\pf{L+l}{L-l}^2 - 1}} & \le \ln \fc{2}{\ep}\\
\iff n\ln \pf{(\sqrt k+1)^2}{k-1} & \le \ln \pf 2\ep\\
\Leftarrow n\pf{2+2\sqrt k}{k-1} & \le \ln \pf 2\ep\\
\Leftarrow n&\le \fc{k-1}{2(\sqrt k + 1)}\ln \pf 2\ep\\
&=\rc{2}(\sqrt k - 1) \ln \pf 2\ep\\
&=O(\sqrt k \ln \prc{\ep}).
\end{align}

Restatement: There exists a polynomial of degree $O\pa{\sfc{L+l}{L-l}\ln \prc{\ep}}$ such that $p_k(L)=1$ and $p_k(x)=0$ on $[-l,l]$.

Let's solve $Ax=b$ when $A$ is positive definite.
Consider $f=\rc 2 x^TAx - b^Tx$ starting at $x_0=b$.
Gradient descent with step size $t$ gives
\begin{align}
x_{k+1} &= x_k - t (Ax_k-b)\\
&= (I-tA)x_k + tb\\
x_k &= (I+\cdots +(I-tA)^k)tb
\end{align}
Now $p(x) = 1+\cdots + (1-x)^n$ is an approximation of $\rc{x} = \rc{1-(1-x)}$. Suppose all eigenvalues of $A$ are in $[l,L]$. Then diagonalizing, we get that (take $t=1$?)
\begin{align}
\ve{(p(tA) - A^{-1})tb}_2 
&= \ve{tb}_2\max_{\la\text{ of }A} (p(\la) - \rc{\la})) \\
&= \ve{tb}_2\max_{x\in [l,L]} (p(x) - \rc x) \\
&= \ve{tb}_2 \ve{p(x) - \rc x}_{L^\iy([l,L])}.
\end{align}
<!-- (We may assume $A$ is diagonalizable with real eigenvalues by multiplying by a unitary.) -->
But $p(x)$, although it is a power series expansion of $\rc{x}$, is not the best estimator of $\rc{x}$ in the $L^{\iy}$ norm. Polynomials based on Chebyshev polynomials do better. The Chebyshev polynomials are defined by a recurrence, which corresponds to a different recurrence relation on the $x_k$. 

For the above $p$, the difference is $\fc{(1-tx)^{n+1}}x$. Choosing $t=\fc{2}{L+l}$, we get $\pf{L-l}{L+l}^{n+1} = O\pf{\ka - 1}{\ka+1}^{n}$ convergence.

This motivates the following question.

**Question**. What is
$$
\min_{\deg p = n} \ve{p(x) - \rc{x}}_{L^{\iy}([l,L])}?
$$

Interpolate at Chebyshev points?
Conjugate gradients, etc.

See exercise 8.10 in [ATAP](ATAP.html). First reposition at $[-1,1]$ as above. $\rc{x}$ gets sent to $\fc{k+1}{m(k-1)}\rc{x-\pf{k+1}{k-1}}$. For any $\rh$ such that $\fc{\rh+\rh^{-1}}2\le \fc{k+1}{k-1}$, i.e., $\rh \le 1+\fc{2}{\sqrt k - 1}$, we get a bound
$$
\fc{k+1}{m(k-1)} \pa{\pf{k+1}{k-1}-\fc{\rh+\rh^{-1}}{2}} \rh^{-n} = \rc m O_{\rh}(\rh^{-n})
$$
This is an upper bound on convergence of conjugate gradient, because conjugate gradient finds the vector in $\spn(\{b, Ab, \ldots, A^{n}b\})$ that is closest to $A^{-1}b$.

(Thus, conjugate gradient gets $\ep$-close in $O(\sqrt\ka \ln \prc{\ep})$ steps.)

(We can get a lower bound by computing the best possible $L^2$ of the approximation. It should be on the same order.)

Conjugate gradient: 
\begin{align}
v_0&=b\\
w_i&=Av_i\\
v_i&=w_i- \sumz j{i-1} \fc{\an{w_i,v_j}_A}{\an{v_j,v_j}_A}v_j.
\end{align}
We have $\an{w_{i+1},v_j} = \an{v_i,w_{j+1}}_A$ and $w_{i+1}\perp v_{i+2},ldots$ so $v_i\perp_A w_{i+3},\ldots$.

<!--We try to minimize $\max_\la (\la p(\la)-1)^2)$-->

