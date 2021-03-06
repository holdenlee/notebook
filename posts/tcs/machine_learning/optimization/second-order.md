---
title: Second-order methods
published: 2016-04-22
modified: 2016-04-22
tags: Newton, second-order
type: topic
showTOC: True
---

See [gradient descent](GD.html).

* What is the general framework?
    1. Pick a descent direction $\De x$.
	2.  Choose a step size $\tau>0$:
	    $$x^{(t+1)} \leftarrow x+\tau \De x.$$
    3. Continue until stop criterion.

# Main points

* What's the shortcoming of gradient descent that we want to fix?
    * It is not invariant under linear transformation.
	* When the condition number of the Hessian is large, it has bad convergence.
* Steepest descent
    *   For a norm $\ved$, the steepest descent direction is (sd = steepest descent, nsd = normalized steepest descent)
	    \begin{align}
		\De x_{sd} &= \min_{\ve{y}\le 1} \nb f(x)^T y.
		\end{align}
* Newton method
    *   Let
	    \begin{align}
		\De x_{sd} &= -H^{-1}\nb f\\
		\De x_{nsd} &=\fc{H^{-1} \nb f}{\ve{H^{-\rc 2} \nb f}} = \fc{H^{-1} \nb f}{\la(x)^2}\\
		\la(x) &= \ve{H^{-\rc 2}\nb f}^{\rc 2} = (\nb f^T H^{-1} \nb f)^{\rc 2}.
	    \end{align}
		Here $\la(x)$ is the Newton decrement. (Use $\Delta x = \Delta x_{nsd}$.)
*   Newton for functions with Lipschitz Hessian: The number of steps to reach $\ep$ is
    $$\fc{f(x^{(0)}-p^*)}{\ga} + \ln\ln \fc{\ep_0}{\ep}, \ep_0=\fc{2m^3}{L^2}.$$
*   $f$ is **self-concordant** if for all $v$, $\an{\nb^3 f, \De x^{\ot 3}} \le 2 \an{\nb^2 f, \De x^{\ot2}}^{\fc 32}$. For self-concordant functions, the number of steps to reach $\ep$ is
    $$\fc{f(x^{(0)}-p^*)}{\ga} + \log_2\log_2\prc{\ep}$$
	where $\ga = \fc{\al \be (1-2\al)^2}{20-8\al}$.
* What are the drawbacks of Newton's method and how to fix them?
    * Naively it requires computing $H^{-1}$ which (naively?) takes $n^3$ time each iteration, where $n$ is the dimension. *For large $n$ this is prohibitive.*

#Proofs

*   Newton method is steepest descent for $H$:
	*   Let $A$ be a symmetric positive definite matrix. Defining $\ved_A$ as follows, we note that the dual norm is the norm corresponding to the inverse.
		\begin{align}
		\ve{A} :&= x^TAx = \ve{\sqrt A}_2\\
		\ve{x}_{A}^* & = \ve{x}_{A^{-1}}.
		\end{align}
		*   *Proof.*
			$$\ve{x}_A^* = \max_{\ve{y}_A=1} x^Ty \stackrel{z = \sqrt{A}y}{=} \max_{\ve{z}=1} x^T A^{-\rc 2} z = \ve{A^{-\rc 2}x^T}  = \ve{x}_{A^{-1}}.$$
		*   This calculation also shows that
		    $$\amin_{\ve{y}_A=1} v^Ty = \fc{A^{-1} x}{\ve{A^{-\rc 2}x}}.$$
		*   Thus,
			\begin{align}
			\De x_{nsd} &= \fc{H^{-1} \nb f(x)}{\ve{H^{-\rc 2} \nb f}}.
			\end{align}
	*   Why is $\De x_{nsd}$ the right normalization?
	    $$ f\pa{x - t\fc{H^{-1} \nb f(x)}{\ve{H^{-\rc 2} \nb f}}} \approx f(x) + (-t+\fc{t^2}2) \fc{H^{-1} \nb f(x)}{\ve{H^{-\rc 2} \nb f}}$$
		and $t=1$ minimizes this.

#Convergence

* What is the main idea of Newton descent? Why/how do we get quadratic convergence?
    * Go in the direction of the minimum suggested by the Hessian (second order approximation).
	*   The proof is organized as follows. If $\ve{\nb f(x^{(k)})}^2$ is
	    * large ($\ge \eta$), then make constant progress by $\ga$. This is the dampled phase; steps are small. Steps are small because the default Newton step $t=1$ is bad, and backtracking will choose a smaller $t$. (?) (It's "slow" in the sense it's not quadratically convergent, but it makes constant progress.)
		* small ($<\eta$), then make quadratic progress, $\ve{\nb f(x^{(k+1)})}_2\le \fc{L}{2m^2}\ve{\nb f(x^{(k)})}_2^2$.
* What should $\eta$ depend on? $\al$ (the slope for backtracking), $m$ (strong convexity parameter), $L$ (Lipschitz constant on Hessian).

*Proof (for Lipschitz)*. We do the calculations for 1 dimension. The calculations are the same, except we have to use matrices and vectors. Let $\te(y)$ be a quantity in $[-y,y]$. Suppose we are at $(0,0)$. Let $d=f'(0), a=f''(0), \la = \fc{d}{a^{\rc 2}}$, $\De x_{nt} = \fc{d}{a} = \fc{\la}{a^{\rc 2}}$.
\begin{align}
f(x) &= dx + \rc 2 ax^2 + \te\pa{\rc 6 Lx^3}\\
f\pa{-\fc da} &= -\rc 2 \fc{d^2}a\\
&\le -\fc{d^2}{a} \ub{\pa{\rc 2 - \rc 6 L \fc{d}{a^2}}}{\ge \al}.
\end{align}
In order for the quantity to be $\ge \al$, noting $\fc{d}{a^2} = \fc{d}{a^{\fc 32}}$, we want $\la \le \fc{3(1-2\al) a^{\fc 32}}L$; it's sufficient for $f'\le \fc{3(1-2\al)m^2}{L}$.

Note that unlike for linear convergence, we don't prove something like $f(x') - f(x^*)\le \cdots$. We have to work with the gradients to get quadratic convergence. (Gradients also control the distance to the optimum.) We have
\begin{align}
f'(x) &= d+ ax + \te\pa{\rc L x^2}\\
f'\pa{-\fc da} & \le \rc 2 L\fc{d^2}{a^2} \le \fc{L}{2m^2}f'(0).
\end{align}

*Proof (for self-concordant)*. Work in 1-D. Instead of integrating $\int f'''=\int (f'')^{\fc 32}$, we let $F(y)=y^{-\rc 2}$ and integrate $\int (F(f''))'$.
\begin{align}
|(f'')^{-\rc 2} (t)| &= \ab{\int_0^t ((f'')^{-\rc 2})'} =\int_0^t \ab{-\rc 2 (f'')^{-\fc 32} f'''}\le t\\
\label{eq:f''}
\implies
\rc{(-t + f''(0)^{-\rc 2})^2} &\ge f''(t) \ge \rc{(t+f''(0)^{-\rc 2})^2}\\
\implies
\rc{-t+f''(0)^{-\rc 2}} - f''(0)^{\rc 2} & \ge f'(t)-f'(0) \ge \rc{t+f''(0)^{-\rc 2}} + f''(0)^{\rc 2}\\
\implies f(t) &\le f(0) + (f'(0) - f''(0)^{\rc 2}) t + \ln \pf{f''(0)^{-\rc 2}}{t + f''(0)^{-\rc 2}}\\
\implies f\pa{-\fc{f'}{f''}t} & \le f(0) - \la^2 t + \la t - \ln (1-t\la(x)).
\end{align}
Now consider 2 cases.

* $\la(x^{(k)})>\eta$. We show $f(x^{(k+1)}) - f(x^{(k)}) \le -\ga$.
	*   Using $-x + \ln (1+x) + \fc{x^2}{2(1+x)}\le 0$, for $t=\rc{1+\la(x)}$,
	    \begin{align}
		f(-\fc{f'}{f''} t) & \le f(0) - \al \la(x)^2 t\\
		t=\rc{1+\la(x)^2}\implies f(-\fc{f'}{f''} t) & \le f(0) - \al \la(x)^2 t
		\end{align}
		so backtracking line search chooses $t\ge \fc{\be}{1+\la(x)}$ with
		$$f(-\fc{f'}{f''} t)  \le -\al \be \fc{\la^2}{1+\la} \le -\al \be \fc{\eta^2}{1+\eta}.$$
*   $\la(x^{(k)})\le \eta$. We show $2\la(x^{(k+1)})\le (2\la(x^{(k)}))^2$. (Note we are not getting a bound on $f'(x_{k+1})$ like before because we don't have strong convexity, which upper-bounds $f''(x)^{-\rc 2}$.)
	*   We take a unit step because
	    $$f(-\fc{f'}{f''})   = f(0) - \la^2 + \la - \ln (1-\la(x))\le f(0)-\al \la(x)^2$$
		when $\la(x) \le \fc{1-2\al}{2}$.
    *   Self-concordance gives multiplicative bound on how $H$ changes, $(1-t\al)^2 H \preceq H(x+tv) \preceq \rc{(1-t\al)^2} H(x)$, where $\al=\ve{v}_{H^{\rc 2}}$. Proof:
		\begin{align}
		\ln f''(t) - \ln f''(0) & = \int_0^t (\ln f'')' \\
		& \le \int_0^t (2f'')^{\rc 2}\\
		&\le \int_0^t \fc{2}{-x+(f'')^{-\rc 2}} &\eqref{eq:f''}\\
		&\le 2\ln (-t (f'')^{\rc 2} + 1).
	    \end{align}
	*   Now we show $\la(x-\fc{f'}{f''}) \le \fc{\la^2}{(1-\la)^2}$. Using the multiplicative bound (here $t=1$, $v=-\fc{f'}{f''}$, $\al=\la$.
		\begin{align}
		f''(x_{k+1})&\in f''(x_k) [1-\la, \rc{1-\la}]\\
		f'(x_{k+1}) & \in f'(x_k) + \ba{-\rc{\fc{f'}{f''} + \rc{(f'')^{\rc 2}}} + (f'')^{\rc 2}, \rc{-\fc{f'}{f''}+\rc{(f'')^{\rc2}}} - (f'')^{\rc 2}}\\
		&= f'(x_k) \ba{\fc{\la}{-\la + 1}, \fc{\la}{\la+1}}\\
		\la(x_{k+1})&\le \fc{\la(x_k)^2}{(1-\la(x_k))^2} \\ & \le 2\la^2
	    \end{align}
		where the last inequality is when $\la\le \rc 4$.
* Finally, bound the distance to optimum by $\la$, $f(x^{(l)})-p^* \le \la(x^{(l)})^2$.

# More intuition

* Why do we use $\ved_H$?
	*   It appears in the second-order Taylor approximation. $f(x) + \nb f^T v + \rc 2 v^T \nb^2 f v$ has a minimum at $\fc{H^{-1}f}{\ve{H^{-\rc 2}f}}$, not in the gradient direction!
	*   It is invariant to linear transformation: $\De x_{nsd} (f\circ A) = \De x_{nsd} f$.
* What is the relationship to Newton's method of finding zeros?
    * The Newton's method here is the Newton zero-finding method applied to $f'$.
* Does order $c$ give $2^{-n^c}$ convergence?
    * Probably. But it's rare to get $>2$ order information.
*   Give an example where gradient descent performs poorly compared to Newton.
    $f = x_1^2 + \ep x_2^2$, $-\nb f = (-2x_1,-2\ep x_2)$.
*   Intuition for self-concordance
    *   We relax the requirement that $f$ is strongly convex and has Lipschitz Hessian. We're allowed to have $f''\to 0$; the requirement is that when $f''$ is small so is $f'''$. Note $\fc{(f'')^{\fc 32}}{f'''}$ is dimensionless.

#Implementation issues

1. Precompute line searches: it can be more efficient to simultaneously compute $f(x+t\De x)$ for many values of $t$, e.g., if it involves a linear/matrix function.
2. Computing $\De x_{nt}=H^{-1}\nb f(x)$ is more efficient if $H$ has band structure, sparsity, etc.


# Review 

1. Describe the Newton method. What is the step size and Newton decrement?
2. What is the convergence rate for functions with Lipschitz Hessian?
3. Define self-concordant. What is the convergence for self-concordant functions?

# Scraps

? 9.31, 

estimating Hessian?
