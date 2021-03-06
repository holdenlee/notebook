---
title: Fisher information
published: 2016-04-04
modified: 2016-04-04
tags: none
type: concept
showTOC: True
---

#Definitions

Define the **score** and **Fisher information** by
\begin{align}
s(X;\te)&=\pd{\ln f}{\te}\\
I(\te)&=\Var_\te(s(X;\te))
\end{align}
(This generalizes immediately to the multivariate case; for simplicity we consider the univariate case.)

The expecation of score is 0:
$$\E s=\int_{-\iy}^{\iy} s(X;\te) f\,dx=\int_{-\iy}^{\iy} \fc{\ln f}{f}f\dx=(\int_{-\iy}^{\iy}f\,dx)_{\te}=0.$$
Thus
$$I(\te) = \Var(s(X;\te)) = \E [(\ln f)_\te^2] = -\E((\ln f)_{\te\te}).$$

#Intuition

Suppose a data point $x$ is observed. What is the posterior distribution on the parameter $\te$? Consider the log of this probability, the log-likelihood. The Fisher information measures how curved the log-likelihood is at $x$.

Consider the Fisher information at the MLE. If $I(\te)$ is large, then we are reasonably certain of the value of $\te$ (changing $\te$ by a bit decreases the log-probability of observing $x$ a lot).[^f1] If $I(\te)$ is small, then we are not certain.

[^f1]: For sake of discussion suppose the log-likelihood function is convex in $\te$, so there aren't other local minima.

#Theorems

##Cramer-Rao

[Wikipedia](https://en.wikipedia.org/wiki/Cramer-Rao_inequality)

This intuition is formalized by Cramer-Rao: the variance of any unbiased estimator for $\te$ is lower-bounded by the inverse of the Fisher information.

**Theorem (Cramer-Rao)**: Suppose $T(X)$ is an unbiased estimator of $\te$. Then $\Var(T) \ge \rc{I(\te)}$. More generally, $\Var(\psi(T)) \ge \fc{\psi'(\te)}{I(\te)}$.

In higher dimensions,
$$
Var(T) \succeq \pd{\psi}{\te} I^{-1}\pd{\psi}{\te}.
$$

*Proof*: Suppose $T=t(x)$. By Cauchy-Schwarz,
$$
\Var(T) \ge \fc{\text{Covar}(T,s_\te)^2}{\Var(s_\te)} = \fc{\int t(x)f (\ln f_\te)}{I(\te)} = \fc{\int g(x) f_{\te}(x)}{I(\te)}
=\fc{(\E g)_\te}{I(\te)}= \rc{I(\te)}.
$$
<!--randomized? -->

##Asymptotic normality
<!-- 3/16 p. 197-->

Define the **standard error** by $\se=\sqrt{\Var_\te(\wh{\te_n})}$.

**Theorem (Asymptotic normality of MLE)**: $\se\sim \sfc1{nI(\te)}$ and $\fc{\wh{\te_n}-\te}{\se}\to N(0,1)$.

(With a little more work, we can replace se by $\wh{se}$ (estimated standard error).)

*Proof*: Denoting the log-likelihood by 
$\ell(\te):= \ln \Pj(x^n|\te) = \sum_{i=1}^n \ln f(x_i;\te)$, 
linearize to find that
$$
\ell'(\wh \te)-\ell'(\te)\approx (\wh \te-\te)(\ell''(\te))\implies -\fc{\ell'}{\ell''}(\te)\approx \wh{\te}-\te.
$$
Now
$$
\sqrt n(\wh{\te_n}-\te)=\fc{\rc{\sqrt n}\ell'(\te)}{-\rc n\ell''(\te)}\to \fc{N(0,I(\te))}{I(\te)}\to N(0,1),
$$
the top in distribution, the bottom in probability. (The top uses CLT on $\sum (\ln f)_\te$; the bottom uses LoLN on $\sum -(\ln f)_{\te\te}$.)


<!--
Define some quantities first.
\begin{df}
\begin{enumerate}
\item
\textbf{KL distance}
\[
D(f,g)=\int f(x)\ln \pf{f}{g}\,dx.
\]
Why do we care about this? Maximizing $\ell_n(\te)$ is equivalent to maximizing 
\[
M_n(\te)=\rc n\sum_i\ln \fc{f(X_i;\te)}{f(X_i;\te_*)}
\]
which has the nice property that the maximum is 0. (Without the $\rc n$ it would blow up.) By LLN the expected value of this is exactly $-D(\te_*,\te)$.
\item 
\textbf{score function} $s(X;\te)=\pd{\ln f}{\te}$.

Important property: $\E s=\int_{-\iy}^{\iy} s(X;\te) f\,dx=(\int_{-\iy}^{\iy}f\,dx)_{\te}=0$. 
\item
\textbf{Fisher information} $I(\te)=\Var_\te(s(X;\te))$, $I_n(\te)=nI(\te)$.
I.e., $I(\te)=-\E((\ln f)_{\te\te})$.
\end{enumerate}
\end{df}

\begin{enumerate}
\item
\begin{thm}[Convergence of MLE]
Suppose 
\begin{enumerate}
\item
$\sup_{\te\in \Te}|M_n(\te)-M(\te)|\xra{P}0$,
\item
for all $\ep>0$, $\sup_{|\te-\te_*|\ge\ep} M(\te)<M(\te_*)$.
\end{enumerate}
Then the MLE $\wh{\te_n}\xra P\te_*$.
\end{thm}
\begin{proof}
First show that $M(\te_*)-M(\wh{\te_n})\xra P0$. Then use continuity of $M$.
\end{proof}
\item
\begin{thm}[Asymptotic normality of MLE]
\begin{enumerate}
\item
$\se\sim \sfc1{nI(\te)}$ and $\fc{\wh{\te_n}-\te}{\se}\to N(0,1)$.
\item \fixme{$\wh{\se}=\sfc{1}{nI(\wh{\te_n})}$: why are we redefining $\wh{\se}$? We defined it a different way before. Do these definitions coincide?}
$\fc{\wh{\te_n}-\te}{\wh{\se}}\to N(0,1)$.
\end{enumerate}
\end{thm}
\begin{proof}
\begin{enumerate}
\item
Linearize to find that
\[
\ell'(\wh \te)-\ell'(\te)\approx (\wh \te-\te)(\ell''(\te))\implies -\fc{\ell'}{\ell''}(\te)\approx \wh{\te}-\te.
\]
Now
\[
\sqrt n(\wh{\te_n}-\te)=\fc{\rc{\sqrt n}\ell'(\te)}{-\rc n\ell''(\te)}\to \fc{N(0,I(\te))}{I(\te)}\to N(0,1),
\]
the top in distribution, the bottom in probability. (The top uses CLT on $\sum (\ln f)_\te$; the bottom uses LoLN on $\sum -(\ln f)_{\te\te}$.)
\item
Show that $\sfc{I(\wh{\te_n})}{I(\te)}\xra P 1$.
\end{enumerate}
\end{proof}
\item Think of this as a chain rule.
\begin{thm}
If $\tau=g(\te)$ and $g'(\te)\ne 0$, then $\fc{\wh{\tau_n}-\tau}{\wh{\se}(\wh{\tau})}\to N(0,1)$ where $\wh{\tau_n}=g(\wh{\te_n}),\wh{\se}(\wh{\tau_n})=|g'(\wh{\tau})|\wh{\se}(\wh{\tau_n})$.
\end{thm}
Proof: just expand $g$ using $g'$.
\item (Equivariance) If $\tau=g(\te)$ is 1-to-1, then $\wh{\tau_n}=g(\wh{\te_n})$. Follow definitions!
\end{enumerate}
-->
