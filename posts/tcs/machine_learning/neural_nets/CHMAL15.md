---
title: (CHMAL15) The Loss Surfaces of Multilayer Networks
published: 2016-03-07
modified: 2016-03-07
tags: none
type: paper
showTOC: True
---

#Initial

* Relate to random matrix theory
* Relate to spherical spin-glass model
* Global minima lead to overfitting

Phenomenon: While multilayer nets do have many local minima, the result of multiple experiments consistently give very similar performance

We rst establish that the loss function of a typical
multilayer net with ReLUs can be expressed as a polynomial
function of the weights in the network, whose
degree is the number of layers, and whose number
of monomials is the number of paths from inputs to
output.

piecewise, continuous polynomial
whose monomials are switched in and out at the
boundaries between pieces.

first work to give a "theoretical
description of the optimization paradigm with
neural networks in the presence of large number of parameters."

Let $\si(x)=\max(0,x)$.
The random network is
\begin{align}
Y&= q \si(W_H^T\si(\cdots (W_1^TX)\cdots))\\
&=q\sumo i{n_0} \sum_{j=1}^{\ga (=\prod n_i)} X_{ij}\prod_{k=1}^H w_{i,j}^{(k)}.
\end{align}
where $A_{i,j}$ is whether the path is active, $X_{i,j}=X_i$ is starting, and $w_{i,j}^{(k)}$ re weights.

Assumptions

* $X_{i,j}$ independent (so we're not taking $X_{i,j}=X_i$?) 
* Paths: $A_{i,j}$ are Bernoulli. (?)

$(s,\ep)$ reduction image: has only $s$ unique weights but prediction accuracy differs by $\le \ep$. Some kind of approximation!

ReLU's.

#What?

* "fully decoupled"
* "critical values" of loss function
* simulated annealing for neural nets
