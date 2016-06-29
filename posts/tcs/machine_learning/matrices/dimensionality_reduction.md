---
title: Linear dimensionality reduction ([CG15])
published: 2016-06-28
modified: 2016-06-28
tags: dimension reduction
type: notes
showTOC: True
---

A unified framework for linear dimensionality reduction: given $n$ points $[x_1,\ldots, x_n]\in \R^{d\times n}$, optimize $f_X(\cdot)$ to produce a linear transformation $P\in \R^{r\times d}$ and let $Y=PX\in \R^{r\times n}$ be the low-dimensional transformed data.

<img src="/images/dim_red_chart.png">

#Types of reductions

* PCA
* [ICA](ica.html)
* [CCA](cca.html)
* [Factor analysis](factor-analysis.html)
