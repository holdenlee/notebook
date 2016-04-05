---
title: Non-negative matrix factorization
published: 2016-03-26
modified: 2016-03-26
tags: NMF
type: concept
showTOC: True
---

Notes: See S3 in 598D, Ch. 1 in Moitra's notes, and Rong Ge's thesis.

#Problem

Given $M$, write $M=AW$, $A,W\ge 0$.

Say $M$ is **separable** if it has a NMF $M=AW$, and for every column $i$ of
$A$, there is a row where there is a single nonzero entry and it is in column $i$.

#Previous work

See [matrix factorization](matrix-factorization.html).

#Open problems, directions

* Give an algorithm for approximate NMF. (Suppose $\ve{M-AW}_F^2\le \ep\ve{M}_F^2$.)


(What is the prediction task?)
